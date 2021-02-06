import cn from "classnames";
import React from "react";

const Button = ({ children, isLoading, type = "submit" }) => (
  <button
    disabled={isLoading}
    className={cn(
      "shadow text-white py-2 px-6 border-gray-400 rounded w-full",
      {
        "bg-primary hover:bg-primary-light transition-colors duration-200 ": !isLoading,
        "bg-gray-400 cursor-not-allowed": isLoading,
      }
    )}
    type={type === "submit" ? "submit" : "button"}
  >
    {children}
  </button>
);

export default Button;
