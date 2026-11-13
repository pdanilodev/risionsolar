"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sun, Moon, ShieldAlert } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

const steps = [
  {
    n: "01",
    chip: "Captação",
    title: "Captação da luz solar",
    text: "Os painéis solares instalados no telhado captam a luz do sol e produzem energia elétrica em corrente contínua.",
    parts: ["sun", "panels"],
  },
  {
    n: "02",
    chip: "Conversão",
    title: "Conversão de energia",
    text: "O inversor transforma a energia dos painéis em corrente alternada, compatível com a instalação elétrica do imóvel.",
    parts: ["panels", "inverter"],
  },
  {
    n: "03",
    chip: "Utilização",
    title: "Utilização no imóvel",
    text: "A eletricidade gerada alimenta iluminação, eletrodomésticos e outros aparelhos da casa ou da empresa.",
    parts: ["inverter", "house"],
  },
  {
    n: "04",
    chip: "Compensação",
    title: "Compensação de energia",
    text: "Quando sobra energia, ela é injetada na rede e gera créditos, conforme as regras aplicáveis. Os créditos compensam o consumo em outros momentos.",
    parts: ["house", "grid"],
  },
] as const;

type Part = "sun" | "panels" | "inverter" | "house" | "grid";

const fmtHour = (h: number) => `${String(Math.floor(h)).padStart(2, "0")}:${h % 1 ? "30" : "00"}`;

function moment(h: number, d: number) {
  if (d === 0) return "Noite: os painéis não geram. O imóvel usa a rede e os créditos acumulados.";
  if (d < 0.35) return h < 12 ? "Amanhecer: a geração começa a crescer." : "Fim de tarde: a geração diminui.";
  if (d < 0.85) return h < 12 ? "Manhã: a geração segue crescendo." : "Tarde: a geração começa a cair.";
  return "Meio-dia: pico de geração do dia.";
}

