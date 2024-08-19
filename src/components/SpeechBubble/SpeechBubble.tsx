import styles from './SpeechBubble.module.css';
import Loader from '../../assets/loading.gif';
import { motion } from 'framer-motion';

interface BubbleProps {
  speaker: string;
  text: string;
  action: string;
  loading?: boolean;
  animate: boolean;
  delay?: number;
  onConfirm: (confirm: boolean) => void;
}

export const SpeechBubble: React.FC<BubbleProps> = (props) => {
  let speechBubbleClass: string;
  let containerClass: string;

  if (props.speaker === 'ai') {
    speechBubbleClass = 'ai';
    containerClass = 'ai-container';
  } else {
    speechBubbleClass = 'user';
    containerClass = 'user-container';
  }

  const content = props.loading ? <img src={Loader} width={40} alt="Loading" /> : <p>{props.text}</p>;

  if (props.text == 'confirm') {
    return (
      <div className={styles[containerClass]}>
        <div className="grow"></div>
        <div className={styles[speechBubbleClass]}>
          <p>Please confirm actions</p><br></br>
          <button className={styles['confirm_yes']} onClick={() => props.onConfirm(true)}>Yes</button>
          <button className={styles['confirm_no']} onClick={() => props.onConfirm(false)}>No</button>
        </div>
      </div>
    );
  } else if (props.animate) {
    return (
      <motion.div
        className={styles[containerClass]}
        animate={{ y: 0, opacity: 1 }}
        initial={{ y: 60, opacity: 0 }}
        transition={{ duration: 0.5, delay: props.delay ? props.delay : 0 }}
      >
        <div className="grow"></div>
        <div className={styles[speechBubbleClass]}>{content}</div>
      </motion.div>
    );
  } else {
    return (
      <div className={styles[containerClass]}>
        <div className="grow"></div>
        <div className={styles[speechBubbleClass]}>{content}</div>
      </div>
    );
  }
};
