import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import DefaultHead from '../DefaultHead';
import getApps from '../getApps';
import { UL } from '../List';

export default function Home(
	props: InferGetStaticPropsType<typeof getStaticProps>
) {
	return (
		<div className="home">
			<DefaultHead title="Home" />
			<h1 className="sr-only">Roey Biran</h1>
			<div className="intro center and-text">
				<p className="">
					Graduate visual communications designer and indie developer. My apps:
				</p>
			</div>
			<div className="center">
				<UL
					iterable={props.data}
					keyedBy={'title'}
					content={(appData) => (
						<div className="card-inner card">
							<div>
								<h2>
									<Link href={appData.slug}>
										<a>{appData.title}</a>
									</Link>
								</h2>
								<p>{appData.subtitle}</p>
							</div>
							<div className="nimg-container">
								<Image
									className="icon"
									src={appData.icon}
									alt={`Icon of ${appData.title}`}
									layout="fill"
									objectFit="contain"
								/>
							</div>
						</div>
					)}
				/>
			</div>
		</div>
	);
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
	return {
		props: {
			data: getApps.paths().map((x) => getApps.props(x.shortSlug)),
		},
	};
};
