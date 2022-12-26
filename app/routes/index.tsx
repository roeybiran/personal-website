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
import getMonthDifference from "~/lib/getMonthDifference";
import styles from "~/styles/home.css";

export const loader: LoaderFunction = async () => {
	const { page } = await datoRequest(`
	{
		page(filter: {slug: {eq: ""}}) {
			... pageFragment
			archive {
				... on AppRecord {
					title
					subtitle
					slug
					icon {
						responsiveImage {
							... responsiveImageFragment
						}
					}
					releaseDate
				}
			}
		}
	}
	${pageFragment}
	${responsiveImageFragment}
	`);

	return {
		...page,
		archive: page.archive
			.map((app) => {
				const releaseDate = new Date(app.releaseDate);
				const now = new Date();
				const isNewApp = getMonthDifference(releaseDate, now) <= 2;
				return { ...app, releaseDate, isNewApp };
			})
			.sort(({ releaseDate: a }, { releaseDate: b }) => b - a),
	};
};

export const meta: MetaFunction = ({ data: { seo } }) => toRemixMeta(seo);

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function HomePage() {
	const { header, subheader, body, archive } = useLoaderData();

	return (
		<Page
			header={header}
			subheader={subheader}
			body={body}
			archive={
				<ul className="stack center">
					{archive.map(
						({
							title,
							subtitle,
							slug,
							icon: { responsiveImage },
							isNewApp,
						}) => (
							<li key={title} className="card card-ui app-card">
								<div>
									<div className="title-container">
										<h2>
											<Link className="app-name" to={`apps/${slug}`}>
												{title}
											</Link>
										</h2>
										{isNewApp && (
											<small className="chip orange new">New!</small>
										)}
									</div>
									<p className="app-subtitle">{subtitle}</p>
								</div>
								<div className="image-container">
									<PNGImage data={responsiveImage} />
								</div>
							</li>
						)
					)}
				</ul>
			}
		/>
	);
}
