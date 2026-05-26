import type { ReactNode } from "react";

type SectionProps = {
  title: string;
  children: ReactNode;
};

export function Section({ title, children }: SectionProps) {
  return (
    <section className="mt-7 first:mt-6">
      <h2 className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
        <span>{title}</span>
        <span className="h-px flex-1 bg-rule" />
      </h2>
      {children}
    </section>
  );
}
