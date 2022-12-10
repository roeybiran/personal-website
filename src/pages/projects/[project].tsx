import type {
	GetStaticPaths,
	GetStaticPropsContext,
	InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import DefaultHead from "../../DefaultHead";
import getProjects from "../../server/getProjects";

export default function Project({
	data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
	return (
		<>
			<DefaultHead title={data.title} description={data.subtitle} />
			<div className="project-page stack">
				<figure className="next-img-container">
					<Image src={data.image} layout="fill" alt="" objectFit="cover" />
				</figure>
				<div
					className="sidebar"
					style={{
						"--side-width": "30ch",
					}}
				>
					<aside>
						<h1>{data.title}</h1>
						<p
							className="subtitle"
							dangerouslySetInnerHTML={{ __html: data.subtitle }}
						/>
						<dl className="meta">
							<dt>Type</dt>
							<dd>{data.type}</dd>
							<dt>Responsibilities</dt>
							<dd>
								<ul className="cluster">
									{data.responsibilities.map((x) => (
										<li
											className="chip"
											key={x}
											dangerouslySetInnerHTML={{ __html: x }}
										/>
									))}
								</ul>
							</dd>
							<dt>Date</dt>
							<dd>{data.date}</dd>
							<dt>Links</dt>
							<dd>
								<ul>
									{data.links.length > 0 &&
										data.links.map(({ label, url }) => (
											<li key={url}>
												<Link href={url}>{label}</Link>
											</li>
										))}
								</ul>
							</dd>
							{data.press.length > 0 && (
								<>
									<dt>Press</dt>
									<dd>
										<ul>
											{data.press.map((x) => (
												<li key={x} dangerouslySetInnerHTML={{ __html: x }} />
											))}
										</ul>
									</dd>
								</>
							)}
							<dt>Technologies</dt>
							<dd>
								<ul className="cluster">
									{data.stack.map((x) => (
										<li className="chip" key={x}>
											{x}
										</li>
									))}
								</ul>
							</dd>
						</dl>
					</aside>
					<section className="stack">
						<div
							className="editorial"
							dangerouslySetInnerHTML={{ __html: data.content }}
						/>
						{data.videos.length > 0 && (
							<ul>
								{data.videos.map((x) => (
									<li key={x}>
										<figure dangerouslySetInnerHTML={{ __html: x }} />
									</li>
								))}
							</ul>
						)}
					</section>
				</div>
			</div>
		</>
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
