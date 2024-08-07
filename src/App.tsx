import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home/Home';
import { ChatPage } from './pages/Chat/Chat';
import { ErrorPage } from './pages/Error/Error';
import { AboutPage } from './pages/About/About';
import { Layout } from './pages/Layout';
import { AIContextProvider } from './context/ai-context';
import { ChatLayout } from './pages/ChatLayout';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
    ],
  },
  {
    path: '/',
    errorElement: <ErrorPage />,
    element: <ChatLayout />,
    children: [
      { path: '/chat/:chatId', element: <ChatPage /> },
    ],
  },
]);

function App() {
  return (
    <AIContextProvider>
      <RouterProvider router={router} />
    </AIContextProvider>
  );
}

export default App;
