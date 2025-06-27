import { JSX, type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function Container({ children, className = "", as: Tag = "div" }: ContainerProps) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[1280px] 2xl:max-w-[1400px] px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Tag>
  );
}
