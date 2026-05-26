"use client";

import { useState, type KeyboardEvent } from "react";

import { SortableList } from "../SortableList";

export function KeywordsForm({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  const addKeyword = () => {
    const trimmed = draft.trim();
    if (!trimmed) return;
    onChange([...value, trimmed]);
    setDraft("");
  };

  const updateAt = (idx: number, newValue: string) => {
    onChange(value.map((kw, i) => (i === idx ? newValue : kw)));
  };

  const removeAt = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-[10px] font-semibold uppercase tracking-wider text-muted mb-1">
          Mots-clés
        </label>
        <SortableList<string>
          items={value}
          onReorder={onChange}
          idPrefix="keyword"
          className="space-y-2"
          renderItem={(kw, idx) => (
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="w-full rounded-md border border-rule bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none"
                value={kw}
                onChange={(e) => updateAt(idx, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeAt(idx)}
                className="text-xs text-muted hover:text-red-600 px-1"
                aria-label={`Supprimer ${kw}`}
              >
                ×
              </button>
            </div>
          )}
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="text"
          className="w-full rounded-md border border-rule bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Nouveau mot-clé"
        />
        <button
          type="button"
          onClick={addKeyword}
          className="rounded-md border border-rule bg-white px-3 py-1.5 text-xs hover:bg-zinc-50 whitespace-nowrap"
        >
          + Ajouter
        </button>
      </div>
    </div>
  );
}
