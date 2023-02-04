import { Link, NavLink } from "@remix-run/react";
import React from "react";

type Props = {
	header: string;
	subheader: string;
	navigation: { header: string; slug: string }[];
	avatar: React.ReactNode;
};

export default function SiteHeader({
	header,
	subheader,
	navigation: menu,
	avatar,
}: Props) {
	return (
		<header className="site-header">
			<div className="masthead card">
				<div className="image-container">{avatar}</div>
				<div>
					<Link to="/">{header}</Link>
					<p>{subheader}</p>
				</div>
			</div>
			<nav>
				<ul>
					{menu.map(({ header, slug }) => (
						<li key={slug}>
							<NavLink to={slug}>{header}</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
