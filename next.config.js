/* eslint-disable no-undef */
const withPWA = require("next-pwa");

module.exports = withPWA({
	pwa: {
		dest: "public",
		register: true,
		skipWaiting: true,
		// disable: process.env.NODE_ENV === "development",
	},
	reactStrictMode: true,
	images: {
		domains: [
			"res.imagekit.io",
			"links.papareact.com",
			"doodleipsum.com",
			"platform-lookaside.fbsbx.com",
			"ik.imagekit.io",
			"i.scdn.co",
			"mosaic.scdn.co",
		],
		minimumCacheTTL: 3600,
		disableStaticImages: true,
	},
	swcMinify: true,
	webpack5: true,
});
