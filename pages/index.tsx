import type { NextPage } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { Center, Layout, Player, Sidebar } from "../components";
import NetworkDetector from "../hoc/NetworkDetector";

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
	const session: Session | null = await getSession(context);
	return {
		props: { session },
	};
}
