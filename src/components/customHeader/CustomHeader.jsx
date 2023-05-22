import React from 'react';
import {ChatBubbleLeftRightIcon, PhoneIcon} from '@heroicons/react/24/solid';

const CustomHeader = ({chat}) => {
  return (
    <div className="chat-header">
      {/* Header with chat title */}
      <div className="flexbetween">
        <ChatBubbleLeftRightIcon className="icon-chat" />
        <h3 className="header-text">{chat.title}</h3>
      </div>

      {/* Header with chat description */}
      <div className="flexbetween">
        <PhoneIcon className="icon-phone" />

        {/* Check if chat description is '⬅️ ⬅️ ⬅️' */}
        {chat.description !== '⬅️ ⬅️ ⬅️'
          ? <p className="header-text">{chat.description}</p>
          : <p className="header-text">no chat selected</p>}
      </div>
    </div>
  );
};

export default CustomHeader;
