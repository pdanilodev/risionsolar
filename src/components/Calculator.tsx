"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Info, ArrowRight, Home, Building2, Lightbulb } from "lucide-react";
import { Reveal } from "./Reveal";
import { brl, cn, maskMoney, UFS } from "@/lib/utils";
import { track } from "@/lib/track";

/**
 * HIPÓTESE DE REFERÊNCIA (ilustrativa, NÃO é garantia nem cálculo técnico).
 * Ajuste conforme a política comercial da empresa. Sem dados de tarifa,
 * irradiação e dimensionamento, o resultado é apenas uma faixa de referência.
 */
const ASSUMPTION = { min: 0.6, max: 0.85 };

/** Contas abaixo disso têm pouca margem por causa do custo de disponibilidade. */
const LOW_BILL = 150;

const TYPES = {
  Residencial: { icon: Home, max: 1500, step: 10, presets: [200, 400, 800, 1200] },
  Comercial: { icon: Building2, max: 10000, step: 50, presets: [1000, 2500, 5000, 8000] },
} as const;
type PropType = keyof typeof TYPES;

const HORIZONS = [1, 5, 10] as const;

/** Anima um número até o novo valor (respeita prefers-reduced-motion). */
function useCountUp(target: number, ms = 650) {
  const [value, setValue] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      from.current = target;
      setValue(target);
      return;
    }
    const start = performance.now();
    const origin = from.current;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ms);
      const eased = 1 - Math.pow(1 - p, 3);
      const v = origin + (target - origin) * eased;
      from.current = v;
      setValue(v);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return value;
}

function Money({ value, className }: { value: number; className?: string }) {
  const v = useCountUp(value);
  return <span className={cn("tabular-nums", className)}>{brl(v)}</span>;
}

