import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import DefaultHead from '../DefaultHead';
import getProjects from '../getProjects';

export default function Projects(
	props: InferGetStaticPropsType<typeof getStaticProps>
) {
	return (
		<div className="projects">
			<DefaultHead title="Projects" />
			<h1 className="sr-only">Projects</h1>
			<ul
				className="grid"
				style={{
					'--minimum': '30ch',
					'--fit': 'auto-fill',
					'--space': 'var(--space-m)',
				}}
			>
				{props.data.map((p) => (
					<li className="card project-card" key={p.title}>
						<div className="text">
							<div
								className="stack split-after"
								style={{
									'--space': 'var(--space-2xs)',
								}}
							>
								<h2>
									<Link href={p.slug}>
										<a>{p.title}</a>
									</Link>
								</h2>
								<h3 className="sr-only">Kind</h3>
								<p className="project-type">{p.type}</p>
								<p
									className="splitter"
									dangerouslySetInnerHTML={{ __html: p.subtitle }}
								/>

								<h3 className="sr-only">Responsibilities</h3>
								<ul className="cluster">
									{p.responsibilities.map((x) => {
										return <li key={x}>{x}</li>;
									})}
								</ul>
							</div>
						</div>

						<figure className="nimg-container">
							<Image src={p.image} alt="" layout="fill" objectFit="cover" />
						</figure>
					</li>
				))}
			</ul>
		</div>
	);
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
	return {
		props: {
			data: getProjects(),
		},
	};
};
