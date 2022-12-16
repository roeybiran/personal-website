export default function SiteFooter({
	links,
	notice,
}: {
	links: { key: string; value: string }[];
	notice: string;
}) {
	return (
		<footer className="site-footer">
			<div
				className="center and-text intrinsic stack"
				style={{ "--space": "var(--size-1)" }}
			>
				<ul className="links cluster">
					{links.map(({ key, value }) => (
						<li key={value}>
							<a href={value}>{key}</a>
						</li>
					))}
				</ul>
				<p className="copyright">{notice}</p>
			</div>
		</footer>
	);
}
