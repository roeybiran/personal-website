import { readdirSync } from 'fs';
import { join } from 'path';
import { cwd } from 'process';
import parseMarkdownFile from './parseMarkdownFile';

export type App = {
	data: {
		title: string;
		subtitle: string;
		github?: string;
		icon: string;
		app_store_badge?: string;
	};
	content: string;
};

const baseDir = '/apps';
const basePath = join(cwd(), 'public', baseDir);

const getApps = {
	paths: () => {
		return readdirSync(basePath)
			.filter((x) => x !== '.DS_Store')
			.map((folder) => {
				return {
					shortSlug: folder,
					slug: join(baseDir, folder),
				};
			});
	},
	props: (slug: string) => {
		const fullPath = join(basePath, slug);
		const icon = join(baseDir, slug, 'icon.png');
		const md = parseMarkdownFile(join(fullPath, 'about.md'));
		const project = { content: md.content, data: md.data } as App;

		const github = project.data.github
			? `https://github.com/${project.data.github}`
			: null;

		return {
			...project.data,
			github,
			content: project.content,
			icon,
			shortSlug: slug,
			slug: join(baseDir, slug),
		};
	},
};

export default getApps;
