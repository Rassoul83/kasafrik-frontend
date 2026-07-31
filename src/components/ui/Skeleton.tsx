import { HTMLAttributes } from "react";

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string;
  height?: string;
  rounded?: "sm" | "md" | "lg" | "full";
}

const roundedMap = {
  sm: "rounded",
  md: "rounded-lg",
  lg: "rounded-xl",
  full: "rounded-full",
};

export default function Skeleton({
  width,
  height,
  rounded = "md",
  className = "",
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      className={[
        "animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%]",
        roundedMap[rounded],
        className,
      ].join(" ")}
      style={{ width, height, ...style }}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <Skeleton height="200px" rounded="sm" className="w-full rounded-none" />
      <div className="p-4 space-y-3">
        <Skeleton height="20px" width="60%" />
        <Skeleton height="16px" width="80%" />
        <Skeleton height="16px" width="40%" />
        <div className="flex gap-2 pt-1">
          <Skeleton height="14px" width="30%" />
          <Skeleton height="14px" width="30%" />
          <Skeleton height="14px" width="30%" />
        </div>
      </div>
    </div>
  );
}
