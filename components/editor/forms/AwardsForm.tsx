"use client";

import type { Award } from "@/lib/cv";
import { SortableList } from "../SortableList";

export function AwardsForm({
  value,
  onChange,
}: {
  value: Award[];
  onChange: (next: Award[]) => void;
}) {
  const inputClass =
    "w-full rounded-md border border-rule bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none";

  const updateAt = (index: number, patch: Partial<Award>) => {
    onChange(value.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const removeAt = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const add = () => {
    onChange([...value, { date: undefined, rank: "", title: "" }]);
  };

  const handleDateChange = (index: number, raw: string) => {
    const trimmed = raw.trim();
    updateAt(index, { date: trimmed === "" ? undefined : raw });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <button
          type="button"
          onClick={add}
          className="rounded-md border border-rule bg-white px-3 py-1.5 text-xs hover:bg-zinc-50"
        >
          + Ajouter une distinction
        </button>

        <SortableList<Award>
          items={value}
          onReorder={onChange}
          idPrefix="award"
          className="space-y-2"
          renderItem={(award, index) => (
            <div className="grid grid-cols-[95px_110px_1fr_auto] items-center gap-2">
              <input
                type="text"
                value={award.date ?? ""}
                onChange={(e) => handleDateChange(index, e.target.value)}
                placeholder="Déc. 2023"
                className={inputClass}
              />
              <input
                type="text"
                value={award.rank}
                onChange={(e) => updateAt(index, { rank: e.target.value })}
                placeholder="1er prix"
                className={inputClass}
              />
              <input
                type="text"
                value={award.title}
                onChange={(e) => updateAt(index, { title: e.target.value })}
                placeholder="Titre du prix / concours"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="px-1 text-xs text-muted hover:text-red-600"
                aria-label="Supprimer"
              >
                ×
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
