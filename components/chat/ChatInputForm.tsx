// components/chat/ChatInputForm.tsx
"use client";

import React, { FormEvent } from 'react';

interface ChatInputFormProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleTyping: () => void;
  sendMessage: (e: FormEvent) => void;
}

const ChatInputForm: React.FC<ChatInputFormProps> = ({
  newMessage,
  setNewMessage,
  handleTyping,
  sendMessage,
}) => {
  return (
    <form
      onSubmit={sendMessage}
      className="p-4 bg-gray-800 border-t border-gray-700 flex items-center gap-2 flex-wrap sm:flex-nowrap"
      aria-label="Send a message"
    >
      <label htmlFor="message-input" className="sr-only">Your message</label>
      <input
        id="message-input"
        type="text"
        value={newMessage}
        onChange={(e) => {
          setNewMessage(e.target.value);
          handleTyping();
        }}
        placeholder="Type your message..."
        className="flex-1 bg-gray-700 text-white p-3 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-base placeholder-gray-400 w-full sm:w-auto"
        aria-label="Message input field"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-6 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 w-full sm:w-auto"
        aria-label="Send message"
      >
        Send
      </button>
    </form>
  );
};

export default ChatInputForm;