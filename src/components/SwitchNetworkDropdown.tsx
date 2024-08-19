import { Fragment, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import clsx from 'clsx';
import { ArrowDown2 } from 'iconsax-react';
import { toast } from 'react-toastify';

interface SwitchNetworkDropdownProps {
    width?: 'full';
}

const SwitchNetworkDropdown: React.FC<SwitchNetworkDropdownProps> = ({ width }) => {
    const { chain } = useNetwork();
    const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();

    useEffect(() => {
        if (error && error.message) {
            toast.error(error.message);
        }
    }, [error]);

    return (
        <Menu
            as="div"
            className={clsx(
                'relative inline-block text-left',
                width === 'full' && 'w-full'
            )}
        >
            {({ open }) => (
                <>
                    <Menu.Button
                        className={clsx(
                            'flex gap-2 items-center p-1 pr-2.5 rounded-full text-sm font-medium text-black border border-dark-300 transition-colors hover:bg-dark-300',
                            width === 'full' && 'w-full',
                            open ? 'bg-yawn-lemon' : 'bg-yawn-lemon'
                        )}
                    >
                        <div className="bg-yawn-lemon p-1 rounded-full">
                            {chain && (
                                <img
                                    className="w-6 h-6 "
                                    src={`/cryptoIcons/${chain.network}.svg`}
                                    alt={chain.network}
                                />
                            )}
                        </div>

                        <span className="lg:hidden xl:inline">{chain?.name}</span>
                        <ArrowDown2
                            size="16"
                            color="black"
                            className={clsx(
                                'transition-transform will-change-transform ml-auto',
                                open && 'rotate-180'
                            )}
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
                        <Menu.Items className="absolute right-0 z-10 w-56 py-1 mt-2 origin-top-right border rounded-md shadow-lg bg-yawn-purple border-dark-300 ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {chains.map((x) => (
                                <Menu.Item key={x.id}>
                                    {({ active }) => (
                                        <button
                                            disabled={!switchNetwork || x.id === chain?.id}
                                            onClick={() => switchNetwork?.(x.id)}
                                            className={clsx(
                                                'px-4 py-2 text-sm transition-colors flex items-center gap-2 w-full text-left hover:bg-dark-purple',
                                                !switchNetwork || (x.id === chain?.id && '!hidden')
                                            )}
                                        >
                                            <img
                                                className="w-6 h-6"
                                                src={`/cryptoIcons/${x.network}.svg`}
                                                alt={x.name}
                                            />
                                            {x.name}
                                            {isLoading && pendingChainId === x.id && ' (switching)'}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    );
};

export default SwitchNetworkDropdown;
