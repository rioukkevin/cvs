import { login } from "./actions";

type SearchParams = Promise<{
  from?: string | string[];
  error?: string | string[];
}>;

function firstParam(value: string | string[] | undefined): string {
  if (Array.isArray(value)) return value[0] ?? "";
  return value ?? "";
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const from = firstParam(params.from);
  const error = firstParam(params.error);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[color:var(--background)] px-4">
      <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg shadow-black/5">
        <h1 className="text-lg font-semibold tracking-tight">Accès protégé</h1>
        <p className="mt-1 text-sm text-muted">
          Entrez le mot de passe d’édition pour accéder au CV.
        </p>

        <form action={login} className="mt-5 space-y-3">
          <input type="hidden" name="from" value={from} />

          <label htmlFor="password" className="sr-only">
            Mot de passe
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            autoFocus
            placeholder="Mot de passe"
            className="w-full rounded-md border border-rule bg-white px-3 py-2 text-sm text-foreground outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          />

          {error === "invalid" ? (
            <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
              Mot de passe incorrect.
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-md bg-accent px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-accent/30"
          >
            Se connecter
          </button>
        </form>
      </div>
    </div>
  );
}
