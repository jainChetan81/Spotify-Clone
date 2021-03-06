import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="manifest" href="/manifest.json" />
					<link rel="apple-touch-icon" href="/oo" />
					<meta name="theme-color" content="#ffffff" />
					<meta name="msapplication-TileColor" content="#2B5797" />
					<meta name="msapplication-tap-highlight" content="no" />
					<meta name="format-detection" content="telephone=no" />
					<meta name="mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-status-bar-style" content="default" />
					<meta name="apple-mobile-web-app-title" content="Spotify Clone" />
					<link
						rel="apple-touch-icon"
						href="https://ik.imagekit.io/clhowstalgz/spotify.png?tr=w-212,h-212,f-png"
					/>
					<link
						rel="shortcut icon"
						href="https://ik.imagekit.io/clhowstalgz/spotify.png?tr=w-212,h-212,f-png"
					/>
					<meta name="twitter:card" content="summary" />
					<meta name="twitter:url" content="https://type-script-next-pwa.vercel.app" />
					<meta name="twitter:title" content="Spotify Clone" />
					<meta name="twitter:description" content="Spotify Clone by Next js created by Chetan Jain" />
					<meta
						name="twitter:image"
						content="https://ik.imagekit.io/clhowstalgz/spotify.png?tr=w-212,h-212,f-png"
					/>
					<meta name="twitter:creator" content="@jainChetan81" />
					<meta property="og:type" content="website" />
					<meta property="og:title" content="Spotify Clone" />
					<meta property="og:description" content="Spotify Clone by Next js created by Chetan Jain" />
					<meta property="og:site_name" content="Spotify Clone" />
					<meta property="og:url" content="https://type-script-next-pwa.vercel.app" />
					<meta
						property="og:image"
						content="https://ik.imagekit.io/clhowstalgz/spotify.png?tr=w-212,h-212,f-png"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
					<div id="modal-root" />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
