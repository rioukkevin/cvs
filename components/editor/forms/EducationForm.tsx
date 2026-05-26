"use client";

import type { EducationItem, Course } from "@/lib/cv";

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

export function EducationForm({
  value,
  onChange,
}: {
  value: EducationItem[];
  onChange: (next: EducationItem[]) => void;
}) {
  const updateItem = (idx: number, patch: Partial<EducationItem>) => {
    onChange(value.map((it, i) => (i === idx ? { ...it, ...patch } : it)));
  };

  const removeItem = (idx: number) => {
    onChange(value.filter((_, i) => i !== idx));
  };

  const addItem = () => {
    onChange([
      ...value,
      { period: "", institution: "", degree: "", details: "", courses: [] },
    ]);
  };

  const updateCourse = (
    itemIdx: number,
    courseIdx: number,
    patch: Partial<Course>,
  ) => {
    const item = value[itemIdx];
    const courses = item.courses ?? [];
    const nextCourses = courses.map((c, i) =>
      i === courseIdx ? { ...c, ...patch } : c,
    );
    updateItem(itemIdx, { courses: nextCourses });
  };

  const removeCourse = (itemIdx: number, courseIdx: number) => {
    const item = value[itemIdx];
    const courses = item.courses ?? [];
    updateItem(itemIdx, {
      courses: courses.filter((_, i) => i !== courseIdx),
    });
  };

  const addCourse = (itemIdx: number) => {
    const item = value[itemIdx];
    const courses = item.courses ?? [];
    updateItem(itemIdx, {
      courses: [...courses, { name: "", grade: undefined }],
    });
  };

  return (
    <div className="space-y-3">
      <button type="button" onClick={addItem} className={addBtnClass}>
        + Ajouter une formation
      </button>

      {value.map((item, idx) => {
        const courses = item.courses ?? [];
        return (
          <div
            key={idx}
            className="rounded-md border border-rule bg-white p-3 space-y-2.5"
          >
            <div>
              <label className={labelClass}>Période</label>
              <input
                className={inputClass}
                value={item.period}
                onChange={(e) => updateItem(idx, { period: e.target.value })}
              />
            </div>

            <div>
              <label className={labelClass}>Institution</label>
              <input
                className={inputClass}
                value={item.institution}
                onChange={(e) =>
                  updateItem(idx, { institution: e.target.value })
                }
              />
            </div>

            <div>
              <label className={labelClass}>Diplôme</label>
              <input
                className={inputClass}
                value={item.degree}
                onChange={(e) => updateItem(idx, { degree: e.target.value })}
              />
            </div>

            <div>
              <label className={labelClass}>Détails</label>
              <textarea
                rows={3}
                className={inputClass}
                value={item.details}
                onChange={(e) => updateItem(idx, { details: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <p className={subTitleClass}>Matières</p>
              {courses.map((course, cIdx) => (
                <div key={cIdx} className="flex items-center gap-2">
                  <input
                    className={`${inputClass} flex-1`}
                    value={course.name}
                    onChange={(e) =>
                      updateCourse(idx, cIdx, { name: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="—"
                    style={{ width: "70px" }}
                    className={inputClass}
                    value={course.grade ?? ""}
                    onChange={(e) =>
                      updateCourse(idx, cIdx, {
                        grade:
                          e.target.value === ""
                            ? undefined
                            : Number(e.target.value),
                      })
                    }
                  />
                  <button
                    type="button"
                    onClick={() => removeCourse(idx, cIdx)}
                    className={removeInlineClass}
                    aria-label="Supprimer la matière"
                  >
                    ×
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addCourse(idx)}
                className={addBtnClass}
              >
                + Ajouter une matière
              </button>
            </div>

            <button
              type="button"
              onClick={() => removeItem(idx)}
              className={removeCardClass}
            >
              Supprimer cette formation
            </button>
          </div>
        );
      })}
    </div>
  );
}
