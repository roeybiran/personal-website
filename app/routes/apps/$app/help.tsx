import type {
	LinksFunction,
	LoaderFunction,
	MetaFunction,
} from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { toRemixMeta } from "react-datocms";
import PNGImage from "~/components/PNGImage";
import datoRequest from "~/lib/datoRequest";
import { metaTagsFragment, responsiveImageFragment } from "~/lib/fragments";

import styles from "~/styles/help.css";

export const loader: LoaderFunction = async ({ params: { app: appSlug } }) => {
	return await datoRequest(`
	{
		app(filter: {slug: {eq: "${appSlug}"}}) {
			title
			faq {
				question
				answer(markdown: true)
			}
		}
	}`);
};

export const meta: MetaFunction = ({ data: { seo } }) => toRemixMeta(seo);

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Page() {
	const {
		app: { title, faq },
	} = useLoaderData();

	return (
		<div className="stack editorial">
			<h1 className="sr-only">{title} Help</h1>
			<h2>FAQ</h2>
			<ul className="center stack">
				{faq.map(({ question: q, answer: a }) => (
					<ol key={q}>
						<details className="stack">
							<summary dangerouslySetInnerHTML={{ __html: q }} />
							<div
								className="details-inner editorial"
								dangerouslySetInnerHTML={{ __html: a }}
							/>
						</details>
					</ol>
				))}
			</ul>
		</div>
	);
}
