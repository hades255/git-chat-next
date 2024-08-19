import { Button } from '../Button/Button';
import styles from './ChatInput.module.css';
import { motion } from 'framer-motion';
import InputButton1 from '../../assets/svg/inputbutton1.svg';

export const ChatInput: React.FC<{
  input: string;
  inputChangeHandler: (input: string) => void;
  inputSubmitHandler: (prompt: string) => void;
  submitting: boolean;
}> = (props) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    props.inputChangeHandler(event.target.value);
  };
  const onKeyDownHandler = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      props.inputSubmitHandler(props.input);
    }
  };

  return (
    <motion.form
      className={styles['container']}
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: 60, opacity: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={(e) => {
        e.preventDefault();
        props.inputSubmitHandler(props.input);
      }}
    >
      <textarea
        placeholder="Enter your prompt here..."
        value={props.input}
        onChange={(event) => onChangeHandler(event)}
        onKeyDown={(event) => onKeyDownHandler(event)}
        className={props.submitting ? styles['disabled-input'] : styles['input']}
        disabled={props.submitting}
      />
      <div className="mx-1"></div>
      <Button level="primary" fullWidth={false} >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="52" viewBox="0 0 48 52" fill="none">
          <g filter="url(#filter0_d_3_79)">
            <rect x="3" y="3" width="42" height="42" rx="5" fill="#00C3FF" />
            <rect x="1.5" y="1.5" width="45" height="45" rx="6.5" stroke="#2D2D2D" strokeWidth="3" />
          </g>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M35.6442 24.5155C35.8494 24.544 36.0469 24.612 36.2253 24.7157C36.4038 24.8193 36.5597 24.9566 36.6842 25.1196C36.8087 25.2825 36.8992 25.468 36.9507 25.6655C37.0021 25.8629 37.0135 26.0684 36.9841 26.2701C36.5889 28.9578 35.3078 31.4439 33.3373 33.3467C31.3668 35.2495 28.8158 36.464 26.0756 36.8039V38.45C26.0756 38.8611 25.9095 39.2553 25.6139 39.546C25.3183 39.8367 24.9173 40 24.4992 40C24.0812 40 23.6802 39.8367 23.3846 39.546C23.0889 39.2553 22.9229 38.8611 22.9229 38.45V36.8039C20.1831 36.4635 17.6325 35.2487 15.6624 33.346C13.6922 31.4432 12.4113 28.9575 12.016 26.2701C11.9566 25.8631 12.0641 25.4496 12.3148 25.1206C12.5655 24.7915 12.9388 24.5739 13.3527 24.5155C13.7666 24.4571 14.1872 24.5628 14.5218 24.8093C14.8565 25.0558 15.0778 25.4229 15.1372 25.8299C15.4656 28.0408 16.5923 30.0617 18.3113 31.5231C20.0303 32.9844 22.2268 33.7886 24.4992 33.7886C26.7716 33.7886 28.9682 32.9844 30.6872 31.5231C32.4062 30.0617 33.5329 28.0408 33.8613 25.8299C33.8906 25.6284 33.9601 25.4345 34.0657 25.2594C34.1713 25.0843 34.3109 24.9313 34.4766 24.8092C34.6423 24.6872 34.8308 24.5984 35.0314 24.548C35.232 24.4976 35.4392 24.4866 35.6442 24.5155ZM24.4992 9C26.5896 9 28.5944 9.81652 30.0725 11.2699C31.5507 12.7233 32.3811 14.6946 32.3811 16.75V24.5C32.3811 26.5554 31.5507 28.5267 30.0725 29.9801C28.5944 31.4335 26.5896 32.25 24.4992 32.25C22.4088 32.25 20.4041 31.4335 18.9259 29.9801C17.4478 28.5267 16.6174 26.5554 16.6174 24.5V16.75C16.6174 14.6946 17.4478 12.7233 18.9259 11.2699C20.4041 9.81652 22.4088 9 24.4992 9ZM24.4992 12.1C23.245 12.1 22.0421 12.5899 21.1553 13.462C20.2684 14.334 19.7701 15.5167 19.7701 16.75V24.5C19.7701 25.7333 20.2684 26.916 21.1553 27.788C22.0421 28.6601 23.245 29.15 24.4992 29.15C25.7535 29.15 26.9563 28.6601 27.8432 27.788C28.7301 26.916 29.2283 25.7333 29.2283 24.5V16.75C29.2283 15.5167 28.7301 14.334 27.8432 13.462C26.9563 12.5899 25.7535 12.1 24.4992 12.1Z" fill="#2D2D2D" />
          <defs>
            <filter id="filter0_d_3_79" x="0" y="0" width="48" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.176354 0 0 0 0 0.176354 0 0 0 0 0.176354 0 0 0 1 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_79" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_79" result="shape" />
            </filter>
          </defs>
        </svg>
      </Button>
      <Button level="primary" fullWidth={false} submitting={props.submitting}>
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="52" viewBox="0 0 48 52" fill="none">
          <g filter="url(#filter0_d_3_76)">
            <rect x="3" y="3" width="42" height="42" rx="5" fill="#00C3FF" />
            <rect x="1.5" y="1.5" width="45" height="45" rx="6.5" stroke="#2D2D2D" strokeWidth="3" />
          </g>
          <path d="M25.3596 15.5063C25.6811 15.1821 26.1171 15 26.5717 15C27.0262 15 27.4622 15.1821 27.7837 15.5063L35.4981 23.2879C35.8195 23.6121 36 24.0519 36 24.5104C36 24.969 35.8195 25.4087 35.4981 25.733L27.7837 33.5146C27.4603 33.8296 27.0273 34.0039 26.5778 33.9999C26.1283 33.996 25.6984 33.8141 25.3805 33.4935C25.0627 33.1729 24.8824 32.7392 24.8785 32.2858C24.8746 31.8324 25.0474 31.3956 25.3596 31.0694L30.0003 26.2397H13.7143C13.2596 26.2397 12.8236 26.0575 12.5021 25.7332C12.1806 25.4089 12 24.9691 12 24.5104C12 24.0518 12.1806 23.612 12.5021 23.2877C12.8236 22.9634 13.2596 22.7812 13.7143 22.7812H30.0003L25.3596 17.9514C25.0382 17.6272 24.8577 17.1874 24.8577 16.7289C24.8577 16.2703 25.0382 15.8306 25.3596 15.5063Z" fill="#2D2D2D" />
          <defs>
            <filter id="filter0_d_3_76" x="0" y="0" width="48" height="52" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="4" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0.176354 0 0 0 0 0.176354 0 0 0 0 0.176354 0 0 0 1 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3_76" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3_76" result="shape" />
            </filter>
          </defs>
        </svg>
      </Button>

    </motion.form>
  );
};
