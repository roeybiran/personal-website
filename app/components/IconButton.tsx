type Props = {
	icon: React.ReactNode;
	text: string;
	href: string;
};

export default function IconButton({ icon, text, href }: Props) {
	return (
		<a
			href={href}
			className="icon spaced ctaButton"
			style={{ "--space": "var(--size-2)" }}
		>
			{icon}
			{text}
		</a>
	);
}
