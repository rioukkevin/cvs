import type { Award } from "@/lib/cv";

type AwardsProps = { items: Award[] };

function badgeClass(rank: string): string {
  const base =
    "inline-flex items-center justify-center rounded-full px-2 py-[1px] text-[9.5px] font-semibold leading-tight tracking-wide whitespace-nowrap";
  const first = rank.trim().charAt(0);
  if (first === "1") return `${base} bg-accent text-white`;
  if (first === "2") return `${base} bg-accent/55 text-white`;
  if (first === "3") return `${base} border border-accent text-accent`;
  return `${base} border border-dashed border-accent text-accent`;
}

export function Awards({ items }: AwardsProps) {
  return (
    <ul className="space-y-1">
      {items.map((award, i) => (
        <li
          key={`${award.title}-${i}`}
          className="grid grid-cols-[60px_auto_1fr] items-center gap-2"
        >
          <span className="text-[10px] font-medium uppercase tracking-wider text-accent">
            {award.date ?? ""}
          </span>
          <span className={badgeClass(award.rank)}>{award.rank}</span>
          <span className="text-foreground/90">{award.title}</span>
        </li>
      ))}
    </ul>
  );
}
