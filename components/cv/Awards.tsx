import type { Award } from "@/lib/cv";

type AwardsProps = { items: Award[] };

const RANK_LABEL: Record<string, string> = {
  "1": "1er prix",
  "2": "2ème prix",
  "3": "3ème prix",
  S: "S Award",
};

function RankBadge({ rank }: { rank: Award["rank"] }) {
  const base =
    "inline-flex items-center justify-center rounded-full px-2 py-[1px] text-[9.5px] font-semibold leading-tight tracking-wide whitespace-nowrap";
  const label = RANK_LABEL[String(rank)];

  if (rank === 1) {
    return <span className={`${base} bg-accent text-white`}>{label}</span>;
  }
  if (rank === 2) {
    return <span className={`${base} bg-accent/55 text-white`}>{label}</span>;
  }
  if (rank === 3) {
    return (
      <span className={`${base} border border-accent text-accent`}>
        {label}
      </span>
    );
  }
  return (
    <span
      className={`${base} border border-dashed border-accent text-accent`}
    >
      {label}
    </span>
  );
}

export function Awards({ items }: AwardsProps) {
  return (
    <ul className="space-y-1">
      {items.map((award, i) => (
        <li
          key={`${award.title}-${i}`}
          className="grid grid-cols-[60px_72px_1fr] items-center gap-2"
        >
          <span className="text-[10px] font-medium uppercase tracking-wider text-accent">
            {award.date ?? ""}
          </span>
          <RankBadge rank={award.rank} />
          <span className="text-foreground/90">{award.title}</span>
        </li>
      ))}
    </ul>
  );
}
