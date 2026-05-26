"use client";

export function SelectionToast({ onCancel }: { onCancel: () => void }) {
  return (
    <div className="pointer-events-none fixed left-0 right-0 top-6 z-50 flex justify-center px-4 print:hidden">
      <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-foreground/90 px-4 py-2 text-xs font-medium text-white shadow-lg shadow-black/15 backdrop-blur">
        <span>Cliquez sur une section pour l’éditer</span>
        <span className="text-white/50">·</span>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] uppercase tracking-wider hover:bg-white/25"
        >
          Esc · Annuler
        </button>
      </div>
    </div>
  );
}
