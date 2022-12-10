import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import parseMarkdownFile from "../server/parseMarkdownFile";
import { cwd } from "process";
import { join } from "path";
import DefaultHead from "../DefaultHead";

export default function About(
	props: InferGetStaticPropsType<typeof getStaticProps>
) {
	return (
		<div className="about">
			<DefaultHead title="About" />
			<h1 className="sr-only">About</h1>
			<div
				className="editorial mixed"
				dangerouslySetInnerHTML={{ __html: props.data.about }}
			/>
		</div>
	);
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
	const { content: about } = parseMarkdownFile(join(cwd(), "public/about.md"));
	return {
		props: {
			data: { about },
		},
	};
};
