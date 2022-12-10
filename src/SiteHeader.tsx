import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import memoji from "../public/memoji.png";

const menu = [
	["/", "Apps"],
	["/projects", "Projects"],
	["/about", "About"],
];

export default function SiteHeader() {
	const { pathname } = useRouter();

	return (
		<header className="site-header">
			<div className="logo card">
				<div className="image-container">
					<Image src={memoji} alt="Memoji of Roey Biran" />
				</div>
				<div>
					<Link href="/">Roey Biran</Link>
					<p>Designer + Developer</p>
				</div>
			</div>
			<nav>
				<ul>
					{menu.map(([url, label]) => (
						<li key={url}>
							<Link href={url} aria-current={pathname === url ? "page" : false}>
								{label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
