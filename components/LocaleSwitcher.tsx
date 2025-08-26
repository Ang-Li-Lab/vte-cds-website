"use client";

import {useLocale} from "next-intl";
import {usePathname, useRouter} from "next/navigation";
import {Locale} from 'next-intl';

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const current = useLocale() as Locale;

  const onChange = (next: Locale) => {
    if (next === current) return;
    const parts = pathname.split("/");
    parts[1] = next;
    router.push(parts.join("/"));
  };

  return (
    <select
      className="rounded border px-2 py-1 bg-white/80"
      aria-label="Change language"
      value={current}
      onChange={(e) => onChange(e.target.value as Locale)}
    >
      <option value="en">English</option>
      <option value="es">Español</option>
    </select>
  );
}
