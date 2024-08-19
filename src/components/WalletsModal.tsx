import React, { useContext, useEffect } from 'react';
import Modal from '../common/Modal';

import { ArrowRight2 } from 'iconsax-react';
import { toast } from 'react-toastify';
import { WagmiContext, WagmiContextProps } from '../context/WagmiContext';
import { Connector } from 'wagmi';

// Define the props for the WalletsModal component
interface WalletsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WalletsModal: React.FC<WalletsModalProps> = ({ isOpen, onClose }) => {
    const {
        connect,
        connectors,
        connectError,
        connectLoading,
        connectPending,
    } = useContext(WagmiContext) as WagmiContextProps;

    const connectHandler = (connector: Connector) => {
        if (!connector.ready) {
            onClose();
        } else {
            connect(connector);
            onClose();
        }
    };

    useEffect(() => {
        if (connectError && connectError.message) {
            toast.error(connectError.message);
        }
    }, [connectError]);

    return (
        <Modal open={isOpen} onClose={onClose} heading="Connect to a wallet" >
            <div className="space-y-3 bg-yawn-primary">
                {connectors.map((connector: Connector) => (
                    <button
                        key={connector.id}
                        onClick={() => connectHandler(connector)}
                        className="flex items-center w-full gap-2 px-3 py-2 text-left rounded-lg bg-yawn-purple hover:bg-opacity-60 text-white"
                    >
                        <img
                            className="w-12 h-12"
                            src={`/walletIcons/${connector.id}.svg`}
                            alt=""
                        />
                        {connector.name}
                        {!connector.ready && ' install required!'}
                        {connectLoading &&
                            connector.id === connectPending?.id &&
                            ' (connecting)'}

                        <ArrowRight2 size="20" className="ml-auto" />
                    </button>
                ))}
            </div>
        </Modal>
    );
};

export default WalletsModal;
