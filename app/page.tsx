import { A4Page } from "@/components/A4Page";
import { CvDocument } from "@/components/cv/CvDocument";

export default function Home() {
  return (
    <main className="flex flex-1 items-start justify-center py-10 print:p-0">
      <A4Page>
        <CvDocument />
      </A4Page>
    </main>
  );
}
