"use client";

import { useEditor } from "@/lib/editor-context";
import {
  SECTION_KEYS,
  SECTION_LABELS,
  type SectionKey,
} from "./sectionMeta";
import { IdentityForm } from "./forms/IdentityForm";
import { ProfileForm } from "./forms/ProfileForm";
import { KeywordsForm } from "./forms/KeywordsForm";
import { EducationForm } from "./forms/EducationForm";
import { AwardsForm } from "./forms/AwardsForm";
import { ExperienceForm } from "./forms/ExperienceForm";
import { SkillsForm } from "./forms/SkillsForm";
import { InterestsForm } from "./forms/InterestsForm";

type Props = {
  open: boolean;
  section: SectionKey | null;
  onClose: () => void;
  onChangeSection: (section: SectionKey) => void;
};

const DRAWER_WIDTH = "w-[630px]";

export function EditorDrawer({
  open,
  section,
  onClose,
  onChangeSection,
}: Props) {
  return (
    <aside
      aria-hidden={!open}
      aria-label="Panneau d’édition du CV"
      className={`editor-overlay sticky top-0 flex h-screen flex-shrink-0 overflow-hidden border-l border-rule bg-white shadow-[-12px_0_32px_rgba(0,0,0,0.06)] transition-[width] duration-300 ease-out print:hidden ${
        open ? DRAWER_WIDTH : "w-0"
      }`}
    >
      <div className={`flex h-full flex-col ${DRAWER_WIDTH}`}>
        <header className="flex items-center justify-between border-b border-rule px-5 py-4">
          <h2 className="text-sm font-semibold tracking-tight">
            Éditer le CV
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="text-sm text-muted transition hover:text-foreground"
          >
            ✕
          </button>
        </header>

        <div className="border-b border-rule px-5 py-3">
          <label
            htmlFor="cv-section"
            className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-muted"
          >
            Section
          </label>
          <select
            id="cv-section"
            value={section ?? SECTION_KEYS[0]}
            onChange={(e) => onChangeSection(e.target.value as SectionKey)}
            className="w-full rounded-md border border-rule bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none"
          >
            {SECTION_KEYS.map((k) => (
              <option key={k} value={k}>
                {SECTION_LABELS[k]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {section && <FormHost section={section} />}
        </div>
      </div>
    </aside>
  );
}

function FormHost({ section }: { section: SectionKey }) {
  const { draft, updateSection } = useEditor();

  switch (section) {
    case "identity":
      return (
        <IdentityForm
          value={draft.identity}
          onChange={(v) => updateSection("identity", v)}
        />
      );
    case "profile":
      return (
        <ProfileForm
          value={draft.profile}
          onChange={(v) => updateSection("profile", v)}
        />
      );
    case "keywords":
      return (
        <KeywordsForm
          value={draft.keywords}
          onChange={(v) => updateSection("keywords", v)}
        />
      );
    case "education":
      return (
        <EducationForm
          value={draft.education}
          onChange={(v) => updateSection("education", v)}
        />
      );
    case "awards":
      return (
        <AwardsForm
          value={draft.awards}
          onChange={(v) => updateSection("awards", v)}
        />
      );
    case "experience":
      return (
        <ExperienceForm
          value={draft.experience}
          onChange={(v) => updateSection("experience", v)}
        />
      );
    case "skills":
      return (
        <SkillsForm
          value={draft.skills}
          onChange={(v) => updateSection("skills", v)}
        />
      );
    case "interests":
      return (
        <InterestsForm
          value={draft.interests}
          onChange={(v) => updateSection("interests", v)}
        />
      );
  }
}
