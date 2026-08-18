import React from "react";

export default function Input({
  type = "text",
  name = "",
  label,
  onChange,
  value,
  placeholder = "",
  error,
}) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700 ml-1">
          {label}
        </label>
      )}
      <input
        placeholder={placeholder}
        type={type}
        name={name}
        onChange={onChange}
        value={value}
        className={`
          border bg-white px-4 py-2.5 rounded-xl outline-none transition-all
          ${error ? "border-red-500 ring-1 ring-red-500" : "border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"}
        `}
      />
      {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
    </div>
  );
}