export function Calculator() {
  const [type, setType] = useState<PropType>("Residencial");
  const [bill, setBill] = useState(400);
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [kwh, setKwh] = useState("");
  const [years, setYears] = useState<(typeof HORIZONS)[number]>(5);
  const tracked = useRef(false);

  const cfg = TYPES[type];
  const valid = bill >= 50;
  const monthlyMin = valid ? bill * ASSUMPTION.min : 0;
  const monthlyMax = valid ? bill * ASSUMPTION.max : 0;
  const k = Number(kwh);
  const tariff = valid && k > 0 ? bill / k : null;

  // Percentuais da barra "antes x depois" (100% = conta atual).
  const remainLow = (1 - ASSUMPTION.max) * 100; // melhor cenário
  const remainHigh = (1 - ASSUMPTION.min) * 100; // cenário mais conservador

  const sliderPct = Math.min(100, Math.max(0, ((Math.min(bill, cfg.max) - 50) / (cfg.max - 50)) * 100));

  function touch() {
    if (tracked.current) return;
    tracked.current = true;
    track("calculator_used", { property_type: type });
  }

  function update(v: number) {
    touch();
    setBill(Math.max(0, Math.min(99999, Math.round(v))));
  }

  function goToForm() {
    const detail: Record<string, string> = { bill: maskMoney(String(bill)), type };
    if (city.trim()) detail.city = city.trim();
    if (uf) detail.uf = uf;
    window.dispatchEvent(new CustomEvent("rision:prefill", { detail }));
    track("calculator_cta_click", { property_type: type });
    document.getElementById("orcamento")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <section id="calculadora" className="section-y bg-mist">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow border-sun/30 bg-sun/10 text-[#c2570c]">Simulador</span>
          <h2 className="h-display mt-5 text-3xl sm:text-5xl">Descubra o potencial de economia da sua conta de energia.</h2>
          <p className="mt-4 text-lg text-navy/65">Arraste e veja o resultado mudar na hora.</p>
        </Reveal>

        <Reveal className="mx-auto mt-12 max-w-5xl" y={30}>
          <div className="grid overflow-hidden rounded-[2rem] bg-white shadow-card ring-1 ring-navy/5 lg:grid-cols-[1fr_1.05fr]">
            {/* CONTROLES */}
            <div className="flex flex-col p-6 sm:p-10">
              <fieldset>
                <legend className="mb-3 text-sm font-semibold">Tipo de imóvel</legend>
                <div className="grid grid-cols-2 gap-3">
                  {(Object.keys(TYPES) as PropType[]).map((t) => {
                    const Icon = TYPES[t].icon;
                    return (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={type === t}
                        onClick={() => {
                          touch();
                          setType(t);
                          setBill(TYPES[t].presets[1]);
                        }}
                        className={cn(
                          "flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-[15px] font-semibold transition-all duration-300",
                          type === t ? "border-sun bg-sun/10 text-navy ring-4 ring-sun/15" : "border-navy/15 text-navy/55 hover:border-navy/40",
                        )}
                      >
                        <Icon size={18} /> {t}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-8">
                <div className="flex items-end justify-between gap-4">
                  <label htmlFor="c-bill-range" className="text-sm font-semibold">Quanto você paga por mês de energia?</label>
                  <div className="relative w-36 shrink-0">
                    <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-navy/40">R$</span>
                    <input
                      id="c-bill"
                      aria-label="Valor da conta em reais"
                      inputMode="numeric"
                      className="field !py-2.5 pl-10 text-right font-display text-lg font-semibold tabular-nums"
                      value={bill ? maskMoney(String(bill)) : ""}
                      onChange={(e) => update(Number(e.target.value.replace(/\D/g, "")))}
                    />
                  </div>
                </div>

                <input
                  id="c-bill-range"
                  type="range"
                  min={50}
                  max={cfg.max}
                  step={cfg.step}
                  value={Math.min(Math.max(bill, 50), cfg.max)}
                  onChange={(e) => update(Number(e.target.value))}
                  className="mt-5 h-2 w-full cursor-pointer appearance-none rounded-full"
                  style={{ background: `linear-gradient(to right,#FF8A35 ${sliderPct}%,rgba(6,21,54,.12) ${sliderPct}%)` }}
                />
                <div className="mt-2 flex justify-between text-xs text-navy/40">
                  <span>{brl(50)}</span>
                  <span>{brl(cfg.max)}+</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Valores sugeridos">
                  {cfg.presets.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => update(p)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-sm font-medium tabular-nums transition",
                        bill === p ? "border-navy bg-navy text-white" : "border-navy/15 text-navy/65 hover:border-navy/40",
                      )}
                    >
                      {brl(p)}
                    </button>
                  ))}
                </div>
              </div>

              <details className="group mt-8 rounded-xl border border-navy/10 px-4 py-3 open:bg-mist/60">
                <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold">
                  Deixar mais preciso <span className="text-navy/40 transition group-open:rotate-45">+</span>
                </summary>
                <div className="mt-4 grid grid-cols-[1fr_88px] gap-3">
                  <div>
                    <label htmlFor="c-city" className="mb-1.5 block text-xs font-semibold text-navy/60">Cidade</label>
                    <input id="c-city" className="field !py-2.5" value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" />
                  </div>
                  <div>
                    <label htmlFor="c-uf" className="mb-1.5 block text-xs font-semibold text-navy/60">UF</label>
                    <select id="c-uf" className="field !py-2.5" value={uf} onChange={(e) => setUf(e.target.value)}>
                      <option value="">—</option>
                      {UFS.map((u) => <option key={u}>{u}</option>)}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="c-kwh" className="mb-1.5 block text-xs font-semibold text-navy/60">
                      Consumo mensal em kWh <span className="font-normal text-navy/40">(opcional)</span>
                    </label>
                    <input id="c-kwh" inputMode="numeric" placeholder="Ex.: 500" className="field !py-2.5" value={kwh} onChange={(e) => setKwh(e.target.value.replace(/\D/g, "").slice(0, 5))} />
                  </div>
                </div>
              </details>

              <div className="mt-8 flex gap-3 rounded-xl bg-sun/10 p-4 text-sm leading-relaxed text-navy/70 lg:mt-auto">
                <Lightbulb size={18} className="mt-0.5 shrink-0 text-[#c2570c]" />
                <p>Use o valor médio das suas últimas contas. Assim a simulação fica mais próxima da sua realidade.</p>
              </div>
            </div>

            {/* RESULTADO AO VIVO */}
            <div className="relative overflow-hidden bg-navy p-6 text-white sm:p-10">
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-sun/20 blur-[90px]" aria-hidden />
              <div className="relative">
                <span className="eyebrow border-white/15 bg-white/5 text-sun-light">Simulação ilustrativa</span>

                {!valid ? (
                  <p className="mt-10 text-white/70">Informe o valor médio da sua conta (a partir de R$ 50) para ver a simulação.</p>
                ) : (
                  <>
                    <div className="mt-6" aria-live="polite" aria-atomic="true">
                      <p className="text-sm text-white/60">Potencial de economia por mês</p>
                      <p className="mt-1 font-display text-3xl font-semibold leading-tight text-sun-light sm:text-4xl">
                        <Money value={monthlyMin} /> <span className="text-white/40">a</span> <Money value={monthlyMax} />
                      </p>
                    </div>

                    {/* antes x depois */}
                    <div className="mt-7 space-y-3" aria-hidden>
                      <div>
                        <div className="mb-1.5 flex justify-between text-xs text-white/60"><span>Conta atual</span><span className="tabular-nums">{brl(bill)}</span></div>
                        <div className="h-3 rounded-full bg-white/80" />
                      </div>
                      <div>
                        <div className="mb-1.5 flex justify-between text-xs text-white/60">
                          <span>Conta com energia solar (faixa)</span>
                          <span className="tabular-nums">{brl(bill - monthlyMax)} a {brl(bill - monthlyMin)}</span>
                        </div>
                        <div className="relative h-3 rounded-full bg-white/10">
                          <motion.div className="absolute inset-y-0 left-0 rounded-full bg-sun/35" animate={{ width: `${remainHigh}%` }} transition={{ type: "spring", stiffness: 140, damping: 20 }} />
                          <motion.div className="absolute inset-y-0 left-0 rounded-full bg-sun-gradient" animate={{ width: `${remainLow}%` }} transition={{ type: "spring", stiffness: 140, damping: 20 }} />
                        </div>
                      </div>
                    </div>

                    {/* horizonte */}
                    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <p className="text-sm text-white/70">Acumulado em</p>
                        <div className="flex gap-1 rounded-full bg-white/5 p-1" role="group" aria-label="Período">
                          {HORIZONS.map((h) => (
                            <button
                              key={h}
                              type="button"
                              aria-pressed={years === h}
                              onClick={() => setYears(h)}
                              className={cn("whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition sm:px-3.5", years === h ? "bg-sun-gradient text-navy" : "text-white/65 hover:text-white")}
                            >
                              {h} {h === 1 ? "ano" : "anos"}
                            </button>
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 font-display text-2xl font-semibold tabular-nums sm:text-3xl">
                        <Money value={monthlyMin * 12 * years} /> <span className="text-white/40">a</span> <Money value={monthlyMax * 12 * years} />
                      </p>
                      <p className="mt-1 text-xs text-white/45">Soma simples, sem considerar custo do sistema, reajustes de tarifa ou perdas.</p>
                    </div>

                    {bill < LOW_BILL && (
                      <p className="mt-4 flex gap-2 text-sm text-sun-light">
                        <Lightbulb size={16} className="mt-0.5 shrink-0" />
                        Contas mais baixas têm menos margem de economia por causa do custo de disponibilidade.
                      </p>
                    )}
                    {tariff && (
                      <p className="mt-3 text-sm text-white/55">Custo médio aproximado: {tariff.toFixed(2).replace(".", ",")} R$/kWh.</p>
                    )}

                    <div className="mt-6 flex gap-3 rounded-xl bg-white/5 p-4 text-[13px] leading-relaxed text-white/60">
                      <Info size={18} className="mt-0.5 shrink-0 text-sky-brand" />
                      <p>
                        Resultado preliminar, baseado em uma hipótese de referência ({Math.round(ASSUMPTION.min * 100)}% a {Math.round(ASSUMPTION.max * 100)}% da conta), e{" "}
                        <strong className="text-white/80">não é garantia</strong>. O valor real depende de tarifa, consumo, irradiação solar, características do imóvel, dimensionamento e regras de compensação.
                      </p>
                    </div>

                    <button type="button" onClick={goToForm} className="btn-primary mt-6 w-full">
                      Quero uma análise personalizada <ArrowRight size={18} />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}