"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  User,
  Send,
  CheckCircle,
  Clock,
  Headphones,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

const contactInfos = [
  {
    icon: MapPin,
    label: "Adresse",
    value: "Dakar, Sénégal — Afrique de l'Ouest",
    color: "#C8922A",
    bg: "#F5E6C8",
  },
  {
    icon: Mail,
    label: "Email",
    value: "support@kasafrik.sn",
    color: "#1A1A2E",
    bg: "#E8E8F0",
  },
  {
    icon: Phone,
    label: "WhatsApp",
    value: "+221 77 000 00 00",
    color: "#4A7C59",
    bg: "#D6EDE0",
  },
  {
    icon: Clock,
    label: "Disponibilité",
    value: "Lun – Dim, 8h – 20h WAT",
    color: "#C84B2F",
    bg: "#FAE8E3",
  },
];

const subjects = [
  "Problème avec mon annonce",
  "Question sur un paiement",
  "Signaler un contenu",
  "Partenariat & Presse",
  "Demande de remboursement",
  "Autre",
];

export default function ContactPage() {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    sujet: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#1A1A2E] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#C8922A]/20 flex items-center justify-center">
              <Headphones className="w-5 h-5 text-[#C8922A]" />
            </div>
            <span className="text-xs font-semibold text-[#C8922A] uppercase tracking-wider">
              Support client
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            Contactez-nous
          </h1>
          <p className="text-gray-400 max-w-xl">
            Notre équipe basée à Dakar est disponible 7j/7 pour répondre à vos
            questions et vous accompagner.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact info */}
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-[#1A1A2E] mb-6">
                Nos coordonnées
              </h2>
              {contactInfos.map((info) => {
                const Icon = info.icon;
                return (
                  <div
                    key={info.label}
                    className="flex items-start gap-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: info.bg }}
                    >
                      <Icon className="w-5 h-5" style={{ color: info.color }} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-0.5">
                        {info.label}
                      </p>
                      <p className="text-sm font-medium text-[#1A1A2E]">
                        {info.value}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className="bg-[#F5E6C8] rounded-xl p-5 border border-[#C8922A]/20 mt-6">
                <p className="text-sm font-semibold text-[#8A6118] mb-2">
                  Vous êtes vendeur ou organisateur ?
                </p>
                <p className="text-xs text-[#8A6118] mb-3">
                  Consultez notre guide dédié pour tout savoir sur la
                  publication d&apos;annonces.
                </p>
                <Link
                  href="/aide/vendeur"
                  className="inline-flex items-center text-xs font-bold text-[#C8922A] hover:text-[#8A6118] transition-colors"
                >
                  Guide vendeur →
                </Link>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-lg p-8">
                {sent ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-[#D6EDE0] rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-[#4A7C59]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A2E] mb-2">
                      Message envoyé !
                    </h3>
                    <p className="text-gray-500 text-sm mb-6">
                      Notre équipe vous répondra dans les 24 heures ouvrées.
                    </p>
                    <button
                      onClick={() => {
                        setSent(false);
                        setForm({ nom: "", email: "", sujet: "", message: "" });
                      }}
                      className="text-sm text-[#C8922A] font-medium hover:underline"
                    >
                      Envoyer un autre message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">
                      Envoyer un message
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                          label="Nom complet"
                          name="nom"
                          type="text"
                          placeholder="Votre nom"
                          value={form.nom}
                          onChange={handleChange}
                          icon={<User className="w-4 h-4" />}
                          required
                        />
                        <Input
                          label="Adresse email"
                          name="email"
                          type="email"
                          placeholder="vous@exemple.com"
                          value={form.email}
                          onChange={handleChange}
                          icon={<Mail className="w-4 h-4" />}
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Sujet
                        </label>
                        <select
                          name="sujet"
                          value={form.sujet}
                          onChange={handleChange}
                          required
                          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#C8922A] focus:border-[#C8922A] transition-all hover:border-gray-300"
                        >
                          <option value="">Choisissez un sujet</option>
                          {subjects.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Message
                        </label>
                        <div className="relative">
                          <MessageSquare className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                          <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows={5}
                            placeholder="Décrivez votre demande en détail..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C8922A] focus:border-[#C8922A] transition-all hover:border-gray-300 resize-none"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        loading={loading}
                        className="w-full"
                      >
                        <Send className="w-4 h-4" />
                        Envoyer le message
                      </Button>

                      <p className="text-xs text-gray-400 text-center">
                        En envoyant ce message, vous acceptez notre{" "}
                        <Link
                          href="/confidentialite"
                          className="text-[#C8922A] hover:underline"
                        >
                          politique de confidentialité
                        </Link>
                        .
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
