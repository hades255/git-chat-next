import styles from './Container.module.css';
import { Navigation } from '../Navigation/Navigation';
import Sidebar from '../Sidebar';

export const ChatContainer: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <div className={styles['background']}>
      <Navigation />
      <div className="flex h-[calc(100vh-200px)]">
        <Sidebar />
        <div className={styles['container']}>
          {props.children}
        </div>
      </div> 
    </div>
  );
};
