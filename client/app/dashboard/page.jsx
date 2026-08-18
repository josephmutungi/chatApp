"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { getMyProfile } from "@/actions/authActions";
import ChatCard from "@/components/ChatCard";
import ChatRoom from "@/components/ChatRoom";
import { MessageSquareQuote } from "lucide-react";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("recipientId");

  const { data: profileRes, isLoading: profileLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMyProfile,
  });

  const { data: msgsRes, isLoading: msgsLoading } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => api.get("/dashboard/messages/conversations"),
  });

  const user = profileRes?.userData;
  const conversations = msgsRes?.data?.results;

  if (profileLoading || msgsLoading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 font-medium">
            Loading messages...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col md:flex-row h-[75vh]">
      {/* Conversations List Sidebar */}
      <div className="w-full md:w-80 border-r border-gray-100 flex flex-col bg-gray-50/50">
        <div className="p-4 border-b border-gray-100 bg-white">
          <h2 className="font-bold text-gray-900">Messages</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-200">
          {conversations?.length > 0 ? (
            conversations.map((conv) => (
              <ChatCard
                key={conv.user._id}
                recipientId={conv.user._id}
                conversation={conv}
                currentUserId={user?._id}
                isActive={recipientId === conv.user._id}
              />
            ))
          ) : (
            <div className="text-center py-10 px-4">
              <p className="text-sm text-gray-400">No conversations yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {recipientId ? (
          <ChatRoom currentUserId={user?._id} recipientId={recipientId} />
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-gray-50/30">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <MessageSquareQuote size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">Select a chat</h3>
            <p className="text-sm text-gray-500 max-w-xs mt-1">
              Choose a conversation from the left to start vibing with your
              friends.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
