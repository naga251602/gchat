// components/chat/MessageList.tsx
"use client";

import React, { useRef, useEffect } from 'react';
import { Message } from '@/interfaces';
import ChatMessage from './ChatMessage';

interface MessageListProps {
  messages: Message[];
  currentUserUid: string | undefined;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUserUid }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div
      className="flex-1 p-4 overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800"
      role="log"
      aria-live="polite"
      aria-atomic="false"
    >
      {messages.map((msg) => (
        <ChatMessage
          key={msg.id}
          message={msg}
          currentUserUid={currentUserUid}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;