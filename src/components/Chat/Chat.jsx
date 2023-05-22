import React from 'react';
import { useMultiChatLogic, MultiChatSocket, MultiChatWindow } from 'react-chat-engine-advanced';
import Header from '../customHeader/CustomHeader';
import StandardMessageForm from '../customMessageForm/standradMessageForm';
import Ai from '../customMessageForm/Ai';
import AiCode from '../customMessageForm/Aicode';
import AiAssist from '../customMessageForm/AiAssist';

const Chat = ({ user, secret }) => {
  const chatProps = useMultiChatLogic(import.meta.env.VITE_PROJECT_ID, user, secret);

  return (
    <div style={{ flexBasis: '100%' }}>
      <MultiChatSocket {...chatProps} />

      <MultiChatWindow
        {...chatProps}
        style={{ height: '100vh' }}
        renderChatHeader={(chat) => <Header chat={chat} />} // Custom component for rendering the chat header
        renderMessageForm={(props) => {
          if (chatProps.chat?.title.startsWith('AiChat_')) {
            return <Ai props={props} activeChat={chatProps.chat} />; // Custom component for rendering AI chat messages
          }
          if (chatProps.chat?.title.startsWith('AiCode_')) {
            return <AiCode props={props} activeChat={chatProps.chat} />; // Custom component for rendering AI code messages
          }
          if (chatProps.chat?.title.startsWith('AiAssist_')) {
            return <AiAssist props={props} activeChat={chatProps.chat} />; // Custom component for rendering AI assistant messages
          }

          return <StandardMessageForm props={props} activeChat={chatProps.chat} />; // Default component for rendering standard message form
        }}
      />
    </div>
  );
};

export default Chat;
