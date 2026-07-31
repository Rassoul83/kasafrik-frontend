"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight, CheckCircle, MapPin, DollarSign, Info,
  ArrowLeft, Users, Layers,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { createProperty } from "@/lib/api";
import { CITY_GROUPS } from "@/lib/locations";

type Step = 1 | 2 | 3 | 4;

interface TerrainForm {
  sport_type: string;
  title: string;
  description: string;
  capacity: string;
  price_per_hour: string;
  currency: "XOF" | "EUR";
  amenities: string[];
  city: string;
  address: string;
  opening_time: string;
  closing_time: string;
}

const SPORT_TYPES = [
  { id: "football", label: "Football", desc: "Terrain 5x5, 7x7 ou 11x11" },
  { id: "basketball", label: "Basketball", desc: "Couvert ou découvert" },
  { id: "tennis", label: "Tennis", desc: "Dur, terre battue ou gazon" },
  { id: "volleyball", label: "Volleyball", desc: "Intérieur ou beach-volley" },
  { id: "multisport", label: "Multisport", desc: "Polyvalent, plusieurs sports" },
  { id: "autre", label: "Autre sport", desc: "Autre type de terrain" },
];

const AMENITIES_OPTIONS = [
  { id: "vestiaires", label: "Vestiaires" },
  { id: "douches", label: "Douches" },
  { id: "eclairage", label: "Éclairage nocturne" },
  { id: "parking", label: "Parking" },
  { id: "buvette", label: "Buvette / Snack" },
  { id: "tribune", label: "Tribune / Gradins" },
  { id: "wifi", label: "Wi-Fi" },
  { id: "climatisation", label: "Climatisation" },
];

const SPORT_LABELS: Record<string, string> = {
  football: "Football", basketball: "Basketball", tennis: "Tennis",
  volleyball: "Volleyball", multisport: "Multisport", autre: "Autre sport",
};

