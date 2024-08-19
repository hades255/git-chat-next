import React, { ReactNode } from 'react';

// wagmi imports
import { WagmiConfig, createConfig, configureChains } from 'wagmi';

import { mainnet, polygon, bsc } from 'wagmi/chains';

import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

// Configure chains & providers with the Infura provider.
const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnet, polygon, bsc],
    [
        infuraProvider({ apiKey: 'ac546be7d92f46f5bbd794a14f4fd707' }),
        publicProvider(),
    ]
);

// Set up wagmi config
const config = createConfig({
    autoConnect: true,
    connectors: [
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
            chains,
            options: {
                appName: 'wagmi',
            },
        }),
        new WalletConnectConnector({
            chains,
            options: {
                projectId: '5fd254e3935b5aede91466b0037df4b9',
            },
        }),
    ],
    publicClient,
    webSocketPublicClient,
});

// Define the props for the Wagmi component
interface WagmiProps {
    children: ReactNode;
}

const Wagmi: React.FC<WagmiProps> = ({ children }) => {
    return <WagmiConfig config={config}>{children}</WagmiConfig>;
};

export default Wagmi;
