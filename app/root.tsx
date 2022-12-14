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
	useLoaderData,
} from "@remix-run/react";
import { Image } from "react-datocms";
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
		about: {
			name,
			tagline,
			memoji: { responsiveImage },
			contact,
			footerNotice,
		},
	} = await datoRequest(`
		{
			about {
				name
				tagline
				memoji {
					responsiveImage {
						...responsiveImageFragment
					}
				}
				contact {
					label
					url
				}
				footerNotice
			}
		}
		${responsiveImageFragment}
	`);

	return { name, tagline, responsiveImage, contact, footerNotice };
};

const menu = [
	["/", "Apps"],
	["/projects", "Projects"],
	["/about", "About"],
];

export default function App() {
	const { name, tagline, responsiveImage, contact, footerNotice } =
		useLoaderData<typeof loader>();

	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<SiteHeader
					menu={menu}
					avatar={<Image data={responsiveImage} />}
					name={name}
					tagline={tagline}
				/>
				<main>
					<Outlet />
				</main>
				<SiteFooter links={contact} notice={footerNotice} />
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	);
}
