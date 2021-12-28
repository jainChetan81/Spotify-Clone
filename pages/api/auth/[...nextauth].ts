import NextAuth, { Session } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyAPI, { LOGIN_URL } from "../../../lib/spotify";
import type {
	JWT_INTERFACE,
	JWT_X,
	RefreshAccessTokenResponse,
	Response,
	SESSION_INTERFACE,
	TOKEN_INTERFACE,
} from "../../../types";

async function refreshAccessToken(token: JWT_X) {
	try {
		spotifyAPI.setAccessToken(token.accessToken!);
		spotifyAPI.setAccessToken(token.refreshToken!);

		const { body: refreshedToken }: Response<RefreshAccessTokenResponse> = await spotifyAPI.refreshAccessToken();

		return {
			...token,
			accessToken: refreshedToken.access_token,
			accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
			refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
		};
	} catch (error) {
		console.error("Access Token Expired :", error);

		return {
			...token,
			error: "RefreshAccessTokenError",
		};
	}
}

export default NextAuth({
	providers: [
		SpotifyProvider({
			clientId: process.env.NEXT_PUBLIC_CLIENT_ID || "",
			clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET || "",
			authorization: LOGIN_URL,
		}),
	],
	secret: process.env.JWT_SECRET,
	pages: {
		signIn: "/login",
	},
	callbacks: {
		async jwt({ token, account, user }: JWT_INTERFACE): Promise<TOKEN_INTERFACE> {
			// Initial Sign In
			if (account && user) {
				return {
					...token,
					accessToken: account.access_token,
					refreshToken: account.refresh_token,
					username: account.providerAccountId,
					accessTokenExpires: account.expires_at ? account.expires_at * 1000 : 3600, //converting milliseconds to seconds
				};
			}

			// Return previous token if the access token hasn't expired yet
			if (Date.now() < token.accessTokenExpires!) {
				console.info("Token is valid ...");
				return token;
			}

			// Access Token expired, so refresh it...token
			console.info("Token expired, refreshing...");
			return await refreshAccessToken(token);
		},

		async session({ session, token }: SESSION_INTERFACE): Promise<Session> {
			session.userAccessToken = token.accessToken;
			session.userRefreshToken = token.refreshToken;
			session.userName = token.username;

			return session;
		},
	},
});
