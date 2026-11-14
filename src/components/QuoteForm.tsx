"use client";
import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, MessageCircle, AlertTriangle } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn, maskMoney, maskPhone, moneyToNumber, UFS } from "@/lib/utils";
import { site, whatsappLink } from "@/lib/site";
import { track } from "@/lib/track";

type Values = {
  name: string; whatsapp: string; email: string; city: string; uf: string;
  type: string; bill: string; message: string; website: string; // website = honeypot
};
type Errors = Partial<Record<keyof Values, string>>;
type Status = "idle" | "loading" | "success" | "error";

const empty: Values = { name: "", whatsapp: "", email: "", city: "", uf: "", type: "", bill: "", message: "", website: "" };

function validate(v: Values): Errors {
  const e: Errors = {};
  if (v.name.trim().split(/\s+/).filter(Boolean).length < 2) e.name = "Informe seu nome completo.";
  const d = v.whatsapp.replace(/\D/g, "");
  if (!(d.length === 11 && d[2] === "9") || /^(\d)\1+$/.test(d)) e.whatsapp = "Informe um WhatsApp válido com DDD.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "Informe um e-mail válido.";
  if (v.city.trim().length < 2) e.city = "Informe a cidade.";
  if (!v.uf) e.uf = "Selecione o estado.";
  if (!v.type) e.type = "Selecione o tipo de imóvel.";
  if (moneyToNumber(v.bill) < 50) e.bill = "Informe a média da conta (mín. R$ 50).";
  if (v.message.length > 600) e.message = "Máximo de 600 caracteres.";
  return e;
}

