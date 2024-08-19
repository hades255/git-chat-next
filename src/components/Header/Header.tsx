import clsx from 'clsx';
import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ArrowSquareRight, HambergerMenu } from 'iconsax-react';
import { SidebarContext } from '../../context/SidbarContext';
import { useAccount } from 'wagmi';
import WalletButton from '../WalletButton';
import SwitchNetworkDropdown from '../SwitchNetworkDropdown';
import { AnimatePresence, motion } from 'framer-motion';
import Notification from '../../assets/svg/noti.svg'
import returnArrow from '../../assets/svg/returnArrow.svg'
import SendUsdt from '../SendTransaction';

// Define the structure of sidebarLinks
interface SidebarLink {
    path: string;
    title: string;
}

function Header() {
    const [isMobilePopupOpen, setIsMobilePopupOpen] = useState<boolean>(false);
    const { isConnected } = useAccount();

    return (
        <div
            className={clsx(
                'fixed top-0 left-0 xl:left-64 right-0 px-4 py-3 transition-all xl:px-8 xl:py-4 z-20',
            )}
        >
            <div className="items-center justify-between hidden lg:flex">
                <div className="flex gap-6">
                    <span className="mx-2 text-2xl font-medium text-black p-2 bg-white rounded-sm font-londrina border-gray-50">
                        Cryptos: 2.4M+ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Exchanges: 796 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Market Cap: $2.38T &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 24hVol: $62.47&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Dominance BTC: 55.0%  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ETH:16.7% &nbsp;&nbsp;&nbsp;&nbsp;
                    </span>
                    <img src={Notification} alt='notification' />
                    <img src={returnArrow} alt='returnArrow' />
                </div>
                <div className="flex items-center gap-4">
                    <WalletButton />
                    {/* {isConnected && <SendUsdt />} */}
                    {isConnected && <SwitchNetworkDropdown />}
                </div>
            </div>

            <div className="lg:hidden">
                <AnimatePresence>
                    {isMobilePopupOpen && (
                        <motion.div
                            key="mobile-popup"
                            initial={{ y: '-100%' }}
                            animate={{ y: 0, transition: { ease: 'easeOut', duration: 0.2 } }}
                            exit={{
                                y: '-100%',
                                transition: { ease: 'easeIn', duration: 0.2 },
                            }}
                            className={clsx(
                                'fixed top-0 left-0 w-full p-3 z-20 bg-dark-500 py-4 space-y-3',
                            )}
                        >
                            <WalletButton width="full" />
                            {isConnected && <SwitchNetworkDropdown width="full" />}
                        </motion.div>
                    )}

                    {isMobilePopupOpen && (
                        <motion.div
                            key="overlay"
                            className="fixed top-0 bottom-0 left-0 right-0 z-10 bg-black/70 min-h-app"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobilePopupOpen(false)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export default Header;
