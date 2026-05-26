"use client";

import { useEffect, useState } from "react";
import { useEditor } from "@/lib/editor-context";

type SaveState =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "success"; secondsLeft: number }
  | { kind: "error"; message: string };

const COUNTDOWN = 45;

export function SaveButton() {
  const { draft, isDirty, commit } = useEditor();
  const [state, setState] = useState<SaveState>({ kind: "idle" });

  useEffect(() => {
    if (state.kind !== "success") return;
    if (state.secondsLeft <= 0) return;
    const id = setInterval(() => {
      setState((s) =>
        s.kind === "success" && s.secondsLeft > 0
          ? { kind: "success", secondsLeft: s.secondsLeft - 1 }
          : s,
      );
    }, 1000);
    return () => clearInterval(id);
  }, [state.kind, state]);

  const save = async () => {
    setState({ kind: "saving" });
    try {
      const res = await fetch("/api/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft),
      });
      if (!res.ok) {
        const data = (await res
          .json()
          .catch(() => ({ error: res.statusText }))) as { error?: string };
        throw new Error(data.error ?? "Erreur inconnue");
      }
      commit(draft);
      setState({ kind: "success", secondsLeft: COUNTDOWN });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Erreur inconnue";
      setState({ kind: "error", message });
    }
  };

  const base =
    "inline-flex items-center gap-2 rounded-full px-4 h-12 text-sm font-medium shadow-lg shadow-black/15 transition print:hidden";

  if (state.kind === "saving") {
    return (
      <button type="button" disabled className={`${base} bg-accent/70 text-white cursor-wait`}>
        <span className="inline-block animate-spin">⟳</span>
        <span>Envoi…</span>
      </button>
    );
  }

  if (state.kind === "success") {
    if (state.secondsLeft > 0) {
      return (
        <button
          type="button"
          disabled
          className={`${base} bg-accent/10 text-accent border border-accent/30 cursor-default`}
          title="Rebuild Vercel en cours"
        >
          <CheckIcon />
          <span>Rechargement dans {state.secondsLeft}s</span>
        </button>
      );
    }
    return (
      <button
        type="button"
        onClick={() => window.location.reload()}
        className={`${base} bg-accent text-white hover:bg-accent/90`}
      >
        <span>Recharger maintenant</span>
      </button>
    );
  }

  if (state.kind === "error") {
    return (
      <button
        type="button"
        onClick={save}
        className={`${base} bg-red-600 text-white hover:bg-red-700`}
        title={state.message}
      >
        <span>Réessayer</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={save}
      disabled={!isDirty}
      className={`${base} bg-accent text-white hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed`}
    >
      <SaveIcon />
      <span>Enregistrer</span>
    </button>
  );
}

function SaveIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2Z" />
      <path d="M17 21v-8H7v8M7 3v5h8" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
