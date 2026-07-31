"use client";

import { InputHTMLAttributes, forwardRef, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, iconRight, className = "", id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1.5"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={[
              "w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-[#C8922A] focus:border-[#C8922A]",
              error
                ? "border-[#C84B2F] focus:ring-[#C84B2F]"
                : "border-gray-200 hover:border-gray-300",
              icon ? "pl-10" : "",
              iconRight ? "pr-10" : "",
              className,
            ].join(" ")}
            {...props}
          />
          {iconRight && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {iconRight}
            </div>
          )}
        </div>
        {error && (
          <p className="mt-1 text-xs text-[#C84B2F] flex items-center gap-1">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
