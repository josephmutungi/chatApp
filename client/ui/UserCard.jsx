"use client";
import React from "react";
import { UserCircle2, MessageCircle, User } from "lucide-react";
import Link from "next/link";

export default function UserCard({ user, currentUserId }) {
  const isMe = user._id === currentUserId;

  // Extract a "display name" from the email
  const displayName = user.email.split("@")[0];

  return (
    <div className="group bg-white border border-gray-100 p-4 rounded-3xl flex items-center justify-between shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200">
      <div className="flex items-center gap-4">
        {/* Avatar Section */}
        <div className="relative">
          <div
            className={`
            w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105
            ${isMe ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"}
          `}
          >
            {isMe ? <User size={28} /> : <UserCircle2 size={28} />}
          </div>
          {/* Mock Online Status Dot */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-white rounded-full"></div>
        </div>

        {/* User Info */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-900 capitalize">
              {displayName}
            </h3>
            {isMe && (
              <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                You
              </span>
            )}
          </div>
          <p className="text-xs text-gray-500 truncate max-w-[150px]">
            {user.email}
          </p>
        </div>
      </div>

      {/* Action Section */}
      <div className="flex items-center gap-3">
        {!isMe ? (
          <Link
            href={`/chats/${currentUserId}?recipientId=${user._id}`}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-100"
          >
            <MessageCircle size={16} />
            <span className="hidden sm:inline">Message</span>
          </Link>
        ) : (
          <Link
            href="/dashboard/profile"
            className="p-2 text-gray-400 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <span className="text-xs font-bold mr-2">Edit</span>
          </Link>
        )}
      </div>
    </div>
  );
}
