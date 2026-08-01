"use client";
import React from "react";

export default function Button({
  type = "button",
  text = "Submit",
  onClick,
  className,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${className} p-2 w-full text-white bg-green-600 hover:bg-green-700 font-bold rounded-2xl`}
    >
      {text}
    </button>
  );
}
