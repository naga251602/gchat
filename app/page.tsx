// app/page.tsx (located in your root `app` directory)
"use client"; // IMPORTANT: This makes it a Client Component

import { useAuth } from "@/context/AuthContext";
import { useEffect, useState, FormEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/firebase/init";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { Message, UserStatus } from "@/interfaces";

// Import the new components from your 'components' directory
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatHeader from "@/components/chat/ChatHeader";
import MessageList from "@/components/chat/MessageList";
import TypingIndicator from "@/components/chat/TypingIndicator";
import ChatInputForm from "@/components/chat/ChatInputForm";

const TYPING_DEBOUNCE_TIME = 3000;

const HomePage = () => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // Fetch real-time chat messages
  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "messages"),
        orderBy("createdAt"),
        limit(100)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const msgs: Message[] = [];
        snapshot.forEach((doc) => {
          msgs.push({ id: doc.id, ...doc.data() } as Message);
        });
        setMessages(msgs);
      }, (error) => {
        console.error("Error fetching messages:", error);
      });
      return () => unsubscribe();
    }
  }, [user]);

  // Typing Indicator Logic & User Presence/Activity
  useEffect(() => {
    if (!user) return;

    // Listen for other users' typing status
    const usersRef = collection(db, "users");
    const unsubscribeTyping = onSnapshot(usersRef, (snapshot) => {
      const currentlyTyping: string[] = [];
      const now = Timestamp.now();
      snapshot.forEach((d) => {
        const userData = d.data() as UserStatus;
        if (
          d.id !== user.uid &&
          userData.isTyping &&
          userData.lastActive &&
          now.seconds - userData.lastActive.seconds < (TYPING_DEBOUNCE_TIME / 1000) + 5
        ) {
          currentlyTyping.push(userData.displayName || "Someone");
        }
      });
      setTypingUsers(currentlyTyping);
    }, (error) => {
      console.error("Error fetching typing status:", error);
    });

    // Update current user's lastActive status periodically
    const updateActivity = async () => {
        if (user) {
            await setDoc(doc(db, "users", user.uid), {
                lastActive: serverTimestamp(),
                displayName: user.displayName || user.email,
                photoURL: user.photoURL || "",
            }, { merge: true });
        }
    };
    updateActivity();
    const activityInterval = setInterval(updateActivity, 10000);

    return () => {
        unsubscribeTyping();
        clearInterval(activityInterval);
        if (user) {
            setDoc(doc(db, "users", user.uid), { isTyping: false }, { merge: true }).catch(console.error);
        }
    };
  }, [user]);

  const handleTyping = async () => {
    if (!user) return;

    if (!isTyping) {
      setIsTyping(true);
      await setDoc(doc(db, "users", user.uid), {
        isTyping: true,
        displayName: user.displayName || user.email,
        photoURL: user.photoURL,
        lastActive: serverTimestamp(),
      }, { merge: true });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(async () => {
      setIsTyping(false);
      await setDoc(doc(db, "users", user.uid), {
        isTyping: false,
        lastActive: serverTimestamp(),
      }, { merge: true });
    }, TYPING_DEBOUNCE_TIME);
  };

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "" || !user) return;

    const { uid, displayName, photoURL } = user;

    try {
      await addDoc(collection(db, "messages"), {
        text: newMessage.trim(),
        createdAt: serverTimestamp(),
        uid,
        displayName: displayName || "Anonymous",
        photoURL: photoURL || "",
      });
      setNewMessage("");
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      setIsTyping(false);
      await setDoc(doc(db, "users", user.uid), {
        isTyping: false,
        lastActive: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  if (loading || !user) {
    return null; // Handled by app/loading.tsx and router redirect
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans overflow-hidden">
      <ChatSidebar
        user={user}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        onLogout={logout}
      />

      <main className="flex-1 flex flex-col bg-gray-900 overflow-hidden">
        <ChatHeader chatName="General Chat" />

        <MessageList messages={messages} currentUserUid={user.uid} />

        <TypingIndicator typingUsers={typingUsers} />

        <ChatInputForm
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          handleTyping={handleTyping}
          sendMessage={sendMessage}
        />
      </main>
    </div>
  );
};

export default HomePage;