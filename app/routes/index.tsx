import type {
	LinksFunction,
	LoaderFunction,
	MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { toRemixMeta } from "react-datocms";
import PNGImage from "~/components/PNGImage";
import datoRequest from "~/lib/datoRequest";
import { pageFragment, responsiveImageFragment } from "~/lib/fragments";
import styles from "~/styles/home.css";

export const loader: LoaderFunction = async () => {
	return await datoRequest(`
	{
		allUploads(filter: {filename: {matches: {caseSensitive: true, pattern: "hello-memoji"}}}) {
			responsiveImage {
				...responsiveImageFragment
			}
		}
		page(filter: {slug: {eq: ""}}) {
			... pageFragment
		}
	}
	${pageFragment}
	${responsiveImageFragment}
	`);
};

export const meta: MetaFunction = ({ data: { seo } }) => toRemixMeta(seo);

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function HomePage() {
	const {
		page: { header, subheader, body },
		allUploads: [{ responsiveImage }],
	} = useLoaderData();

	return (
		<div className="home center intrinsic">
			<div className="stack">
				<div className="center intrinsic memoji-container">
					<PNGImage data={responsiveImage} />
				</div>
				<h1 className="sr-only">{header}</h1>
				{subheader && <p>{subheader}</p>}
				<div className="editorial" dangerouslySetInnerHTML={{ __html: body }} />
			</div>
		</div>
	);
}
