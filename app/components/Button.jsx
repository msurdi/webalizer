import cn from "classnames";
import React from "react";

export const ButtonVariant = {
  normal: Symbol("normal"),
  secondary: Symbol("secondary"),
};

export const ButtonType = {
  submit: Symbol("submit"),
  button: Symbol("button"),
};

const Button = ({
  children,
  isLoading,
  onClick,
  className,
  variant = ButtonVariant.normal,
  type = ButtonType.submit,
}) => {
  const buttonType =
    type === ButtonType.submit && !onClick ? "submit" : "button";

  const sharedClasses = cn(
    "shadow py-2 px-6 border-gray-400 rounded w-full transition-colors duration-200",
    {
      "bg-gray-400 cursor-not-allowed": isLoading,
    }
  );

  const variantClasses =
    variant === ButtonVariant.normal
      ? cn({
          "text-white bg-primary hover:bg-primary-light": !isLoading,
        })
      : cn({
          "bg-white text-primary hover:text-primary-light": !isLoading,
        });

  return (
    <button
      disabled={isLoading}
      className={cn(sharedClasses, variantClasses, className)}
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={buttonType}
    >
      {children}
    </button>
  );
};

export default Button;
