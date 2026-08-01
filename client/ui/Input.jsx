import React from "react";

export default function Input({
  type = "text",
  name = "",
  onChange,
  value,
  placeholder = "",
}) {
  return (
    <input
      placeholder={placeholder}
      type={type}
      name={name}
      onChange={onChange}
      value={value}
      className="border border-gray-200 px-3 py-2 rounded-2xl"
    />
  );
}
