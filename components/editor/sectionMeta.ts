import type { CvData } from "@/lib/cv";

export type SectionKey = keyof CvData;

export const SECTION_KEYS = [
  "identity",
  "profile",
  "keywords",
  "education",
  "awards",
  "experience",
  "skills",
  "interests",
] as const satisfies readonly SectionKey[];

export const SECTION_LABELS: Record<SectionKey, string> = {
  identity: "Identité & contact",
  profile: "Profil",
  keywords: "Mots-clés",
  education: "Formation",
  awards: "Distinctions",
  experience: "Expériences",
  skills: "Compétences",
  interests: "Centres d’intérêt",
};
