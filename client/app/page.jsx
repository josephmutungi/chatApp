"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "@/actions/authActions";
import Button from "@/ui/Button";
import { MessageCircleIcon, UserCheck2Icon, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  const { data: response, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMyProfile,
  });

  const user = response?.userData || null;

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin mb-4" />
        <p className="text-gray-500 font-medium animate-pulse">
          Setting the vibe...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-50 via-white to-green-50 flex flex-col justify-center items-center p-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-4">
          Lets{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
            Vibe
          </span>
        </h1>
        <p className="text-gray-600 text-lg max-w-md mx-auto">
          The modern way to connect, chat, and share the good energy with your
          circle.
        </p>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-md border border-white shadow-2xl shadow-gray-200/50 rounded-[2.5rem] p-8 md:p-12 w-full max-w-xl"
      >
        <div className="flex flex-col items-center">
          {/* Avatar/Icon Section */}
          <div className="mb-8">
            {user ? (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-green-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative flex flex-col items-center justify-center w-32 h-32 bg-white rounded-full border border-gray-100 shadow-inner">
                  <UserCheck2Icon size={48} className="text-blue-600" />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
                </div>
              </div>
            ) : (
              <div className="w-24 h-24 bg-green-100 rounded-3xl flex items-center justify-center transform rotate-12">
                <MessageCircleIcon
                  size={48}
                  className="text-green-600 -rotate-12"
                />
              </div>
            )}
          </div>

          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900">
              {user ? "Welcome back!" : "Ready to vibe?"}
            </h2>
            <p className="text-gray-500 mt-1">
              {user ? user.email : "Join thousands of others today."}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Link href={user ? "/dashboard" : "/login"} className="w-full">
              <Button
                variant="primary"
                className="w-full py-4 text-base shadow-lg shadow-blue-200"
              >
                {user ? "Open Dashboard" : "Login to Account"}
                <ArrowRight size={18} />
              </Button>
            </Link>

            <Link href="/signup" className="w-full">
              <Button variant="secondary" className="w-full py-4 text-base">
                {user ? "Add Account" : "Get Started"}
              </Button>
            </Link>
          </div>

          {/* Social Divider */}
          {!user && (
            <>
              <div className="relative w-full my-10">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-100"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest">
                  <span className="px-4 bg-white text-gray-400">
                    Social Entry
                  </span>
                </div>
              </div>

              <Link
                href="/google-auth"
                className="group flex items-center justify-center gap-3 w-full py-3.5 border-2 border-gray-50 rounded-2xl hover:bg-gray-50 hover:border-gray-100 transition-all duration-200"
              >
                <Image
                  src="/google.webp"
                  alt="Google"
                  width={24}
                  height={24}
                  className="group-hover:scale-110 transition-transform"
                />
                <span className="font-semibold text-gray-700">
                  Continue with Google
                </span>
              </Link>
            </>
          )}
        </div>
      </motion.div>

      {/* Footer hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-sm text-gray-400"
      >
        Privacy focused. End-to-end encrypted.
      </motion.p>
    </div>
  );
}
