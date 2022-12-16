import type {
	LinksFunction,
	LoaderFunction,
	MetaFunction,
} from "@remix-run/node";
import {
	Links,
	LiveReload,
	Meta,
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
	return await datoRequest(`
	{
		header {
			title
			subtitle
			memoji {
				responsiveImage {
					...responsiveImageFragment
				}
			}
			navigation {
				key
				value
			}
		}
		footer {
			copyright
			contactLinks {
				key
				value
			}
		}
	}
	${responsiveImageFragment}
	`);
};

export default function App() {
	const {
		header: {
			title,
			subtitle,
			memoji: { responsiveImage },
			navigation,
		},
		footer: { copyright, contactLinks },
	} = useLoaderData<typeof loader>();

	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<SiteHeader
					menu={navigation}
					avatar={<PNGImage data={responsiveImage} />}
					header={title}
					subheader={subtitle}
				/>
				<main>
					<Outlet />
				</main>
				<SiteFooter links={contactLinks} notice={copyright} />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}

export function CatchBoundary() {
	const caught = useCatch();

	return (
		<html lang="en">
			<head>
				<title>{caught.statusText}</title>
				<Meta />
				<Links />
			</head>
			<body>
				<h1>
					{caught.statusText} ({caught.status})
				</h1>
				<Scripts />
			</body>
		</html>
	);
}
