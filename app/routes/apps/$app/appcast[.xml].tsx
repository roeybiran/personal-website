import type { LoaderArgs } from "@remix-run/node";

export async function loader({ params: { app } }: LoaderArgs) {
	const { body, ok } = await fetch(
		`${process.env.APPCAST_URL}/${app}/appcast.xml`
	);

	if (!ok) {
		throw new Response("Not Found", { status: 404 });
	}

	return new Response(body, {
		status: 200,
		headers: {
			"Content-Type": "application/xml",
		},
	});
}
