import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import type SpotifyWebApi from "spotify-web-api-node";
import { playlistState } from "../atoms/playlistAtoms";
import { useSongInfo, useSpotify } from "../hooks";
import { Response, SinglePlaylistResponse } from "../types";
// import Image from "next/image";
import { currentTrackIdState, isPlayingState } from "../atoms/songAtom";
import {
	PauseIcon,
	PlayIcon,
	ReplyIcon,
	SwitchHorizontalIcon,
	VolumeUpIcon as VolumeDownIcon,
} from "@heroicons/react/outline";
import { VolumeUpIcon } from "@heroicons/react/solid";
import { FastForwardIcon, RewindIcon } from "@heroicons/react/solid";
import { debounce } from "lodash";

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

	useEffect(() => {
		if (volume > 0 && volume < 100) {
			debouncedAdjustVolume(volume);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [volume]);
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const debouncedAdjustVolume = useCallback(
		debounce((volume) => {
			spotifyApi.setVolume(volume);
		}, 500),
		[]
	);

	useEffect(() => {
		const fetchCurrentSong = () => {
			if (!songInfo) {
				spotifyApi.getMyCurrentPlayingTrack().then((data: Response<SpotifyApi.CurrentlyPlayingResponse>) => {
					setCurrentTrackId(data.body?.item?.id || null);
					spotifyApi
						.getMyCurrentPlaybackState()
						.then((data: Response<SpotifyApi.CurrentPlaybackResponse>) => {
							setIsPlaying(data.body?.is_playing || false);
							setVolume(data.body?.device?.volume_percent || 50);
						});
				});
			}
		};
		if (spotifyApi.getAccessToken() && !currentTrackId) {
			fetchCurrentSong();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentTrackId, spotifyApi, session, songInfo]);
	return (
		<div className="sticky bottom-0 z-30 text-white ">
			{songInfo && (
				<div className="h-24 bg-gradient-to-b from-black to-gray-900 text-white grid md:grid-cols-3 grid-cols-2 text-xs md:text-base px-2 md:px-8">
					<div className="flex items-center space-x-4">
						<figure className="hidden md:inline h-10 w-10">
							<img
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
					<div className="items-center hidden md:flex space-x-3 md:space-x-4 justify-end py-5">
						<VolumeDownIcon onClick={() => volume > 0 && setVolume(volume - 10)} className="button" />
						<input
							type="range"
							name="volume"
							id="volume"
							aria-label="range of volume 1-100"
							value={volume}
							min={0}
							max={100}
							onChange={(e) => setVolume(Number(e.target.value))}
						/>
						<VolumeUpIcon onClick={() => volume < 100 && setVolume(volume + 10)} className="button" />
					</div>
				</div>
			)}
		</div>
	);
};

export default Player;
