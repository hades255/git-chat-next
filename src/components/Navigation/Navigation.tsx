import { Chat } from '../MenuItems/Chat';
import styles from './Navigation.module.css';
import { Settings } from '../MenuItems/Settings';
import Logo from '../../assets/logo.png';
import { NavLink, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AIContext } from '../../context/ai-context';
import { motion } from 'framer-motion';
import ConnectWalletButton from '../ConnectWalletButton';

export const Navigation = () => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatTitle, setChatTitle] = useState('');
  const { chatId } = useParams() as any;
  const { conversations } = useContext(AIContext);

  useEffect(() => {
    if (chatId && conversations[chatId]) {
      setChatTitle(conversations[chatId].title);
    } else {
      setChatTitle('');
    }
  }, [chatId, conversations]);

  const settingsDrawerHandler = () => {
    if (settingsOpen) {
      setSettingsOpen(false);
    }
  };

  const chatDrawerHandler = () => {
    if (chatOpen) {
      setChatOpen(false);
    }
  };

  return (
    <nav className={styles['nav-bar']}>
      <NavLink to="/">
        <div className={styles['logo']}>
          <img src={Logo} width={30} height={30} className="mr-2" alt="openai" />
          <span className={styles['title']}>chat-gpt</span>
        </div>
      </NavLink>
      <div className="mx-8 grow">
        <div className="relative w-full h-8 overflow-hidden whitespace-nowrap py-2">
          <div className="absolute animate-marquee space-x-4 flex">
            <span className="mx-2 text-xl font-bold text-white">
              Cryptos: 2.4M+ Exchanges: 796 Market Cap: $2.38T 24 Vol: $62.47 Dominance: BTC: 55.0% ETH 16.7%
            </span>
          </div>
          <div className="absolute animate-marquee space-x-4 flex">
            <span className="mx-2 text-xl font-bold text-white">
              Cryptos: 2.4M+ Exchanges: 796 Market Cap: $2.38T 24 Vol: $62.47 Dominance: BTC: 55.0% ETH 16.7%
            </span>
          </div>
        </div>
      </div>
      {/* <ConnectWalletButton /> */}
      <Settings
        open={settingsOpen}
        clickHandler={() => setSettingsOpen((isOpen) => !isOpen)}
        drawerHandler={settingsDrawerHandler}
      />
      <Chat open={chatOpen} clickHandler={() => setChatOpen((isOpen) => !isOpen)} chatHandler={chatDrawerHandler} />
    </nav>
  );
};
