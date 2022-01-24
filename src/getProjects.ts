import { readdirSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import parseMarkdownFile from './parseMarkdownFile';

export type Project = {
	data: {
		title: string;
		subtitle: string;
		github?: string;
		url?: string;
		type: string;
		responsibilities: string[];
		date: string;
		stack: string[];
		image: string;
		press: { [name: string]: string }[];
		videos?: string[];
	};
	content: string;
};

export default function getProjects() {
	const baseDir = '/projects';
	const basePath = join(cwd(), 'public', baseDir);
	return readdirSync(basePath)
		.filter((x) => x !== '.DS_Store')
		.map((folder) => {
			const fullPath = join(basePath, folder);
			const image = join(baseDir, folder, 'img.jpg');

			const md = parseMarkdownFile(join(fullPath, 'about.md'));

			// const parsed = matter(md);
			const project = { content: md.content, data: md.data } as Project;

			const github = project.data.github
				? `https://github.com/${project.data.github}`
				: null;

			return {
				...project.data,
				date: new Date(project.data.date),
				press: Object.entries(project.data.press ?? {}).map(
					(e) => `<a href=${e[1]}>${e[0]}</a>`
				),
				github,
				responsibilities: project.data.responsibilities.sort(),
				stack: project.data.stack.sort(),
				content: project.content,
				image,
				shortSlug: folder,
				slug: join(baseDir, folder),
				videos: project.data.videos ?? [],
			};
		})
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.map((x) => ({
			...x,
			date: x.date.toLocaleDateString(undefined, {
				month: 'long',
				year: 'numeric',
			}),
		}));
}
