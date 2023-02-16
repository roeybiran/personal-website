import type {
	LinksFunction,
	LoaderFunction,
	MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { toRemixMeta } from "react-datocms";
import datoRequest from "~/lib/datoRequest";

import styles from "~/styles/help.css";

export const loader: LoaderFunction = async ({ params: { app: appSlug } }) => {
	const {
		app: { title, faq },
	} = await datoRequest(`
	{
		app(filter: {slug: {eq: "${appSlug}"}}) {
			title
			faq {
				question
				answer(markdown: true)
			}
		}
	}`);
	return {
		title,
		faq: faq.map(({ question, answer }) => ({
			question,
			answer,
			id: question
				.toLowerCase()
				.replace(/\s/g, "_")
				.replace(/\W/g, "")
				.replace(/_/g, "-"),
		})),
	};
};

export const meta: MetaFunction = ({ data: { seo } }) => toRemixMeta(seo);

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Page() {
	const { title, faq } = useLoaderData();

	return (
		<div className="mixed-bleed">
			<div className="stack">
				<h1 className="sr-only">{title} Help</h1>
				<h2>FAQ</h2>
				<ul className="stack">
					{faq.map(({ question: q, answer: a, id }) => (
						<ol key={q}>
							<details className="stack">
								<summary dangerouslySetInnerHTML={{ __html: q }} id={id} />
								<div
									className="details-inner prose"
									dangerouslySetInnerHTML={{ __html: a }}
								/>
							</details>
						</ol>
					))}
				</ul>
			</div>
		</div>
	);
}
