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
import styles from "~/styles/apps.css";

export const loader: LoaderFunction = async ({ request }) => {
	return await datoRequest(`
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
				}
			}
		}
	}
	${pageFragment}
	${responsiveImageFragment}
	`);
};

export const meta: MetaFunction = ({
	data: {
		page: { seo },
	},
}) => toRemixMeta(seo);

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function HomePage() {
	const {
		page: { header, subheader, body, archive },
	} = useLoaderData();

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
							new: isNew,
						}) => (
							<li key={title} className="card card-ui app-card">
								<div>
									<div className="title-container">
										<h2>
											<Link className="app-name" to={`apps/${slug}`}>
												{title}
											</Link>
										</h2>
										{isNew && <small className="chip orange">New</small>}
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