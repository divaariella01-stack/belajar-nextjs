// context/UserContext.jsx
"use client";

import { createContext, useContext, useState } from "react";

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [search, setSearch] = useState("");

  const value = {
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
    submitted,
    setSubmitted,
    search,
    setSearch,
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser harus dipakai di dalam <UserProvider>");
  }

  return context;
}