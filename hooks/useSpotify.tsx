import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import spotifyAPI from "../lib/spotify";
import type { SessionType, SESSION_EXT } from "../types";

const useSpotify = () => {
	const session: SESSION_EXT = useSession().data as SESSION_EXT;
	useEffect(() => {
		if (session) {
			//if refresh access token attempt fails, direct user to login
			if (session.error === "RefreshAccessTokenError") {
				signIn();
			}
			spotifyAPI.setAccessToken(session.userAccessToken!);
		}
	}, [session]);
	return spotifyAPI;
};

export default useSpotify;
