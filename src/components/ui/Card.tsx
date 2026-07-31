import { HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  shadow?: "sm" | "md" | "lg";
}

export default function Card({
  hover = false,
  shadow = "md",
  children,
  className = "",
  ...props
}: CardProps) {
  const shadows = {
    sm: "shadow-sm",
    md: "shadow-md",
    lg: "shadow-lg",
  };

  return (
    <div
      className={[
        "bg-white rounded-2xl border border-gray-100",
        shadows[shadow],
        hover
          ? "transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
          : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
