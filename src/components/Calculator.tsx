"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calculator as CalcIcon, Info, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { brl, cn, maskMoney, moneyToNumber, UFS } from "@/lib/utils";
import { track } from "@/lib/track";

/**
 * HIPÓTESE DE REFERÊNCIA (ilustrativa, NÃO é garantia nem cálculo técnico).
 * Ajuste conforme a política comercial da empresa. Sem dados de tarifa,
 * irradiação e dimensionamento, o resultado é apenas uma faixa de referência.
 */
const ASSUMPTION = { min: 0.6, max: 0.85 };

type Errors = Partial<Record<"bill" | "city" | "uf", string>>;
type Result = { bill: number; monthlyMin: number; monthlyMax: number; tariff: number | null; type: string; city: string; uf: string };

export function Calculator() {
  const [bill, setBill] = useState("");
  const [type, setType] = useState<"Residencial" | "Comercial">("Residencial");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [kwh, setKwh] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [result, setResult] = useState<Result | null>(null);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const b = moneyToNumber(bill);
    const err: Errors = {};
    if (b < 50) err.bill = "Informe o valor médio mensal da sua conta (mín. R$ 50).";
    if (city.trim().length < 2) err.city = "Informe a cidade.";
    if (!uf) err.uf = "Selecione o estado.";
    setErrors(err);
    if (Object.keys(err).length) return;

    const k = Number(kwh.replace(/\D/g, ""));
    setResult({
      bill: b,
      monthlyMin: b * ASSUMPTION.min,
      monthlyMax: b * ASSUMPTION.max,
      tariff: k > 0 ? b / k : null,
      type,
      city: city.trim(),
      uf,
    });
    track("calculator_used", { property_type: type, uf });
  }

  function goToForm() {
    if (!result) return;
    window.dispatchEvent(
      new CustomEvent("rision:prefill", {
        detail: { bill: maskMoney(String(Math.round(result.bill))), type: result.type, city: result.city, uf: result.uf },
      }),
    );
    track("calculator_cta_click");
    document.getElementById("orcamento")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="calculadora" className="section-y bg-mist">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow border-sun/30 bg-sun/10 text-[#c2570c]">Simulador</span>
          <h2 className="h-display mt-5 text-3xl sm:text-5xl">Descubra o potencial de economia da sua conta de energia.</h2>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-5xl" y={30}>
          <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-card ring-1 ring-navy/5 lg:grid-cols-2">
            <form onSubmit={submit} noValidate className="p-6 sm:p-10">
              <div className="space-y-5">
                <div>
                  <label htmlFor="c-bill" className="mb-2 block text-sm font-semibold">
                    Valor médio da conta mensal (R$)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-navy/40">R$</span>
                    <input
                      id="c-bill"
                      inputMode="numeric"
                      className={cn("field pl-11", errors.bill && "!border-red-500")}
                      placeholder="450"
                      value={bill}
                      onChange={(e) => setBill(maskMoney(e.target.value))}
                      aria-invalid={!!errors.bill}
                    />
                  </div>
                  {errors.bill && <p className="mt-1.5 text-sm text-red-600">{errors.bill}</p>}
                </div>

                <fieldset>
                  <legend className="mb-2 text-sm font-semibold">Tipo de imóvel</legend>
                  <div className="grid grid-cols-2 gap-3">
                    {(["Residencial", "Comercial"] as const).map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setType(t)}
                        aria-pressed={type === t}
                        className={cn(
                          "rounded-xl border px-4 py-3 text-[15px] font-semibold transition",
                          type === t ? "border-sun bg-sun/10 text-navy ring-4 ring-sun/15" : "border-navy/15 text-navy/60 hover:border-navy/40",
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="grid grid-cols-[1fr_96px] gap-3">
                  <div>
                    <label htmlFor="c-city" className="mb-2 block text-sm font-semibold">Cidade</label>
                    <input id="c-city" className={cn("field", errors.city && "!border-red-500")} value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" />
                    {errors.city && <p className="mt-1.5 text-sm text-red-600">{errors.city}</p>}
                  </div>
                  <div>
                    <label htmlFor="c-uf" className="mb-2 block text-sm font-semibold">UF</label>
                    <select id="c-uf" className={cn("field", errors.uf && "!border-red-500")} value={uf} onChange={(e) => setUf(e.target.value)}>
                      <option value="">—</option>
                      {UFS.map((u) => <option key={u}>{u}</option>)}
                    </select>
                    {errors.uf && <p className="mt-1.5 text-sm text-red-600">{errors.uf}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="c-kwh" className="mb-2 block text-sm font-semibold">
                    Consumo mensal em kWh <span className="font-normal text-navy/45">(opcional)</span>
                  </label>
                  <input id="c-kwh" inputMode="numeric" className="field" placeholder="Ex.: 500" value={kwh} onChange={(e) => setKwh(e.target.value.replace(/\D/g, "").slice(0, 5))} />
                </div>
              </div>

              <button type="submit" className="btn-primary mt-8 w-full">
                <CalcIcon size={18} /> Calcular meu potencial de economia
              </button>
            </form>

            <div className="relative bg-navy p-6 text-white sm:p-10">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sun/20 blur-[90px]" />
              <AnimatePresence mode="wait">
                {!result ? (
                  <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="relative flex h-full min-h-[280px] flex-col items-center justify-center text-center">
                    <div className="grid h-16 w-16 place-items-center rounded-2xl bg-white/10 text-sun"><CalcIcon size={28} /></div>
                    <p className="mt-5 max-w-xs text-white/70">Preencha os dados ao lado para ver uma simulação ilustrativa da sua economia.</p>
                  </motion.div>
                ) : (
                  <motion.div key="res" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="relative" aria-live="polite">
                    <span className="eyebrow border-white/15 bg-white/5 text-sun-light">Simulação ilustrativa</span>
                    <dl className="mt-6 space-y-5">
                      <div>
                        <dt className="text-sm text-white/60">Conta mensal informada</dt>
                        <dd className="font-display text-3xl font-semibold">{brl(result.bill)}</dd>
                      </div>
                      <div className="rounded-2xl border border-sun/40 bg-sun/10 p-5">
                        <dt className="text-sm text-white/70">Potencial de economia mensal (faixa de referência)</dt>
                        <dd className="mt-1 font-display text-3xl font-semibold text-sun-light">
                          {brl(result.monthlyMin)} a {brl(result.monthlyMax)}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm text-white/60">Estimativa anual</dt>
                        <dd className="font-display text-2xl font-semibold">
                          {brl(result.monthlyMin * 12)} a {brl(result.monthlyMax * 12)}
                        </dd>
                      </div>
                      {result.tariff && (
                        <p className="text-sm text-white/60">Custo médio aproximado informado: {result.tariff.toFixed(2).replace(".", ",")} R$/kWh.</p>
                      )}
                    </dl>

                    <div className="mt-6 flex gap-3 rounded-xl bg-white/5 p-4 text-[13px] leading-relaxed text-white/65">
                      <Info size={18} className="mt-0.5 shrink-0 text-sky-brand" />
                      <p>
                        Resultado preliminar, baseado em uma hipótese de referência ({Math.round(ASSUMPTION.min * 100)}% a{" "}
                        {Math.round(ASSUMPTION.max * 100)}% da conta) e <strong>não representa garantia</strong>. O valor real depende da tarifa, do
                        consumo, da irradiação solar, das características do imóvel, do dimensionamento do sistema, do custo de disponibilidade e das regras
                        de compensação.
                      </p>
                    </div>

                    <button type="button" onClick={goToForm} className="btn-primary mt-6 w-full">
                      Quero uma análise personalizada <ArrowRight size={18} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
