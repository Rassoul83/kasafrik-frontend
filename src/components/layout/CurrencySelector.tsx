"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type Currency = "XOF" | "EUR" | "USD";

const currencies: { code: Currency; label: string }[] = [
  { code: "XOF", label: "FCFA" },
  { code: "EUR", label: "€ EUR" },
  { code: "USD", label: "$ USD" },
];

export default function CurrencySelector() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<Currency>("XOF");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-2 text-[13px] font-medium text-gray-300 hover:text-[#C8922A] rounded-lg hover:bg-white/6 transition-all duration-200"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {currencies.find((c) => c.code === selected)?.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-2 w-32 rounded-[8px] border border-white/10 bg-[#0D0D1A] shadow-xl overflow-hidden z-50"
        >
          {currencies.map((c) => (
            <li key={c.code}>
              <button
                role="option"
                aria-selected={c.code === selected}
                onClick={() => {
                  setSelected(c.code);
                  setOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-[13px] transition-colors duration-150 ${
                  c.code === selected
                    ? "text-[#C8922A] bg-white/5"
                    : "text-gray-300 hover:text-[#C8922A] hover:bg-white/6"
                }`}
              >
                {c.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
