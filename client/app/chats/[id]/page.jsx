"use client";
import React from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, MoreVertical, Phone, Video } from "lucide-react";
import ChatRoom from "@/components/ChatRoom";
import api from "@/lib/api";

export default function UserDetails() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("recipientId");

  const { data: userInfo, isLoading: userLoading } = useQuery({
    queryKey: ["user", recipientId],
    queryFn: async () => {
      const res = await api.get(`/users/${recipientId}`);
      return res.data;
    },
    enabled: !!recipientId,
  });

  const { data: messages, isLoading: msgsLoading } = useQuery({
    queryKey: ["conversationMessages", recipientId],
    queryFn: async () => {
      const res = await api.get(
        `/dashboard/messages/conversations/history?userId2=${recipientId}`,
      );
      return res.data.messages;
    },
    enabled: !!recipientId,
  });

  if (userLoading || msgsLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-2">
          <div className="w-10 h-10 bg-gray-200 rounded-full" />
          <div className="h-2 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col h-full bg-white overflow-hidden md:w-4xl mx-auto">
      {/* Chat Header Bar */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="md:hidden p-1">
            <ChevronLeft size={24} />
          </button>
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
            {userInfo?.email?.[0].toUpperCase()}
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900 leading-none">
              {userInfo?.email || "User"}
            </h2>
            <span className="text-[10px] text-green-500 font-medium">
              Online
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
            <Phone size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
            <Video size={18} />
          </button>
          <button className="p-2 text-gray-400 hover:bg-gray-50 rounded-lg transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>
      </header>

      {/* Chat Room Area */}
      <div className="flex-1 relative">
        <ChatRoom
          currentUserId={params.id} // Or however you get current user
          recipientId={recipientId}
          userMessages={messages}
        />
      </div>
    </div>
  );
}
