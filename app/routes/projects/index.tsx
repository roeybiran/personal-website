import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Image } from "react-datocms";
import datoRequest from "~/lib/datoRequest";
import { metaTagsFragment, responsiveImageFragment } from "~/lib/fragments";
import styles from "~/styles/projects.css";

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async () => {
	return await datoRequest(`
	{
		allProjects(orderBy: date_DESC) {
			title
			excerpt
			slug
			responsibilities
			projectType
			image {
				responsiveImage {
					...responsiveImageFragment
				}
			}
		}
	}
	${responsiveImageFragment}
	`);
};

export default function Projects() {
	const { allProjects } = useLoaderData();

	return (
		<div className="projects">
			<h1 className="sr-only">Projects</h1>
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
						excerpt,
						projectType,
						slug,
						responsibilities,
						image: { responsiveImage },
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
										<p>{excerpt}</p>
									</div>

									<h3 className="sr-only">Responsibilities</h3>
									<ul className="cluster" style={{ "--justify": "flex-start" }}>
										{responsibilities.split(", ").map((x) => (
											<li className="chip" key={x}>
												{x}
											</li>
										))}
									</ul>
								</div>
							</div>

							<figure className="next-img-container">
								<Image data={responsiveImage} />
							</figure>
						</li>
					)
				)}
			</ul>
		</div>
	);
}
