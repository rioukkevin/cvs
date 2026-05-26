"use client";

type Props = {
  view: "live" | "saved";
  onToggle: () => void;
};

export function EyeButton({ view, onToggle }: Props) {
  const isLive = view === "live";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isLive ? "Afficher la version sauvegardée" : "Afficher la version en cours d’édition"}
      title={isLive ? "Vue : édition en cours" : "Vue : dernière sauvegarde"}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-foreground shadow-lg shadow-black/15 transition hover:bg-zinc-50 print:hidden"
    >
      {isLive ? <EyeOpenIcon /> : <EyeOffIcon />}
    </button>
  );
}

function EyeOpenIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 5.08A10.94 10.94 0 0 1 12 5c6.5 0 10 7 10 7a17.5 17.5 0 0 1-3.06 4.13M6.61 6.61A17.5 17.5 0 0 0 2 12s3.5 7 10 7c1.85 0 3.51-.46 4.94-1.16" />
      <path d="m2 2 20 20" />
      <path d="M14.12 14.12A3 3 0 1 1 9.88 9.88" />
    </svg>
  );
}
