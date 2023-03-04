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
    app: { userGuide },
  } = await datoRequest(`
	{
		app(filter: {slug: {eq: "${appSlug}"}}) {
			title
			userGuide(markdown: true)
		}
	}`);
  return {
    userGuide,
  };
};

export const meta: MetaFunction = ({ data: { seo } }) => toRemixMeta(seo);

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Page() {
  const { userGuide } = useLoaderData();

  return (
    <div className="mixed-bleed prose">
      <div className="stack">
        <h1>User Guide</h1>
        <div
          className="stack"
          dangerouslySetInnerHTML={{ __html: userGuide }}
        />
      </div>
    </div>
  );
}
