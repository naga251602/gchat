// components/chat/ChatMessage.tsx
"use client";

import React from 'react';
import { Message } from '@/interfaces';

interface ChatMessageProps {
  message: Message;
  currentUserUid: string | undefined;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, currentUserUid }) => {
  const isCurrentUser = message.uid === currentUserUid;

  return (
    <div
      className={`flex items-start gap-3 ${
        isCurrentUser ? "justify-end" : "justify-start"
      }`}
    >
      {!isCurrentUser && message.photoURL && (
        <img
          src={message.photoURL}
          alt={`Profile picture of ${message.displayName}`}
          className="w-10 h-10 rounded-full flex-shrink-0 border border-gray-600 object-cover"
        />
      )}
      <div
        className={`p-4 rounded-xl max-w-lg ${
          isCurrentUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-gray-700 text-white rounded-bl-none"
        } shadow-md break-words`}
        role="status"
      >
        <p className="font-semibold text-sm mb-1 text-gray-200">
          {message.displayName}
        </p>
        <p className="text-base leading-relaxed">{message.text}</p>
        <span className="text-xs text-gray-300 block mt-1 opacity-80">
          {message.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      {isCurrentUser && message.photoURL && (
        <img
          src={message.photoURL}
          alt={`Profile picture of ${message.displayName}`}
          className="w-10 h-10 rounded-full flex-shrink-0 border border-gray-600 object-cover"
        />
      )}
    </div>
  );
};

export default ChatMessage;