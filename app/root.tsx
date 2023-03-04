import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useLoaderData,
} from "@remix-run/react";
import PNGImage from "./components/PNGImage";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import datoRequest from "./lib/datoRequest";
import { responsiveImageFragment } from "./lib/fragments";
import styles from "./styles/index.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: "https://cdn.skypack.dev/sanitize.css" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,700;1,400&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://unpkg.com/open-props",
  },
  { rel: "stylesheet", href: styles },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ request, params }) => {
  const {
    header: {
      title,
      subtitle,
      memoji: { responsiveImage },
    },
    allPages,
    footer: { copyright, contactLinks, body },
  } = await datoRequest(`
	{
		allPages(orderBy: order_ASC) {
			header
			slug
		}
		header {
			title
			subtitle
			memoji {
				responsiveImage {
					...responsiveImageFragment
				}
			}
		}
		footer {
			body(markdown: true)
			copyright
			contactLinks {
				key
				value
			}
		}
	}
	${responsiveImageFragment}
	`);

  return {
    title,
    subtitle,
    responsiveImage,
    navigation: allPages.map(({ header, slug }) => ({
      header,
      slug,
    })),
    copyright,
    contactLinks,
    footerBody: body,
  };
};

export default function App() {
  const {
    title,
    subtitle,
    responsiveImage,
    navigation,
    copyright,
    contactLinks,
    footerBody,
  } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <SiteHeader
          navigation={navigation}
          avatar={<PNGImage data={responsiveImage} />}
          header={title}
          subheader={subtitle}
        />
        <main>
          <Outlet />
        </main>
        <SiteFooter links={contactLinks} notice={copyright} body={footerBody} />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const { statusText, status } = useCatch();

  return (
    <html lang="en">
      <head>
        <title>
          Error {status}: {statusText}
        </title>
        <Meta />
        <Links />
      </head>
      <body>
        <div className="not-found">
          <div className="center intrinsic and-text stack recursive">
            <img
              className="memoji-404"
              src="https://www.datocms-assets.com/88073/1675637882-memoji-404.png"
              alt=""
            />
            <h1>{`${status}: ${statusText}`}</h1>
            <NavLink to="/" className="ctaButton">
              Return Home
            </NavLink>
          </div>
        </div>
        <Scripts />
      </body>
    </html>
  );
}