export function SunExplainer() {
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hour, setHour] = useState(12);

  useEffect(() => {
    if (!auto) return;
    const t = setInterval(() => setStep((s) => (s + 1) % steps.length), 5500);
    return () => clearInterval(t);
  }, [auto]);

  const pick = (i: number) => {
    setAuto(false);
    setStep(i);
  };

  const d = hour >= 6 && hour <= 18 ? Math.max(0, Math.sin((Math.PI * (hour - 6)) / 12)) : 0;
  const night = d === 0;
  const sunX = 90 + ((Math.min(Math.max(hour, 6), 18) - 6) / 12) * 620;
  const sunY = 392 - d * 310;
  const lit = (p: Part) => (night ? p === "house" || p === "grid" : (steps[step].parts as readonly string[]).includes(p));
  const seg = (i: number) => (night ? i === 2 || i === 3 : step === i && (i === 0 ? d > 0 : true));

  const wire = (on: boolean) => (on ? "stroke-sun dash-flow" : "stroke-white/15");
  const part = (p: Part) => cn("cursor-pointer transition-opacity duration-500", lit(p) ? "opacity-100" : "opacity-45");

  return (
    <section id="como-funciona" className="section-y overflow-hidden bg-white">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow border-sun/30 bg-sun/10 text-[#c2570c]">Como funciona a energia solar</span>
          <h2 className="h-display mt-5 text-3xl sm:text-5xl">É mais simples do que você imagina.</h2>
          <p className="mt-4 text-lg text-navy/65">Mexa no horário do dia e toque nas etapas: o sol explica o caminho da energia.</p>
        </Reveal>

        <div className="mt-14 grid items-start gap-8 lg:grid-cols-[1.4fr_1fr]">
          {/* Cena */}
          <Reveal y={30}>
            <div className="overflow-hidden rounded-[2rem] bg-navy shadow-card ring-1 ring-navy/10">
              <svg
                viewBox="0 0 800 450"
                className="block h-auto w-full"
                role="img"
                aria-label="Ilustração: o sol ilumina os painéis solares de uma casa, a energia passa pelo inversor, alimenta a casa e o excedente vai para a rede elétrica."
              >
                <defs>
                  <radialGradient id="sx-glow">
                    <stop offset="0" stopColor="#FFD9A8" stopOpacity=".95" />
                    <stop offset=".3" stopColor="#FFB16A" stopOpacity=".5" />
                    <stop offset="1" stopColor="#FF8A35" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="sx-panel" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#4a7fc0" />
                    <stop offset="1" stopColor="#14336e" />
                  </linearGradient>
                  <linearGradient id="sx-sky" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#0A1D42" />
                    <stop offset="1" stopColor="#12295a" />
                  </linearGradient>
                  <clipPath id="sx-clip"><rect x="0" y="0" width="800" height="400" /></clipPath>
                </defs>

                <rect width="800" height="450" fill="url(#sx-sky)" />
                <rect width="800" height="400" fill="#FF8A35" opacity={d * 0.1} />

                {/* estrelas */}
                <g fill="#fff" opacity={(1 - d) * 0.7} style={{ transition: "opacity .5s" }}>
                  {[[90, 70], [200, 130], [310, 60], [480, 90], [560, 40], [690, 120], [740, 60], [150, 200]].map(([x, y], i) => (
                    <circle key={i} cx={x} cy={y} r={i % 3 ? 1.3 : 2} />
                  ))}
                </g>

                {/* sol / lua */}
                <g clipPath="url(#sx-clip)">
                  {night ? (
                    <path d="M640 70a38 38 0 1 0 30 62 30 30 0 0 1-30-62Z" fill="#cfe0f2" opacity=".9" />
                  ) : (
                    <g className="cursor-pointer" onClick={() => pick(0)} style={{ transition: "transform .15s linear" }}>
                      <circle cx={sunX} cy={sunY} r={150} fill="url(#sx-glow)" />
                      <circle cx={sunX} cy={sunY} r={36} fill="#FFB16A" />
                      <circle cx={sunX} cy={sunY} r={26} fill="#FFE3C0" />
                      <g className="animate-spinSlow" style={{ transformOrigin: `${sunX}px ${sunY}px` }}>
                        {Array.from({ length: 14 }).map((_, i) => (
                          <line key={i} x1={sunX} y1={sunY - 48} x2={sunX} y2={sunY - (i % 2 ? 56 : 64)} stroke="#FFB16A" strokeWidth="2.5" strokeLinecap="round" transform={`rotate(${i * (360 / 14)} ${sunX} ${sunY})`} />
                        ))}
                      </g>
                    </g>
                  )}
                </g>

                {/* raios sol → painéis */}
                {!night && (
                  <line
                    x1={sunX} y1={sunY} x2={330} y2={232}
                    className={cn("transition-opacity duration-500", seg(0) ? "stroke-sun-light dash-flow" : "stroke-white/10")}
                    strokeWidth="2" strokeLinecap="round" opacity={0.25 + d * 0.65}
                  />
                )}

                {/* solo */}
                <rect x="0" y="400" width="800" height="50" fill="#061536" />
                <line x1="0" y1="400" x2="800" y2="400" stroke="#78A9D2" strokeOpacity=".25" />

                {/* casa */}
                <g className={part("house")} onClick={() => pick(2)}>
                  <polygon points="230,400 230,268 450,230 450,400" fill="#1a3470" stroke="#78A9D2" strokeOpacity=".35" />
                  <rect x="262" y="302" width="64" height="52" rx="4" fill="#FFB16A" opacity={night ? 1 : 0.7} />
                  <line x1="294" y1="302" x2="294" y2="354" stroke="#0A1D42" strokeWidth="3" />
                  <rect x="372" y="326" width="42" height="74" rx="3" fill="#061536" stroke="#78A9D2" strokeOpacity=".4" />
                </g>

                {/* painéis */}
                <g className={part("panels")} onClick={() => pick(0)} transform="translate(230 268) skewY(-9.8)">
                  {[0, 1].map((r) =>
                    [0, 1, 2, 3, 4].map((c) => (
                      <rect key={`${r}${c}`} x={8 + c * 41} y={-20 - r * 19} width="37" height="16" rx="2" fill="url(#sx-panel)" stroke="#78A9D2" strokeOpacity=".7" style={{ filter: `brightness(${0.7 + d * 0.9})`, transition: "filter .3s" }} />
                    )),
                  )}
                </g>

                {/* inversor */}
                <g className={part("inverter")} onClick={() => pick(1)}>
                  <rect x="458" y="318" width="28" height="38" rx="4" fill="#78A9D2" />
                  <path d="m474 328-8 12h6l-2 10 8-12h-6Z" fill="#061536" />
                </g>

                {/* poste / rede */}
                <g className={part("grid")} onClick={() => pick(3)} stroke="#78A9D2" strokeWidth="3" strokeLinecap="round">
                  <line x1="650" y1="400" x2="650" y2="255" />
                  <line x1="625" y1="272" x2="675" y2="272" />
                  <line x1="632" y1="294" x2="668" y2="294" />
                </g>

                {/* fios */}
                <g fill="none" strokeWidth="3" strokeLinecap="round">
                  <path d="M 440 232 C 470 232 474 280 474 314" className={wire(seg(1))} />
                  <path d="M 458 344 C 440 346 430 346 416 348" className={wire(seg(2))} />
                  <path
                    d="M 486 336 C 550 336 600 310 646 274"
                    className={wire(seg(3))}
                    style={night ? { animationDirection: "reverse" } : undefined}
                  />
                </g>

                {/* rótulos */}
                <g fontFamily="Inter, sans-serif" fontSize="16" fontWeight="600" fill="#fff" opacity=".75" textAnchor="middle">
                  <text x="340" y="430">Casa com painéis</text>
                  <text x="472" y="428">Inversor</text>
                  <text x="650" y="428">Rede elétrica</text>
                </g>
              </svg>

              {/* controle de horário */}
              <div className="border-t border-white/10 bg-navy-2/60 p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4 text-white">
                  <label htmlFor="hora" className="flex items-center gap-2 text-sm font-semibold">
                    {night ? <Moon size={18} className="text-sky-brand" /> : <Sun size={18} className="text-sun" />}
                    Hora do dia: <span className="tabular-nums text-sun-light">{fmtHour(hour)}</span>
                  </label>
                  <div className="flex items-center gap-3 text-xs text-white/55">
                    Geração (ilustrativa)
                    <span className="h-2 w-24 overflow-hidden rounded-full bg-white/10" aria-hidden>
                      <span className="block h-full rounded-full bg-sun-gradient transition-all duration-300" style={{ width: `${Math.round(d * 100)}%` }} />
                    </span>
                  </div>
                </div>
                <input
                  id="hora"
                  type="range"
                  min={0}
                  max={23.5}
                  step={0.5}
                  value={hour}
                  onChange={(e) => {
                    setAuto(false);
                    setHour(Number(e.target.value));
                  }}
                  className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/15 accent-[#FF8A35]"
                  aria-describedby="hora-desc"
                />
                <p id="hora-desc" className="mt-3 text-sm text-white/65" aria-live="polite">{moment(hour, d)}</p>
              </div>
            </div>
          </Reveal>

          {/* Sol explicando */}
          <Reveal delay={0.1}>
            <div>
              <div className="flex items-start gap-4">
                <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full bg-sun-gradient text-navy shadow-glow">
                  <span className="absolute inset-0 animate-ping rounded-full bg-sun/30 [animation-duration:3s]" aria-hidden />
                  <Sun size={26} className="relative" />
                </span>
                <div className="relative min-h-[170px] flex-1 rounded-2xl rounded-tl-sm bg-mist p-5 sm:p-6" aria-live="polite">
                  <AnimatePresence mode="wait">
                    <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                      <p className="font-display text-sm font-semibold uppercase tracking-widest text-[#c2570c]">{steps[step].n} · {steps[step].title}</p>
                      <p className="mt-2 leading-relaxed text-navy/80">{steps[step].text}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {steps.map((s, i) => (
                  <button
                    key={s.n}
                    type="button"
                    onClick={() => pick(i)}
                    aria-pressed={step === i}
                    className={cn(
                      "rounded-xl border px-4 py-3 text-left transition-all duration-300",
                      step === i ? "border-sun bg-sun/10 shadow-sm" : "border-navy/10 hover:border-navy/30",
                    )}
                  >
                    <span className={cn("font-display text-lg font-semibold", step === i ? "text-[#c2570c]" : "text-navy/35")}>{s.n}</span>
                    <span className="block text-sm font-semibold">{s.chip}</span>
                  </button>
                ))}
              </div>

              <div className="mt-5 flex gap-3 rounded-2xl border border-sky-brand/40 bg-sky-brand/10 p-4 text-sm leading-relaxed text-navy/75">
                <ShieldAlert size={20} className="mt-0.5 shrink-0 text-[#3f7aa8]" />
                <p>
                  <strong className="text-navy">Importante:</strong> o imóvel continua ligado à rede. Sistemas conectados à rede normalmente não fornecem energia durante uma queda da distribuidora, por segurança. Backup exige equipamentos e configuração específicos.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