export function QuoteForm() {
  const [v, setV] = useState<Values>(empty);
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");

  const errors = validate(v);
  const wa = whatsappLink();

  useEffect(() => {
    const h = (ev: Event) => {
      const d = (ev as CustomEvent<Partial<Values>>).detail;
      setV((p) => ({ ...p, ...d }));
    };
    window.addEventListener("rision:prefill", h);
    return () => window.removeEventListener("rision:prefill", h);
  }, []);

  const set = (k: keyof Values) => (val: string) => setV((p) => ({ ...p, [k]: val }));
  const blur = (k: keyof Values) => () => setTouched((t) => ({ ...t, [k]: true }));
  const state = (k: keyof Values) => (touched[k] ? (errors[k] ? "bad" : v[k] ? "ok" : "") : "");
  const cls = (k: keyof Values) =>
    cn("field", state(k) === "bad" && "!border-red-500 focus:!ring-red-200", state(k) === "ok" && "!border-emerald-500");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setTouched({ name: true, whatsapp: true, email: true, city: true, uf: true, type: true, bill: true, message: true });
    if (Object.keys(errors).length) return;
    if (v.website) return; // honeypot: bot

    setStatus("loading");
    setErrMsg("");
    try {
      const { website, ...payload } = v;
      void website;
      const isFormSubmit = site.formEndpoint.includes("formsubmit.co");
      const data = isFormSubmit
        ? {
            // Campos em português para o e-mail ficar legível. "email" vira o responder-para.
            _subject: `Novo orçamento solar: ${payload.name}`,
            _template: "table",
            _captcha: "false",
            Nome: payload.name,
            WhatsApp: payload.whatsapp,
            email: payload.email,
            Cidade: payload.city,
            Estado: payload.uf,
            "Tipo de imóvel": payload.type,
            "Média da conta (R$)": payload.bill,
            Mensagem: payload.message || "(sem mensagem)",
          }
        : { ...payload, source: "landing-page", sentAt: new Date().toISOString() };
      const res = await fetch(site.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      const failed = !res.ok || body?.success === false || body?.success === "false";
      if (failed) throw new Error(body?.error || body?.message || "Não foi possível enviar agora.");
      setStatus("success");
      track("generate_lead", { property_type: v.type, uf: v.uf });
    } catch (err) {
      setStatus("error");
      setErrMsg(err instanceof Error ? err.message : "Erro inesperado.");
    }
  }

  const Err = ({ k }: { k: keyof Values }) =>
    touched[k] && errors[k] ? <p className="mt-1.5 text-sm text-red-600" role="alert">{errors[k]}</p> : null;

  return (
    <section id="orcamento" className="section-y relative isolate overflow-hidden bg-navy text-white">
      <div className="absolute inset-0 -z-10"><div className="grid-bg absolute inset-0 opacity-60" /><div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-sun/20 blur-[120px]" /></div>
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <span className="eyebrow border-white/15 bg-white/5 text-sun-light">Orçamento</span>
          <h2 className="h-display mt-5 text-3xl sm:text-5xl">Seu próximo passo para <span className="bg-sun-gradient bg-clip-text text-transparent">economizar</span> começa aqui.</h2>
          <p className="mt-5 text-lg text-white/70">
            Conte com a RISION SOLAR para descobrir a solução ideal para sua residência ou empresa. Preencha e nossa equipe entra em contato.
          </p>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" onClick={() => track("whatsapp_click", { origin: "form" })} className="btn-ghost-dark mt-8">
              <MessageCircle size={18} /> Prefiro falar pelo WhatsApp
            </a>
          )}
          <p className="mt-6 text-sm text-white/45">Seus dados são usados apenas para contato sobre o seu orçamento.</p>
        </Reveal>

        <Reveal y={30}>
          <div className="rounded-[2rem] bg-mist p-6 text-navy shadow-card ring-1 ring-navy/5 sm:p-10">
            {status === "success" ? (
              <div className="py-10 text-center" role="status">
                <CheckCircle2 className="mx-auto text-emerald-500" size={56} />
                <h3 className="mt-5 font-display text-2xl font-semibold">Solicitação enviada!</h3>
                <p className="mx-auto mt-2 max-w-sm text-navy/65">Recebemos seus dados e entraremos em contato em breve.</p>
                <button type="button" className="btn-ghost-light mt-6" onClick={() => { setV(empty); setTouched({}); setStatus("idle"); }}>
                  Enviar outra solicitação
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label htmlFor="q-name" className="mb-2 block text-sm font-semibold">Nome completo</label>
                  <input id="q-name" autoComplete="name" className={cls("name")} value={v.name} onChange={(e) => set("name")(e.target.value)} onBlur={blur("name")} aria-invalid={state("name") === "bad"} />
                  <Err k="name" />
                </div>
                <div>
                  <label htmlFor="q-wa" className="mb-2 block text-sm font-semibold">WhatsApp</label>
                  <input id="q-wa" type="tel" inputMode="tel" autoComplete="tel" placeholder="(81) 99999-9999" className={cls("whatsapp")} value={v.whatsapp} onChange={(e) => set("whatsapp")(maskPhone(e.target.value))} onBlur={blur("whatsapp")} />
                  <Err k="whatsapp" />
                </div>
                <div>
                  <label htmlFor="q-email" className="mb-2 block text-sm font-semibold">E-mail</label>
                  <input id="q-email" type="email" autoComplete="email" className={cls("email")} value={v.email} onChange={(e) => set("email")(e.target.value)} onBlur={blur("email")} />
                  <Err k="email" />
                </div>
                <div>
                  <label htmlFor="q-city" className="mb-2 block text-sm font-semibold">Cidade</label>
                  <input id="q-city" autoComplete="address-level2" className={cls("city")} value={v.city} onChange={(e) => set("city")(e.target.value)} onBlur={blur("city")} />
                  <Err k="city" />
                </div>
                <div>
                  <label htmlFor="q-uf" className="mb-2 block text-sm font-semibold">Estado</label>
                  <select id="q-uf" className={cls("uf")} value={v.uf} onChange={(e) => set("uf")(e.target.value)} onBlur={blur("uf")}>
                    <option value="">Selecione</option>
                    {UFS.map((u) => <option key={u}>{u}</option>)}
                  </select>
                  <Err k="uf" />
                </div>
                <div>
                  <label htmlFor="q-type" className="mb-2 block text-sm font-semibold">Tipo de imóvel</label>
                  <select id="q-type" className={cls("type")} value={v.type} onChange={(e) => set("type")(e.target.value)} onBlur={blur("type")}>
                    <option value="">Selecione</option>
                    <option>Residencial</option>
                    <option>Comercial</option>
                    <option>Empresa / indústria</option>
                    <option>Outro</option>
                  </select>
                  <Err k="type" />
                </div>
                <div>
                  <label htmlFor="q-bill" className="mb-2 block text-sm font-semibold">Média da conta de energia</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40">R$</span>
                    <input id="q-bill" inputMode="numeric" className={cn(cls("bill"), "pl-11")} value={v.bill} onChange={(e) => set("bill")(maskMoney(e.target.value))} onBlur={blur("bill")} />
                  </div>
                  <Err k="bill" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="q-msg" className="mb-2 block text-sm font-semibold">
                    Mensagem adicional <span className="font-normal text-navy/45">(opcional)</span>
                  </label>
                  <textarea id="q-msg" rows={3} className={cls("message")} value={v.message} onChange={(e) => set("message")(e.target.value)} onBlur={blur("message")} />
                  <Err k="message" />
                </div>

                {/* honeypot anti-bot: invisível para pessoas */}
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                  <label>Website<input tabIndex={-1} autoComplete="off" value={v.website} onChange={(e) => set("website")(e.target.value)} /></label>
                </div>

                {status === "error" && (
                  <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:col-span-2" role="alert">
                    <AlertTriangle size={18} className="mt-0.5 shrink-0" />
                    <p>
                      {errMsg} Tente novamente{wa ? " ou fale conosco pelo WhatsApp." : " em instantes."}
                    </p>
                  </div>
                )}

                <button type="submit" disabled={status === "loading"} className="btn-primary sm:col-span-2">
                  {status === "loading" ? (<><Loader2 size={18} className="animate-spin" /> Enviando…</>) : "Quero receber meu orçamento"}
                </button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}