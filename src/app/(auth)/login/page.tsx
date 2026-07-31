"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { login } from "@/lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { user } = await login(email, password);
      router.push(user.role === "admin" ? "/admin" : "/");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Email ou mot de passe incorrect.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F2EA] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center">
            <Image src="/logo.png" alt="Kasafrik" width={120} height={60} />
          </Link>
          <p className="text-gray-500 text-sm mt-2">
            Connectez-vous à votre compte
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h1 className="text-xl font-bold text-[#1A1A2E] mb-6">Connexion</h1>

          {error && (
            <div className="flex items-center gap-2 bg-[#FAE8E3] border border-[#C84B2F]/30 text-[#C84B2F] text-sm rounded-xl px-4 py-3 mb-5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Adresse email"
              type="email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="w-4 h-4" />}
              required
              autoComplete="email"
            />

            <Input
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              autoComplete="current-password"
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#C8922A] focus:ring-[#C8922A]"
                />
                Se souvenir de moi
              </label>
              <Link
                href="/mot-de-passe-oublie"
                className="text-[#C8922A] hover:text-[#8A6118] font-medium transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full mt-2"
            >
              Se connecter
            </Button>
          </form>

          {/* Séparateur */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">ou</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <p className="text-center text-sm text-gray-600">
            Pas encore de compte ?{" "}
            <Link
              href="/register"
              className="text-[#C8922A] hover:text-[#8A6118] font-semibold transition-colors"
            >
              Créer un compte
            </Link>
          </p>

          {/* Identifiants de test */}
          <div className="mt-6 p-4 bg-[#F5E6C8] rounded-xl border border-[#C8922A]/20">
            <p className="text-xs font-semibold text-[#8A6118] mb-2 uppercase tracking-wide">
              Comptes de test
            </p>
            <div className="space-y-1 text-xs text-[#8A6118]">
              <p>
                <strong>Admin :</strong> admin@kasafrik.sn / password
              </p>
              <p>
                <strong>Owner :</strong> moussa.diallo@gmail.com / password
              </p>
              <p>
                <strong>Client :</strong> fatou.sow@outlook.com / password
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          En vous connectant, vous acceptez nos{" "}
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
