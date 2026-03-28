import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "lg" | "sm";
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none";

    const variants = {
      default: "bg-[#5C67FF] text-white hover:bg-[#6B75FF] shadow-lg shadow-[#5C67FF]/20",
      outline:
        "border border-[#2A2A35] bg-transparent text-white hover:bg-[#1A1A24]",
      ghost: "bg-transparent text-[#A0A0B0] hover:text-white",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-lg",
      default: "px-5 py-2.5 text-sm rounded-xl",
      lg: "px-8 py-4 text-lg rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
