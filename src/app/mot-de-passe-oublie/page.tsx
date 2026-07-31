"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft, CheckCircle, Send } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function MotDePasseOubliePage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  }

  return (
    <div className="min-h-screen bg-[#F7F2EA] flex flex-col">
      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center">
              <Image src="/logo.png" alt="Kasafrik" width={120} height={60} />
            </Link>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
            {sent ? (
              /* Success state */
              <div className="text-center py-4">
                <div className="w-16 h-16 bg-[#D6EDE0] rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-8 h-8 text-[#4A7C59]" />
                </div>
                <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">
                  Email envoyé !
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-2">
                  Si un compte existe avec l&apos;adresse{" "}
                  <strong className="text-[#1A1A2E]">{email}</strong>, vous
                  recevrez un email avec un lien de réinitialisation.
                </p>
                <p className="text-gray-400 text-xs mb-8">
                  Vérifiez votre dossier spam si vous ne trouvez pas l&apos;email.
                  Le lien est valable 1 heure.
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setSent(false);
                      setEmail("");
                    }}
                    className="w-full text-sm text-[#C8922A] font-medium hover:underline"
                  >
                    Essayer avec une autre adresse
                  </button>
                  <Link href="/login">
                    <button className="w-full flex items-center justify-center gap-2 bg-[#C8922A] hover:bg-[#8A6118] text-white font-semibold py-3 px-4 rounded-xl transition-all text-sm">
                      Retour à la connexion
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              /* Form state */
              <>
                <div className="mb-6">
                  <div className="w-12 h-12 bg-[#F5E6C8] rounded-xl flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-[#C8922A]" />
                  </div>
                  <h1 className="text-xl font-bold text-[#1A1A2E] mb-2">
                    Mot de passe oublié ?
                  </h1>
                  <p className="text-sm text-gray-500">
                    Entrez l&apos;adresse email associée à votre compte. Nous vous
                    enverrons un lien pour réinitialiser votre mot de passe.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <Input
                    label="Adresse email"
                    type="email"
                    placeholder="vous@exemple.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    icon={<Mail className="w-4 h-4" />}
                    required
                    autoComplete="email"
                    autoFocus
                  />

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    loading={loading}
                    className="w-full"
                  >
                    <Send className="w-4 h-4" />
                    Envoyer le lien de réinitialisation
                  </Button>
                </form>

                <div className="mt-6 pt-5 border-t border-gray-100">
                  <Link
                    href="/login"
                    className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-[#C8922A] transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Retour à la connexion
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Help */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400">
              Toujours bloqué ?{" "}
              <Link
                href="/contact"
                className="text-[#C8922A] hover:underline font-medium"
              >
                Contactez le support
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
