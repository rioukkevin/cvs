import type { Identity } from "@/lib/cv";

type HeaderProps = {
  identity: Identity;
  profile: string;
};

export function Header({ identity, profile }: HeaderProps) {
  return (
    <header>
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-muted">
            Curriculum vitae
          </p>
          <h1 className="mt-1 text-[28pt] font-light leading-none tracking-tight text-foreground">
            <span className="font-medium">{identity.lastName}</span>{" "}
            <span>{identity.firstName}</span>
          </h1>
        </div>
        <ul className="flex flex-col items-end gap-1 text-[10.5px] text-muted">
          <li className="flex items-center gap-2">
            <span>{identity.phone}</span>
            <span className="h-1 w-1 rounded-full bg-accent" />
          </li>
          <li className="flex items-center gap-2">
            <a href={`mailto:${identity.email}`} className="hover:text-accent">
              {identity.email}
            </a>
            <span className="h-1 w-1 rounded-full bg-accent" />
          </li>
        </ul>
      </div>
      <p className="mt-3 max-w-[120mm] text-[10.5px] leading-snug text-muted">
        {profile}
      </p>
    </header>
  );
}
