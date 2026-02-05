import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title: string;
  childrenClassName?: string;
}

export default function Card({
  children,
  title,
  childrenClassName,
}: CardProps) {
  return (
    <div className="p-4 rounded-xl bg-zinc-900 shadow-md flex flex-col gap-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className={childrenClassName}>{children}</div>
    </div>
  );
}
