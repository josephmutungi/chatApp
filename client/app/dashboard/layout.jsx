"use client";
import { getMyProfile } from "@/actions/authActions";
import { useQuery } from "@tanstack/react-query";
import { color } from "framer-motion";
import {
  CircleArrowDownIcon,
  MessageCircle,
  MessageCirclePlus,
  Settings2Icon,
  UserCheck2,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { HiHome } from "react-icons/hi2";
import { motion } from "framer-motion";
import api from "@/lib/api";
import { getAllUsers } from "@/actions/usersActions";
import UserCard from "@/ui/UserCard";
import { usePathname, useRouter } from "next/navigation";

const links = [
  {
    name: "Chat",
    icon: <MessageCirclePlus size={20} />,
    href: "/dashboard",
  },

  {
    name: "Friends",
    icon: <UserCheck2 size={20} />,
    href: "/dashboard/friends",
    color: "text-green-500",
  },
  {
    name: "Online",
    icon: <CircleArrowDownIcon size={20} />,
    href: "/dashboard/online",
  },
  {
    name: "Profile",
    icon: <UserCircle size={20} />,
    href: "/dashboard/profile",
  },
];

export default function AccountLayout({ children }) {
  const router = useRouter();
  const active = usePathname();

  const {
    data: response,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMyProfile,
  });

  const { data: resData, isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
  });
  const user = response?.userData || null;
  const users = resData?.resData;

  const onLogout = async () => {
    try {
      const res = await api.post("/dashboard/logout");
      alert(res.data.message);
      router.refresh("/dashboard");
      return true;
    } catch (error) {
      console.error(error?.response?.data?.error);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center text-3xl">
        Loading...
      </div>
    );
  }
  if (!user && !loading) {
    router.replace("/");
  }
  return (
    <div className="bg-white">
      {user && (
        <motion.main
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "linear" }}
          className="bg-white md:w-5xl mx-auto"
        >
          <section className="py-4 px-2 overflow-x-hidden">
            <div className="space-y-3 mb-4 py-4 px-3 bg-gray-100 rounded-t-md font-extrabold text-blue-600 uppercase">
              {user.email}
            </div>
            <div className="p-4 bg-white shadow-md flex  gap-5 text-xs md:text-sm rounded-2xl overflow-x-auto scrollbar-none">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`p-2 bg-gray-200 rounded-2xl flex justify-center items-center flex-col ${link.href === active ? "text-blue-600 font-bold" : "text-gray-700"}`}
                >
                  <span className="flex gap-2  justify-center items-center">
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </span>
                </Link>
              ))}
            </div>
          </section>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "linear" }}
            className="flex flex-col p-4 overflow-x-hidden"
          >
            {children}
          </motion.div>
        </motion.main>
      )}
    </div>
  );
}
