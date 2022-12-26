import type {
	LinksFunction,
	LoaderFunction,
	MetaFunction,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Image, toRemixMeta } from "react-datocms";
import AppStoreButton from "~/components/AppStoreButton";
import GitHubButton from "~/components/GitHubButton";
import PNGImage from "~/components/PNGImage";
import datoRequest from "~/lib/datoRequest";
import { metaTagsFragment, responsiveImageFragment } from "~/lib/fragments";
import styles from "~/styles/app.css";

export const loader: LoaderFunction = async ({ params: { app: appSlug } }) => {
	return await datoRequest(`
	{
		app(filter: {slug: {eq: "${appSlug}"}}) {
			title
			subtitle
			body(markdown: true)
			seo: _seoMetaTags {
				... metaTagsFragment
			}
			price
			appStoreId
			gumroadId
			info {
				value
			}
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
};

export const links: LinksFunction = () => [{ rel: "stylesheet", href: styles }];

export const meta: MetaFunction = ({
	data: {
		app: { seo },
	},
}) => toRemixMeta(seo);

export default function App() {
	const data = useLoaderData();

	const {
		app: {
			title,
			subtitle,
			icon: { responsiveImage: icon },
			primaryFeatures,
			secondaryFeatures,
			body,
			info,
			price,
			appStoreId,
			gumroadId,
			sourceCode,
		},
	} = data;

	return (
		<>
			<div className="stack">
				<div className="stack center intrinsic and-text">
					<div className="app-icon">
						<PNGImage data={icon} />
					</div>
					<div>
						<h1>{title}</h1>
						<p className="subtitle">{subtitle}</p>
					</div>
					<div className="stack center">
						{gumroadId && (
							<a className="price ctaButton" href={gumroadId}>
								Buy Now for {price}
							</a>
						)}
						{appStoreId && (
							<AppStoreButton
								src="https://www.datocms-assets.com/88073/1672074780-app_store_badge.svg"
								href={appStoreId}
							/>
						)}
						{sourceCode && <GitHubButton href={sourceCode} />}
					</div>
					{price && (
						<ul className="technical-info">
							{info.map(({ value }) => (
								<li key={value}>{value}</li>
							))}
						</ul>
					)}
				</div>
				{body && (
					<div
						className="editorial center"
						dangerouslySetInnerHTML={{ __html: body }}
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
