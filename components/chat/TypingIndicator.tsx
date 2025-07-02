// components/chat/TypingIndicator.tsx
"use client";

import React from 'react';

interface TypingIndicatorProps {
  typingUsers: string[];
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ typingUsers }) => {
  if (typingUsers.length === 0) {
    return null;
  }

  return (
    <div
      className="p-2 text-gray-400 text-sm italic border-t border-gray-700 bg-gray-800"
      role="status"
      aria-live="polite"
    >
      {typingUsers.join(", ")} {typingUsers.length === 1 ? "is" : "are"} typing...
    </div>
  );
};

export default TypingIndicator;