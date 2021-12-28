import type { NextPage } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { Layout } from "../components";
import NetworkDetector from "../hoc/NetworkDetector";

const Home: NextPage = () => {
	return <Layout title="Home"></Layout>;
};

export default NetworkDetector(Home);

export async function getServerSideProps(context: any) {
	const session: Session | null = await getSession(context);
	return {
		props: { session },
	};
}
