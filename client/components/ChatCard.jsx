"use client";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ChatCard({
  recipientId,
  conversation,
  currentUserId,
  isActive,
}) {
  // Simple check for unread or time formatting
  const formattedDate = new Date(conversation?.createdAt).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  return (
    <Link
      href={`/chats/${currentUserId}?recipientId=${recipientId}`}
      className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 ${
        isActive ? "bg-blue-50" : "hover:bg-gray-50"
      }`}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl h-14 w-14 flex justify-center items-center text-white shadow-md">
          <User size={28} />
        </div>
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-baseline mb-1">
          <h3 className="text-sm font-bold text-gray-900 truncate">
            {conversation.user.email.split("@")[0]}{" "}
            {/* Show name part of email */}
          </h3>
          <span className="text-[10px] font-medium text-gray-400 uppercase tracking-tighter">
            {formattedDate}
          </span>
        </div>
        <p className="text-sm text-gray-500 truncate leading-tight">
          {conversation?.lastMessage || "Start a conversation..."}
        </p>
      </div>
    </Link>
  );
}
