"use client";

export function ProfileForm({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div>
        <label
          className="block text-[10px] font-semibold uppercase tracking-wider text-muted mb-1"
          htmlFor="profile-text"
        >
          Profil
        </label>
        <textarea
          id="profile-text"
          rows={6}
          className="w-full rounded-md border border-rule bg-white px-3 py-2 text-sm focus:border-accent focus:outline-none resize-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="mt-1 text-[10px] text-muted">
          {value.length} caractères
        </div>
      </div>
    </div>
  );
}
