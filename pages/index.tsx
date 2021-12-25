import type { NextPage } from "next";
import { Layout } from "../components";

const Home: NextPage = () => {
	return (
		<Layout title="Home">
			<h1 className="mt-8 text-left">Hi</h1>
		</Layout>
	);
};

export default Home;
