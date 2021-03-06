import { BuiltInProviderType } from "next-auth/providers";
import Image from "next/image";
import { getProviders, signIn } from "next-auth/react";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { FC } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/outline";
import { Layout } from "../components";
import { NetworkDetector } from "../hoc";

type Props = {
	providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
};

const Login: FC<Props> = ({ providers }) => {
	return (
		<Layout title="Spotify | Login">
			<div className="flex flex-col min-h-screen items-center place-center w-full justify-center">
				<figure className="w-52 mb-5">
					<Image
						src="https://ik.imagekit.io/clhowstalgz/spotify.png?tr=w-208,h-208,c-maintain_ratio"
						alt="Spotify logo for sign in"
						height={208}
						width={208}
					/>
				</figure>
				{Object.values(providers).map((provider) => (
					<div
						key={provider.name}
						className="absolute top-auto w-20 h-20 bg-transparent right-10 cursor-pointer">
						<ChevronDoubleRightIcon
							onClick={() => signIn(provider.id, { callbackUrl: "/" })}
							className="w-20 h-20 animate-pulse"
							style={{ color: "#1ed760" }}
						/>
					</div>
				))}
			</div>
		</Layout>
	);
};

export default NetworkDetector(Login);

export async function getServerSideProps() {
	const providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null =
		await getProviders();
	return {
		props: { providers },
	};
}
