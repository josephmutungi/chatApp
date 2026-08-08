"use client";
import { User } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function ChatCard({ recipientId, conversation, currentUserId }) {
  return (
    <div className="flex">
      <Link
        href={`/chats/${currentUserId}?recipientId=${recipientId}`}
        className="relative w-90"
      >
        <div key={conversation?.user._id} className="flex items-center">
          <div className="bg-blue-600 rounded-full h-15 w-15 flex justify-center items-center  text-white">
            <User />
          </div>
          <p className="text-xs absolute top-1 left-1/6 font-bold text-gray-600">
            {conversation.user.email}
          </p>
          <p className="font-serif px-6 text-center absolute bottom-2 left-1/8 text-xs md:text-sm">
            {conversation?.lastMessage}
          </p>
          <p className="text-xs font-extrabold text-gray-700 absolute right-1 top-1/2">
            {new Date(conversation?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </Link>
    </div>
  );
}
