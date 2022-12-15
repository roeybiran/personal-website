import type {
	LinksFunction,
	LoaderFunction,
	MetaFunction,
} from "@remix-run/node";
import datoRequest from "~/lib/datoRequest";
import { metaTagsFragment, responsiveImageFragment } from "~/lib/fragments";
import { useLoaderData } from "@remix-run/react";
import { Image, toRemixMeta } from "react-datocms";
import styles from "~/styles/project.css";

const dateFormatter = new Intl.DateTimeFormat(undefined, {
	dateStyle: "medium",
});

export const loader: LoaderFunction = async ({
	params: { project: projectSlug },
}) => {
	const { project } = await datoRequest(`
	{
		project(filter: {slug: {eq: "${projectSlug}"}}) {
			title
			excerpt
			date
			cover {
				responsiveImage {
					...responsiveImageFragment
				}
			}
			text(markdown: true)
			stack
			responsibilities
			_seoMetaTags {
				...metaTagsFragment
			}
			projectType
			links {
				key
				value
			}
			press {
				key
				value
			}
		}
	}
	${metaTagsFragment}
	${responsiveImageFragment}
	`);

	return {
		...project,
		responsibilities: project.responsibilities.split(", "),
		stack: project.stack.split(", "),
		date: dateFormatter.format(new Date(project.date)),
	};
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = ({ data }) => toRemixMeta(data._seoMetaTags);

export default function Project() {
	const project = useLoaderData();

	return (
		<div className="stack">
			<figure className="image-container">
				<Image data={project.cover.responsiveImage} />
			</figure>
			<div
				className="sidebar"
				style={{
					"--side-width": "30ch",
				}}
			>
				<aside>
					<h1>{project.title}</h1>
					<p
						className="subtitle"
						dangerouslySetInnerHTML={{ __html: project.excerpt }}
					/>
					<dl className="meta">
						<dt>Type</dt>
						<dd className="chip">{project.projectType}</dd>
						<dt>Responsibilities</dt>
						<dd>
							<ul className="cluster">
								{project.responsibilities.map((x) => (
									<li
										className="chip"
										key={x}
										dangerouslySetInnerHTML={{ __html: x }}
									/>
								))}
							</ul>
						</dd>
						<dt>Date</dt>
						<dd>{project.date}</dd>
						<dt>Links</dt>
						<dd>
							<ul>
								{project.links.length > 0 &&
									project.links.map(({ key, value }) => (
										<li key={value}>
											<a href={value}>{key}</a>
										</li>
									))}
							</ul>
						</dd>
						{project.press.length > 0 && (
							<>
								<dt>Press</dt>
								<dd>
									<ul>
										{project.press.map(({ key, value }) => (
											<li key={key}>
												<a href={value}>{key}</a>
											</li>
										))}
									</ul>
								</dd>
							</>
						)}
						<dt>Technologies</dt>
						<dd>
							<ul className="cluster">
								{project.stack.map((x) => (
									<li className="chip" key={x}>
										{x}
									</li>
								))}
							</ul>
						</dd>
					</dl>
				</aside>
				<section className="stack">
					<div
						className="editorial"
						dangerouslySetInnerHTML={{ __html: project.text }}
					/>
				</section>
			</div>
		</div>
	);
}
