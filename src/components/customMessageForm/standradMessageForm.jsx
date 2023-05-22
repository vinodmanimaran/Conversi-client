import React, {useState} from 'react';
import MessageFormUI from './MessageFormUI';

const StandardMessageForm = ({props, activeChat}) => {
  const [message, setMessage] = useState (''); // State variable for the message input
  const [attachment, setAttachment] = useState (''); // State variable for the attachment

  const handleChange = e => setMessage (e.target.value); // Event handler for message input change

  const handleSubmit = async () => {
    const date = new Date ()
      .toISOString ()
      .replace ('T', ' ')
      .replace ('Z', `${Math.floor (Math.random () * 1000)}+00:00`);

    const at = attachment ? [{blob: attachment, file: attachment.name}] : []; // Prepare the attachment data

    const form = {
      attachments: at, // Attachments data
      created: date, // Timestamp of the message creation
      sender_username: props.username, // Sender's username from props
      text: message, // Message content from the state
      activeChatId: activeChat.id, // ID of the active chat
    };

    props.onSubmit (form); // Submit the form using the onSubmit prop function
    setMessage (''); // Clear the message state
    setAttachment (''); // Clear the attachment state
  };

  return (
    <MessageFormUI
      setAttachment={setAttachment} // Function to set the attachment state
      message={message} // Current message value
      handleChange={handleChange} // Event handler for message input change
      handleSubmit={handleSubmit} // Event handler for form submission
    />
  );
};

export default StandardMessageForm;
