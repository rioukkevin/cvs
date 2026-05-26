"use client";

import type { Skills } from "@/lib/cv";

export function SkillsForm({
  value,
  onChange,
}: {
  value: Skills;
  onChange: (next: Skills) => void;
}) {
  const inputClass =
    "w-full rounded-md border border-rule bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none";

  const updateComputingAt = (index: number, raw: string) => {
    const computing = value.computing.map((item, i) =>
      i === index ? raw : item,
    );
    onChange({ ...value, computing });
  };

  const removeComputingAt = (index: number) => {
    const computing = value.computing.filter((_, i) => i !== index);
    onChange({ ...value, computing });
  };

  const addComputing = () => {
    onChange({ ...value, computing: [...value.computing, ""] });
  };

  const updateLanguageAt = (
    index: number,
    patch: Partial<{ name: string; level: string }>,
  ) => {
    const languages = value.languages.map((lang, i) =>
      i === index ? { ...lang, ...patch } : lang,
    );
    onChange({ ...value, languages });
  };

  const removeLanguageAt = (index: number) => {
    const languages = value.languages.filter((_, i) => i !== index);
    onChange({ ...value, languages });
  };

  const addLanguage = () => {
    onChange({
      ...value,
      languages: [...value.languages, { name: "", level: "" }],
    });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
          Informatique
        </p>
        <button
          type="button"
          onClick={addComputing}
          className="rounded-md border border-rule bg-white px-3 py-1.5 text-xs hover:bg-zinc-50"
        >
          + Ajouter
        </button>
        <div className="space-y-2">
          {value.computing.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={item}
                onChange={(e) => updateComputingAt(index, e.target.value)}
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removeComputingAt(index)}
                className="px-1 text-xs text-muted hover:text-red-600"
                aria-label="Supprimer"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">
          Langues
        </p>
        <button
          type="button"
          onClick={addLanguage}
          className="rounded-md border border-rule bg-white px-3 py-1.5 text-xs hover:bg-zinc-50"
        >
          + Ajouter une langue
        </button>
        <div className="space-y-2">
          {value.languages.map((lang, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                value={lang.name}
                onChange={(e) =>
                  updateLanguageAt(index, { name: e.target.value })
                }
                placeholder="Nom"
                className={inputClass}
              />
              <input
                type="text"
                value={lang.level}
                onChange={(e) =>
                  updateLanguageAt(index, { level: e.target.value })
                }
                placeholder="Niveau"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removeLanguageAt(index)}
                className="px-1 text-xs text-muted hover:text-red-600"
                aria-label="Supprimer"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
