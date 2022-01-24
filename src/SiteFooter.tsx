export default function SiteFooter() {
	return (
		<footer className="site-footer">
			<div className="center and-text intrinsic">
				<ul className="links cluster">
					<li>
						<a href="https://github.com/roeybiran">GitHub</a>
					</li>
					<li>
						<a href="https://twitter.com/roeybiran">Twitter</a>
					</li>
					<li>
						<a href="mailto:roeybiran@icloud.com">roeybiran@icloud.com</a>
					</li>
				</ul>
				<p className="copyright">
					Copyright © Roey Biran, {new Date().getFullYear()}
				</p>
			</div>
		</footer>
	);
}
