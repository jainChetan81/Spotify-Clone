import { useRecoilValue } from "recoil";
import { SongItem } from ".";
import { playlistState } from "../atoms/playlistAtoms";
import type { PlaylistTrackObject, SinglePlaylistResponse } from "../types";

const Songs = () => {
	const playList = useRecoilValue<SinglePlaylistResponse>(playlistState);
	return (
		<ul className="px-2 md:px-8 flex flex-col space-y-1">
			{playList?.tracks?.items.map((item: PlaylistTrackObject, i: number) => (
				<SongItem key={item.track?.id + i} song={item} order={i} />
			))}
		</ul>
	);
};

export default Songs;
