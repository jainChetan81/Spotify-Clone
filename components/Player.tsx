import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState} from "recoil";
import type SpotifyWebApi from "spotify-web-api-node";
import { playlistState } from "../atoms/playlistAtoms";
import { useSongInfo, useSpotify } from "../hooks";
import { Response, SinglePlaylistResponse } from "../types";
import Image from "next/image";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import { PauseIcon, PlayIcon, ReplyIcon, SwitchHorizontalIcon } from "@heroicons/react/outline";
import { FastForwardIcon, RewindIcon } from "@heroicons/react/solid";

const Player = () => {
	const spotifyApi: SpotifyWebApi = useSpotify();
	const { data: session, status } = useSession();
	const [playList, setPlaylist] = useRecoilState<SinglePlaylistResponse>(playlistState);
	const [currentTrackId, setCurrentTrackId] = useRecoilState<string | null>(currentTrackIdState);
	const [isPlaying, setIsPlaying] = useRecoilState<boolean>(isPlayingState);
	const [volume, setVolume] = useState<number>(50);
	const songInfo: SpotifyApi.SingleTrackResponse | null = useSongInfo();

	const handlePlayPause = () => {
		spotifyApi.getMyCurrentPlaybackState().then((res: Response<SpotifyApi.CurrentPlaybackResponse>) => {
			if (res.body.is_playing) {
				spotifyApi.pause();
				setIsPlaying(false);
			} else {
				spotifyApi.play();
				setIsPlaying(true);
			}
		});
	};

	const fetchCurrentSong = () => {
		if (!songInfo) {
			spotifyApi.getMyCurrentPlayingTrack().then((data: Response<SpotifyApi.CurrentlyPlayingResponse>) => {
				setCurrentTrackId(data.body?.item?.id || null);
				spotifyApi.getMyCurrentPlaybackState().then((data: Response<SpotifyApi.CurrentPlaybackResponse>) => {
					setIsPlaying(data.body?.is_playing || false);
					setVolume(data.body?.device?.volume_percent || 50);
				});
			});
		}
	};

	useEffect(() => {
		if (spotifyApi.getAccessToken() && !currentTrackId) {
			fetchCurrentSong();
		}
	}, [currentTrackId, spotifyApi, session]);
	return (
		<div className="sticky bottom-0 z-30 text-white ">
			{songInfo && (
				<div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid grid-cols-3 text-xs md:text-base px-2 md:px-8">
					<div className="flex items-center space-x-4">
						<figure className="hidden md:inline h-10 w-10">
							<Image
								src={
									songInfo?.album?.images?.[0].url ||
									"https://ik.imagekit.io/clhowstalgz/songs.jpg?tr=w-40,h-40"
								}
								height={40}
								width={40}
								alt={songInfo?.album?.name || "unknown album"}
								className="rounded-full"
							/>
						</figure>
						<div>
							<h3 className="w-40 lg:w-80 truncate">{songInfo?.name}</h3>
							<p>{songInfo?.artists?.[0].name}</p>
						</div>
					</div>
					<div className="flex items-center justify-evenly">
						<SwitchHorizontalIcon className="button" />
						<RewindIcon onClick={() => spotifyApi.skipToPrevious()} className="button" />
						{isPlaying ? (
							<PauseIcon onClick={handlePlayPause} className="button w-10 h-10" />
						) : (
							<PlayIcon className="button w-10 h-10" onClick={handlePlayPause} />
						)}
						<FastForwardIcon onClick={() => spotifyApi.skipToNext()} className="button" />
						<ReplyIcon className="button" />
					</div>
				</div>
			)}
		</div>
	);
};

export default Player;
