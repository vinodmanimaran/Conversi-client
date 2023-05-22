import { usePostAiAssistMutation } from "../../state/api";
import React, { useEffect, useState } from "react";
import MessageFormUI from "./MessageFormUI";

// Custom hook for debouncing a value
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

const AiAssist = ({ props, activeChat }) => {
  const [message, setMessage] = useState("");
  const [attachment, setAttachment] = useState("");
  const [triggerAssist, resultAssist] = usePostAiAssistMutation();
  const [appendText, setAppendText] = useState("");

  // Event handler for input change
  const handleChange = (e) => setMessage(e.target.value);

  // Event handler for form submission
  const handleSubmit = async () => {
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.floor(Math.random() * 1000)}+00:00`);
    const at = attachment ? [{ blob: attachment, file: attachment.name }] : [];
    const form = {
      attachments: at,
      created: date,
      sender_username: props.username,
      text: message,
      activeChatId: activeChat.id,
    };

    // Call onSubmit callback
    props.onSubmit(form);

    // Clear input fields
    setMessage("");
    setAttachment("");
  };

  // Debounce the message value to reduce API calls
  const debouncedValue = useDebounce(message, 1000);

  useEffect(() => {
    if (debouncedValue) {
      const form = { text: message };
      // Trigger the API call for AI assistance
      triggerAssist(form);
    }
  }, [debouncedValue]); // eslint-disable-line

  // Event handler for keydown (Enter and Tab key)
  const handleKeyDown = (e) => {
    if (e.keyCode === 9 || e.keyCode === 13) {
      e.preventDefault();
      // Append the received text from AI to the current message
      setMessage(`${message} ${appendText}`);
    }
    setAppendText("");
  };

  useEffect(() => {
    if (resultAssist.data?.text) {
      // Store the received text from AI to be appended to the message
      setAppendText(resultAssist.data?.text);
    }
  }, [resultAssist]); // eslint-disable-line

  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      appendText={appendText}
      handleKeyDown={handleKeyDown}
    />
  );
};

export default AiAssist;
