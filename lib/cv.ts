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
  rank: number | "S";
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

export const cv = cvData as CvData;
