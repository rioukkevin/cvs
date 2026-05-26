"use client";

import { useCallback, useEffect, useState } from "react";
import { useEditor } from "@/lib/editor-context";
import { A4Page } from "./A4Page";
import { CvDocument } from "./cv/CvDocument";
import { EditorDrawer } from "./editor/EditorDrawer";
import { FloatingControls } from "./editor/FloatingControls";
import { SelectionToast } from "./editor/SelectionToast";
import {
  SECTION_KEYS,
  type SectionKey,
} from "./editor/sectionMeta";

type Mode =
  | { kind: "idle" }
  | { kind: "selecting" }
  | { kind: "editing"; section: SectionKey };

function isSectionKey(value: string | null): value is SectionKey {
  return value !== null && (SECTION_KEYS as readonly string[]).includes(value);
}

export function CvShellInner() {
  const { draft, original } = useEditor();
  const [mode, setMode] = useState<Mode>({ kind: "idle" });
  const [view, setView] = useState<"live" | "saved">("live");

  const startSelecting = useCallback(() => setMode({ kind: "selecting" }), []);
  const close = useCallback(() => setMode({ kind: "idle" }), []);
  const openSection = useCallback(
    (section: SectionKey) => setMode({ kind: "editing", section }),
    [],
  );
  const toggleView = useCallback(
    () => setView((v) => (v === "live" ? "saved" : "live")),
    [],
  );

  useEffect(() => {
    if (mode.kind !== "selecting") return;
    document.body.classList.add("cv-selecting");
    return () => document.body.classList.remove("cv-selecting");
  }, [mode.kind]);

  useEffect(() => {
    if (mode.kind !== "selecting") return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const node = target.closest<HTMLElement>("[data-section]");
      if (!node) return;
      const key = node.getAttribute("data-section");
      if (!isSectionKey(key)) return;
      e.preventDefault();
      e.stopPropagation();
      openSection(key);
    };
    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [mode.kind, openSection]);

  useEffect(() => {
    if (mode.kind === "idle") return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mode.kind, close]);

  const displayed = view === "live" ? draft : original;
  const drawerOpen = mode.kind === "editing";

  return (
    <main className="flex flex-1 min-h-screen">
      <section className="flex flex-1 items-start justify-center overflow-auto py-10 print:p-0">
        <A4Page>
          <CvDocument data={displayed} />
        </A4Page>
      </section>

      <EditorDrawer
        open={drawerOpen}
        section={mode.kind === "editing" ? mode.section : null}
        onClose={close}
        onChangeSection={openSection}
      />

      {mode.kind === "selecting" && <SelectionToast onCancel={close} />}

      <FloatingControls
        drawerOpen={drawerOpen}
        selecting={mode.kind === "selecting"}
        view={view}
        onStartSelecting={startSelecting}
        onCancelSelecting={close}
        onToggleView={toggleView}
      />
    </main>
  );
}
