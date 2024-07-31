import { Web3Button, Web3Modal } from "@web3modal/react";
import { EthereumClient } from "@web3modal/ethereum";
import { sepolia } from "wagmi";
import { projectId, wagmiConfig } from "../main";

import { SendTransaction } from "./SendTransaction";

export default function ConnectWalletButton() {
    const chains = [sepolia];

    const ethereumClient = new EthereumClient(wagmiConfig, chains);

    return (
        <div className="mr-4">     
            <SendTransaction />
            <Web3Button />
            <Web3Modal
                projectId={projectId}
                ethereumClient={ethereumClient}
                defaultChain={sepolia}
            />
        </div>
    );
}
