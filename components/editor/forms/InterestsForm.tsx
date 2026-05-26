"use client";

export function InterestsForm({
  value,
  onChange,
}: {
  value: string[];
  onChange: (next: string[]) => void;
}) {
  const updateAt = (idx: number, newValue: string) => {
    onChange(value.map((s, i) => (i === idx ? newValue : s)));
  };

  const removeAt = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  const append = () => {
    onChange([...value, ""]);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[10px] font-semibold uppercase tracking-wider text-muted mb-1">
          Centres d&apos;intérêt
        </label>
        <div className="space-y-2">
          {value.map((interest, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                className="w-full rounded-md border border-rule bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none"
                value={interest}
                onChange={(e) => updateAt(idx, e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeAt(idx)}
                className="text-xs text-muted hover:text-red-600"
                aria-label="Supprimer"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={append}
        className="rounded-md border border-rule bg-white px-3 py-1.5 text-xs hover:bg-zinc-50"
      >
        + Ajouter un centre d&apos;intérêt
      </button>
    </div>
  );
}
