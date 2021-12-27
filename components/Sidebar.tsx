import { HeartIcon, HomeIcon, LibraryIcon, PlusCircleIcon, RssIcon, SearchIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useSpotify } from "../hooks";
import { PlaylistObjectSimplified } from "../types";

const Sidebar = () => {
	const spotifyAPI = useSpotify();
	const { data: session, status } = useSession();
	const [playlist, setPlaylist] = useState<PlaylistObjectSimplified[]>([]);
	const [currentPlaylistId, setCurrentPlaylistId] = useState<string>("");

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			console.log("here");
			spotifyAPI.getUserPlaylists().then((res) => {
				return setPlaylist(res.body.items);
			});
		}
	}, [session, spotifyAPI]);

	return (
		<div className="text-gray-500 p-5 text-sm border-gray-900 border-r text-left overflow-y-scroll scrollbar-hide h-screen">
			<ul className="space-y-4">
				<li>
					<button className="flex items-center space-x-2 hover:text-white" onClick={() => signOut()}>
						<HomeIcon className="h-5 w-5" />
						<p>Logout</p>
					</button>
				</li>
				<li>
					<button className="flex items-center space-x-2 hover:text-white">
						<HomeIcon className="h-5 w-5" />
						<p>Home</p>
					</button>
				</li>
				<li>
					<button className="flex items-center space-x-2 hover:text-white">
						<SearchIcon className="h-5 w-5" />
						<p>Search</p>
					</button>
				</li>
				<li>
					<button className="flex items-center space-x-2 hover:text-white">
						<LibraryIcon className="h-5 w-5" />
						<p>Your Libraries</p>
					</button>
				</li>
				<hr className="border-t-[0.1px] border-gray-900" />
				<li>
					<button className="flex items-center space-x-2 hover:text-white">
						<PlusCircleIcon className="h-5 w-5" />
						<p>Create Playlist</p>
					</button>
				</li>
				<li>
					<button className="flex items-center space-x-2 hover:text-white">
						<HeartIcon className="h-5 w-5" />
						<p>Your Libraries</p>
					</button>
				</li>
				<li>
					<button className="flex items-center space-x-2 hover:text-white">
						<RssIcon className="h-5 w-5" />
						<p>Your Episodes</p>
					</button>
				</li>
				<hr className="border-t-[0.1px] border-gray-900" />
				{playlist.map((playlist: PlaylistObjectSimplified) => (
					<li
						key={playlist.id}
						onClick={() => setCurrentPlaylistId(playlist.id)}
						className="cursor-pointer hover:text-white">
						{playlist.name}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Sidebar;
