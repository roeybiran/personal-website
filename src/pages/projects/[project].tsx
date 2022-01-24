import type {
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import DefaultHead from '../../DefaultHead';
import getProjects from '../../getProjects';
import If from '../../If';

export default function Project({
	data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<div className="project-page stack">
			<DefaultHead title={data.title} description={data.subtitle} />

			<div
				className="sidebar"
				style={{
					'--side-width': '30ch',
					'--space': 'var(--space-m)',
				}}
			>
				<div>
					<div className="nimg-container">
						<Image src={data.image} layout="fill" alt="" objectFit="cover" />
					</div>
					<div>
						<div>
							<h1>{data.title}</h1>
							<p
								className="subtitle"
								dangerouslySetInnerHTML={{ __html: data.subtitle }}
							/>
						</div>
						<h2 className="sr-only">Information</h2>
						<ul
							className="meta stack"
							style={{ '--space': 'var(--space-3xs)' }}
						>
							<li>{data.type}</li>
							<ul className="resp">
								{data.responsibilities.map((x) => (
									<li key={x} dangerouslySetInnerHTML={{ __html: x }} />
								))}
							</ul>
							<li>{data.date}</li>
							<If this={data.url}>
								<li>
									<Link href={data.url!}>
										<a>Project’s home page</a>
									</Link>
								</li>
							</If>
							<If this={data.github}>
								<li>
									<Link href={data.github!}>
										<a>Source Code</a>
									</Link>
								</li>
							</If>
							<If this={data.press.length}>
								<li>
									Press
									<ul>
										{data.press.map((x) => (
											<li key={x} dangerouslySetInnerHTML={{ __html: x }} />
										))}
									</ul>
								</li>
							</If>
							<li>
								<span className="sr-only">Stack</span>
								<ul className="tech-stack cluster">
									{data.stack.map((x) => (
										<li key={x}>{x}</li>
									))}
								</ul>
							</li>
						</ul>
					</div>
				</div>
				<div>
					<div
						className="editorial"
						dangerouslySetInnerHTML={{ __html: data.content }}
					/>
				</div>
			</div>

			<If this={data.videos.length}>
				<ul>
					{data.videos.map((x) => (
						<li key={x}>
							<figure dangerouslySetInnerHTML={{ __html: x }} />
						</li>
					))}
				</ul>
			</If>
		</div>
	);
}

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
	const project = getProjects().find((x) => {
		return x.shortSlug === params!.project;
	})!;

	return {
		props: {
			data: project,
		},
	};
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
	const paths = getProjects().map((x) => ({
		params: { project: x.shortSlug },
	}));

	return {
		paths,
		fallback: false,
	};
};
