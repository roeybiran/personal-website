import { useLoaderData } from "@remix-run/react";
import datoRequest from "~/lib/datoRequest";

export const loader = async () => {
	const {
		about: { text, title },
	} = await datoRequest(`
	{
		about {
			title
			text(markdown: true)
		}
	}
	`);

	return {
		text,
		title,
	};
};

export default function About() {
	const { text, title } = useLoaderData<typeof loader>();

	return (
		<>
			<h1 className="sr-only">{title}</h1>
			<div
				className="editorial center"
				dangerouslySetInnerHTML={{ __html: text }}
			/>
		</>
	);
}
