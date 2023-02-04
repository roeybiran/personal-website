import type {
	LinksFunction,
	LoaderFunction,
	MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { toRemixMeta } from "react-datocms";
import Page from "~/components/Page";
import datoRequest from "~/lib/datoRequest";
import { pageFragment } from "~/lib/fragments";
import styles from "~/styles/home.css";

export const loader: LoaderFunction = async () => {
	const { page } = await datoRequest(`
	{
		page(filter: {slug: {eq: ""}}) {
			... pageFragment
		}
	}
	${pageFragment}
	`);

	return { ...page };
};

export const meta: MetaFunction = ({ data: { seo } }) => toRemixMeta(seo);

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function HomePage() {
	const { header, subheader, body } = useLoaderData();

	return <Page header={header} subheader={subheader} body={body} />;
}
