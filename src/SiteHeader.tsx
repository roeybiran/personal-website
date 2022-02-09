import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import memoji from '../public/memoji.png';

const menu = [
	['/', 'Apps'],
	['/projects', 'Projects'],
	['/about', 'About'],
];

export default function SiteHeader() {
	const { pathname } = useRouter();

	return (
		<header className="site-header">
			<div
				className="inner center"
				style={{
					'--max': 'var(--max-content-width)',
					'--gutters': 'var(--space-m)',
				}}
			>
				<div className="logo">
					<div className="image-container">
						<Image src={memoji} alt={'Memoji of Roey Biran'} />
					</div>
					<div>
						<p>Roey Biran</p>
						<p>Developer + Designer</p>
					</div>
				</div>
				<nav>
					<ul>
						{menu.map(([url, label]) => (
							<li key={url}>
								<Link href={url}>
									<a aria-current={pathname === url ? 'page' : false}>
										{label}
									</a>
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</header>
	);
}
