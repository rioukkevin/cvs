"use client";

type Props = {
  onClick: () => void;
  active?: boolean;
};

export function EditorButton({ onClick, active = false }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={active ? "Annuler la sélection" : "Éditer le CV"}
      className={`flex h-12 w-12 items-center justify-center rounded-full shadow-lg shadow-black/15 transition hover:scale-105 print:hidden ${
        active
          ? "bg-foreground text-white"
          : "bg-accent text-white hover:bg-accent/90"
      }`}
    >
      {active ? <CloseIcon /> : <PencilIcon />}
    </button>
  );
}

function PencilIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
