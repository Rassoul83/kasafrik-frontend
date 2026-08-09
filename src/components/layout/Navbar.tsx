"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import CurrencySelector from "./CurrencySelector";

const navLinks = [
  { label: "Immobilier",  href: "/immobilier"  },
  { label: "Hôtels",      href: "/hotels"      },
  { label: "Événements",  href: "/evenements"  },
  { label: "Billetterie", href: "/billetterie" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 transition-all duration-400 ${
        scrolled ? "navbar-dark-scrolled" : "navbar-dark"
      }`}
    >
      {/* Ligne gold shimmer en haut */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] gold-shimmer opacity-70"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">

          {/* ── Logo ─────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center shrink-0 group">
            <Image
              src="/logo.png"
              alt="Kasafrik"
              width={120}
              height={60}
              priority
              style={{ width: "auto", height: "60px", objectFit: "contain" }}
            />
          </Link>

          {/* ── Desktop Nav Links ─────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link-dark px-4 py-2 text-[14px] font-medium text-gray-300 hover:text-[#E0A535] transition-colors duration-200 tracking-wide"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ── Desktop Actions ───────────────────────────────────────── */}
          <div className="hidden md:flex items-center gap-3">
            <CurrencySelector />
            <div className="w-px h-4 bg-white/10" />
            <Link
              href="/login"
              className="px-4 py-2 text-[13px] font-semibold text-[#C8922A] border border-[#C8922A]/40 rounded-[8px] hover:bg-[#C8922A]/8 hover:border-[#C8922A]/70 transition-all duration-200"
            >
              Connexion
            </Link>
            <div className="w-px h-4 bg-white/10" />
            <Link href="/publier">
              <button className="btn-gold px-5 py-2 text-[13px] tracking-wide">
                + Publier
              </button>
            </Link>
          </div>

          {/* ── Mobile Toggle ─────────────────────────────────────────── */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-300 hover:text-[#C8922A] hover:bg-white/6 transition-all duration-200"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {menuOpen
              ? <X    className="w-5 h-5" />
              : <Menu className="w-5 h-5" />
            }
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ───────────────────────────────────────────────── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/8 bg-[#0D0D1A] px-4 pt-3 pb-6 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 text-[14px] font-medium text-gray-300 hover:text-[#C8922A] hover:bg-white/4 rounded-lg transition-all duration-200 group"
            >
              <span className="w-0 h-px bg-[#C8922A] rounded group-hover:w-4 transition-all duration-200" />
              {link.label}
            </Link>
          ))}

          <div className="pt-4 flex flex-col gap-2.5">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="block w-full text-center px-4 py-2.5 text-[13px] font-medium text-gray-300 border border-white/12 rounded-lg hover:border-[#C8922A]/50 hover:text-[#C8922A] transition-all duration-200"
            >
              Connexion
            </Link>
            <Link href="/publier" onClick={() => setMenuOpen(false)}>
              <button className="btn-gold w-full py-3 text-[13px] tracking-wide">
                + Publier une annonce
              </button>
            </Link>
          </div>

          {/* Devise mobile */}
          <div className="pt-3 border-t border-white/6 flex items-center justify-between px-2 py-2">
            <span className="text-xs text-gray-500">Devise</span>
            <CurrencySelector />
          </div>

          {/* Contact rapide mobile */}
          <div className="border-t border-white/6 flex items-center gap-2 px-2 py-2">
            <Phone className="w-3.5 h-3.5 text-[#C8922A]" />
            <span className="text-xs text-gray-500">Support 7j/7 · Dakar, Sénégal</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
