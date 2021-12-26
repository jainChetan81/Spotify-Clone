import { HeartIcon, HomeIcon, LibraryIcon, PlusCircleIcon, RssIcon, SearchIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
	const { data: session, status } = useSession();
	return (
		<div className="text-gray-500 p-5 text-sm border-gray-900 border-r text-left">
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
				<p className="cursor-pointer hover:text-white">Playlist name...</p>
				<p className="cursor-pointer hover:text-white">Playlist name...</p>
				<p className="cursor-pointer hover:text-white">Playlist name...</p>
				<p className="cursor-pointer hover:text-white">Playlist name...</p>
				<p className="cursor-pointer hover:text-white">Playlist name...</p>
				<p className="cursor-pointer hover:text-white">Playlist name...</p>
				<p className="cursor-pointer hover:text-white">Playlist name...</p>
				<p className="cursor-pointer hover:text-white">Playlist name...</p>
				<p className="cursor-pointer hover:text-white">Playlist name...</p>
			</ul>
		</div>
	);
};

export default Sidebar;
