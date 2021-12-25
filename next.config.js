/* eslint-disable no-undef */
const withPWA = require("next-pwa");

module.exports = withPWA({
	pwa: {
		dest: "public",
		register: true,
		skipWaiting: true,
		disable: process.env.NODE_ENV === "development",
	},
	reactStrictMode: true,
	images: {
		domains: ["res.imagekit.io", "assets.pokemon.com"],
		// loader: "default",//default, imgix, cloudinary, akamai, custom
		// path: "/",
		minimumCacheTTL: 3600,
		disableStaticImages: true,
	},
	swcMinify: true,
	webpack5: true,
});
