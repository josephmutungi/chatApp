"use client";
import { login } from "@/actions/authActions";
import api from "@/lib/api";
import Button from "@/ui/Button";
import Form from "@/components/Form";
import Input from "@/ui/Input";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [processing, setProcessing] = useState(false);
  const router = useRouter();

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      const res = await api.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      console.log(res.data.token);

      if (res) {
        toast.success(res.data.message);
        router.replace("/dashboard");
      }
    } catch (error) {
      const errMsg = error?.response?.data?.error;
      if (errMsg) {
        toast.error(errMsg);
      }
    } finally {
      setProcessing(false);
    }
  };

  return (
    <main className="py-20">
      <Toaster position="top-center" />
      <Form
        onSubmit={onLogin}
        title="Welcome back"
        content={
          <div className="w-full space-y-3">
            <div className="flex flex-col mt-6">
              <label className="px-2 text-sm text-gray-400">Email</label>
              <Input
                type="Email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="Enter your email"
              />
            </div>

            <div className="flex flex-col">
              <label className="px-2 text-sm text-gray-400">Password</label>
              <Input
                type="password"
                name="password"
                onChange={onChange}
                value={form.password}
                placeholder="Enter your password"
              />
            </div>

            <Button type="submit" className="w-full">
              {processing ? "Logging in..." : "Login"}
            </Button>

            <div>
              <Link
                href={"/forgot-password"}
                className="text-sm text-gray-600 px-3"
              >
                Forget password?
              </Link>
            </div>
          </div>
        }
      />
    </main>
  );
}
