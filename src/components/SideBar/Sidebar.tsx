import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { AIContext } from '../../context/ai-context';
import { Button } from '.././Button/Button';
import { ChatItem } from '.././ChatItem/ChatItem';
import './SideBar.css';
import Logo from '../../assets/logo.svg';

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
        <Button level="primary" fullWidth={true} clickHandler={toggleSidebar}>
          {isOpen ? 'Close' : 'Open'}
        </Button>
      </div> */}
      <div
        className={`fixed left-4 inset-y-0 transform transition-transform duration-300 ease-in-out w-64 lg:translate-x-0 lg:w-64 hidden md:block my-[2vh] z-20`}
      >
        <div className="p-6 bg-yawn-purple border-[#2D2D2D] border-t-4 border-l-4 border-r-4 border-b-[12px] rounded-xl">
          <div className="mt-[2vh] ">
            <img src={Logo} alt='logo' className='mb-[3vh]' />
            <Button level="primary" fullWidth={true} clickHandler={newChatHandler} >
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
              <span className="ml-1 font-londrina my-2 mx-4">New AI Chat</span>
            </Button>
            <div className="hide-scrollbar mt-[6vh] max-h-[55vh]">
              {aiContext.conversations
                .slice()
                .reverse()
                .map((convo, index) => (
                  <Link key={index} to={`/chat/${aiContext.conversations.length - 1 - index}`}>
                    <ChatItem convo={convo} />
                  </Link>
                ))}
            </div>
            <div className="mt-[6vh] flex flex-col font-londrina gap-3 pl-2">
              <Link to='/' className='hover:bg-yawn-dark-purple pl-1 rounded-lg'>Integrations</Link>
              <Link to='/' className='hover:bg-yawn-dark-purple pl-1 rounded-lg'>Settings</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
