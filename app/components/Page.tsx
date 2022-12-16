type PageProps = {
	header: string;
	subheader?: string;
	body?: string;
	archive?: React.ReactNode;
};

export default function Page({ header, subheader, body, archive }: PageProps) {
	return (
		<div className="stack">
			<div className="center">
				<h1 className="sr-only">{header}</h1>
				{subheader && <p>{subheader}</p>}
				{body && (
					<div
						className="editorial"
						dangerouslySetInnerHTML={{ __html: body }}
					/>
				)}
			</div>
			{archive}
		</div>
	);
}
