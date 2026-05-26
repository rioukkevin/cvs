"use client";

export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      aria-label="Télécharger / Imprimer le CV"
      title="Télécharger en PDF (impression)"
      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-foreground shadow-lg shadow-black/15 transition hover:bg-zinc-50 print:hidden"
    >
      <DownloadIcon />
    </button>
  );
}

function DownloadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="M7 10l5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}
