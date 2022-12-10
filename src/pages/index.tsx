import type { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import Image from "next/image";
import Link from "next/link";
import DefaultHead from "../DefaultHead";
import getApps from "../server/getApps";

export default function Home(
	props: InferGetStaticPropsType<typeof getStaticProps>
) {
	return (
		<>
			<DefaultHead title="Home" />
			<h1 className="sr-only">Home Page</h1>
			<div className="home stack">
				<p className="intro center and-text">
					Visual communications designer and developer. Check out my apps:
				</p>
				<div className="center">
					<ul className="stack">
						{props.data.map(({ title, slug, subtitle, icon }) => (
							<div key={title} className="card card-ui app-card">
								<div>
									<div className="title-container">
										<h2>
											<Link className="app-name" href={slug}>
												{title}
											</Link>
										</h2>
										<small className="chip orange">New</small>
									</div>
									<p className="app-subtitle">{subtitle}</p>
								</div>
								<div className="next-img-container">
									<Image
										className="icon"
										src={icon}
										alt={`Icon of ${title}`}
										width={1024}
										height={1024}
									/>
								</div>
							</div>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}

export const getStaticProps = async (ctx: GetStaticPropsContext) => {
	return {
		props: {
			data: getApps.paths().map((x) => getApps.props(x.shortSlug)),
		},
	};
};
