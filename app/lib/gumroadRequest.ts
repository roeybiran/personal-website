export default async function gumroadRequest() {
	const finbarProductID = "";
	const gumroadEndpoint = "https://api.gumroad.com/v2/products";
	const url = new URL(`${gumroadEndpoint}/${finbarProductID}`);
	url.searchParams.append(
		"access_token",
		`${process.env.GUMROAD_ACCESS_TOKEN}`
	);

	const _app = await fetch(url).then((r) => r.json());

	console.log(_app);
}
