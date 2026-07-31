"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin, Bed, Bath, Maximize, CheckCircle, Star,
  Phone, Mail, ArrowLeft, Home, Shield, Calendar,
  AlertCircle, X, ChevronLeft, ChevronRight, Loader2,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import PropertyCard from "@/components/cards/PropertyCard";
import { getProperty, getProperties } from "@/lib/api";
import type { Property } from "@/types";

// ── Données de secours ────────────────────────────────────────────────────────

const MOCK_PROPERTIES: Record<number, Property & { amenities: string[] }> = {
  1: {
    id: 1, user_id: 2,
    title: "Villa moderne 4ch. — Almadies",
    description: "Magnifique villa avec piscine, jardin arboré, garage double. Quartier résidentiel prisé à deux pas de la Corniche. Idéale pour famille ou investissement.\n\nLa propriété dispose d'une belle terrasse panoramique avec vue sur l'océan Atlantique, d'un salon-salle à manger spacieux avec accès direct au jardin, d'une cuisine américaine entièrement équipée, et de 4 chambres dont une suite parentale avec dressing.\n\nSécurité 24h/24, gardien, système d'alarme.",
    type: "sale", category: "villa", price: 85000000, currency: "XOF",
    city: "Dakar", address: "Almadies, Dakar", bedrooms: 4, bathrooms: 3, surface: 320,
    is_featured: true, is_verified: true, status: "active", images: [],
    amenities: ["Piscine", "Jardin", "Garage double", "Terrasse", "Gardien 24h", "Alarme", "Climatisation", "Parking"],
    created_at: "2024-01-15T10:00:00Z", updated_at: "2024-01-15T10:00:00Z",
  },
  4: {
    id: 4, user_id: 2,
    title: "Villa duplex 5ch. piscine — Ngor",
    description: "Splendide villa de luxe avec piscine olympique et vue panoramique sur la mer. Architecte de renom. Finitions haut de gamme.",
    type: "sale", category: "villa", price: 120000000, currency: "XOF",
    city: "Dakar", address: "Ngor, Dakar", bedrooms: 5, bathrooms: 4, surface: 450,
    is_featured: true, is_verified: true, status: "active", images: [],
    amenities: ["Piscine olympique", "Vue mer", "Duplex", "5 chambres", "Garage", "Gardien", "Climatisation centralisée"],
    created_at: "2024-01-18T10:00:00Z", updated_at: "2024-01-18T10:00:00Z",
  },
};

const FALLBACK: Property & { amenities: string[] } = {
  id: 0, user_id: 1, title: "Propriété à Dakar", description: "Belle propriété à Dakar.",
  type: "sale", category: "villa", price: 50000000, currency: "XOF",
  city: "Dakar", address: "Dakar, Sénégal", bedrooms: 3, bathrooms: 2, surface: 200,
  is_featured: false, is_verified: true, status: "active", images: [],
  amenities: ["Jardin", "Parking", "Climatisation"],
  created_at: "2024-01-01T00:00:00Z", updated_at: "2024-01-01T00:00:00Z",
};

const SIMILAR_FALLBACK: Property[] = [
  { id: 7, user_id: 6, title: "Maison 3ch. cour arborée — Pikine", description: "", type: "sale", category: "house", price: 35000000, currency: "XOF", city: "Dakar", address: "Pikine", bedrooms: 3, bathrooms: 2, surface: 200, is_featured: false, is_verified: true, status: "active", images: [], created_at: "2024-02-10T10:00:00Z", updated_at: "2024-02-10T10:00:00Z" },
  { id: 11, user_id: 10, title: "Villa contemporaine — Les Mamelles", description: "", type: "sale", category: "villa", price: 95000000, currency: "XOF", city: "Dakar", address: "Les Mamelles", bedrooms: 4, bathrooms: 3, surface: 380, is_featured: false, is_verified: true, status: "active", images: [], created_at: "2024-02-25T10:00:00Z", updated_at: "2024-02-25T10:00:00Z" },
  { id: 9, user_id: 8, title: "Villa bord de mer — Saly", description: "", type: "sale", category: "villa", price: 180000000, currency: "XOF", city: "Saly", address: "Bord de mer", bedrooms: 6, bathrooms: 5, surface: 600, is_featured: true, is_verified: true, status: "active", images: [], created_at: "2024-02-15T10:00:00Z", updated_at: "2024-02-15T10:00:00Z" },
];

// ── Helpers ────────────────────────────────────────────────────────────────────

const typeLabels: Record<string, string> = { sale: "Vente", rent: "Location", hotel: "Hôtel" };
const catLabels: Record<string, string> = {
  apartment: "Appartement", house: "Maison", villa: "Villa",
  studio: "Studio", office: "Bureau", land: "Terrain",
};
const catEmoji: Record<string, string> = {
  villa: "🏡", apartment: "🏢", land: "🌳", house: "🏠", studio: "🏠", office: "🏢",
};

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR").format(n);
}
function fmtDate(s: string) {
  return new Date(s).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" });
}

// ── Skeleton bannière ─────────────────────────────────────────────────────────

