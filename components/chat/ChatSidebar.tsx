// components/chat/ChatSidebar.tsx
"use client";

import React from 'react';
import { User } from 'firebase/auth';

interface ChatSidebarProps {
  user: User;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  onLogout: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  user,
  isSidebarOpen,
  setIsSidebarOpen,
  onLogout,
}) => {
  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button
        className="md:hidden absolute top-4 right-4 z-50 p-2 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-controls="sidebar"
        aria-expanded={isSidebarOpen}
        aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {isSidebarOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        )}
      </button>

      <aside
        id="sidebar"
        className={`fixed inset-y-0 left-0 w-64 bg-gray-800 p-4 flex flex-col justify-between transform transition-transform duration-300 ease-in-out z-40
          md:relative md:translate-x-0 md:flex-none md:w-1/4
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Chat sidebar"
      >
        <div>
          <h2 className="text-3xl font-extrabold mb-6 text-blue-400">ChatApp</h2>
          <div className="flex items-center mb-6 p-2 bg-gray-700 rounded-lg">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt={`Profile picture of ${user.displayName || user.email}`}
                className="w-12 h-12 rounded-full mr-3 border-2 border-blue-500 object-cover"
              />
            )}
            <div>
              <p className="font-semibold text-lg">{user.displayName || user.email}</p>
              <p className="text-gray-400 text-sm">Online</p>
            </div>
          </div>
          <h3 className="text-lg font-bold text-gray-300 mb-3">Online Users</h3>
          <ul className="space-y-2">
            <li>
                <div className="flex items-center text-gray-300">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full mr-2"></span>
                    Current User
                </div>
            </li>
          </ul>
        </div>
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 active:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 text-white font-bold py-3 px-6 rounded-md w-full transition duration-200 ease-in-out transform hover:scale-105"
          aria-label="Logout"
        >
          Logout
        </button>
      </aside>
    </>
  );
};

export default ChatSidebar;