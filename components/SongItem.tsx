import { FC } from "react";
import Image from "next/image";
import type { PlaylistTrackObject } from "../types";
import { millisToMinutesAndSeconds } from "../lib/time";
type Props = {
	song: PlaylistTrackObject;
	order: number;
};
const SongItem: FC<Props> = ({ song, order }) => {
	return (
		<li className="grid grid-cols-2 text-gray-500">
			<div className="flex items-center space-x-4">
				<p className="mr-4">{order + 1}</p>
				<Image
					src={song.track?.album.images[0].url || "https://ik.imagekit.io/clhowstalgz/songs.jpg?tr=w-40,h-40"}
					alt={song.track?.name}
					height={40}
					width={40}
					className="rounded w-10 h-10"
				/>
				<aside>
					<p className="w-36 lg:w-64 truncate text-white">{song.track?.name}</p>
					<p>{song.track?.artists[0].name}</p>
				</aside>
			</div>
			<div className="flex items-center justify-between ml-auto md:ml-0">
				<p className="hidden md:block w-40 lg:w-64 truncate">{song.track?.album.name}</p>
				<p className="text-right"> {millisToMinutesAndSeconds(song.track?.duration_ms)}</p>
			</div>
		</li>
	);
};

export default SongItem;
