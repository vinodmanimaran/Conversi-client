import React, {useState} from 'react';
import {usePostAiTextMutation} from '../../state/api';
import MessageFormUI from './MessageFormUI';

const Ai = ({props, activeChat}) => {
  const [message, setMessage] = useState ('');
  const [attachment, setAttachment] = useState ('');
  const [trigger] = usePostAiTextMutation ();

  const handleChange = e => setMessage (e.target.value);

  const handleSubmit = async () => {
    // Generate a timestamp for the message
    const date = new Date ()
      .toISOString ()
      .replace ('T', ' ')
      .replace ('Z', `${Math.floor (Math.random () * 1000)}+00:00`);

    // Prepare the message form data
    const attachments = attachment
      ? [{blob: attachment, file: attachment.name}]
      : [];
    const form = {
      attachments,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    // Call the onSubmit function from props
    props.onSubmit (form);

    // Trigger the API mutation for AI text
    trigger (form);

    // Clear the message and attachment inputs
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

export default Ai;
