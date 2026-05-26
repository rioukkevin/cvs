import type { ReactNode } from "react";
import type { SectionKey } from "@/components/editor/sectionMeta";

type SectionProps = {
  title: string;
  children: ReactNode;
  dataSection?: SectionKey;
};

export function Section({ title, children, dataSection }: SectionProps) {
  return (
    <section data-section={dataSection} className="mt-7 first:mt-6">
      <h2 className="mb-4 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
        <span>{title}</span>
        <span className="h-px flex-1 bg-rule" />
      </h2>
      {children}
    </section>
  );
}
