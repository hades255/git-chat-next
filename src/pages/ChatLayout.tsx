import { ChatContainer } from '../components/Container/ChatContainer';
import { Outlet } from 'react-router-dom';

export const ChatLayout = () => {
  return (
    <ChatContainer>
      <Outlet />
    </ChatContainer>
  );
};
