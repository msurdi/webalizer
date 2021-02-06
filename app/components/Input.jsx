import React, { forwardRef } from "react";

const Input = forwardRef(({ id, name, label, type = "text" }, ref) => (
  <label
    className="font-semibold text-sm blockfont-semibold text-gray-600 pb-1 block"
    htmlFor={id}
  >
    {label}
    <input
      ref={ref}
      id={id}
      className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
      name={name}
      type={type}
    />
  </label>
));

export default Input;
