"use client";
import { getMyProfile } from "@/actions/authActions";
import Form from "@/components/Form";
import Input from "@/ui/Input";
import { useQuery } from "@tanstack/react-query";

export default function AccountPage() {
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
    <div className="bg-white flex p-8 h-full">
      <div>
        <h1 className="font-bold bg-gray-200 px-6 py-2 rounded-2xl"></h1>
        <div className="">
          <div></div>
        </div>
      </div>
    </div>
  );
}
