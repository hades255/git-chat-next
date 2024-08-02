import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { AIContext } from '../context/ai-context';
import { Button } from './Button/Button';
import { ChatItem } from './ChatItem/ChatItem';

const Sidebar = () => {
  const navigate = useNavigate();
  const aiContext = useContext(AIContext);

  const newChatHandler = () => {
    const id = aiContext.conversations.length;
    aiContext.newConvo();
    navigate(`/chat/${id}`);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  /**${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } */
  return (
    <>
      {/* <div className="flxed">
        <Button className="p-2 bg-gray-800 text-white fixed top-4 left-4 z-50 lg:hidden" onClick={toggleSidebar}>
          {isOpen ? 'Close' : 'Open'}
        </Button>
      </div> */}
      <div
        className={`inset-y-0 transform  transition-transform duration-300 ease-in-out w-64 lg:translate-x-0 lg:w-64`}
      >
        <div className="p-4">
          <div className="mt-4">
            <Button level="primary" fullWidth={true} clickHandler={newChatHandler}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="ml-1">New Chat</span>
            </Button>
            <div className='max-h-[60vh] overflow-y-hidden'>
              {aiContext.conversations.map((convo, index) => (
                <Link key={index} to={`/chat/${index}`}>
                  <ChatItem convo={convo} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
