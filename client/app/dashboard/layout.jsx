"use client";
import { getMyProfile } from "@/actions/authActions";
import { useQuery } from "@tanstack/react-query";
import { color } from "framer-motion";
import {
  CircleArrowDownIcon,
  MessageCircle,
  Settings2Icon,
  UserCheck2,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { HiHome } from "react-icons/hi2";
import { motion } from "framer-motion";

const links = [
  {
    name: "Overview",
    icon: <HiHome />,
    href: "/dashboard",
  },

  {
    name: "Messages",
    icon: <MessageCircle />,
    href: "/dashboard/messages",
  },
  {
    name: "Friends",
    icon: <UserCheck2 />,
    href: "/dashboard/friends",
    color: "text-green-500",
  },
  {
    name: "Online",
    icon: <CircleArrowDownIcon />,
    href: "/dashboard/online",
  },
  {
    name: "Settings",
    icon: <Settings2Icon />,
    href: "/dashboard/settings",
  },
];

export default function AccountLayout({ children }) {
  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMyProfile,
  });

  const user = response?.userData || null;

  return (
    <motion.main
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "linear" }}
      className="mx-auto  h-[80vh] bg-gray-50 shadow-xl rounded-xl px-4"
    >
      <section className=" flex flex-col md:flex-row gap-6 p-6 md:py-15">
        <header className="space-y-3 ">
          <h1 className="bg-green-600 mb-8 text-white px-6 py-2 text-center rounded-t-lg text-sm font-serif font-bold">
            Welcome <span>{user?.email}</span>
          </h1>

          <nav className="flex flex-row grow-0 space-x-4 md:flex-col bg-white p-4 md:py-10 shadow rounded-md">
            {links.map((link, icon) => (
              <Link
                href={link.href}
                className="flex space-x-1 space-y-6 px-3 py-1 hover:bg-gray-300 rounded-2xl"
                key={link.name}
              >
                <span className={`${color}`}>{link.icon}</span>
                <span className={``}>{link.name}</span>
              </Link>
            ))}
          </nav>
        </header>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "linear" }}
          className="w-full max-w-3xl md:w-2xl"
        >
          {children}
        </motion.div>
      </section>
    </motion.main>
  );
}
