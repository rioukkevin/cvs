"use client";

import type { Identity } from "@/lib/cv";

export function IdentityForm({
  value,
  onChange,
}: {
  value: Identity;
  onChange: (next: Identity) => void;
}) {
  const inputClass =
    "w-full rounded-md border border-rule bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none";
  const labelClass =
    "block text-[10px] font-semibold uppercase tracking-wider text-muted mb-1";

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="identity-firstName">
            Prénom
          </label>
          <input
            id="identity-firstName"
            type="text"
            className={inputClass}
            value={value.firstName}
            onChange={(e) => onChange({ ...value, firstName: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="identity-lastName">
            Nom
          </label>
          <input
            id="identity-lastName"
            type="text"
            className={inputClass}
            value={value.lastName}
            onChange={(e) => onChange({ ...value, lastName: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="identity-phone">
            Téléphone
          </label>
          <input
            id="identity-phone"
            type="tel"
            className={inputClass}
            value={value.phone}
            onChange={(e) => onChange({ ...value, phone: e.target.value })}
          />
        </div>
        <div>
          <label className={labelClass} htmlFor="identity-email">
            Email
          </label>
          <input
            id="identity-email"
            type="email"
            className={inputClass}
            value={value.email}
            onChange={(e) => onChange({ ...value, email: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}
