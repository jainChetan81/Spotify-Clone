import { HeartIcon, HomeIcon, LibraryIcon, PlusCircleIcon, RssIcon, SearchIcon, XIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtoms";
import { useSpotify } from "../hooks";
import type { PlaylistObjectSimplified } from "../types";

const Sidebar = () => {
	const spotifyAPI = useSpotify();
	const { data: session, status } = useSession();
	const [playlist, setPlaylist] = useState<PlaylistObjectSimplified[]>([]);
	const [currentPlaylistId, setCurrentPlaylistId] = useRecoilState<string>(playlistIdState);
	const [showSidebar, setShowSidebar] = useState(false);

	useEffect(() => {
		if (spotifyAPI.getAccessToken()) {
			spotifyAPI.getUserPlaylists().then((res) => {
				return setPlaylist(res.body.items);
			});
		}
	}, [session, spotifyAPI]);

	return (
		<>
			{showSidebar ? (
				<button
					className="flex text-4xl text-white items-center cursor-pointer fixed left-2 top-2 z-30"
					onClick={() => setShowSidebar(!showSidebar)}>
					<XIcon className="h-10 w-10 font-bold text-white" />
				</button>
			) : (
				<svg
					onClick={() => setShowSidebar(!showSidebar)}
					className="fixed z-30 flex items-center cursor-pointer left-2 top-4"
					fill="#fff"
					viewBox="0 0 100 80"
					width="40"
					height="25">
					<rect width="100" height="10"></rect>
					<rect y="30" width="100" height="10"></rect>
					<rect y="60" width="100" height="10"></rect>
				</svg>
			)}
			<div
				className={`text-gray-500 p-5 pt-14 fixed top-0 left-0  bg-black z-10 border-gray-900 border-r text-left overflow-y-scroll scrollbar-hide h-screen min-w-[230px] lg:text-sm text-xs max-w-[15rem] ease-in-out duration-300 ${
					showSidebar ? "translate-x-0 " : "translate-x-[-100%]"
				}`}>
				<ul className="space-y-4">
					<hr className="border-t-[0.1px] border-gray-900" />
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
		</>
	);
};

export default Sidebar;