function ImageSkeleton() {
  return (
    <div className="relative rounded-2xl overflow-hidden h-64 md:h-96 shadow-xl">
      <div className="skeleton w-full h-full rounded-2xl" style={{ borderRadius: 16 }} />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function PropertyDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  const [property, setProperty] = useState<(Property & { amenities?: string[] }) | null>(
    MOCK_PROPERTIES[id] ?? FALLBACK
  );
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [similar, setSimilar] = useState<Property[]>(SIMILAR_FALLBACK);

  const [contactForm, setContactForm] = useState({
    name: "", email: "", phone: "",
    message: "Bonjour, je suis intéressé(e) par cette annonce.",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  // Chargement de la propriété + similaires depuis l'API
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setFetchError(null);

    getProperty(id)
      .then((r) => {
        setProperty(r.data);
        setImgIndex(0);
        // Chargement discret des similaires
        getProperties({ type: r.data.type, per_page: 5 })
          .then((res) => setSimilar(res.data.filter((p) => p.id !== id).slice(0, 3)))
          .catch(() => {});
      })
      .catch(() => {
        setFetchError("Impossible de charger cette annonce depuis le serveur. Les informations affichées peuvent ne pas être à jour.");
        setProperty(MOCK_PROPERTIES[id] ?? FALLBACK);
      })
      .finally(() => setLoading(false));
  }, [id]);

  async function handleContact(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    // Pas d'endpoint /properties/{id}/contact défini — simulation
    await new Promise((r) => setTimeout(r, 800));
    setSent(true);
    setSending(false);
  }

  if (!property) return null;

  const images = property.images ?? [];
  const amenities: string[] = (property as Property & { amenities?: string[] }).amenities ?? [];

  return (
    <div className="min-h-screen bg-[#F7F2EA]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-[#C8922A]"><Home className="w-4 h-4" /></Link>
          <span>/</span>
          <Link href="/immobilier" className="hover:text-[#C8922A]">Immobilier</Link>
          <span>/</span>
          <span className="text-[#1A1A2E] font-medium truncate max-w-xs">{property.title}</span>
        </div>

        {/* Erreur API */}
        {fetchError && (
          <div className="flex items-start gap-3 bg-[#FFF8E7] border border-[#C8922A]/35 rounded-xl px-4 py-3 text-sm text-[#8A6118] mb-6">
            <AlertCircle className="w-4 h-4 text-[#C8922A] shrink-0 mt-0.5" />
            <span className="flex-1">{fetchError}</span>
            <button onClick={() => setFetchError(null)} className="text-[#C8922A] hover:opacity-70 transition-opacity">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Contenu principal ── */}
          <div className="lg:col-span-2 space-y-6">

            {/* Galerie d'images */}
            {loading ? (
              <ImageSkeleton />
            ) : (
              <div className="relative rounded-2xl overflow-hidden h-64 md:h-96 shadow-xl bg-gradient-to-br from-[#1A1A2E] to-[#16213E]">
                {images.length > 0 ? (
                  <>
                    <Image
                      src={images[imgIndex]?.url}
                      alt={`${property.title} — photo ${imgIndex + 1}`}
                      fill
                      unoptimized
                      style={{ objectFit: "cover" }}
                      priority={imgIndex === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />

                    {/* Navigation multi-images */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setImgIndex((i) => (i - 1 + images.length) % images.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4 text-[#1A1A2E]" />
                        </button>
                        <button
                          onClick={() => setImgIndex((i) => (i + 1) % images.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/85 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-white transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 text-[#1A1A2E]" />
                        </button>

                        {/* Dots */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                          {images.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setImgIndex(i)}
                              className={`h-1.5 rounded-full transition-all duration-200 ${i === imgIndex ? "w-5 bg-white" : "w-1.5 bg-white/50"}`}
                            />
                          ))}
                        </div>

                        {/* Compteur */}
                        <div className="absolute top-4 right-16 bg-black/40 text-white text-xs px-2.5 py-1 rounded-lg backdrop-blur-sm">
                          {imgIndex + 1} / {images.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-3">
                        {catEmoji[property.category] ?? "🏠"}
                      </div>
                      <p className="text-white/40 text-sm">Photos à venir</p>
                    </div>
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  <Badge variant={property.type === "sale" ? "gold" : property.type === "rent" ? "green" : "red"}>
                    {typeLabels[property.type]}
                  </Badge>
                  {property.is_featured && <Badge variant="gold">★ Featured</Badge>}
                  {property.is_verified && (
                    <span className="flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                      <CheckCircle className="w-3 h-3" /> Vérifié
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Titre + prix */}
            {loading ? (
              <div className="space-y-2">
                <div className="skeleton rounded-lg" style={{ height: 28, width: "70%" }} />
                <div className="skeleton rounded-lg" style={{ height: 20, width: "45%" }} />
              </div>
            ) : (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-[#1A1A2E] leading-tight">{property.title}</h1>
                  <div className="shrink-0 text-right">
                    <p className="text-2xl font-extrabold text-[#C8922A]">
                      {fmt(property.price)} {property.currency}
                    </p>
                    {property.type === "rent" && <p className="text-xs text-gray-500">/mois</p>}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 text-[#C8922A] shrink-0" />
                  <span>{property.address}, {property.city}</span>
                </div>
              </div>
            )}

            {/* Caractéristiques */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { icon: Bed,      label: "Chambres",      value: property.bedrooms  ?? "—" },
                { icon: Bath,     label: "Salles de bain", value: property.bathrooms ?? "—" },
                { icon: Maximize, label: "Surface",        value: property.surface ? `${property.surface} m²` : "—" },
                { icon: Home,     label: "Type",           value: catLabels[property.category] ?? property.category },
              ].map((spec) => {
                const Icon = spec.icon;
                return (
                  <div key={spec.label} className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
                    {loading ? (
                      <div className="skeleton rounded-lg mx-auto" style={{ height: 40, width: 40 }} />
                    ) : (
                      <>
                        <Icon className="w-5 h-5 text-[#C8922A] mx-auto mb-2" />
                        <p className="text-lg font-bold text-[#1A1A2E]">{spec.value}</p>
                        <p className="text-xs text-gray-400">{spec.label}</p>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-sm font-semibold text-[#1A1A2E] mb-3 uppercase tracking-wide">Description</h2>
              {loading ? (
                <div className="space-y-2">
                  <div className="skeleton rounded" style={{ height: 14, width: "100%" }} />
                  <div className="skeleton rounded" style={{ height: 14, width: "92%" }} />
                  <div className="skeleton rounded" style={{ height: 14, width: "85%" }} />
                  <div className="skeleton rounded mt-3" style={{ height: 14, width: "97%" }} />
                  <div className="skeleton rounded" style={{ height: 14, width: "78%" }} />
                </div>
              ) : (
                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {property.description || "Description disponible sur demande."}
                </div>
              )}
            </div>

            {/* Équipements */}
            {amenities.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-sm font-semibold text-[#1A1A2E] mb-4 uppercase tracking-wide">Équipements</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {amenities.map((a) => (
                    <div key={a} className="flex items-center gap-2 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-[#4A7C59] shrink-0" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Localisation */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-sm font-semibold text-[#1A1A2E] mb-3 uppercase tracking-wide">Localisation</h2>
              <div className="h-40 bg-[#F0EFE9] rounded-xl flex items-center justify-center border-2 border-dashed border-gray-200">
                <div className="text-center text-gray-400">
                  <MapPin className="w-8 h-8 mx-auto mb-1 text-[#C8922A]" />
                  <p className="text-sm font-medium">{property.address}</p>
                  <p className="text-xs">{property.city}</p>
                </div>
              </div>
            </div>

            {/* Méta */}
            <div className="text-xs text-gray-400 flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Publié le {fmtDate(property.created_at)}
              </span>
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5" />
                Annonce {property.is_verified ? "vérifiée" : "en attente"}
              </span>
            </div>
          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-4">

            {/* Formulaire contact */}
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sticky top-4">
              <h2 className="text-base font-semibold text-[#1A1A2E] mb-4">Contacter le propriétaire</h2>

              {sent ? (
                <div className="text-center py-6">
                  <CheckCircle className="w-10 h-10 text-[#4A7C59] mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-700">Message envoyé !</p>
                  <p className="text-xs text-gray-400 mt-1">Le propriétaire vous répondra bientôt.</p>
                  <Button variant="ghost" size="sm" onClick={() => setSent(false)} className="mt-3">
                    Envoyer un autre message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleContact} className="space-y-3">
                  <input
                    type="text"
                    placeholder="Votre nom"
                    value={contactForm.name}
                    onChange={(e) => setContactForm((f) => ({ ...f, name: e.target.value }))}
                    required
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                  />
                  <input
                    type="email"
                    placeholder="Votre email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                    required
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                  />
                  <input
                    type="tel"
                    placeholder="Votre téléphone"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm((f) => ({ ...f, phone: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A]"
                  />
                  <textarea
                    rows={3}
                    value={contactForm.message}
                    onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#C8922A] resize-none"
                  />
                  <Button type="submit" variant="primary" size="md" loading={sending} className="w-full gap-2">
                    {sending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                    Envoyer un message
                  </Button>
                  <Button type="button" variant="outline" size="md" className="w-full gap-2">
                    <Phone className="w-4 h-4" />
                    Appeler
                  </Button>
                </form>
              )}
            </div>

            {/* Badge confiance */}
            <div className="bg-[#F5E6C8] rounded-2xl p-4 text-center">
              <Star className="w-6 h-6 text-[#C8922A] mx-auto mb-2" />
              <p className="text-sm font-medium text-[#8A6118]">Annonce vérifiée par Kasafrik</p>
              <p className="text-xs text-[#8A6118]/70 mt-1">Visitez en toute confiance</p>
            </div>

            <Link href="/immobilier">
              <Button variant="ghost" size="sm" className="gap-2 w-full">
                <ArrowLeft className="w-4 h-4" /> Retour aux annonces
              </Button>
            </Link>
          </div>
        </div>

        {/* Propriétés similaires */}
        {similar.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-6">Propriétés similaires</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.filter((p) => p.id !== id).slice(0, 3).map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
