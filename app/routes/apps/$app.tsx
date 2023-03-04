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
import styles from "~/styles/app.css";

export const meta: MetaFunction = ({ data: { seo } }) => toRemixMeta(seo);

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const loader: LoaderFunction = async ({ params: { app: appSlug } }) => {
  return await datoRequest(`
	{
		app(filter: {slug: {eq: "${appSlug}"}}) {
			title
			icon {
				responsiveImage {
					...responsiveImageFragment
				}
			}
			gumroadId
			seo: _seoMetaTags {
				... metaTagsFragment
			}
		}
	}
	${metaTagsFragment}
	${responsiveImageFragment}
	`);
};

export default function Page() {
  const data = useLoaderData();

  const {
    app: {
      title,
      icon: { responsiveImage: icon },
      gumroadId,
    },
  } = data;

  return (
    <>
      <nav className="app-nav">
        <ul>
          <li>
            <NavLink to={"./"} className="app-home card">
              <div className="icon-container">
                <PNGImage data={icon} />
              </div>
              {title}
            </NavLink>
          </li>
          <li>
            <NavLink to={"./help"}>Help</NavLink>
          </li>
          <li>
            {gumroadId && (
              <a className="purchase-button" href={gumroadId}>
                Buy
              </a>
            )}
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
