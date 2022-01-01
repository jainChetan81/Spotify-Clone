import { useState } from "react";
const isLoadingHOC = (WrappedComponent: any, loadingMessage: string) => {
	function HOC(props: any): JSX.Element {
		const [isLoading, setIsLoading] = useState<boolean>(true);
		const setLoadingState = (isComponentLoading: boolean) => {
			setIsLoading(isComponentLoading);
		};
		return (
			<>
				{isLoading && <div className="bg-black mx-auto text-white block text-center">{loadingMessage}</div>}
				<WrappedComponent {...props} setLoading={setLoadingState} />
			</>
		);
	}
	return HOC;
};

export default isLoadingHOC;
