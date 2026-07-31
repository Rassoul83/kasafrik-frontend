"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";
import { Loader2 } from "lucide-react";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary:
    "bg-[#C8922A] hover:bg-[#8A6118] text-white shadow-sm",
  secondary:
    "bg-[#1A1A2E] hover:bg-[#16213E] text-white shadow-sm",
  outline:
    "border-2 border-[#C8922A] text-[#C8922A] hover:bg-[#F5E6C8] bg-transparent",
  ghost:
    "text-[#C8922A] hover:bg-[#F5E6C8] bg-transparent",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5 rounded-md",
  md: "text-sm px-4 py-2.5 rounded-lg",
  lg: "text-base px-6 py-3 rounded-xl",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      loading = false,
      disabled,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={[
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C8922A] focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed",
          variants[variant],
          sizes[size],
          className,
        ].join(" ")}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
