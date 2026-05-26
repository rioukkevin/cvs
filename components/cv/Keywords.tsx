type KeywordsProps = { items: string[] };

export function Keywords({ items }: KeywordsProps) {
  return (
    <ul data-section="keywords" className="mt-3 flex flex-wrap gap-1.5">
      {items.map((kw) => (
        <li
          key={kw}
          className="rounded-full border border-accent/25 bg-accent/8 px-2.5 py-1 text-[10px] font-medium tracking-wide text-accent"
        >
          {kw}
        </li>
      ))}
    </ul>
  );
}
