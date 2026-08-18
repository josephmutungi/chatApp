"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCirclePlus,
  UserCheck2,
  CircleArrowDownIcon,
  UserCircle,
  LogOut,
  Bell,
} from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { getMyProfile } from "@/actions/authActions";
import toast from "react-hot-toast";

const links = [
  { name: "Chat", icon: <MessageCirclePlus size={18} />, href: "/dashboard" },
  {
    name: "Friends",
    icon: <UserCheck2 size={18} />,
    href: "/dashboard/friends",
  },
  {
    name: "Online",
    icon: <CircleArrowDownIcon size={18} />,
    href: "/dashboard/online",
  },
  {
    name: "Profile",
    icon: <UserCircle size={18} />,
    href: "/dashboard/profile",
  },
];

export default function AccountLayout({ children }) {
  const router = useRouter();
  const active = usePathname();
  const { data: response, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMyProfile,
  });

  const user = response?.userData || null;

  const onLogout = async () => {
    try {
      await api.post("/dashboard/logout");
      toast.success("Logged out successfully");
      router.push("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  if (isLoading)
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-200">
              LV
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium leading-none mb-1">
                Signed in as
              </p>
              <p className="text-sm font-bold text-gray-900 leading-none">
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors">
              <Bell size={20} />
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            >
              <LogOut size={18} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row gap-6 p-4 md:p-6">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white border border-gray-100 p-2 rounded-2xl shadow-sm flex md:flex-col gap-1 overflow-x-auto">
            {links.map((link) => {
              const isActive = active === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 whitespace-nowrap
                    ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-semibold"
                        : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    }
                  `}
                >
                  <span
                    className={isActive ? "text-blue-600" : "text-gray-400"}
                  >
                    {link.icon}
                  </span>
                  <span className="text-sm">{link.name}</span>
                </Link>
              );
            })}
          </div>
        </aside>

        {/* Page Content */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex-1 bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden min-h-[calc(100vh-12rem)]"
        >
          {children}
        </motion.section>
      </main>
    </div>
  );
}
