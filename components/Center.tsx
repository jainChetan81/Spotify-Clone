import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";

const colors: string[] = [
	"from-indigo-500",
	"from-blue-500",
	"from-green-500",
	"from-red-500",
	"from-yellow-500",
	"from-pink-500",
	"from-purple-500",
];

const Center = () => {
	const { data: session, status } = useSession();
	const { image, name } = session?.user || {};
	const [color, setColor] = useState<string>("");

	useEffect(() => {
		setColor(shuffle(colors)[0]);
	}, []);
	return (
		<div className="flex-grow text-white">
			<header className="absolute top-5 right-8">
				<div className="flex items-center bg-red-300  space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
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
					<ChevronDownIcon className="h-5 w-5" />
				</div>
			</header>
			<section
				className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white padding-8`}></section>
		</div>
	);
};

export default Center;
