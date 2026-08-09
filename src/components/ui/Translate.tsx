"use client";

import { useLanguage } from "@/hooks/useLanguage";
import type { translations } from "@/lib/i18n";

export default function Translate({ k }: { k: keyof typeof translations.fr }) {
  const { t } = useLanguage();
  return <>{t(k)}</>;
}