function StepIndicator({ current, steps }: { current: Step; steps: string[] }) {
  return (
    <div className="flex items-center gap-2 mb-8">
      {steps.map((label, i) => {
        const stepNum = (i + 1) as Step;
        const isActive = stepNum === current;
        const isDone = stepNum < current;
        return (
          <div key={i} className="flex items-center">
            <div className={[
              "flex items-center gap-2",
              isActive ? "text-[#C8922A]" : isDone ? "text-[#4A7C59]" : "text-gray-400",
            ].join(" ")}>
              <div className={[
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                isActive ? "bg-[#C8922A] text-white" : isDone ? "bg-[#4A7C59] text-white" : "bg-gray-200 text-gray-500",
              ].join(" ")}>
                {isDone ? <CheckCircle className="w-4 h-4" /> : stepNum}
              </div>
              <span className="text-sm font-medium hidden sm:block">{label}</span>
            </div>
            {i < steps.length - 1 && (
              <ChevronRight className="w-4 h-4 text-gray-300 mx-2" />
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function PublierTerrainPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<TerrainForm>({
    sport_type: "",
    title: "",
    description: "",
    capacity: "",
    price_per_hour: "",
    currency: "XOF",
    amenities: [],
    city: "Dakar",
    address: "",
    opening_time: "08:00",
    closing_time: "22:00",
  });

  function update<K extends keyof TerrainForm>(k: K, v: TerrainForm[K]) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function toggleAmenity(id: string) {
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(id)
        ? f.amenities.filter((a) => a !== id)
        : [...f.amenities, id],
    }));
  }

  function goNext() {
    if (step === 1 && !form.sport_type) return;
    setStep((s) => Math.min(4, s + 1) as Step);
    setError("");
  }

  function goPrev() {
    setStep((s) => Math.max(1, s - 1) as Step);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const amenityLabels = form.amenities
        .map((a) => AMENITIES_OPTIONS.find((o) => o.id === a)?.label ?? a)
        .join(", ");
      await createProperty({
        title: form.title,
        description: `[${SPORT_LABELS[form.sport_type]}] ${form.description}\nÉquipements : ${amenityLabels || "Aucun"}\nCapacité : ${form.capacity} joueurs\nHoraires : ${form.opening_time} – ${form.closing_time}`,
        type: "rent",
        category: "land",
        price: Number(form.price_per_hour),
        currency: form.currency,
        city: form.city,
        address: form.address,
        amenities: form.amenities,
      });
      router.push("/immobilier");
    } catch {
      setError("Erreur lors de la publication. Vérifiez que vous êtes connecté(e).");
    } finally {
      setLoading(false);
    }
  }

  const STEPS = ["Sport", "Informations", "Localisation", "Vérifier"];

  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <Link href="/publier" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#C8922A] mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour
          </Link>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Publier un terrain</h1>
          <p className="text-gray-500 text-sm mt-1">Mettez votre terrain à disposition — en 4 étapes</p>
        </div>

        <StepIndicator current={step} steps={STEPS} />

        {/* Step 1 — Type de sport */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4">Quel type de terrain souhaitez-vous publier ?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SPORT_TYPES.map((s) => (
                <button
                  key={s.id}
                  onClick={() => update("sport_type", s.id)}
                  className={[
                    "group text-left p-5 rounded-2xl border-2 transition-all duration-200",
                    form.sport_type === s.id
                      ? "border-[#C8922A] bg-[#F5E6C8]/50"
                      : "border-gray-200 bg-white hover:border-gray-300",
                  ].join(" ")}
                >
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-bold text-[#1A1A2E]">{s.label}</h3>
                    {form.sport_type === s.id && <CheckCircle className="w-5 h-5 text-[#C8922A]" />}
                  </div>
                  <p className="text-sm text-gray-500">{s.desc}</p>
                </button>
              ))}
            </div>

            <Button
              variant="primary" size="lg" className="w-full mt-6 gap-2"
              disabled={!form.sport_type} onClick={goNext}
            >
              Continuer <ChevronRight className="w-4 h-4" />
            </Button>

            <div className="mt-4 p-4 bg-[#F5E6C8] rounded-xl border border-[#C8922A]/20">
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-[#8A6118] shrink-0 mt-0.5" />
                <p className="text-xs text-[#8A6118]">
                  Vous devez être connecté(e) pour publier.{" "}
                  <Link href="/register" className="font-semibold underline">Créer un compte gratuitement</Link>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2 — Informations */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="gold">{SPORT_LABELS[form.sport_type]}</Badge>
              <button onClick={() => setStep(1)} className="text-xs text-gray-400 hover:text-[#C8922A] transition-colors">
                Changer
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 space-y-5">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <Layers className="w-4 h-4 text-[#C8922A]" />
                <h2 className="font-semibold text-[#1A1A2E]">Informations sur le terrain</h2>
              </div>

              <Input
                label="Nom du terrain *"
                placeholder={`Ex: Terrain de ${SPORT_LABELS[form.sport_type]} — Les Almadies`}
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
                <textarea
                  rows={4}
                  placeholder="Décrivez votre terrain : état de la surface, avantages, règles d'utilisation…"
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  required
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Capacité (joueurs) *"
                  type="number" min="2"
                  placeholder="Ex: 22"
                  value={form.capacity}
                  onChange={(e) => update("capacity", e.target.value)}
                  icon={<Users className="w-4 h-4" />}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Devise</label>
                  <select
                    value={form.currency}
                    onChange={(e) => update("currency", e.target.value as "XOF" | "EUR")}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
                  >
                    <option value="XOF">XOF (FCFA)</option>
                    <option value="EUR">EUR (€)</option>
                  </select>
                </div>
              </div>

              <Input
                label="Tarif à l'heure *"
                type="number" min="0"
                placeholder="Ex: 25000"
                value={form.price_per_hour}
                onChange={(e) => update("price_per_hour", e.target.value)}
                icon={<DollarSign className="w-4 h-4" />}
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Équipements disponibles</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AMENITIES_OPTIONS.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => toggleAmenity(a.id)}
                      className={[
                        "px-3 py-2 rounded-xl text-xs font-medium border transition-all",
                        form.amenities.includes(a.id)
                          ? "border-[#C8922A] bg-[#F5E6C8] text-[#8A6118]"
                          : "border-gray-200 bg-white text-gray-500 hover:border-gray-300",
                      ].join(" ")}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="ghost" size="lg" onClick={goPrev} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Retour
              </Button>
              <Button variant="primary" size="lg" className="flex-1 gap-2" onClick={goNext}>
                Localisation <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3 — Localisation & disponibilités */}
        {step === 3 && (
          <div>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 space-y-5">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <MapPin className="w-4 h-4 text-[#C8922A]" />
                <h2 className="font-semibold text-[#1A1A2E]">Localisation et disponibilités</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Ville *</label>
                <select
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white"
                >
                  {CITY_GROUPS.map((group) => (
                    <optgroup key={group.label} label={group.label}>
                      {group.cities.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>

              <Input
                label="Adresse / Quartier *"
                placeholder="Ex: Quartier Almadies, Route de la Corniche"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                icon={<MapPin className="w-4 h-4" />}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Heure d&apos;ouverture *</label>
                  <input
                    type="time"
                    value={form.opening_time}
                    onChange={(e) => update("opening_time", e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Heure de fermeture *</label>
                  <input
                    type="time"
                    value={form.closing_time}
                    onChange={(e) => update("closing_time", e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="ghost" size="lg" onClick={goPrev} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Retour
              </Button>
              <Button variant="primary" size="lg" className="flex-1 gap-2" onClick={goNext}>
                Vérifier <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4 — Récapitulatif */}
        {step === 4 && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle className="w-5 h-5 text-[#4A7C59]" />
                <h2 className="font-semibold text-[#1A1A2E]">Récapitulatif de votre annonce</h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Type de sport</span>
                  <Badge variant="gold">{SPORT_LABELS[form.sport_type]}</Badge>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Nom du terrain</span>
                  <span className="font-medium text-[#1A1A2E] text-right max-w-xs">{form.title || "—"}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Capacité</span>
                  <span className="font-medium">{form.capacity || "—"} joueurs</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Tarif horaire</span>
                  <span className="font-bold text-[#C8922A]">
                    {Number(form.price_per_hour || 0).toLocaleString("fr-FR")} {form.currency} / h
                  </span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Localisation</span>
                  <span className="font-medium">{form.address || "—"}, {form.city}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Horaires</span>
                  <span className="font-medium">{form.opening_time} – {form.closing_time}</span>
                </div>
                {form.amenities.length > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 shrink-0">Équipements</span>
                    <div className="flex flex-wrap gap-1 justify-end max-w-xs ml-3">
                      {form.amenities.map((a) => (
                        <span key={a} className="text-xs bg-[#F5E6C8] text-[#8A6118] px-2 py-0.5 rounded-full">
                          {AMENITIES_OPTIONS.find((o) => o.id === a)?.label ?? a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#F5E6C8] rounded-xl p-4 text-xs text-[#8A6118]">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  En publiant, vous acceptez nos{" "}
                  <Link href="/conditions" className="font-semibold underline">CGU</Link>{" "}
                  et certifiez l&apos;exactitude des informations.
                  Votre annonce sera examinée avant d&apos;être visible.
                </p>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-[#FAE8E3] border border-[#C84B2F]/30 text-[#C84B2F] text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <Button type="button" variant="ghost" size="lg" onClick={goPrev} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Modifier
              </Button>
              <Button type="submit" variant="primary" size="lg" loading={loading} className="flex-1 gap-2">
                Publier le terrain
              </Button>
            </div>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
}
