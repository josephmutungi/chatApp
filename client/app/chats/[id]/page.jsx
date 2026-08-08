"use client";
import { getAllConversations } from "@/actions/conversationsActions";
import ChatRoom from "@/components/ChatRoom";
import api from "@/lib/api";
import UserCard from "@/ui/UserCard";
import { useQuery } from "@tanstack/react-query";
import { User, UserCheck2 } from "lucide-react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";

export default function UserDetails() {
  const params = useParams();
  const userId = params.id;

  const searchParams = useSearchParams();
  const recipientId = searchParams.get("recipientId");

  const {
    data: userInfo,
    isLoading,
    error: userError,
  } = useQuery({
    //  Ensure the queryKey includes the ID so React Query doesn't cache the wrong user
    queryKey: ["user", userId],
    queryFn: async () => {
      try {
        const res = await api.get(`/users/${userId}`);
        return res.data;
      } catch (error) {
        console.error(error?.response?.data?.error);
        return false;
      }
    },
  });

  const {
    data: msgs,
    isLoading: msgsLoading,
    error: msgsError,
  } = useQuery({
    queryKey: ["conversationMessages", recipientId],
    queryFn: async () => {
      if (!recipientId) return;
      const res = await api.get(
        `/dashboard/messages/conversations/history?userId2=${recipientId}`,
      );
      return res.data.messages;
    },
  });

  const user = userInfo;

  console.log(msgs);

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="h-screen bg-white flex flex-col fixed w-full">
      <div className="h-screen mx-auto md:w-3xl space-y-8 scrollbar-none overflow-y-auto">
        <h1 className="p-3 bg-blue-700  text-white font-extrabold mb-8 rounded-md">
          Chat with {recipientId}
        </h1>
        <div>
          <ChatRoom
            currentUserId={user._id}
            recipientId={recipientId}
            userMessages={msgs}
          />
        </div>
      </div>
    </div>
  );
}
