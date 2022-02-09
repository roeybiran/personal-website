import 'sanitize.css/assets.css';
import 'sanitize.css/forms.css';
import 'sanitize.css/reduce-motion.css';
import 'sanitize.css/sanitize.css';
import 'sanitize.css/system-ui.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/ui-monospace.css';

import '../styles/utopia.css';
import '../styles/globals.css';
import '../styles/colors.css';
import '../styles/mixed-bleed.css';
import '../styles/card.css';
import '../styles/home.scss';
import '../styles/app-page.scss';
import '../styles/projects.scss';
import '../styles/site-header.scss';
import '../styles/site-footer.scss';
import '../styles/editorial.scss';
import '../styles/project-page.scss';
import '../styles/about.scss';
import '../styles/cv.scss';
import '../styles/every-layout-css/box.css';
import '../styles/every-layout-css/center.css';
import '../styles/every-layout-css/cluster.css';
import '../styles/every-layout-css/cover.css';
import '../styles/every-layout-css/frame.css';
import '../styles/every-layout-css/grid.css';
import '../styles/every-layout-css/icon.css';
import '../styles/every-layout-css/imposter.css';
import '../styles/every-layout-css/reel.css';
import '../styles/every-layout-css/sidebar.css';
import '../styles/every-layout-css/stack.css';
import '../styles/every-layout-css/switcher.css';

import type { AppProps } from 'next/app';
import SiteHeader from '../SiteHeader';
import SiteFooter from '../SiteFooter';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<SiteHeader />
			<main>
				<Component {...pageProps} />
			</main>
			<SiteFooter />
		</>
	);
}

export default MyApp;
