import { readdirSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import parseMarkdownFile from "./parseMarkdownFile";

export type AppFrontMatter = {
	data: {
		title: string;
		subtitle: string;
		github?: string;
		icon: string;
		app_store?: string;
		big_features: {
			title: string;
			text: string;
		}[];
	};
	content: string;
};

const baseDir = "/apps";
const basePath = join(cwd(), "public", baseDir);

const getApps = {
	paths: () => {
		return readdirSync(basePath)
			.filter((x) => x !== ".DS_Store")
			.map((folder) => {
				return {
					shortSlug: folder,
					slug: join(baseDir, folder),
				};
			});
	},
	props: (slug: string) => {
		const fullPath = join(basePath, slug);
		const icon = join(baseDir, slug, "icon.png");
		const md = parseMarkdownFile(join(fullPath, "about.md"));
		const project = { content: md.content, data: md.data } as AppFrontMatter;

		const github = project.data.github
			? `https://github.com/${project.data.github}`
			: null;

		return {
			...project.data,
			github,
			content: project.content,
			icon,
			shortSlug: slug,
			bigFeatures: project.data.big_features ?? [],
			slug: join(baseDir, slug),
		};
	},
};

export default getApps;
