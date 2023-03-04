import type { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { toRemixMeta } from "react-datocms";
import datoRequest from "~/lib/datoRequest";

export const loader: LoaderFunction = async ({ params: { app: appSlug } }) => {
  const {
    app: { faq },
  } = await datoRequest(`
	{
		app(filter: {slug: {eq: "${appSlug}"}}) {
			title
			faq {
				question
				answer(markdown: true)
			}
			userGuide(markdown: true)
		}
	}`);
  return {
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

export default function Page() {
  const { faq } = useLoaderData();

  return (
    <div className="mixed-bleed prose">
      <div className="stack">
        <h1>FAQ</h1>
        <ul className="stack faq" id="faq">
          {faq.map(({ question: q, answer: a, id }) => (
            <li key={q}>
              <details className="stack" id={id}>
                <summary>
                  <span dangerouslySetInnerHTML={{ __html: q }} />
                </summary>
                <div
                  className="details-inner prose stack"
                  dangerouslySetInnerHTML={{ __html: a }}
                />
              </details>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
