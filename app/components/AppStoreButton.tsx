type Props = {
	src: string;
	href: string;
};

export default function AppStoreButton({ src, href }: Props) {
	return (
		<a href={href}>
			<img
				width={165}
				height={40}
				src={src}
				alt="Download on the Mac App Store"
			/>
		</a>
	);
}
