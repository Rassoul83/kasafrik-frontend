import { HTMLAttributes } from "react";

type BadgeVariant = "gold" | "green" | "red" | "blue" | "gray" | "purple";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variants: Record<BadgeVariant, string> = {
  gold: "bg-[#F5E6C8] text-[#8A6118] border border-[#C8922A]/30",
  green: "bg-[#D6EDE0] text-[#2D5A3D] border border-[#4A7C59]/30",
  red: "bg-[#FAE8E3] text-[#A03820] border border-[#C84B2F]/30",
  blue: "bg-blue-50 text-blue-700 border border-blue-200",
  gray: "bg-gray-100 text-gray-600 border border-gray-200",
  purple: "bg-purple-50 text-purple-700 border border-purple-200",
};

export default function Badge({
  variant = "gold",
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full",
        variants[variant],
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </span>
  );
}
