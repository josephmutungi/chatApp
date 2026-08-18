"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllUsers } from "@/actions/usersActions";
import { getMyProfile } from "@/actions/authActions";
import UserCard from "@/ui/UserCard";
import { Search, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

function FriendsPages() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: users, isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: 1000 * 60 * 5,
  });

  const { data: user, isLoading: loadingUser } = useQuery({
    queryKey: ["me"],
    queryFn: getMyProfile,
  });

  if (loadingUsers || loadingUser) {
    return (
      <div className="p-10 flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 animate-pulse">Finding your tribe...</p>
      </div>
    );
  }

  // Filter users based on search (excluding self)
  const filteredUsers = users?.filter((u) => {
    const matchesSearch = u.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isNotMe = u._id !== user?.userData?._id;
    return matchesSearch && isNotMe;
  });

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-2">
            Explore <Sparkles className="text-yellow-500" size={24} />
          </h1>
          <p className="text-gray-500">Connect with people on Lets Vibe</p>
        </div>

        <div className="relative group">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all w-full md:w-64"
          />
        </div>
      </div>

      {/* Users Grid */}
      {filteredUsers?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredUsers.map((u, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={u._id}
            >
              <UserCard user={u} currentUserId={user.userData._id} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
          <Users className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 font-medium">
            No users found matching {searchTerm}
          </p>
        </div>
      )}
    </div>
  );
}

export default FriendsPages;
