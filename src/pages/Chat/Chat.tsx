import { useContext, useEffect, useRef, useState } from 'react';
import { ChatInput } from '../../components/ChatInput/ChatInput';
import { SpeechBubble } from '../../components/SpeechBubble/SpeechBubble';
import { AIContext } from '../../context/ai-context';
import { useNavigate, useParams } from 'react-router';
import { Card } from '../../components/Card/Card';
import styles from './Chat.module.css';
import { RenderedConversation } from '../../chat-gpt/renderer';
import { motion } from 'framer-motion';
import Sidebar from '../../components/Sidebar';

const promptTemplates = [
  'Explain quantum computing in simple terms',
  "Got any creative ideas for a 10 year old's birthday?",
  'How do I make an HTTP request in Javascript?',
];

export const ChatPage = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversation, setConversation] = useState<RenderedConversation | undefined>();
  const { chatId } = useParams() as any;
  const { sendPrompt, conversations } = useContext(AIContext);
  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (conversations[chatId]) {
      setConversation(conversations[chatId]);
    } else {
      navigate('/');
    }
  }, [conversations, chatId]);

  const onInputChange = (input: string) => {
    setError('');
    setInput(input);
  };

  const onTemplateClicked = (template: string) => {
    setInput(template);
  };

  const onInputSubmit = async (prompt: string) => {
    setError('');
    if (prompt.trim().length > 0) {
      try {
        setLoading(true);
        await sendPrompt(chatId, prompt);
        setInput('');
      } catch (err) {
        setError('Oops...an error has occurred. Please try again.');
      }
      setLoading(false);
      chatEndRef!.current!.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container w-full">
      <div className="row">
        <div className="">
          <div className={styles.mainContent}>
            {conversation && conversation.speeches.length === 0 && (
              <div className="flex flex-col">
                <div className="my-8 flex justify-center">
                  <div className="text-4xl">Logo</div>
                </div>
                <div className="my-4 flex justify-center">
                  <div className="text-2xl">Hi Jue</div>
                </div>
                <div className="my-4 flex justify-center">
                  <div className="text-2xl">How can I help you?</div>
                </div>
              </div>
            )}
            <div className={styles.chatContainer}>
              {conversation && conversation.speeches.length === 0 && (
                <div className={styles.secondarySection}>
                  <h2 className={styles.secondaryHeading}>Need an icebreaker?</h2>
                  <motion.div
                    className={styles.promptsContainer}
                    animate={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                  >
                    {promptTemplates.map((prompt, id) => (
                      <button key={id} onClick={() => onTemplateClicked(prompt)}>
                        <Card direction="row">
                          <p className={styles.promptText}>{prompt}</p>
                        </Card>
                      </button>
                    ))}
                  </motion.div>
                </div>
              )}
              {conversation && conversation.speeches.length > 0 && (
                <div className={styles.chatArea}>
                  {conversation.description && (
                    <motion.p
                      className="mb-4"
                      animate={{ opacity: 1, x: 0 }}
                      initial={{ opacity: 0, x: -60 }}
                      transition={{ duration: 0.5 }}
                    >
                      {conversation.description}
                    </motion.p>
                  )}
                  {conversation.speeches.map((speech, id) => {
                    const speaker = speech.speaker === 'HUMAN' ? 'user' : 'ai';
                    let animate = false;
                    if (id === conversation.speeches.length - 1) {
                      animate = true;
                    }
                    return <SpeechBubble key={id} speaker={speaker} text={speech.content} animate={animate} />;
                  })}
                  {loading && <SpeechBubble speaker="ai" text="" loading={true} animate={true} delay={0.5} />}
                  {error && <div className={styles.errorContainer}>{error}</div>}
                  <div ref={chatEndRef} />
                </div>
              )}
              <ChatInput
                input={input}
                inputChangeHandler={onInputChange}
                inputSubmitHandler={onInputSubmit}
                submitting={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
