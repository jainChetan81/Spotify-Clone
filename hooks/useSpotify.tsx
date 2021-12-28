import { Session } from "next-auth";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import spotifyAPI from "../lib/spotify";
type Props =
	| { data: Session; status: "authenticated" }
	| { data: null; status: "loading" }
	| { data: Session; status: "authenticated" }
	| { data: null; status: "loading" | "unauthenticated" };
const useSpotify = () => {
	const { data: session }: Props = useSession();
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
