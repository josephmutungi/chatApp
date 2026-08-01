"use client";
import Button from "@/ui/Button";
import Form from "@/components/Form";
import Input from "@/ui/Input";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FaBackward } from "react-icons/fa6";
import api from "@/lib/api";
import toast, { Toaster } from "react-hot-toast";
import { redirect, useRouter } from "next/navigation";

export default function SignUpPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState(1);
  const router = useRouter();

  function nextStep(prev) {
    setStep(step + 1);

    return prev;
  }

  function prevStep(prev) {
    setStep(step - 1);

    return step;
  }

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/register", form);

      if (res.data.message) {
        toast.success(res.data.message);
      }

      if (res.data.error) {
        toast.error(res.data.error);
      }

      if (res.data.error.includes("User already exist")) {
        router.replace("/login");
      }
    } catch (error) {
      const errMsg = error.response?.data?.error;
      console.log(error);
      if (errMsg) {
        toast.error(errMsg);
      }
    }
  };

  return (
    <div className="bg-gray-50 h-screen py-20">
      <Toaster />
      <Form
        onSubmit={handleRegister}
        title="Create Account"
        content={
          <div className="w-full">
            <section className="space-y-4">
              {step == 1 && (
                <>
                  <div className="flex flex-col">
                    <label className="text-sm px-2 text-gray-400">
                      Enter your email
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={form.email}
                      placeholder="Enter your email"
                      onChange={onChange}
                    />

                    <Button
                      onClick={nextStep}
                      text="Continue"
                      className={`mt-5`}
                    />
                  </div>
                </>
              )}

              {step == 2 && (
                <div className="space-y-3">
                  <button
                    onClick={prevStep}
                    className="p-2 bg-white shadow px-5"
                  >
                    <FaBackward />
                  </button>
                  <div className="flex flex-col">
                    <label className="text-sm text-gray-400">
                      Create password
                    </label>
                    <Input
                      type="password"
                      name="password"
                      value={form.password}
                      placeholder="Password"
                      onChange={onChange}
                    />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-sm text-gray-400">
                      Confirm Password
                    </label>
                    <Input
                      type="password"
                      name="confirmPassword"
                      value={form.confirmPassword}
                      placeholder="Confirm password"
                      onChange={onChange}
                    />
                  </div>

                  <Button type="submit" className={`mt-3`} />
                </div>
              )}

              <div className="shadow py-3 rounded-2xl mt-20 bg-gray-700">
                <div className="flex justify-center ">
                  <span className="flex flex-col items-center">
                    <strong className="text-3xl text-white">__Or __</strong>{" "}
                    <br />
                    <span className="my-2 text-gray-400">Sign in with</span>
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
                  </span>
                </div>
              </div>
            </section>
          </div>
        }
      />
    </div>
  );
}
