import {usePostAiCodeMutation} from '../../state/api';
import React, {useState} from 'react';
import MessageFormUI from './MessageFormUI';

const AiCode = ({props, activeChat}) => {
  // State variables
  const [message, setMessage] = useState ('');
  const [attachment, setAttachment] = useState ('');
  const [triggerCode] = usePostAiCodeMutation ();

  // Event handler for input change
  const handleChange = e => {
    setMessage (e.target.value);
  };

  // Event handler for form submission
  const handleSubmit = async () => {
    const date = new Date ()
      .toISOString ()
      .replace ('T', ' ')
      .replace ('Z', `${Math.floor (Math.random () * 1000)}+00:00`);
    const at = attachment ? [{blob: attachment, file: attachment.name}] : [];

    // Create form object with input values
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    // Call the onSubmit function from props (if provided)
    props.onSubmit (form);

    // Trigger the code mutation
    triggerCode (form);

    // Reset form fields
    setMessage ('');
    setAttachment ('');
  };

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default AiCode;
