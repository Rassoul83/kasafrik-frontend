"use client";

import { useState } from "react";
import { Settings, Save, AlertCircle, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";

interface SiteSettings {
  site_name: string;
  site_email: string;
  site_phone: string;
  commission_property: string;
  commission_ticket: string;
  commission_booking: string;
  featured_slots: string;
  max_images_property: string;
  maintenance_mode: boolean;
  allow_registrations: boolean;
}

const DEFAULT: SiteSettings = {
  site_name: "Kasafrik",
  site_email: "contact@kasafrik.sn",
  site_phone: "+221 33 000 00 00",
  commission_property: "5",
  commission_ticket: "3",
  commission_booking: "8",
  featured_slots: "12",
  max_images_property: "10",
  maintenance_mode: false,
  allow_registrations: true,
};

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT);
  const [loading, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  function update<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((s) => ({ ...s, [key]: value }));
    setSaved(false);
    setError("");
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      // Simulated save — replace with real API call when backend ready
      await new Promise((res) => setTimeout(res, 800));
      setSaved(true);
    } catch {
      setError("Erreur lors de la sauvegarde. Réessayez.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E]">Paramètres</h1>
          <p className="text-sm text-gray-500">Configuration générale de la plateforme</p>
        </div>
        <Button
          variant="primary"
          size="md"
          loading={loading}
          onClick={handleSave}
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          Enregistrer
        </Button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 bg-[#D6EDE0] border border-[#4A7C59]/30 text-[#2D5A3D] text-sm rounded-xl px-4 py-3">
          <CheckCircle className="w-4 h-4 shrink-0" />
          Paramètres enregistrés avec succès.
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 bg-[#FAE8E3] border border-[#C84B2F]/30 text-[#C84B2F] text-sm rounded-xl px-4 py-3">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Infos site */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-5">
          <Settings className="w-4 h-4 text-[#C8922A]" />
          <h2 className="text-sm font-semibold text-[#1A1A2E]">Informations du site</h2>
        </div>
        <div className="space-y-4">
          <Input
            label="Nom du site"
            value={settings.site_name}
            onChange={(e) => update("site_name", e.target.value)}
            placeholder="Kasafrik"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Email de contact"
              type="email"
              value={settings.site_email}
              onChange={(e) => update("site_email", e.target.value)}
              placeholder="contact@kasafrik.sn"
            />
            <Input
              label="Téléphone"
              type="tel"
              value={settings.site_phone}
              onChange={(e) => update("site_phone", e.target.value)}
              placeholder="+221 33 000 00 00"
            />
          </div>
        </div>
      </Card>

      {/* Commissions */}
      <Card className="p-6">
        <h2 className="text-sm font-semibold text-[#1A1A2E] mb-5">Commissions (%)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Propriétés"
            type="number"
            min="0"
            max="100"
            value={settings.commission_property}
            onChange={(e) => update("commission_property", e.target.value)}
            placeholder="5"
          />
          <Input
            label="Billets"
            type="number"
            min="0"
            max="100"
            value={settings.commission_ticket}
            onChange={(e) => update("commission_ticket", e.target.value)}
            placeholder="3"
          />
          <Input
            label="Réservations hôtel"
            type="number"
            min="0"
            max="100"
            value={settings.commission_booking}
            onChange={(e) => update("commission_booking", e.target.value)}
            placeholder="8"
          />
        </div>
      </Card>

      {/* Limites */}
      <Card className="p-6">
        <h2 className="text-sm font-semibold text-[#1A1A2E] mb-5">Limites & Capacités</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Emplacements featured (max)"
            type="number"
            min="1"
            value={settings.featured_slots}
            onChange={(e) => update("featured_slots", e.target.value)}
            placeholder="12"
          />
          <Input
            label="Images max par propriété"
            type="number"
            min="1"
            value={settings.max_images_property}
            onChange={(e) => update("max_images_property", e.target.value)}
            placeholder="10"
          />
        </div>
      </Card>

      {/* Toggles */}
      <Card className="p-6">
        <h2 className="text-sm font-semibold text-[#1A1A2E] mb-5">Mode & Accès</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="text-sm font-medium text-[#1A1A2E]">Mode maintenance</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Désactive l&apos;accès public au site pour les non-admins
              </p>
            </div>
            <button
              onClick={() => update("maintenance_mode", !settings.maintenance_mode)}
              className={[
                "relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#C8922A] focus:ring-offset-2",
                settings.maintenance_mode ? "bg-[#C84B2F]" : "bg-gray-200",
              ].join(" ")}
              role="switch"
              aria-checked={settings.maintenance_mode}
            >
              <span
                className={[
                  "pointer-events-none inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 mt-0.5",
                  settings.maintenance_mode ? "translate-x-5" : "translate-x-0.5",
                ].join(" ")}
              />
            </button>
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium text-[#1A1A2E]">Inscriptions ouvertes</p>
              <p className="text-xs text-gray-400 mt-0.5">
                Autoriser les nouvelles créations de compte
              </p>
            </div>
            <button
              onClick={() => update("allow_registrations", !settings.allow_registrations)}
              className={[
                "relative inline-flex w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#C8922A] focus:ring-offset-2",
                settings.allow_registrations ? "bg-[#4A7C59]" : "bg-gray-200",
              ].join(" ")}
              role="switch"
              aria-checked={settings.allow_registrations}
            >
              <span
                className={[
                  "pointer-events-none inline-block w-5 h-5 rounded-full bg-white shadow transform transition-transform duration-200 mt-0.5",
                  settings.allow_registrations ? "translate-x-5" : "translate-x-0.5",
                ].join(" ")}
              />
            </button>
          </div>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button
          variant="primary"
          size="lg"
          loading={loading}
          onClick={handleSave}
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          Enregistrer les paramètres
        </Button>
      </div>
    </div>
  );
}
