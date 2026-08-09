import { useState, useEffect, useCallback } from 'react';
import { translations, Lang, t as translate } from '@/lib/i18n';

const STORAGE_KEY = 'kasafrik_language';
export const LANGUAGE_CHANGE_EVENT = 'kasafrik-language-change';

function applyDirection(lang: Lang) {
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

export function useLanguage() {
  const [lang, setLang] = useState<Lang>('fr');

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as Lang) || 'fr';
    setLang(saved);
    applyDirection(saved);

    const onLanguageChange = (e: Event) => {
      const next = (e as CustomEvent<Lang>).detail;
      setLang(next);
      applyDirection(next);
    };

    window.addEventListener(LANGUAGE_CHANGE_EVENT, onLanguageChange);
    return () => window.removeEventListener(LANGUAGE_CHANGE_EVENT, onLanguageChange);
  }, []);

  const t = useCallback(
    (key: keyof typeof translations.fr) => translate(lang, key),
    [lang]
  );

  return { lang, t };
}
