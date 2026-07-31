"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { register } from "@/lib/api";

type Role = "client" | "owner" | "organizer";

const roles: { value: Role; label: string; desc: string }[] = [
  {
    value: "client",
    label: "Acheteur / Locataire",
    desc: "Je cherche un bien ou des billets",
  },
  {
    value: "owner",
    label: "Propriétaire",
    desc: "Je veux publier des annonces immobilières",
  },
  {
    value: "organizer",
    label: "Organisateur",
    desc: "Je veux créer et gérer des événements",
  },
];

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    role: "client" as Role,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function update(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (form.password !== form.password_confirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (form.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    setLoading(true);
    try {
      await register(form);
      router.push("/");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Une erreur est survenue lors de l'inscription.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F2EA] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center">
            <Image src="/logo.png" alt="Kasafrik" width={120} height={60} />
          </Link>
          <p className="text-gray-500 text-sm mt-2">
            Créez votre compte gratuitement
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h1 className="text-xl font-bold text-[#1A1A2E] mb-6">
            Créer un compte
          </h1>

          {error && (
            <div className="flex items-center gap-2 bg-[#FAE8E3] border border-[#C84B2F]/30 text-[#C84B2F] text-sm rounded-xl px-4 py-3 mb-5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Je suis...
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => update("role", r.value)}
                    className={[
                      "p-3 rounded-xl border-2 text-left transition-all duration-200",
                      form.role === r.value
                        ? "border-[#C8922A] bg-[#F5E6C8]"
                        : "border-gray-200 hover:border-gray-300 bg-white",
                    ].join(" ")}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-xs font-semibold text-gray-800">
                        {r.label}
                      </p>
                      {form.role === r.value && (
                        <CheckCircle className="w-3.5 h-3.5 text-[#C8922A]" />
                      )}
                    </div>
                    <p className="text-[10px] text-gray-500">{r.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Nom complet"
              type="text"
              placeholder="Moussa Diallo"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              icon={<User className="w-4 h-4" />}
              required
            />

            <Input
              label="Adresse email"
              type="email"
              placeholder="vous@exemple.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
              autoComplete="email"
            />

            <Input
              label="Téléphone (optionnel)"
              type="tel"
              placeholder="+221 77 000 00 00"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              icon={<Phone className="w-4 h-4" />}
            />

            <Input
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 caractères"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              iconRight={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              }
              required
              autoComplete="new-password"
            />

            <Input
              label="Confirmer le mot de passe"
              type={showPassword ? "text" : "password"}
              placeholder="Répétez le mot de passe"
              value={form.password_confirmation}
              onChange={(e) => update("password_confirmation", e.target.value)}
              icon={<Lock className="w-4 h-4" />}
              error={
                form.password_confirmation &&
                form.password !== form.password_confirmation
                  ? "Les mots de passe ne correspondent pas"
                  : undefined
              }
              required
              autoComplete="new-password"
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
            >
              Créer mon compte
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Déjà un compte ?{" "}
            <Link
              href="/login"
              className="text-[#C8922A] hover:text-[#8A6118] font-semibold transition-colors"
            >
              Se connecter
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          En créant un compte, vous acceptez nos{" "}
          <Link href="/conditions" className="underline hover:text-[#C8922A]">
            CGU
          </Link>{" "}
          et notre{" "}
          <Link href="/confidentialite" className="underline hover:text-[#C8922A]">
            politique de confidentialité
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
