import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Política de privacidade" };

/** Texto-base. Revise com o jurídico/DPO da empresa (LGPD) antes de publicar. */
export default function Privacidade() {
  return (
    <main className="container-x max-w-3xl py-24">
      <a href="/" className="text-sm font-semibold text-[#c2570c]">← Voltar ao site</a>
      <h1 className="h-display mt-6 text-4xl">Política de privacidade</h1>
      <div className="mt-8 space-y-5 leading-relaxed text-navy/75">
        <p>A {site.name} respeita a sua privacidade e trata dados pessoais conforme a Lei Geral de Proteção de Dados (Lei nº 13.709/2018).</p>
        <h2 className="font-display text-xl font-semibold text-navy">Dados coletados</h2>
        <p>Ao solicitar um orçamento, coletamos nome, WhatsApp, e-mail, cidade, estado, tipo de imóvel, média da conta de energia e a mensagem opcional.</p>
        <h2 className="font-display text-xl font-semibold text-navy">Finalidade</h2>
        <p>Usamos essas informações exclusivamente para entrar em contato e elaborar propostas de energia solar solicitadas por você.</p>
        <h2 className="font-display text-xl font-semibold text-navy">Seus direitos</h2>
        <p>Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento pelos canais de contato desta página.</p>
        <p className="text-sm text-navy/50">Modelo provisório: a empresa deve revisar e completar este texto (controlador, base legal, retenção, cookies/analytics) antes da publicação.</p>
      </div>
    </main>
  );
}
