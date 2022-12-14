import type {
	LinksFunction,
	LoaderFunction,
	MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Image, toRemixMeta } from "react-datocms";
import IconButton from "~/components/IconButton";
import datoRequest from "~/lib/datoRequest";
import { metaTagsFragment, responsiveImageFragment } from "~/lib/fragments";
import styles from "~/styles/app.css";

export const loader: LoaderFunction = async ({ params: { app: appSlug } }) => {
	const { app } = await datoRequest(`
	{
		app(filter: {slug: {eq: "${appSlug}"}})
		{
			_seoMetaTags {
				...metaTagsFragment
			}
			title
			subtitle
			content(markdown: true)
			price
			appStoreId
			gumroadId
			sourceCode
			icon {
				responsiveImage {
					...responsiveImageFragment
				}
			}
			primaryFeatures {
				title
				text(markdown: true)
				image {
					responsiveImage {
						...responsiveImageFragment
					}
				}
			}
			secondaryFeatures {
				text
			}
		}
	}
	${metaTagsFragment}
	${responsiveImageFragment}
	`);

	return app;
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = ({ data }) => toRemixMeta(data._seoMetaTags);

export default function App() {
	const data = useLoaderData();

	const {
		title,
		subtitle,
		icon: { responsiveImage: icon },
		primaryFeatures,
		secondaryFeatures,
		content,
		price,
		appStoreId,
		gumroadId,
		sourceCode,
	} = data;

	return (
		<>
			<div className="stack">
				<div className="stack center intrinsic and-text">
					<div className="app-icon">
						<Image data={icon} />
					</div>
					<div>
						<h1>{title}</h1>
						<p className="subtitle">{subtitle}</p>
					</div>
					<div className="cluster">
						{gumroadId && (
							<a className="price ctaButton" href={gumroadId}>
								Purchase for {price}
							</a>
						)}
						{appStoreId && (
							<IconButton
								icon={
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
										<path d="M255.9 120.9l9.1-15.7c5.6-9.8 18.1-13.1 27.9-7.5 9.8 5.6 13.1 18.1 7.5 27.9l-87.5 151.5h63.3c20.5 0 32 24.1 23.1 40.8H113.8c-11.3 0-20.4-9.1-20.4-20.4 0-11.3 9.1-20.4 20.4-20.4h52l66.6-115.4-20.8-36.1c-5.6-9.8-2.3-22.2 7.5-27.9 9.8-5.6 22.2-2.3 27.9 7.5l8.9 15.7zm-78.7 218l-19.6 34c-5.6 9.8-18.1 13.1-27.9 7.5-9.8-5.6-13.1-18.1-7.5-27.9l14.6-25.2c16.4-5.1 29.8-1.2 40.4 11.6zm168.9-61.7h53.1c11.3 0 20.4 9.1 20.4 20.4 0 11.3-9.1 20.4-20.4 20.4h-29.5l19.9 34.5c5.6 9.8 2.3 22.2-7.5 27.9-9.8 5.6-22.2 2.3-27.9-7.5-33.5-58.1-58.7-101.6-75.4-130.6-17.1-29.5-4.9-59.1 7.2-69.1 13.4 23 33.4 57.7 60.1 104zM256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm216 248c0 118.7-96.1 216-216 216-118.7 0-216-96.1-216-216 0-118.7 96.1-216 216-216 118.7 0 216 96.1 216 216z" />
									</svg>
								}
								text="Mac App Store"
								href={appStoreId}
							/>
						)}
						{sourceCode && (
							<IconButton
								icon={
									<svg
										width="98"
										height="96"
										viewBox="0 0 96 96"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											clipRule="evenodd"
											d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z"
											fill="currentColor"
										/>
									</svg>
								}
								text="Source Code"
								href={sourceCode}
							/>
						)}
					</div>
					{price && (
						<div className="cluster">
							<small className="chip">One–Time Purchase</small>
							<small className="chip">Unlimited Devices</small>
							<small className="chip">macOS Big Sur and Later</small>
						</div>
					)}
				</div>
				{content && (
					<div
						className="editorial center"
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				)}
				{primaryFeatures.length > 0 && (
					<>
						<h2 className="sr-only">Main Features</h2>
						<div className="center stack">
							{primaryFeatures.map(
								({ title, text, image: { responsiveImage } }) => (
									<section key={title} className="primary-feature stack">
										<div
											className="text stack"
											style={{ "--space": "var(--size-1)" }}
										>
											<h3>{title}</h3>
											<div dangerouslySetInnerHTML={{ __html: text }} />
										</div>
										<div className="full">
											<Image data={responsiveImage} />
										</div>
									</section>
								)
							)}
						</div>
					</>
				)}
				{secondaryFeatures.length > 0 && (
					<>
						<h2 className="sr-only">Other Features</h2>
						<ul className="secondary-features center">
							{secondaryFeatures.map(({ text }) => (
								<li key={text}>{text}</li>
							))}
						</ul>
					</>
				)}
			</div>
		</>
	);
}
