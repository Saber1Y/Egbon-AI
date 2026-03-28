import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = false }: CardProps) {
  return (
    <div
      className={`bg-[#111119] border border-[#2A2A35] rounded-2xl p-6 transition-all duration-200 ${
        hover ? "hover:border-[#3A3A48] hover:bg-[#16161F]" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
