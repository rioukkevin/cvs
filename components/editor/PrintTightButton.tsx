"use client";

export function PrintTightButton() {
  const print = () => {
    document.body.classList.add("print-tight");
    const cleanup = () => {
      document.body.classList.remove("print-tight");
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);
    setTimeout(() => window.print(), 0);
  };

  return (
    <button
      type="button"
      onClick={print}
      aria-label="Imprimer sans marge"
      title="Imprimer sans marge (recommandé pour Safari)"
      className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white text-foreground shadow-lg shadow-black/15 transition hover:bg-zinc-50 print:hidden"
    >
      <PrinterIcon />
    </button>
  );
}

function PrinterIcon() {
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
      <path d="M6 9V2h12v7" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <rect x="6" y="14" width="12" height="8" rx="1" />
    </svg>
  );
}
