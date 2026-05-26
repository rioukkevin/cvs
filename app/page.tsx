import { CvShell } from "@/components/CvShell";
import { cv } from "@/lib/cv";

export default function Home() {
  return <CvShell initial={cv} />;
}
