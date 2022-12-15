import type {
	LinksFunction,
	LoaderFunction,
	MetaFunction,
} from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Image, toRemixMeta } from "react-datocms";
import PNGImage from "~/components/PNGImage";
import datoRequest from "~/lib/datoRequest";
import { metaTagsFragment, responsiveImageFragment } from "~/lib/fragments";
import styles from "~/styles/apps.css";

export const loader: LoaderFunction = async () => {
	const {
		home: { tagline, seo },
		allApps,
		about: { welcomeMessage },
	} = await datoRequest(`
	{
		home {
			tagline
			seo: _seoMetaTags {
				...metaTagsFragment
			}
		}
		allApps(orderBy: releaseDate_DESC) {
			title
			subtitle
			icon {
				responsiveImage {
					...responsiveImageFragment
				}
			}
			slug
			releaseDate
			new
		}
		about {
			welcomeMessage
		}
	}
	${responsiveImageFragment}
	${metaTagsFragment}
	`);

	return { tagline, seo, allApps, welcomeMessage };
};

export const meta: MetaFunction = ({ data }) => toRemixMeta(data.seo);

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Index() {
	const { tagline, allApps, welcomeMessage } = useLoaderData();

	return (
		<div className="center stack">
			<div>
				<h1 className="sr-only">{welcomeMessage}</h1>
				<p>{tagline}</p>
			</div>
			<ul className="stack">
				{allApps.map(
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
		</div>
	);
}
