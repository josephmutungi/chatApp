"use client";
import { useSocket } from "@/context/SocketContext";
import { SendHorizontal, Smile } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

export default function ChatRoom({ currentUserId, recipientId, userMessages }) {
  const socket = useSocket();
  const [messages, setMessages] = useState(userMessages || []);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (!socket || !currentUserId) return;
    socket.emit("register", currentUserId);

    const handleReceiveMessage = (data) => {
      setMessages((prev) => {
        // 1. If we already have this specific DB ID, ignore it
        if (prev.some((m) => m._id === data._id)) return prev;

        // 2. Check if this is a response to a message WE just sent
        const senderId = data.sender._id || data.sender;
        const isFromMe = senderId === currentUserId;

        if (isFromMe) {
          // Find the index of the temporary message we added optimistically
          // We match by checking if ID starts with "temp-" and content is identical
          const tempIndex = prev.findIndex(
            (m) =>
              m._id.toString().startsWith("temp-") &&
              m.content === data.content,
          );

          if (tempIndex !== -1) {
            // CLONE the array and REPLACE the temp message with the real DB message
            const updatedMessages = [...prev];
            updatedMessages[tempIndex] = data;
            return updatedMessages;
          }
        }

        // 3. If it's a message from someone else, just add it to the end
        return [...prev, data];
      });
    };

    socket.on("receive_message", handleReceiveMessage);
    return () => socket.off("receive_message", handleReceiveMessage);
  }, [socket, currentUserId]);

  useEffect(() => {
    if (userMessages) setMessages(userMessages);
  }, [userMessages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || !socket || !recipientId) return;

    const payload = { recipientId: recipientId.toString(), content: input };
    socket.emit("send_message", payload);

    // Optimistic UI update
    setMessages((prev) => [
      ...prev,
      {
        _id: `temp-${Date.now()}`,
        content: input,
        sender: { _id: currentUserId },
        createdAt: new Date(),
      },
    ]);

    setInput("");
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Messages area */}
      <section
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-40">
            <p className="text-sm font-medium">No messages yet. Send a vibe!</p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = (msg.sender._id || msg.sender) === currentUserId;
            return (
              <div
                key={msg._id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                  max-w-[75%] px-4 py-2.5 rounded-2xl text-sm shadow-sm
                  ${
                    isMe
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }
                `}
                >
                  <p className="leading-relaxed">{msg.content}</p>
                  <p
                    className={`text-[9px] mt-1 opacity-60 text-right ${isMe ? "text-blue-100" : "text-gray-500"}`}
                  >
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Input area */}
      <form
        onSubmit={sendMessage}
        className="p-4 border-t border-gray-100 bg-white"
      >
        <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-2xl border border-gray-100 focus-within:border-blue-300 transition-all">
          <button
            type="button"
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Smile size={20} />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
          />
          <button
            type="submit"
            disabled={!input.trim()}
            className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 disabled:opacity-40 transition-all"
          >
            <SendHorizontal size={20} />
          </button>
        </div>
      </form>
    </div>
  );
}
