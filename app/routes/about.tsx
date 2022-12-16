import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { toRemixMeta } from "react-datocms";
import Page from "~/components/Page";
import datoRequest from "~/lib/datoRequest";
import { pageFragment } from "~/lib/fragments";

export const loader = async () => {
	return await datoRequest(`
	{
		page(filter: {slug: {eq: "about"}}) {
			... pageFragment
		}
	}
	${pageFragment}
	`);
};

export const meta: MetaFunction = ({
	data: {
		page: { seo },
	},
}) => toRemixMeta(seo);

export default function AboutPage() {
	const {
		page: { header, subheader, body },
	} = useLoaderData<typeof loader>();

	return <Page header={header} subheader={subheader} body={body} />;
}
