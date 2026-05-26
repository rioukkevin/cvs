import cvData from "@/data/cv.json";

export type Identity = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export type Course = {
  name: string;
  grade?: number;
};

export type EducationItem = {
  period: string;
  institution: string;
  degree: string;
  details: string;
  courses?: Course[];
};

export type Award = {
  date?: string;
  rank: string;
  title: string;
};

export type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  tasks: string[];
};

export type Language = { name: string; level: string };

export type Skills = {
  computing: string[];
  languages: Language[];
};

export type CvData = {
  identity: Identity;
  profile: string;
  keywords: string[];
  education: EducationItem[];
  awards: Award[];
  experience: ExperienceItem[];
  skills: Skills;
  interests: string[];
};

type RawAward = { date?: string; rank: string | number; title: string };
type RawCvData = Omit<CvData, "awards"> & { awards: RawAward[] };

const raw = cvData as RawCvData;
export const cv: CvData = {
  ...raw,
  awards: raw.awards.map((a) => ({ ...a, rank: String(a.rank) })),
};
