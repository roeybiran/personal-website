import matter from "gray-matter";
import { marked } from "marked";
import { readFileSync } from "fs";

export default function parseMarkdownFile(path: string) {
	const md = readFileSync(path);
	const parsed = matter(md);
	return {
		data: parsed.data,
		content: marked(parsed.content),
	};
}
