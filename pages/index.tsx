import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { Session } from "next-auth";
import { getSession } from "next-auth/react";
import { Layout } from "../components";

const Home: NextPage = () => {
	return <Layout title="Home"></Layout>;
};

export default Home;

export async function getServerSideProps(context: GetServerSideProps) {
	const session: Session | null = await getSession(context);
	return {
		props: { session },
	};
}
