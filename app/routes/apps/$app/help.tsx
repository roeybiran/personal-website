import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { toRemixMeta } from "react-datocms";
import datoRequest from "~/lib/datoRequest";
import styles from "~/styles/help.css";

export const loader: LoaderFunction = async ({ params: { app: appSlug } }) => {
  const {
    app: { userGuide, faq },
  } = await datoRequest(`
	{
		app(filter: {slug: {eq: "${appSlug}"}}) {
			userGuide
      faq {
				question
				answer
			}
		}
	}`);

  const links = [];

  if (userGuide) {
    links.push({ label: "User Guide", url: "" });
  }

  if (faq) {
    links.push({ label: "FAQ", url: "faq" });
  }

  return links.length > 0
    ? {
        links,
      }
    : undefined;
};

export const meta: MetaFunction = ({ data: { seo } }) => toRemixMeta(seo);

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export default function Page() {
  const { links } = useLoaderData();

  return (
    <div>
      {links && (
        <nav className="help-nav">
          <ul
            className="cluster"
            style={{ "--justify": "flex-end", "--space": "var(--size-3)" }}
          >
            {links.map(({ label, url }) => (
              <li key={url}>
                <NavLink to={url}>{label}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
      <Outlet />
    </div>
  );
}
