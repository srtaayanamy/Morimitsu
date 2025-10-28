import type { ReactNode } from "react";

interface SectionCardProps {
  title?: string; // título opcional
  children?: ReactNode; // conteúdo dentro da seção
}

export default function SectionCard({ title, children }: SectionCardProps) {
  return (
    <section className="bg-[#FFFFFF] border-2 border-white rounded-xl shadow-md p-4 sm:p-6">
      {title && (
        <h2 className="text-lg sm:text-xl text-[#1E1E1E] font-semibold mb-4">{title}</h2>
      )}
      {children}
    </section>
  );
}
