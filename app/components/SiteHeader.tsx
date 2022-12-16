import { Link, NavLink } from "@remix-run/react";
import React from "react";

type Props = {
	header: string;
	subheader: string;
	menu: { key: string; value: string }[];
	avatar: React.ReactNode;
};

export default function SiteHeader({ header, subheader, menu, avatar }: Props) {
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
					{menu.map(({ key, value }) => (
						<li key={value}>
							<NavLink to={value}>{key}</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
