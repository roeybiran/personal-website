import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import DefaultHead from "../DefaultHead";
import getProjects from "../server/getProjects";

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
					"--minimum": "30ch",
					"--fit": "auto-fill",
				}}
			>
				{props.data.map((p) => (
					<li className="card card-ui project-card" key={p.title}>
						<div className="text">
							<div className="stack split-after">
								<div
									className="stack splitter"
									style={{ "--space": "var(--size-1)" }}
								>
									<h2>
										<Link href={p.slug}>{p.title}</Link>
									</h2>
									<h3 className="sr-only">Kind</h3>
									<p className="uppercased">{p.type}</p>
									<p dangerouslySetInnerHTML={{ __html: p.subtitle }} />
								</div>

								<h3 className="sr-only">Responsibilities</h3>
								<ul className="cluster">
									{p.responsibilities.map((x) => (
										<li className="chip" key={x}>
											{x}
										</li>
									))}
								</ul>
							</div>
						</div>

						<figure className="next-img-container">
							<Image src={p.logo} alt={p.title} width={512} height={341} />
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
