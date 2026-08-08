"use client";
import { useSocket } from "@/context/SocketContext";
import Button from "@/ui/Button";
import Input from "@/ui/Input";
import UserCard from "@/ui/UserCard";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";

export default function ChatRoom({ currentUserId, recipientId, userMessages }) {
  const socket = useSocket();
  // 1. Initialize state with userMessages (the history)
  const [messages, setMessages] = useState(userMessages || []);
  const [input, setInput] = useState("");

  // Ref to keep track of the last message ID to avoid duplicates
  const lastMessageId = useRef(
    userMessages?.[userMessages.length - 1]?._id || null,
  );

  useEffect(() => {
    if (!socket) return;

    // 1. Register user
    socket.emit("register", currentUserId);

    const handleReceiveMessage = (data) => {
      // ✅ CRITICAL: Check if this message is already in the list
      // This prevents duplicates if the socket event fires twice or if the parent re-renders
      if (data._id && lastMessageId.current === data._id) {
        return;
      }

      setMessages((prev) => [...prev, data]);
      lastMessageId.current = data._id; // Update the ref

      console.log("Message received: ", data);
    };

    // 2. Listen for incoming messages
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket, currentUserId]);

  // ✅ Sync state if userMessages prop changes (e.g. from parent re-fetch)
  useEffect(() => {
    if (userMessages) {
      setMessages(userMessages);
      if (userMessages.length > 0) {
        lastMessageId.current = userMessages[userMessages.length - 1]._id;
      }
    }
  }, [userMessages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !socket) return;

    if (!recipientId) {
      alert("No recipient id");
      return;
    }

    // Emit to backend
    socket.emit("send_message", {
      recipientId: recipientId.toString(),
      content: input,
    });

    // Optimistic UI update (optional, but good for speed)
    // If you do this, you must ensure the socket event doesn't add it again
    const tempMessage = {
      _id: `temp-${Date.now()}`, // Temporary ID
      content: input,
      sender: currentUserId,
      recipient: recipientId,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, tempMessage]);

    setInput("");
  };

  return (
    <main className="bg-white p-6">
      <section className="mb-8 h-125 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No messages yet. Say hello!
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg._id || `temp-${msg._id}`} // Use _id or temp ID
              className={`flex flex-col mb-3 ${
                msg.sender._id === currentUserId ? "items-end" : "items-start"
              }`}
            >
              <div
                className={`py-2 px-4 rounded-2xl max-w-[80%] shadow ${
                  msg.sender._id === currentUserId
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <span className="block text-sm font-bold mb-1">
                  from:{" "}
                  {msg.sender._id === currentUserId ? "You" : msg.sender.email}
                </span>
                <span className={``}>{msg.content}</span>
              </div>
            </div>
          ))
        )}
      </section>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="border border-gray-300 px-4 py-2 rounded-xl flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Send
        </button>
      </form>
    </main>
  );
}
