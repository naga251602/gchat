// interfaces/index.ts
import { Timestamp } from "firebase/firestore";

export interface Message {
  id: string;
  text: string;
  uid: string;
  displayName: string;
  photoURL: string;
  createdAt: Timestamp; // Firebase Timestamp type
}

export interface UserStatus {
  displayName: string;
  isTyping: boolean;
  lastActive: Timestamp;
  photoURL?: string;
}