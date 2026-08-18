"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/actions/authActions";
import api from "@/lib/api";
import {
  LogOut,
  User,
  Calendar,
  Mail,
  ShieldCheck,
  Settings,
} from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Button from "@/ui/Button";

export default function ProfileSettings() {
  const router = useRouter();
  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMyProfile,
  });

  const onLogout = async () => {
    try {
      await api.post("/dashboard/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  if (isLoading)
    return (
      <div className="p-10 text-center text-gray-500">Loading profile...</div>
    );

  const userData = user?.userData;
  const joinDate = new Date(userData?.createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-black text-gray-900">Account Settings</h1>
        <Settings className="text-gray-400" size={24} />
      </div>

      <div className="space-y-6">
        {/* Profile Card */}
        <div className="bg-white border border-gray-100 shadow-sm rounded-3xl overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          <div className="px-6 pb-6">
            <div className="relative -top-12 flex items-end justify-between">
              <div className="p-1 bg-white rounded-[2rem]">
                <div className="w-24 h-24 bg-gray-100 rounded-[1.8rem] flex items-center justify-center text-blue-600">
                  <User size={48} />
                </div>
              </div>
              <Button
                onClick={onLogout}
                variant="secondary"
                className="mb-2 !text-red-600 !bg-red-50 hover:!bg-red-100"
              >
                <LogOut size={18} />
                Logout
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {userData?.email.split("@")[0]}
                </h2>
                <p className="text-gray-500 text-sm">Full access account</p>
              </div>

              <hr className="border-gray-50" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-500 shadow-sm">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      Email Address
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {userData?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-green-500 shadow-sm">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">
                      Member Since
                    </p>
                    <p className="text-sm font-medium text-gray-700">
                      {joinDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security / Info Section */}
        <div className="bg-blue-50 rounded-2xl p-4 flex items-start gap-4 border border-blue-100">
          <ShieldCheck className="text-blue-600 mt-1" size={24} />
          <div>
            <h3 className="font-bold text-blue-900 text-sm">
              Privacy & Security
            </h3>
            <p className="text-xs text-blue-700/70 mt-1 leading-relaxed">
              Your conversations are encrypted. Only you and the people you vibe
              with can read them. We never share your personal data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
