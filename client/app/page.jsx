"use client";
import { getMyProfile } from "@/actions/authActions";
import Button from "@/ui/Button";
import { useQuery } from "@tanstack/react-query";
import { div } from "framer-motion/client";
import { MessageCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React from "react";

export default function HomePage() {
  const {
    data: response,
    isLoading: loadingUser,
    error,
  } = useQuery({
    queryKey: ["me"],
    queryFn: getMyProfile,
  });
  const router = useRouter();
  const user = response?.userData || null;

  if (loadingUser) {
    return <div>Loading user</div>;
  }

  if (user) {
    router.replace("/dashboard");
  }
  return (
    <div className="h-screen bg-gray-100 w-full mx-auto flex-col flex justify-center items-center p-4">
      <h1 className="text-4xl mb-8 font-stretch-50%">
        <span className=" text-gray-900">Welcome to </span> <br />
        Lets Vibe
      </h1>
      <div className="mx-auto w-full md:max-w-3xl p-6 py-15 shadow rounded-3xl">
        <h1 className="text-2xl text-center font-bold mb-5">Get Started</h1>
        <div className="flex flex-col items-center">
          <div className="relative">
            <MessageCircleIcon size={70} className="text-green-600" />
            <span className="absolute left-0 -top-4 text-red-500 font-extrabold text-2xl"></span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-center gap-2 p-6">
            <Link
              href={"/signup"}
              className="text-sm px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-2xl"
            >
              Register
            </Link>
            <Link
              href={"/login"}
              className="transition-colors px-6 py-2 text-white text-sm shadow-2xl bg-green-600 hover:bg-green-700 s font-bold rounded-2xl"
            >
              Login
            </Link>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-3xl">
              or <br />
            </span>
            <span className="text-sm text-gray-600">
              Continue with google account
            </span>
            <Link
              href={"/google-auth"}
              className="bg-gray-200 mt-2 w-full rounded-3xl flex justify-center items-center px-6"
            >
              <Image
                src={"/google.webp"}
                alt="google-login"
                width={50}
                height={50}
              />
              <span className="text-gray-500">Google</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
