"use client";
import { getMyProfile } from "@/actions/authActions";
import api from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { LogOutIcon, User } from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

export default function ProfileSettings() {
  const {
    data: user,
    loading: loadingUser,
    error: userError,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMyProfile,
  });

  const onLogout = async () => {
    try {
      const res = await api.post("/dashboard/logout");
      if (res) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loadingUser) {
    return (
      <div>
        <p>Loading user data...</p>
      </div>
    );
  }
  return (
    <div>
      <div>
        <h1>Profile Settings</h1>
        <div className="p-6 bg-white shadow-md border border-gray-200 rounded-2xl space-y-3">
          <div>
            <User />
          </div>
          <p className="flex flex-col">
            <span>{user.userData.email}</span>
            <span>
              Member since{" "}
              <strong>
                {new Date(user.userData.createdAt).toLocaleString()}
              </strong>
            </span>
          </p>
          <button
            type="button"
            onClick={onLogout}
            className="flex gap-2 px-6 py-1 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md"
          >
            <LogOutIcon /> <span> Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
