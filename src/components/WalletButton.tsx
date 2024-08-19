import clsx from 'clsx';
import React, { useContext, useState, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { toast } from 'react-toastify';
import { ArrowDown2, Copy, LogoutCurve } from 'iconsax-react';
import WalletsModal from './WalletsModal';
import { WagmiContext, WagmiContextProps } from '../context/WagmiContext';
import WalletIcon from '../assets/walletIcon.png'

// Define the props for the WalletButton component
interface WalletButtonProps {
    width?: 'full';
}

const WalletButton: React.FC<WalletButtonProps> = ({ width }) => {
    const [isOpen, setIsOpen] = useState(false);

    const { disconnect, address, isConnected } = useContext(WagmiContext) as WagmiContextProps;

    const copyAddress = () => {
        if (address) {
            navigator.clipboard.writeText(address);
            toast.success('Copied to clipboard.');
        }
    };

    if (isConnected) {
        return (
            <Menu as="div" className={clsx('relative inline-block text-left', width === 'full' && 'w-full')}>
                {({ open }) => (
                    <>
                        <Menu.Button
                            className={clsx(
                                'flex gap-2 items-center p-1 pr-2.5 rounded-full text-sm font-medium border border-dark-300 transition-colors hover:bg-dark-300 text-black',
                                width === 'full' && 'w-full',
                                open ? 'bg-yawn-lemon' : 'bg-yawn-lemon'
                            )}
                        >
                            <img src={WalletIcon} className="flex-shrink-0 w-8 h-8" alt="" />
                            {address?.slice(0, 5)}... {address?.slice(-4)}
                            <ArrowDown2
                                size="16"
                                color="black"
                                className={clsx('transition-transform will-change-transform ml-auto', open && 'rotate-180')}
                            />
                        </Menu.Button>
                        <Transition
                            as={Fragment}
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                        >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-yawn-purple border border-dark-300 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none py-1">
                                <Menu.Item>
                                    <button
                                        className="px-4 py-2 text-sm transition-colors flex items-center gap-2 w-full text-left hover:bg-yawn-dark-purple"
                                        onClick={() => disconnect()}
                                    >
                                        <LogoutCurve size="16" color="#fff" />
                                        Disconnect
                                    </button>
                                </Menu.Item>
                                <Menu.Item>
                                    <button
                                        className="px-4 py-2 text-sm transition-colors flex items-center gap-2 w-full text-left hover:bg-yawn-dark-purple"
                                        onClick={copyAddress}
                                    >
                                        <Copy size="16" color="#fff" />
                                        Copy Address
                                    </button>
                                </Menu.Item>
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu>
        );
    }

    return (
        <>
            <button
                className={clsx(
                    'flex gap-2 items-center bg-yawn-lemon py-2.5 px-4 rounded-full text-sm font-medium text-center justify-center',
                    width === 'full' && 'w-full'
                )}
                onClick={() => setIsOpen(true)}
            >
                Connect Wallet
            </button>
            <WalletsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
};

export default WalletButton;
