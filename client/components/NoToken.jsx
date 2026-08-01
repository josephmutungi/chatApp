"use client";
import Link from "next/link";
import React from "react";

export default function NoToken({ err }) {
  return (
    <div className="py-30 px-8 max-w-7xl mxx-auto">
      <div className="bg-white shadow p-6">
        <h1>Session Expired</h1>
        <div>
          <Link href={"/login"}>Login again</Link>
        </div>
      </div>
    </div>
  );
}
