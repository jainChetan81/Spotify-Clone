import type { NextPage } from "next";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { Center, Layout, Player, Sidebar } from "../components";
import { NetworkDetector } from "../hoc";
import { SESSION_EXT } from "../types";

const Home: NextPage = () => {
	const [showSidebar, setShowSidebar] = useState<boolean>(false);
	return (
		<Layout title="Spotify | Home">
			<Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
			<main onClick={() => setShowSidebar(false)}>
				<Center />
				<Player />
			</main>
		</Layout>
	);
};

export default NetworkDetector(Home);

export async function getServerSideProps(context: any) {
	const session: SESSION_EXT | null = await getSession(context);
	if (!session) {
		return {
			redirect: {
				destination: "/login",
				permanent: false,
			},
		};
	}
	return {
		props: { session },
	};
}
