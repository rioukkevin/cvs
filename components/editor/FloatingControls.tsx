"use client";

import { useEditor } from "@/lib/editor-context";
import { EditorButton } from "./EditorButton";
import { EyeButton } from "./EyeButton";
import { PrintButton } from "./PrintButton";
import { SaveButton } from "./SaveButton";

type Props = {
  drawerOpen: boolean;
  selecting: boolean;
  view: "live" | "saved";
  onStartSelecting: () => void;
  onCancelSelecting: () => void;
  onToggleView: () => void;
};

const DRAWER_PX = 630;

export function FloatingControls({
  drawerOpen,
  selecting,
  view,
  onStartSelecting,
  onCancelSelecting,
  onToggleView,
}: Props) {
  const { isDirty } = useEditor();

  return (
    <div
      style={{ right: drawerOpen ? `${DRAWER_PX + 24}px` : "24px" }}
      className="pointer-events-none fixed bottom-6 z-40 flex items-center gap-3 transition-[right] duration-300 ease-out print:hidden"
    >
      {isDirty && (
        <div className="pointer-events-auto">
          <SaveButton />
        </div>
      )}
      {isDirty && (
        <div className="pointer-events-auto">
          <EyeButton view={view} onToggle={onToggleView} />
        </div>
      )}
      <div className="pointer-events-auto">
        <PrintButton />
      </div>
      <div className="pointer-events-auto">
        <EditorButton
          active={selecting}
          onClick={selecting ? onCancelSelecting : onStartSelecting}
        />
      </div>
    </div>
  );
}
