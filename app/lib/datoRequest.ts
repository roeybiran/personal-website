export default async function datoRequest(query: string) {
	const endpoint = "https://graphql.datocms.com/";

	try {
		const response = await fetch(endpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${process.env.DATOCMS_READONLY_TOKEN}`,
			},
			body: JSON.stringify({
				query,
			}),
		});

		const json = await response.json();

		return json.data;
	} catch (error) {
		console.error(error);
		return null;
	}
}
