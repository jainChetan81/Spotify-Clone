import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import spotifyAPI from "../lib/spotify";
import type { SessionType } from "../types";

const useSpotify = () => {
	const { data: session }: SessionType = useSession();
	useEffect(() => {
		if (session) {
			//if refresh access token attempt fails, direct user to login
			if (session.error === "RefreshAccessTokenError") {
				signIn();
			}
			spotifyAPI.setAccessToken(session.userAccessToken);
		}
	}, [session]);
	return spotifyAPI;
};

export default useSpotify;
