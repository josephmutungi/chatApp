"use client";
import React, { useState } from "react";
import Button from "@/ui/Button";
import Form from "@/components/Form";
import Input from "@/ui/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onLogin = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      toast.success("Welcome back!");
      router.replace("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Login failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4">
      <Toaster position="top-center" />
      <Form
        onSubmit={onLogin}
        title="Welcome back"
        description="Please enter your details to sign in"
      >
        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
          placeholder="Enter your email"
        />

        <div className="space-y-1">
          <Input
            label="Password"
            type="password"
            name="password"
            onChange={onChange}
            value={form.password}
            placeholder="Enter your password"
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              size="sm"
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Button type="submit" isLoading={processing} className="w-full">
          Sign In
        </Button>

        <p className="text-center text-sm text-gray-600">
          Do not have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </Form>
    </main>
  );
}
