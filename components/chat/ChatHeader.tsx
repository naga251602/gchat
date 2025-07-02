// components/chat/ChatHeader.tsx
"use client";

import React from 'react';

interface ChatHeaderProps {
  chatName?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ chatName = "General Chat" }) => {
  return (
    <header className="bg-gray-800 p-4 border-b border-gray-700 shadow-md flex items-center justify-between z-10">
      <h1 className="text-xl font-bold text-white">{chatName}</h1>
    </header>
  );
};

export default ChatHeader;