import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import getProjects from '../getProjects';
import thumb from '../../public/thumb.jpg';
import { cwd } from 'process';
import { join } from 'path';
import parseMarkdownFile from '../parseMarkdownFile';
import DefaultHead from '../DefaultHead';

export default function About(
	props: InferGetStaticPropsType<typeof getStaticProps>
) {
	return (
		<div className="about end-mark">
			<DefaultHead title="About" />
			<h1 className="sr-only">About</h1>
			<div className="editorial">
				<div dangerouslySetInnerHTML={{ __html: props.data.about }} />
				<h2>Colophon</h2>
				<div dangerouslySetInnerHTML={{ __html: props.data.colophon }} />
			</div>
		</div>
	);
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
	const { content: about } = parseMarkdownFile(join(cwd(), 'public/about.md'));
	const { content: colophon } = parseMarkdownFile(
		join(cwd(), 'public/colophon.md')
	);
	return {
		props: {
			data: { about, colophon },
		},
	};
};
