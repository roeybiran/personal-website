import { Link, NavLink } from "@remix-run/react";
import React from "react";

type Props = {
	name: string;
	tagline: string;
	menu: string[][];
	avatar: React.ReactNode;
};

export default function SiteHeader({ name, tagline, menu, avatar }: Props) {
	return (
		<header className="site-header">
			<div className="masthead card">
				<div className="image-container">{avatar}</div>
				<div>
					<Link to="/">{name}</Link>
					<p>{tagline}</p>
				</div>
			</div>
			<nav>
				<ul>
					{menu.map(([url, label]) => (
						<li key={url}>
							<NavLink to={url}>{label}</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
