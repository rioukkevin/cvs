"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CvData } from "@/lib/cv";

type EditorContextValue = {
  draft: CvData;
  original: CvData;
  isDirty: boolean;
  updateSection: <K extends keyof CvData>(key: K, value: CvData[K]) => void;
  reset: () => void;
  commit: (next: CvData) => void;
};

const EditorContext = createContext<EditorContextValue | null>(null);

export function EditorProvider({
  initial,
  children,
}: {
  initial: CvData;
  children: ReactNode;
}) {
  const [original, setOriginal] = useState<CvData>(initial);
  const [draft, setDraft] = useState<CvData>(initial);

  const updateSection = useCallback(
    <K extends keyof CvData>(key: K, value: CvData[K]) => {
      setDraft((d) => ({ ...d, [key]: value }));
    },
    [],
  );

  const reset = useCallback(() => setDraft(original), [original]);
  const commit = useCallback((next: CvData) => {
    setOriginal(next);
    setDraft(next);
  }, []);

  const isDirty = useMemo(
    () => JSON.stringify(draft) !== JSON.stringify(original),
    [draft, original],
  );

  const value = useMemo<EditorContextValue>(
    () => ({ draft, original, isDirty, updateSection, reset, commit }),
    [draft, original, isDirty, updateSection, reset, commit],
  );

  return (
    <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
  );
}

export function useEditor(): EditorContextValue {
  const v = useContext(EditorContext);
  if (!v) throw new Error("useEditor must be used inside <EditorProvider>");
  return v;
}
