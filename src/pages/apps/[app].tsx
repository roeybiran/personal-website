import type {
	GetStaticPropsContext,
	GetStaticPaths,
	InferGetStaticPropsType,
} from "next";
import getApps from "../../server/getApps";
import Image from "next/image";
import DefaultHead from "../../DefaultHead";
import If from "../../utils/If";

export default function app({
	data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { title, subtitle, icon, app_store, github, content } = data;
	return (
		<>
			<DefaultHead title={title} description={subtitle} />
			<div className="app-page">
				<div className="stack center intrinsic and-text">
					<Image src={icon} alt="" width={256} height={256} />
					<div>
						<h1>{title}</h1>
						<p className="subtitle">{subtitle}</p>
					</div>
					{app_store && (
						<a href={app_store!}>
							<Image
								src="/app_store_badge.svg"
								width={165}
								height={40}
								alt="App Store badge"
							/>
						</a>
					)}
					{github && <a href={github!}>Source on GitHub</a>}
				</div>
				<div
					className="editorial mixed-bleed"
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			</div>
		</>
	);
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const app = getApps.props(params!.app as string);

	return {
		props: {
			data: app,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	return {
		paths: getApps.paths().map((x) => ({
			params: {
				app: x.shortSlug,
			},
		})),
		fallback: false,
	};
};
