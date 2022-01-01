import { ChevronDownIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistState, playlistIdState } from "../atoms/playlistAtoms";
import { useSpotify } from "../hooks";
import { Response, SinglePlaylistResponse } from "../types";
import { Songs } from ".";
import type SpotifyWebApi from "spotify-web-api-node";
import { isLoadingHOC } from "../hoc";

const colors: string[] = [
	"from-indigo-500",
	"from-blue-500",
	"from-green-500",
	"from-red-500",
	"from-yellow-500",
	"from-pink-500",
	"from-purple-500",
];

type Props = {
	setLoading: (loading: boolean) => void;
};
const Center: FC<Props> = ({ setLoading }): JSX.Element => {
	const { data: session } = useSession();
	const { image, name } = session?.user || {};
	const currentPlaylistId = useRecoilValue<string>(playlistIdState);
	const [playList, setPlaylist] = useRecoilState<SinglePlaylistResponse>(playlistState);
	const [color, setColor] = useState<string>("");
	const spotifyApi: SpotifyWebApi = useSpotify();
	useEffect(() => {
		setColor(shuffle(colors)[0]);
	}, [currentPlaylistId]);

	useEffect(() => {
		setLoading(true);
		spotifyApi
			.getPlaylist(currentPlaylistId)
			.then((res: Response<SinglePlaylistResponse>) => {
				setPlaylist(res.body);
				setLoading(false);
			})
			.catch((e: Error) => {
				console.error("Could not get playlist", e);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [spotifyApi, currentPlaylistId]);
	return (
		<div className="flex-grow text-white h-screen overflow-y-scroll">
			<header className="absolute top-5 right-8">
				<div
					className="flex items-center bg-black space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2"
					onClick={() => signOut()}>
					<Image
						src={
							image || "https://doodleipsum.com/40x40/avatar?bg=D96363&i=6c1d81eb757d911acaef34ead7dfd392"
						}
						alt={name || "unknown user"}
						height={40}
						width={40}
						className="rounded-full w-10 h-10"
					/>
					<h2>{name}</h2>
					<ChevronDownIcon className="button" />
				</div>
			</header>
			<section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8 `}>
				<Image
					src={playList?.images?.[0]?.url || "https://ik.imagekit.io/clhowstalgz/songs.jpg?tr=w-176,h-176"}
					alt={playList.name}
					className="h-44 w-44 shadow-2xl rounded-xl"
					height={176}
					width={176}
				/>
				<aside className="inline text-left">
					<p>PLAYLIST</p>
					<h1 className="text-2xl md:text-3xl xl:text-5xl font-bold">{playList?.name}</h1>
				</aside>
			</section>
			<div>
				<Songs />
			</div>
		</div>
	);
};
export default isLoadingHOC(Center, "Please wait as we load your data.");
