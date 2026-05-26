"use client";

import type { ExperienceItem } from "@/lib/cv";
import { SortableList } from "../SortableList";

const inputClass =
  "w-full rounded-md border border-rule bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none";
const labelClass =
  "block text-[10px] font-semibold uppercase tracking-wider text-muted mb-1";
const subTitleClass =
  "mt-1 text-[10px] font-semibold uppercase tracking-wider text-muted";
const addBtnClass =
  "rounded-md border border-rule bg-white px-3 py-1.5 text-xs hover:bg-zinc-50";
const removeInlineClass = "text-xs text-muted hover:text-red-600 px-1";
const removeCardClass = "text-xs text-red-600 hover:underline self-start";

export function ExperienceForm({
  value,
  onChange,
}: {
  value: ExperienceItem[];
  onChange: (next: ExperienceItem[]) => void;
}) {
  const updateItem = (idx: number, patch: Partial<ExperienceItem>) => {
    onChange(value.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  };

  const removeItem = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  const addItem = () => {
    onChange([
      ...value,
      { period: "", role: "", company: "", tasks: [] },
    ]);
  };

  const updateTask = (itemIdx: number, taskIdx: number, next: string) => {
    const item = value[itemIdx];
    const tasks = item.tasks.map((t, i) => (i === taskIdx ? next : t));
    updateItem(itemIdx, { tasks });
  };

  const removeTask = (itemIdx: number, taskIdx: number) => {
    const item = value[itemIdx];
    updateItem(itemIdx, {
      tasks: item.tasks.filter((_, i) => i !== taskIdx),
    });
  };

  const addTask = (itemIdx: number) => {
    const item = value[itemIdx];
    updateItem(itemIdx, { tasks: [...item.tasks, ""] });
  };

  return (
    <div className="space-y-3">
      <button type="button" onClick={addItem} className={addBtnClass}>
        + Ajouter une expérience
      </button>

      <SortableList<ExperienceItem>
        items={value}
        onReorder={(next) => onChange(next)}
        idPrefix="exp"
        className="space-y-3"
        renderItem={(item, idx) => (
          <div className="rounded-md border border-rule bg-white p-3 space-y-2.5">
            <div>
              <label className={labelClass}>Période</label>
              <input
                className={inputClass}
                value={item.period}
                onChange={(e) => updateItem(idx, { period: e.target.value })}
              />
            </div>

            <div>
              <label className={labelClass}>Rôle</label>
              <input
                className={inputClass}
                value={item.role}
                onChange={(e) => updateItem(idx, { role: e.target.value })}
              />
            </div>

            <div>
              <label className={labelClass}>Entreprise / Lieu</label>
              <input
                className={inputClass}
                value={item.company}
                onChange={(e) => updateItem(idx, { company: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <p className={subTitleClass}>Missions</p>
              <SortableList<string>
                items={item.tasks}
                onReorder={(nextTasks) =>
                  updateItem(idx, { tasks: nextTasks })
                }
                idPrefix={`exp-${idx}-task`}
                className="space-y-2"
                renderItem={(task, tIdx) => (
                  <div className="flex items-center gap-2">
                    <input
                      className={`${inputClass} flex-1`}
                      value={task}
                      onChange={(e) => updateTask(idx, tIdx, e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => removeTask(idx, tIdx)}
                      className={removeInlineClass}
                      aria-label="Supprimer la mission"
                    >
                      ×
                    </button>
                  </div>
                )}
              />
              <button
                type="button"
                onClick={() => addTask(idx)}
                className={addBtnClass}
              >
                + Ajouter une mission
              </button>
            </div>

            <button
              type="button"
              onClick={() => removeItem(idx)}
              className={removeCardClass}
            >
              Supprimer cette expérience
            </button>
          </div>
        )}
      />
    </div>
  );
}
