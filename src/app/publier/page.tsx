"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Home, Calendar, ChevronRight, CheckCircle,
  Building2, MapPin, DollarSign, Info, ArrowLeft,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import { createProperty, createEvent } from "@/lib/api";
import { CITY_GROUPS } from "@/lib/locations";

type PublishType = "property" | "event" | null;
type Step = 1 | 2 | 3;

interface PropertyForm {
  title: string;
  description: string;
  type: "sale" | "rent" | "hotel";
  category: string;
  price: string;
  currency: "XOF" | "EUR";
  city: string;
  address: string;
  bedrooms: string;
  bathrooms: string;
  surface: string;
}

interface EventForm {
  title: string;
  description: string;
  category: string;
  city: string;
  venue: string;
  address: string;
  start_date: string;
  end_date: string;
}

const PROPERTY_CATEGORIES = ["villa", "apartment", "house", "studio", "office", "land", "hotel_room"];
const EVENT_CATEGORIES = ["musique", "business", "culture", "sport", "match", "gastronomie", "mode", "éducation", "autre"];

const catLabels: Record<string, string> = {
  villa: "Villa", apartment: "Appartement", house: "Maison", studio: "Studio",
  office: "Bureau", land: "Terrain", hotel_room: "Chambre d'hôtel",
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

export default function PublierPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [publishType, setPublishType] = useState<PublishType>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [propForm, setPropForm] = useState<PropertyForm>({
    title: "", description: "", type: "sale", category: "villa",
    price: "", currency: "XOF", city: "Dakar", address: "",
    bedrooms: "", bathrooms: "", surface: "",
  });

  const [evtForm, setEvtForm] = useState<EventForm>({
    title: "", description: "", category: "musique",
    city: "Dakar", venue: "", address: "", start_date: "", end_date: "",
  });

  function updateProp<K extends keyof PropertyForm>(k: K, v: PropertyForm[K]) {
    setPropForm((f) => ({ ...f, [k]: v }));
  }
  function updateEvt<K extends keyof EventForm>(k: K, v: EventForm[K]) {
    setEvtForm((f) => ({ ...f, [k]: v }));
  }

  function goNext() {
    if (step === 1 && !publishType) return;
    setStep((s) => Math.min(3, s + 1) as Step);
    setError("");
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (publishType === "property") {
        await createProperty({
          title: propForm.title,
          description: propForm.description,
          type: propForm.type,
          category: propForm.category,
          price: Number(propForm.price),
          currency: propForm.currency,
          city: propForm.city,
          address: propForm.address,
          bedrooms: propForm.bedrooms ? Number(propForm.bedrooms) : undefined,
          bathrooms: propForm.bathrooms ? Number(propForm.bathrooms) : undefined,
          surface: propForm.surface ? Number(propForm.surface) : undefined,
        });
        router.push("/immobilier");
      } else {
        await createEvent({
          title: evtForm.title,
          description: evtForm.description,
          category: evtForm.category,
          city: evtForm.city,
          venue: evtForm.venue,
          address: evtForm.address,
          start_date: evtForm.start_date,
          end_date: evtForm.end_date,
        });
        router.push("/evenements");
      }
    } catch {
      setError("Erreur lors de la publication. Vérifiez que vous êtes connecté(e).");
    } finally {
      setLoading(false);
    }
  }

  const steps = ["Type", "Détails", "Vérifier"];

  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-2 text-sm text-gray-500 hover:text-[#C8922A] mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Retour à l&apos;accueil
          </Link>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Publier une annonce</h1>
          <p className="text-gray-500 text-sm mt-1">Propriété ou événement — en 3 étapes simples</p>
        </div>

        <StepIndicator current={step} steps={steps} />

        {/* Step 1: Choose type */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[#1A1A2E] mb-4">Que souhaitez-vous publier ?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  type: "property" as PublishType,
                  icon: Building2,
                  title: "Propriété immobilière",
                  desc: "Villa, appartement, studio, terrain, bureau — vente ou location",
                  color: "#C8922A",
                  bg: "#F5E6C8",
                },
                {
                  type: "event" as PublishType,
                  icon: Calendar,
                  title: "Événement",
                  desc: "Concert, forum, festival, exposition, sport — avec billetterie",
                  color: "#635BFF",
                  bg: "#F0EFFF",
                },
              ].map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.type}
                    onClick={() => setPublishType(opt.type)}
                    className={[
                      "group text-left p-6 rounded-2xl border-2 transition-all duration-200",
                      publishType === opt.type
                        ? "border-[#C8922A] bg-[#F5E6C8]/50"
                        : "border-gray-200 bg-white hover:border-gray-300",
                    ].join(" ")}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-105"
                      style={{ backgroundColor: opt.bg }}
                    >
                      <Icon className="w-6 h-6" style={{ color: opt.color }} />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-[#1A1A2E]">{opt.title}</h3>
                      {publishType === opt.type && (
                        <CheckCircle className="w-5 h-5 text-[#C8922A]" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{opt.desc}</p>
                  </button>
                );
              })}
            </div>

            <Button
              variant="primary"
              size="lg"
              className="w-full mt-6 gap-2"
              disabled={!publishType}
              onClick={goNext}
            >
              Continuer <ChevronRight className="w-4 h-4" />
            </Button>

            <div className="mt-6 p-4 bg-[#F5E6C8] rounded-xl border border-[#C8922A]/20">
              <div className="flex items-start gap-3">
                <Info className="w-4 h-4 text-[#8A6118] shrink-0 mt-0.5" />
                <p className="text-xs text-[#8A6118]">
                  Vous devez être connecté(e) pour publier. Si vous n&apos;avez pas de compte,{" "}
                  <Link href="/register" className="font-semibold underline">créez-en un gratuitement</Link>.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Badge variant={publishType === "property" ? "gold" : "purple"}>
                {publishType === "property" ? "Propriété" : "Événement"}
              </Badge>
              <button onClick={() => setStep(1)} className="text-xs text-gray-400 hover:text-[#C8922A] transition-colors">
                Changer
              </button>
            </div>

            {publishType === "property" ? (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 space-y-5">
                <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                  <Building2 className="w-4 h-4 text-[#C8922A]" />
                  <h2 className="font-semibold text-[#1A1A2E]">Informations sur la propriété</h2>
                </div>

                <Input
                  label="Titre de l'annonce *"
                  placeholder="Ex: Villa 4 chambres avec piscine — Almadies"
                  value={propForm.title}
                  onChange={(e) => updateProp("title", e.target.value)}
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
                  <textarea
                    rows={4}
                    placeholder="Décrivez votre propriété en détail : emplacement, état, atouts…"
                    value={propForm.description}
                    onChange={(e) => updateProp("description", e.target.value)}
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A] resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Type *</label>
                    <select value={propForm.type} onChange={(e) => updateProp("type", e.target.value as "sale" | "rent" | "hotel")} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white">
                      <option value="sale">Vente</option>
                      <option value="rent">Location</option>
                      <option value="hotel">Hôtel</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Catégorie *</label>
                    <select value={propForm.category} onChange={(e) => updateProp("category", e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white">
                      {PROPERTY_CATEGORIES.map((c) => <option key={c} value={c}>{catLabels[c] ?? c}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input label="Prix *" type="number" placeholder="Ex: 85000000" value={propForm.price} onChange={(e) => updateProp("price", e.target.value)} icon={<DollarSign className="w-4 h-4" />} required />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Devise</label>
                    <select value={propForm.currency} onChange={(e) => updateProp("currency", e.target.value as "XOF" | "EUR")} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white">
                      <option value="XOF">XOF (FCFA)</option>
                      <option value="EUR">EUR (€)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ville *</label>
                    <select value={propForm.city} onChange={(e) => updateProp("city", e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white">
                      {CITY_GROUPS.map((group) => (
                        <optgroup key={group.label} label={group.label}>
                          {group.cities.map((c) => <option key={c} value={c}>{c}</option>)}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <Input label="Adresse / Quartier *" placeholder="Ex: Almadies" value={propForm.address} onChange={(e) => updateProp("address", e.target.value)} icon={<MapPin className="w-4 h-4" />} required />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Input label="Chambres" type="number" min="0" placeholder="4" value={propForm.bedrooms} onChange={(e) => updateProp("bedrooms", e.target.value)} />
                  <Input label="Salles de bain" type="number" min="0" placeholder="2" value={propForm.bathrooms} onChange={(e) => updateProp("bathrooms", e.target.value)} />
                  <Input label="Surface (m²)" type="number" min="0" placeholder="250" value={propForm.surface} onChange={(e) => updateProp("surface", e.target.value)} />
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6 space-y-5">
                <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                  <Calendar className="w-4 h-4 text-[#635BFF]" />
                  <h2 className="font-semibold text-[#1A1A2E]">Informations sur l&apos;événement</h2>
                </div>

                <Input label="Titre de l'événement *" placeholder="Ex: Concert Jazz au Terrou-Bi" value={evtForm.title} onChange={(e) => updateEvt("title", e.target.value)} required />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
                  <textarea rows={4} placeholder="Décrivez votre événement : programme, artistes, ambiance…" value={evtForm.description} onChange={(e) => updateEvt("description", e.target.value)} required className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A] resize-none" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Catégorie *</label>
                    <select value={evtForm.category} onChange={(e) => updateEvt("category", e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white">
                      {EVENT_CATEGORIES.map((c) => <option key={c} value={c} className="capitalize">{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Ville *</label>
                    <select value={evtForm.city} onChange={(e) => updateEvt("city", e.target.value)} className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A] bg-white">
                      {CITY_GROUPS.map((group) => (
                        <optgroup key={group.label} label={group.label}>
                          {group.cities.map((c) => <option key={c} value={c}>{c}</option>)}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </div>

                <Input label="Nom du lieu / Salle *" placeholder="Ex: Grand Théâtre National" value={evtForm.venue} onChange={(e) => updateEvt("venue", e.target.value)} required />
                <Input label="Adresse *" placeholder="Ex: Avenue du Président Lamine Guèye" value={evtForm.address} onChange={(e) => updateEvt("address", e.target.value)} icon={<MapPin className="w-4 h-4" />} required />

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Date & heure de début *</label>
                    <input type="datetime-local" value={evtForm.start_date} onChange={(e) => updateEvt("start_date", e.target.value)} required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A]" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Date & heure de fin *</label>
                    <input type="datetime-local" value={evtForm.end_date} onChange={(e) => updateEvt("end_date", e.target.value)} required className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A]" />
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 mt-6">
              <Button variant="ghost" size="lg" onClick={() => setStep(1)} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Retour
              </Button>
              <Button
                variant="primary"
                size="lg"
                className="flex-1 gap-2"
                onClick={goNext}
              >
                Vérifier l&apos;annonce <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-md p-6">
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle className="w-5 h-5 text-[#4A7C59]" />
                <h2 className="font-semibold text-[#1A1A2E]">Récapitulatif de votre annonce</h2>
              </div>

              {publishType === "property" ? (
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Type</span>
                    <Badge variant="gold">{propForm.type === "sale" ? "Vente" : propForm.type === "rent" ? "Location" : "Hôtel"}</Badge>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Titre</span>
                    <span className="font-medium text-[#1A1A2E] text-right max-w-xs">{propForm.title || "—"}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Catégorie</span>
                    <span className="font-medium">{catLabels[propForm.category] ?? propForm.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Prix</span>
                    <span className="font-bold text-[#C8922A]">{Number(propForm.price || 0).toLocaleString("fr-FR")} {propForm.currency}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Localisation</span>
                    <span className="font-medium">{propForm.address}, {propForm.city}</span>
                  </div>
                  {propForm.bedrooms && <div className="flex justify-between"><span className="text-gray-500">Chambres</span><span>{propForm.bedrooms}</span></div>}
                  {propForm.surface && <div className="flex justify-between"><span className="text-gray-500">Surface</span><span>{propForm.surface} m²</span></div>}
                </div>
              ) : (
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Titre</span>
                    <span className="font-medium text-[#1A1A2E] text-right max-w-xs">{evtForm.title || "—"}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Catégorie</span>
                    <span className="font-medium capitalize">{evtForm.category}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Lieu</span>
                    <span className="font-medium">{evtForm.venue}, {evtForm.city}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-100 pb-2">
                    <span className="text-gray-500">Début</span>
                    <span className="font-medium">{evtForm.start_date ? new Date(evtForm.start_date).toLocaleString("fr-FR") : "—"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fin</span>
                    <span className="font-medium">{evtForm.end_date ? new Date(evtForm.end_date).toLocaleString("fr-FR") : "—"}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Terms */}
            <div className="bg-[#F5E6C8] rounded-xl p-4 text-xs text-[#8A6118]">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  En publiant, vous acceptez nos <Link href="/conditions" className="font-semibold underline">CGU</Link> et certifiez que les informations sont exactes.
                  Votre annonce sera examinée par notre équipe avant d&apos;être visible.
                </p>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 bg-[#FAE8E3] border border-[#C84B2F]/30 text-[#C84B2F] text-sm rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <div className="flex gap-3">
              <Button type="button" variant="ghost" size="lg" onClick={() => setStep(2)} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Modifier
              </Button>
              <Button type="submit" variant="primary" size="lg" loading={loading} className="flex-1 gap-2">
                <Home className="w-4 h-4" /> Publier l&apos;annonce
              </Button>
            </div>
          </form>
        )}
      </div>

      <Footer />
    </div>
  );
}
