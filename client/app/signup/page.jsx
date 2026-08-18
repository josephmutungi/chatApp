"use client";
import React, { useState } from "react";
import Button from "@/ui/Button";
import Form from "@/components/Form";
import Input from "@/ui/Input";
import Image from "next/image";
import Link from "next/link";
import { FaChevronLeft, FaGoogle } from "react-icons/fa6";
import api from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword)
      return toast.error("Passwords do not match");

    setLoading(true);
    try {
      const res = await api.post("/auth/register", form);
      toast.success(res.data.message || "Account created!");
      router.push("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
      <Toaster />
      <Form
        onSubmit={handleRegister}
        title={step === 1 ? "Create Account" : "Secure Your Account"}
        description={
          step === 1
            ? "Start your 14-day free trial"
            : "Choose a strong password"
        }
      >
        {step === 1 ? (
          <>
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={form.email}
              placeholder="name@company.com"
              onChange={onChange}
            />
            <Button onClick={() => setStep(2)} className="w-full">
              Continue
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <Link
              href="/google-auth"
              className="flex items-center justify-center gap-3 w-full py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <Image src="/google.webp" alt="Google" width={20} height={20} />
              <span className="font-medium text-gray-700">Google</span>
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={() => setStep(1)}
              className="flex items-center text-sm text-gray-500 hover:text-gray-800 transition-colors mb-2"
            >
              <FaChevronLeft className="mr-1" size={12} /> Back to email
            </button>
            <Input
              label="Password"
              type="password"
              name="password"
              value={form.password}
              placeholder="••••••••"
              onChange={onChange}
            />
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              placeholder="••••••••"
              onChange={onChange}
            />
            <Button type="submit" isLoading={loading} className="w-full">
              Create Account
            </Button>
          </>
        )}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Log in
          </Link>
        </p>
      </Form>
    </div>
  );
}
