import type {
	GetStaticPropsContext,
	GetStaticPaths,
	InferGetStaticPropsType,
} from 'next';
import getApps from '../../getApps';
import Image from 'next/image';
import DefaultHead from '../../DefaultHead';
import If from '../../If';

export default function app({
	data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	const { title, subtitle, icon, app_store_badge, github, content } = data;
	return (
		<div className="app-page">
			<DefaultHead title={title} description={subtitle} />
			<div
				className="stack recursive"
				style={{ '--space': 'var(--space-2xs)' }}
			>
				<div className="center intrinsic and-text">
					<Image src={icon} alt="" width={256} height={256} />
					<h1>{title}</h1>
					<p>{subtitle}</p>
					<If this={app_store_badge}>
						<div dangerouslySetInnerHTML={{ __html: app_store_badge! }} />
					</If>
					<If this={github}>
						<a href={github!}>Source on GitHub</a>
					</If>
				</div>
			</div>
			<div
				className="editorial center"
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</div>
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
