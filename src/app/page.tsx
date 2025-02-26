"use client";

import { useAccount, useConnect, useDisconnect, useBalance } from "wagmi";

function App() {
	const account = useAccount();
	const { data: balance } = useBalance({
		address: account?.address,
	});
	const { connectors, connect, status, error } = useConnect();
	const { disconnect } = useDisconnect();

	return (
		<>
			<div>
				<h2>Account</h2>

				<div>
					status: {account?.status}
					<br />
					addresses: {JSON.stringify(account?.addresses)}
					<br />
					chainId: {account?.chainId}
				</div>
				{account?.status === "connected" && (
					<h2>
						Balance : {balance?.formatted}
						{balance?.symbol}
					</h2>
				)}

				{account?.status === "connected" && (
					<button
						type="button"
						onClick={() => disconnect()}>
						Disconnect
					</button>
				)}
			</div>

			<div>
				<h2>Connect</h2>
        {/*You can filter out the connectors you want to show  */}
				{connectors
					?.filter((connector) => connector?.id === "io.metamask" || connector?.id === "injected")
					?.map((connector) => (
						<button
							key={connector?.uid}
							onClick={() => connect({ connector })}
							type="button">
							{connector?.name}
						</button>
					))}
				{/* <div>{status}</div> */}
				<div>{error?.message}</div>
			</div>
		</>
	);
}

export default App;
