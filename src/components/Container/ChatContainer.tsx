import styles from './Container.module.css';
// import { Navigation } from '../Navigation/Navigation';
import Sidebar from '../SideBar/Sidebar';
import Header from '../Header/Header';


export const ChatContainer: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className={styles['chatbackground']}>
      <Header />
      <Sidebar />
      <div className={styles['chatcontainer']}>
        <div className='w-full'>{props.children}</div>
      </div>
    </div>

  );
};
