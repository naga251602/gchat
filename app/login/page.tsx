// app/login/page.tsx
"use client"; // IMPORTANT: This makes it a Client Component

import { useAuth } from "@/context/AuthContext"; // Use @/ alias
import { useRouter } from "next/navigation"; // Use 'next/navigation' for App Router
import { useEffect } from "react";

const LoginPage = () => {
  const { user, signInWithGoogle, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/"); // Redirect to home page if already logged in
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen bg-gray-900 text-white"
        role="status"
        aria-live="polite"
        aria-label="Loading authentication state"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 px-4 py-8">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg text-center border border-gray-700">
        <h1 className="text-3xl font-extrabold text-white mb-6">
          Welcome to ChatApp
        </h1>
        <p className="text-gray-300 mb-8 text-lg">
          Sign in to start chatting with your friends!
        </p>
        <button
          onClick={signInWithGoogle}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-3 w-full transition duration-200 ease-in-out transform hover:scale-105"
          aria-label="Sign in with Google"
        >
          {/* Add a Google logo SVG to your public folder */}
          <img src="data:image/png;base64,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" alt="Google Logo" className="w-6 h-6" aria-hidden="true" />{" "}
          Sign in with Google
        </button>
        <p className="text-gray-500 text-sm mt-6">
            By signing in, you agree to our <a href="#" className="underline text-blue-400 hover:text-blue-500">Terms of Service</a> and <a href="#" className="underline text-blue-400 hover:text-blue-500">Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;