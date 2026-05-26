"use client";

import { EditorProvider } from "@/lib/editor-context";
import type { CvData } from "@/lib/cv";
import { CvShellInner } from "./CvShellInner";

export function CvShell({ initial }: { initial: CvData }) {
  return (
    <EditorProvider initial={initial}>
      <CvShellInner />
    </EditorProvider>
  );
}
