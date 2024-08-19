import { useContext, useEffect, useRef, useState } from 'react';
import { ChatInput } from '../../components/ChatInput/ChatInput';
import { SpeechBubble } from '../../components/SpeechBubble/SpeechBubble';
import { AIContext } from '../../context/ai-context';
import { useNavigate, useParams } from 'react-router';
import { Card } from '../../components/Card/Card';
import { RenderedConversation } from '../../chat-gpt/renderer';
import { motion } from 'framer-motion';
import axios from 'axios';
import './Chat.css'


import { ethers } from 'ethers';
import { useDebounce } from 'use-debounce'
import {
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
  useAccount, useConnect, useBalance
} from 'wagmi'
import { stringify } from 'viem';


// const promptTemplates = [
//   'Bittensor Hacking',
//   "New Integration Available",
//   'The Latest Sniped Token',
//   'Dexscreeener Trade Available'
// ];

export const ChatPage = () => {
  const [input, setInput] = useState('');
  const { address, isConnected } = useAccount();
  const { data: balanceData } = useBalance({
    address,
    watch: true, // this will re-fetch the balance when it changes
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversation, setConversation] = useState<RenderedConversation | undefined>();
  const { chatId } = useParams() as any;
  const { sendPrompt, addAIPrompt, conversations } = useContext(AIContext);
  const navigate = useNavigate();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [to, setTo] = useState('0x0000000000000000000000000000000000000000');
  const [debouncedTo] = useDebounce(to, 500);

  const [amount, setAmount] = useState(0);
  const [debouncedAmount] = useDebounce(amount, 500)
  const [balance, setBalance] = useState<string | null>(null);

  const { config } = usePrepareSendTransaction({
    to: debouncedTo,
    // value: debouncedAmount ? ethers.utils.parseEther(debouncedAmount) : undefined,
    value: ethers.parseEther(amount.toString())
  })
  const { data, sendTransaction } = useSendTransaction()

  console.log("sendTransaction", sendTransaction)
  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })
  const SERVER_URL = 'http://ec2-3-95-246-150.compute-1.amazonaws.com:3000';
  useEffect(() => {
    if (balanceData) {
      setBalance(balanceData.formatted);
    }
  }, [balanceData]);

  useEffect(() => {
    async function ReplyText() {
      const response = await axios.post(SERVER_URL + '/replyText', {
        speech: `Your payment is successful`
      })
      addAIPrompt(chatId, response.data.text.replace('"', ''))
    }
    if (isSuccess) {
      console.log('success')
      ReplyText()
    }
  }, [isSuccess])

  // useEffect(() => {
  //   if (!isConnected) {
  //     navigate('/');
  //   }
  // }, [isConnected])

  useEffect(() => {
    if (conversations[chatId]) {
      setConversation(conversations[chatId]);
    } else {
      navigate('/');
    }
  }, [conversations, chatId]);

  useEffect(() => {
    const lastSpeech = conversation?.speeches.slice(-1);
    console.log('lastSpeech', lastSpeech)
    if (lastSpeech?.length && lastSpeech[0].action == 'send') {
      const { content } = lastSpeech[0];
      const json_content = JSON.parse(content);
      doConfirmActions(json_content);
    }
  }, [conversation]);

  const onInputChange = (input: string) => {
    setError('');
    setInput(input);
  };

  const handleConfirm = (confirm: boolean) => {
    if (confirm) {

      const conversationLength = conversation?.speeches.length;
      if (conversationLength) {
        // const preAction = conversation?.speeches[conversationLength - 2].content
        // const action = JSON.parse(preAction)[0];
        confirmMessage();
      }
    } else {
      console.log('Not confirmed!!!');
      removeConfirm();
    }
  }

  const doConfirmActions = async (action: any) => {
    if (action.currency.toLowerCase() === 'eth') {
      setTo(action.to);
      setAmount(Number(action.amount));
      if (balance) {

        if (parseFloat(balance) < parseFloat(action.amount)) {
          const response = await axios.post(SERVER_URL + '/replyText', {
            speech: `You do not have ${action.amount} eth in your wallet. Plz check`
          })
          addAIPrompt(chatId, response.data.text.replace('"', ''))
        }
        else {
          sendTransaction?.({ value: ethers.parseEther(action.amount.toString()), to: action.to });
          // sendTransaction?.({ value: ethers.parseEther('0.00085'), to: '0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97' });
        }
      }
    }
  }
  const confirmMessage = () => {
    if (!conversation || !conversation.speeches.length) return;
    const convs = conversations.length;
    conversation.speeches.pop();
    console.log("aaa", conversation.speeches)
    let localConversations = JSON.parse(localStorage.getItem('conversations') || '[]');

    if (localConversations.length > 0) {
      let lastConv = localConversations[convs - 1];

      // Remove the last speech from the last conversation in local storage
      if (lastConv.speeches.length > 0) {
        lastConv.speeches.pop();
        localConversations[convs - 1] = lastConv;
      }

      // Update the local storage with the modified conversations
      localStorage.setItem('conversations', JSON.stringify(localConversations));

      console.log(localConversations[convs - 1]);
      onInputSubmit('Yes');
    }

    setConversation({ ...conversation });
    // removePrompt(chatId);
  }


  const removeConfirm = () => {
    if (!conversation || !conversation.speeches.length) return;
    const convs = conversations.length;
    conversation.speeches.pop();
    const localConversations = JSON.parse(localStorage.getItem('conversations') || '[]');

    if (localConversations.length > 0) {
      const lastConv = localConversations[convs - 1];

      // Remove the last speech from the last conversation in local storage
      if (lastConv.speeches.length > 0) {
        lastConv.speeches.pop();
      }

      // Update the local storage with the modified conversations
      localStorage.setItem('conversations', JSON.stringify(localConversations));

      console.log(localConversations[convs - 1]);
    }
    setConversation({ ...conversation });
    onInputSubmit('No');

    // removePrompt(chatId);
  }

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
        console.log(conversation);
      } catch (err) {
        console.log(err);
        setError('Oops...an error has occurred. Please try again.');
      }
      setLoading(false);
      chatEndRef!.current!.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="row py-[2vh]">
      <div className='w-full pl-[20%]'>
        {conversation && conversation.speeches.length === 0 && (
          <div className="flex flex-col justify-center items-center h-[60vh] ">
            <span className="text-2xl text-black">Hi Jue, How can I help you?</span>
          </div>
        )}

        <div className='flex flex-col justify-space-between items-center mt-[10vh] w-full '>
          {conversation && conversation.speeches.length === 0 && (
            <div className='flex flex-col justify-space-between items-center w-full'>
              <motion.div

                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {/* <div >
                    {promptTemplates.map((prompt, id) => (
                      <button key={id} onClick={() => onTemplateClicked(prompt)}>
                        <Card direction="row">
                          <img src={Inbox}></img>
                          <p >{prompt}</p>
                        </Card>
                      </button>
                    ))}
                  </div> */}
              </motion.div>
            </div>
          )}
          {conversation && conversation.speeches.length > 0 && (
            <div className='flex flex-col justify-space-between w-full px-[15%] max-h-[60vh] no-scrollbar'>
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
                if (speech.action !== 'send') {
                  const speaker = speech.speaker === 'HUMAN' ? 'user' : 'ai';

                  let animate = false;
                  if (id === conversation.speeches.length - 1) {
                    animate = true;
                  }
                  return <SpeechBubble key={id} speaker={speaker} action={speech.action} text={speech.content} animate={animate} onConfirm={handleConfirm} />;
                }
              })}
              {loading && <SpeechBubble speaker="ai" action='ai' text="" loading={true} animate={true} delay={0.5} onConfirm={handleConfirm} />}
              {error && <div>{error}</div>}
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
  );
};
