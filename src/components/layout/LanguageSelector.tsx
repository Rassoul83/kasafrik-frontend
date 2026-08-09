"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const LANGUAGES = [
  { code: "fr", label: "🇫🇷 Français", name: "Français" },
  { code: "en", label: "🇬🇧 English", name: "English" },
  { code: "ar", label: "🇸🇦 العربية", name: "العربية" },
];

type LanguageCode = (typeof LANGUAGES)[number]["code"];

const STORAGE_KEY = "kasafrik_language";

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<LanguageCode>("fr");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as LanguageCode | null;
    if (stored && LANGUAGES.some((l) => l.code === stored)) {
      setSelected(stored);
    }
  }, []);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const handleSelect = (code: LanguageCode) => {
    setSelected(code);
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, code);
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-2 text-[13px] font-medium text-gray-300 hover:text-[#C8922A] rounded-lg hover:bg-white/6 transition-all duration-200"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {LANGUAGES.find((l) => l.code === selected)?.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-36 rounded-[8px] border border-white/10 bg-[#0D0D1A] shadow-xl overflow-hidden z-50"
        >
          {LANGUAGES.map((l) => (
            <li key={l.code}>
              <button
                role="option"
                aria-selected={l.code === selected}
                onClick={() => handleSelect(l.code)}
                className={`w-full text-left px-4 py-2 text-[13px] transition-colors duration-150 ${
                  l.code === selected
                    ? "text-[#C8922A] bg-white/5"
                    : "text-gray-300 hover:text-[#C8922A] hover:bg-white/6"
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
