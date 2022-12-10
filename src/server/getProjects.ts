import { readdirSync } from "fs";
import { join } from "path";
import { cwd } from "process";
import parseMarkdownFile from "./parseMarkdownFile";

export type ProjectFrontMatter = {
	data: {
		title: string;
		subtitle: string;
		links: { [k: string]: string }[];
		type: string;
		responsibilities: string[];
		date: string;
		stack: string[];
		image: string;
		press: { [k: string]: string }[];
		videos?: string[];
	};
	content: string;
};

export default function getProjects() {
	const baseDir = "/projects";
	const basePath = join(cwd(), "public", baseDir);
	return readdirSync(basePath)
		.filter((x) => x !== ".DS_Store")
		.map((folder) => {
			const fullPath = join(basePath, folder);
			const image = join(baseDir, folder, "img.jpg");
			const logo = join(baseDir, folder, "logo.svg");

			const md = parseMarkdownFile(join(fullPath, "about.md"));

			const project = {
				content: md.content,
				data: md.data,
			} as ProjectFrontMatter;

			const links = project.data.links
				.map((link) => {
					const [[key, value]] = Object.entries(link);
					if (key === "github") {
						return { label: "Source code", url: `https://github.com/${value}` };
					} else if (key === "url") {
						return { label: "Home page", url: value };
					} else {
						return { label: key, url: value };
					}
				})
				.sort((a, b) => a.label.localeCompare(b.label));

			return {
				...project.data,
				date: new Date(project.data.date),
				press: Object.entries(project.data.press ?? {}).map(
					([key, value]) => `<a href=${value}>${key}</a>`
				),
				links,
				responsibilities: project.data.responsibilities.sort(),
				stack: project.data.stack.sort(),
				content: project.content,
				image,
				logo,
				shortSlug: folder,
				slug: join(baseDir, folder),
				videos: project.data.videos ?? [],
			};
		})
		.sort((a, b) => b.date.getTime() - a.date.getTime())
		.map((x) => ({
			...x,
			date: x.date.toLocaleDateString(undefined, {
				month: "long",
				year: "numeric",
			}),
		}));
}
