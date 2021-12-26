import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import SpotifyAPI, { LOGIN_URL } from "../../../lib/spotify";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { JWT_INTERFACE, RefreshAccessTokenResponse, Response, SESSION_INTERFACE } from "../../../types";

async function refreshAccessToken(token: any) {
	try {
		SpotifyAPI.setAccessToken(token.accessToken);
		SpotifyAPI.setAccessToken(token.refreshToken);

		const { body: refreshedToken }: Response<RefreshAccessTokenResponse> = await SpotifyAPI.refreshAccessToken();

		console.log("Refreshed token is", refreshedToken);

		return {
			...token,
			accessToken: refreshedToken.access_token,
			accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
			refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
		};
	} catch (error) {
		console.error(error);

		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
}

export default NextAuth({
	providers: [
		SpotifyProvider({
			clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
			clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
			authorization: LOGIN_URL,
		}),
	],
	secret: process.env.JWT_SECRET,
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async jwt({ token, account, user }: JWT_INTERFACE) {
			// Initial Sign In
			if (account && user) {
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires: account.expires_at * 1000, //converting milliseconds to seconds
				};
			}

			// Return previous token if the access token hasn't expired yet
			if (Date.now() < token.accessTokenExpires) {
				console.log("Token is valid ...");
				return token;
			}

			// Access Token expired, so refresh it...token
			console.log("Token expired, refreshing...");
			return await refreshAccessToken(token);
		},

		async session({ session, token }: SESSION_INTERFACE): Promise<Session> {
			session.user.accessToken = token.accessToken;
			session.user.refreshToken = token.refreshToken;
			session.user.username = token.username;

			return session;
		},
	},
});
