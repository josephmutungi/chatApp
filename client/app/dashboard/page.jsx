"use client";
import { getMyProfile } from "@/actions/authActions";
import ChatCard from "@/components/ChatCard";
import ChatRoom from "@/components/ChatRoom";
import Form from "@/components/Form";
import api from "@/lib/api";
import Input from "@/ui/Input";
import UserCard from "@/ui/UserCard";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ChatPage() {
  const searchParams = useSearchParams();
  const recipientId = searchParams.get("recipientId");
  const [oddMessages, setOddMessages] = useState([]);

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMyProfile,
  });

  const {
    data: msgs,
    isLoading: msgsLoading,
    error: msgsError,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: () => {
      const res = api.get("/dashboard/messages/conversations");
      return res;
    },
  });

  const conversations = msgs?.data?.results;
  // console.log(conversations);

  if (msgsLoading)
    return (
      <div className="p-10 flex justify-center items-center">
        Loading user data and messages
      </div>
    );

  const user = response?.userData;

  // Show loading state while fetching user
  if (isLoading || !user?._id) {
    return <p>Loading chat...</p>;
  }

  return (
    <div className="bg-white">
      <div className="flex gap-8 flex-col">
        {conversations?.map((conversation) => (
          <ChatCard
            key={conversation.user._id}
            recipientId={conversation.user._id}
            conversation={conversation}
            currentUserId={user._id}
          />
        ))}
      </div>
      <ChatRoom
        currentUserId={user?._id}
        recipientId={recipientId}
        // userMessages={oddMessages}
      />
      {/* <UserCard user={user} currentUserId={user._id} /> */}
    </div>
  );
}
