import type { Course } from "@/lib/cv";

type CoursesProps = { items: Course[] };

export function Courses({ items }: CoursesProps) {
  return (
    <div className="mt-1.5">
      <p className="mb-1 text-[9.5px] font-semibold uppercase tracking-[0.16em] text-muted">
        Matières phares
      </p>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
        {items.map((course) => (
          <li
            key={course.name}
            className="flex items-center gap-2.5 text-[10.5px]"
          >
            <span className="flex-1 truncate text-foreground/90">
              {course.name}
            </span>
            {typeof course.grade === "number" ? (
              <>
                <div className="h-[3px] w-10 rounded-full bg-rule">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${course.grade}%` }}
                  />
                </div>
                <span className="w-10 text-right text-[10px] tabular-nums font-medium text-accent">
                  {course.grade}/100
                </span>
              </>
            ) : (
              <span className="w-10 text-right text-[9.5px] italic text-muted">
                suivi
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
