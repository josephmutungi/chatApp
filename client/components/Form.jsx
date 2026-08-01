import React from "react";

function Form({ onSubmit, content, title = "Welcome", loading, onClose }) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-85 mx-auto bg-gray-100 shadow rounded-3xl mt-10 py-10 px-4"
    >
      <h1 className="text-lg font-bold text-gray-900 mb-2">{title}</h1>
      {content}
    </form>
  );
}

export default Form;
