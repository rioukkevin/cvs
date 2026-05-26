import type { CvData } from "@/lib/cv";
import { Awards } from "./Awards";
import { Courses } from "./Courses";
import { Header } from "./Header";
import { Keywords } from "./Keywords";
import { Section } from "./Section";

export function CvDocument({ data: cv }: { data: CvData }) {
  return (
    <div className="px-[16mm] py-[12mm] text-[11px] leading-snug text-foreground">
      <Header identity={cv.identity} profile={cv.profile} />
      <Keywords items={cv.keywords} />

      <Section title="Formation" dataSection="education">
        <ul className="space-y-3">
          {cv.education.map((item) => (
            <li
              key={`${item.period}-${item.institution}`}
              className="grid grid-cols-[110px_1fr] gap-5"
            >
              <span className="pt-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">
                {item.period}
              </span>
              <div>
                <p className="font-semibold text-foreground">
                  {item.institution}
                </p>
                <p
                  className={
                    item.highlight
                      ? "inline-flex items-center gap-2 rounded-sm border-l-2 border-accent bg-accent/8 py-0.5 pl-2 pr-2 font-medium text-accent"
                      : "text-foreground"
                  }
                >
                  {item.degree}
                </p>
                {item.details && (
                  <p className="mt-0.5 text-muted">{item.details}</p>
                )}
                {item.courses && item.courses.length > 0 && (
                  <Courses items={item.courses} />
                )}
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Distinctions académiques" dataSection="awards">
        <Awards items={cv.awards} />
      </Section>

      <Section title="Expériences professionnelles" dataSection="experience">
        <ul className="space-y-3">
          {cv.experience.map((item) => (
            <li
              key={`${item.period}-${item.company}`}
              className="grid grid-cols-[110px_1fr] gap-5"
            >
              <span className="pt-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">
                {item.period}
              </span>
              <div>
                <p>
                  <span className="font-semibold text-foreground">
                    {item.role}
                  </span>
                  <span className="text-muted"> - {item.company}</span>
                </p>
                <ul className="mt-1 space-y-0.5">
                  {item.tasks.map((task) => (
                    <li
                      key={task}
                      className="relative pl-4 text-foreground/90 before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-accent"
                    >
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Compétences" dataSection="skills">
        <div className="space-y-2.5">
          <div className="flex items-baseline gap-3">
            <h3 className="w-[80px] shrink-0 text-[10.5px] font-semibold text-foreground">
              Langues
            </h3>
            <ul className="flex flex-1 flex-wrap items-center gap-x-5 gap-y-1">
              {cv.skills.languages.map((lang) => {
                const isFrench = lang.highlight === true;
                return (
                  <li key={lang.name} className="flex items-center gap-2">
                    <span className="font-medium text-foreground">
                      {lang.name}
                    </span>
                    <span
                      className={
                        isFrench
                          ? "rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-accent"
                          : "text-muted"
                      }
                    >
                      {lang.level}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex items-baseline gap-3">
            <h3 className="w-[80px] shrink-0 text-[10.5px] font-semibold text-foreground">
              Informatique
            </h3>
            <ul className="flex flex-1 flex-wrap items-center gap-x-3 gap-y-1 text-foreground/90">
              {cv.skills.computing.map((item, i) => (
                <li key={item} className="flex items-center gap-3">
                  <span>{item}</span>
                  {i < cv.skills.computing.length - 1 && (
                    <span className="h-1 w-1 rounded-full bg-accent/50" />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Activités et centres d’intérêt" dataSection="interests">
        <ul className="grid grid-cols-2 gap-x-10 gap-y-0.5">
          {cv.interests.map((item) => (
            <li
              key={item}
              className="relative pl-4 before:absolute before:left-0 before:top-[0.55em] before:h-1 before:w-1 before:rounded-full before:bg-accent"
            >
              {item}
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}
