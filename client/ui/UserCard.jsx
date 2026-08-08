"use client";
import { UserCheck2, UserCircle2Icon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function UserCard({ user, currentUserId }) {
  return (
    <div className="bg-gray-100 py-2 px-6 rounded-2xl w-90 flex shadow-md relative">
      <div className="gap-2">
        <div className="p-1.5 rounded-full text-center">
          <UserCircle2Icon size={40} />
          <div className="flex justify-between w-full relative">
            <p className="text-xs font-bold text-gray-600">{user.email}</p>
          </div>
        </div>
      </div>
      <p className="text-xs font-extrabold text-gray-700 absolute top-0 right-2 rounded-2xl">
        <span>ID: </span>
        {user._id === currentUserId ? "Me" : user._id.slice(0, 10)}
      </p>
      <div className="absolute bottom-3 right-4">
        <Link
          href={`/chats/${currentUserId}?recipientId=${user._id}`}
          className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl right-0"
        >
          message
        </Link>
      </div>
    </div>
  );
}
