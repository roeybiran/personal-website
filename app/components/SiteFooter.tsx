export default function SiteFooter({
	links,
	notice,
}: {
	links: { label: string; url: string }[];
	notice: string;
}) {
	return (
		<footer className="site-footer">
			<div
				className="center and-text intrinsic stack"
				style={{ "--space": "var(--size-1)" }}
			>
				<ul className="links cluster">
					{links.map(({ label, url }) => (
						<li key={url}>
							<a href={url}>{label}</a>
						</li>
					))}
				</ul>
				<p className="copyright">{notice}</p>
			</div>
		</footer>
	);
}
