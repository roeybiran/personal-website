import type {
	LinksFunction,
	LoaderFunction,
	MetaFunction,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { toRemixMeta } from "react-datocms";
import Page from "~/components/Page";
import PNGImage from "~/components/PNGImage";
import datoRequest from "~/lib/datoRequest";
import { pageFragment, responsiveImageFragment } from "~/lib/fragments";
import styles from "~/styles/projects.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = ({
	data: {
		page: { seo },
	},
}) => toRemixMeta(seo);

export const loader: LoaderFunction = async () => {
	const response = await datoRequest(`
	{
		page(filter: {slug: {eq: "projects"}}) {
			... pageFragment
		}
		allProjects(orderBy: date_DESC) {
			title
			subtitle
			slug
			responsibilities
			projectType
			icon {
				responsiveImage {
					...responsiveImageFragment
				}
			}
		}
	}
	${pageFragment}
	${responsiveImageFragment}
	`);

	return {
		...response,
		allProjects: response.allProjects.map((p) => ({
			...p,
			responsibilities: p.responsibilities.split(", "),
		})),
	};
};

export default function ProjectsPage() {
	const {
		page: { header, subheader, body },
		allProjects,
	} = useLoaderData();

	return (
		<Page
			header={header}
			subheader={subheader}
			body={body}
			archive={
				<ul
					className="grid"
					style={{
						"--minimum": "30ch",
						"--fit": "auto-fill",
					}}
				>
					{allProjects.map(
						({
							title,
							subtitle,
							projectType,
							slug,
							responsibilities,
							icon: { responsiveImage },
						}) => (
							<li className="card card-ui project-card" key={title}>
								<div className="text">
									<div className="stack split-after">
										<div
											className="stack splitter"
											style={{ "--space": "var(--size-1)" }}
										>
											<h2>
												<Link to={slug}>{title}</Link>
											</h2>
											<h3 className="sr-only">Type</h3>
											<p className="uppercased">{projectType}</p>
											<p>{subtitle}</p>
										</div>

										<h3 className="sr-only">Responsibilities</h3>
										<ul
											className="cluster"
											style={{ "--justify": "flex-start" }}
										>
											{responsibilities.map((x) => (
												<li className="chip" key={x}>
													{x}
												</li>
											))}
										</ul>
									</div>
								</div>

								<figure className="image-container">
									<PNGImage data={responsiveImage} />
								</figure>
							</li>
						)
					)}
				</ul>
			}
		/>
	);
}
