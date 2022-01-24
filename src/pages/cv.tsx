import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import getProjects from '../getProjects';
import thumb from '../../public/thumb.jpg';
import { cwd } from 'process';
import { join } from 'path';
import parseMarkdownFile from '../parseMarkdownFile';
import Head from 'next/head';
import DefaultHead from '../DefaultHead';

// https://stackoverflow.com/questions/7131204/html5-resume-semantics/34359562

export default function CV(
	props: InferGetStaticPropsType<typeof getStaticProps>
) {
	return (
		<div className="cv center">
			<DefaultHead title="Résumé" />
			<Head>
				<meta name="robots" content="noindex,nofollow" />
			</Head>
			<h1 className="sr-only">Résumé</h1>
			<div dangerouslySetInnerHTML={{ __html: props.data.about }} />
			<div dangerouslySetInnerHTML={{ __html: props.data.cv }} />
		</div>
	);
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
	const { content: cv } = parseMarkdownFile(join(cwd(), 'public/cv.md'));
	const { content: about } = parseMarkdownFile(join(cwd(), 'public/about.md'));
	return {
		props: {
			data: { cv, about },
		},
	};
};
