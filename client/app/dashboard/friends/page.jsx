"use client";
import { getMyProfile } from "@/actions/authActions";
import { getAllUsers } from "@/actions/usersActions";
import UserCard from "@/ui/UserCard";
import { useQuery } from "@tanstack/react-query";
import { div } from "framer-motion/client";
import React from "react";

function FriendsPages() {
  const {
    data: users,
    loading: loadingUsers,
    error: usersError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: 1000 * 60 * 60 * 5,
    retry: true,
  });

  const {
    data: user,
    loading: loadingUser,
    error: userError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMyProfile,
  });

  if (loadingUsers || loadingUser) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="">
      <div className="">
        <h1 className="text-2xl m-5 font-extrabold text-gray-700">
          Start chat with friends
        </h1>
        <div className="flex gap-4 flex-col">
          {users?.map((u) => (
            <UserCard key={u._id} user={u} currentUserId={user.userData._id} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FriendsPages;
