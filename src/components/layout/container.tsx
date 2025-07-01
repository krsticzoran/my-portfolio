import { JSX, type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  id?: string;
  isHero?: boolean;
}

export default function Container({
  children,
  className = "",
  as: Tag = "div",
  id,
  isHero = false,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={`mx-auto w-full max-w-[1280px] 2xl:max-w-[1400px] px-4 sm:px-6 lg:px-8 ${
        isHero ? "scroll-mt-60 lg:scroll-mt-60" : "lg:scroll-mt-40 scroll-mt-30"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}
