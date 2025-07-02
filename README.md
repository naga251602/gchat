# ChatApp: Real-time Messaging

ChatApp is a modern, real-time messaging application built with Next.js, Tailwind CSS, and Firebase. It offers a seamless chat experience with Google authentication and features like real-time typing indicators, showcasing best practices in web development.

---

## ✨ Features

* **Google Authentication:** Secure user login powered by Firebase Authentication.
* **Real-time Messaging:** Instant message delivery and display using Firebase Firestore.
* **Typing Indicator:** See when other users are actively typing messages.
* **Responsive UI:** Optimized user experience across various devices (mobile, tablet, desktop) using Tailwind CSS.
* **Accessibility Standards:** Built with web accessibility (WCAG principles) in mind, ensuring a broader audience can use the app.
* **Modular Component Structure:** Clean and maintainable codebase using Next.js App Router's component patterns.

---

## 🚀 Technologies Used

* **Next.js (App Router):** React framework for building fast web applications.
* **React:** JavaScript library for building user interfaces.
* **TypeScript:** Superset of JavaScript for type safety.
* **Tailwind CSS:** Utility-first CSS framework for rapid UI development.
* **Firebase:**
    * **Authentication:** For user authentication (Google Provider).
    * **Firestore:** NoSQL cloud database for real-time data storage (messages, user status).
* **ESLint:** For code quality and consistency.

---

## 📂 Folder Structure

The project follows a modular and clean folder structure, leveraging Next.js's App Router conventions:

my-chatapp/
├── app/                  # Next.js App Router core (routes, layouts, global styles)
│   ├── layout.tsx        # Root layout for the application
│   ├── loading.tsx       # Global loading fallback UI
│   ├── page.tsx          # Main chat interface page
│   ├── login/            # Route for the login page
│   │   └── page.tsx      # Login page component
│   └── globals.css       # Global Tailwind CSS imports and custom styles
├── components/           # Reusable UI components
│   ├── common/           # Generic components (e.g., LoadingSpinner)
│   │   └── LoadingSpinner.tsx
│   └── chat/             # Chat-specific UI components
│       ├── ChatHeader.tsx
│       ├── ChatInputForm.tsx
│       ├── ChatMessage.tsx
│       ├── ChatSidebar.tsx
│       ├── MessageList.tsx
│       └── TypingIndicator.tsx
├── context/              # React Context providers (e.g., AuthContext)
│   └── AuthContext.tsx
├── firebase/             # Firebase initialization and configuration
│   └── init.ts
├── interfaces/           # Shared TypeScript interfaces and types
│   └── index.ts
├── public/               # Static assets (images, favicons, etc.)
│   └── google-logo.svg
│   └── favicon.ico
├── utils/                # Utility functions and helpers
│   └── constants.ts
├── .env.local            # Environment variables (Firebase API keys)
├── package.json          # Project dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── ... (other config files like .eslintrc.json, postcss.config.js)



---

## 🚀 Getting Started

Follow these steps to get ChatApp up and running on your local machine.

### Prerequisites

* **Node.js** (v18.x or higher recommended)
* **npm** or **yarn** package manager
* A **Firebase Project**:
    * Create a new project in the [Firebase Console](https://console.firebase.google.com/).
    * Enable **Firestore Database**. Start in production mode (you'll set rules below).
    * Enable **Authentication** with the **Google** provider.