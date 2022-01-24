import Head from 'next/head';

type Props = {
	title: string;
	description?: string;
};

const name = 'Roey Biran';
const prefix = `${name} —`;
const host = 'https://roeybiran.com/';

export default function DefaultHead({
	title,
	description = 'Personal website of indie developer and designer Roey Biran',
}: Props) {
	const _title = `${prefix} ${title}`;
	const descipriton = `${prefix} ${description}`;
	return (
		<Head>
			<title key="title">{_title}</title>
			<meta key="description" name="description" content={descipriton} />
			{/* Essential META Tags */}
			<meta property="og:title" content={_title} />
			<meta property="og:type" content="website" />
			{/* should be 1200x630 */}
			<meta property="og:image" content={`${host}/og.jpg`} />
			<meta property="og:url" content={`${host}`} />
			<meta name="twitter:card" content="summary_large_image" />

			{/* Non-Essential, But Recommended */}
			<meta property="og:description" content={descipriton} />
			{/* <meta property="og:site_name" content="" /> */}
			{/* <meta name="twitter:image:alt" content="" /> */}
		</Head>
	);
}
