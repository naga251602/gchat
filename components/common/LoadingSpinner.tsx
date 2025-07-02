// components/common/LoadingSpinner.tsx
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-900 text-white"
      role="status"
      aria-live="polite"
      aria-label="Loading content"
    >
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      <p className="ml-4 text-xl">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;