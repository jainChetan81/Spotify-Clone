import Head from "next/head";
import PropTypes from "prop-types";
import { Sidebar } from ".";
import { LayoutType } from "../types";

function Home({ title, keywords, description, children }: LayoutType) {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="keywords" content={keywords} />
				<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="manifest" href="manifest.json" />
			</Head>

			<div className="bg-black h-screen overflow-hidden">{children}</div>
		</>
	);
}
Home.defaultProps = {
	title: "Spotify Clone",
	description: "A Clone of Spotify",
	keywords: "[NextJs, Spotify, Tailwind, NextAuth, Recoil]",
};
Home.propTypes = {
	title: PropTypes.string,
	description: PropTypes.string,
	keywords: PropTypes.string,
};
export default Home;
