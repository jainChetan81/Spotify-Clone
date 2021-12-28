import type { NextPage } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { Center, Layout, Player } from "../components";
import NetworkDetector from "../hoc/NetworkDetector";

const Home: NextPage = () => {
	return (
		<Layout title="Spotify | Home">
			<Center />
			<Player />
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
