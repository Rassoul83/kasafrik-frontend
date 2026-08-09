"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { CURRENCY_CHANGE_EVENT } from "@/hooks/useCurrency";

const CURRENCIES = [
  { code: "GNF", label: "🇬🇳 GNF", name: "Franc Guinéen" },
  { code: "XOF", label: "🇸🇳 FCFA", name: "Franc CFA" },
  { code: "USD", label: "🇺🇸 USD", name: "Dollar US" },
  { code: "EUR", label: "🇪🇺 EUR", name: "Euro" },
  { code: "MAD", label: "🇲🇦 MAD", name: "Dirham" },
];

type CurrencyCode = (typeof CURRENCIES)[number]["code"];

const STORAGE_KEY = "kasafrik_currency";

export default function CurrencySelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<CurrencyCode>("GNF");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as CurrencyCode | null;
    if (stored && CURRENCIES.some((c) => c.code === stored)) {
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

  const handleSelect = (code: CurrencyCode) => {
    setSelected(code);
    setOpen(false);
    localStorage.setItem(STORAGE_KEY, code);
    window.dispatchEvent(new CustomEvent(CURRENCY_CHANGE_EVENT, { detail: code }));
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-2 text-[13px] font-medium text-gray-300 hover:text-[#C8922A] rounded-lg hover:bg-white/6 transition-all duration-200"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {CURRENCIES.find((c) => c.code === selected)?.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-40 rounded-[8px] border border-white/10 bg-[#0D0D1A] shadow-xl overflow-hidden z-50"
        >
          {CURRENCIES.map((c) => (
            <li key={c.code}>
              <button
                role="option"
                aria-selected={c.code === selected}
                onClick={() => handleSelect(c.code)}
                className={`w-full flex items-center justify-between text-left px-4 py-2 text-[13px] transition-colors duration-150 ${
                  c.code === selected
                    ? "text-[#C8922A] bg-white/5"
                    : "text-gray-300 hover:text-[#C8922A] hover:bg-white/6"
                }`}
              >
                <span>{c.label}</span>
                <span className="text-[11px] text-gray-500">{c.name}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
