import React, { createContext, ReactNode } from 'react';
import { useAccount, useConnect, useDisconnect, Connector } from 'wagmi';
import { toast } from 'react-toastify';

// Define the shape of the context state
export interface WagmiContextProps {
    address: string | undefined;
    isConnected: boolean;
    connect: (connector: Connector) => void;
    connectors: Connector[];
    connectError: Error | null;
    connectLoading: boolean;
    connectPending: Connector | undefined;
    disconnect: () => void;
}

// Create the context with a default value
const WagmiContext = createContext<WagmiContextProps | undefined>(undefined);

// Define the props for the provider component
interface WagmiContextProviderProps {
    children: ReactNode;
}

const WagmiContextProvider: React.FC<WagmiContextProviderProps> = ({ children }) => {
    const { address, isConnected } = useAccount();

    const {
        connect,
        connectors,
        error: connectError,
        isLoading: connectLoading,
        pendingConnector: connectPending,
    } = useConnect({
        onSuccess() {
            toast.success('Connected.');
        },
    });

    const { disconnect } = useDisconnect();

    return (
        <WagmiContext.Provider
            value={{
                address,
                isConnected,
                connect: (connector: Connector) => connect({ connector }),
                connectors,
                connectError,
                connectLoading,
                connectPending,
                disconnect,
            }}
        >
            {children}
        </WagmiContext.Provider>
    );
};

// Export the context and provider
export { WagmiContext, WagmiContextProvider };
