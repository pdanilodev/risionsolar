"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Symbol } from "./Logo";
import { cn } from "@/lib/utils";

const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
const base = [62, 70, 58, 74, 66, 80, 72, 68, 76, 64, 70, 78];

/** Card interativo: compara, de forma ilustrativa (sem números), a conta de luz hoje e com energia solar. */
function BillCard() {
  const [solar, setSolar] = useState(false);
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -inset-10 rounded-full bg-sun/20 blur-[90px]" aria-hidden />
      <div className="relative rounded-[2rem] border border-white/10 bg-navy-2/80 p-6 shadow-2xl backdrop-blur sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Sua conta de luz ao longo do ano</p>
          <Symbol className="h-7 w-auto shrink-0" />
        </div>

        <div className="mt-6 flex h-44 items-end gap-1.5 sm:gap-2" aria-hidden>
          {base.map((h, i) => (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <motion.div
                className={cn("w-full rounded-t-md", solar ? "bg-sun-gradient" : "bg-white/25")}
                animate={{ height: `${solar ? h * 0.38 : h}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 18, delay: i * 0.025 }}
              />
              <span className="text-[10px] text-white/40">{months[i]}</span>
            </div>
          ))}
        </div>

        <div role="group" aria-label="Comparar conta" className="mt-6 grid grid-cols-2 rounded-full bg-white/5 p-1">
          {[
            { v: false, label: "Hoje" },
            { v: true, label: "Com energia solar" },
          ].map((o) => (
            <button
              key={o.label}
              type="button"
              aria-pressed={solar === o.v}
              onClick={() => setSolar(o.v)}
              className={cn(
                "rounded-full px-3 py-2.5 text-sm font-semibold transition-all duration-300",
                solar === o.v ? "bg-sun-gradient text-navy shadow-glow" : "text-white/65 hover:text-white",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>

        <p className="mt-4 min-h-[2.75rem] text-sm leading-relaxed text-white/65" aria-live="polite">
          {solar
            ? "Parte da eletricidade passa a ser gerada no seu telhado, e a conta tende a ficar menor."
            : "Todo mês a conta chega, e você depende só da energia comprada da rede."}
        </p>
        <p className="mt-2 text-[11px] text-white/35">Ilustração. A economia real depende de consumo, tarifa e projeto.</p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="relative isolate overflow-hidden bg-navy pt-32 text-white sm:pt-40">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-sun/20 blur-[140px]" />
        <div className="absolute -left-40 bottom-0 h-[420px] w-[420px] rounded-full bg-sky-brand/10 blur-[120px]" />
        <div className="grid-bg absolute inset-0" />
      </div>

      <div className="container-x grid items-center gap-14 pb-24 lg:grid-cols-[1.05fr_1fr] lg:pb-32">
        <div>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="eyebrow border-white/15 bg-white/5 text-sun-light">
            <span className="h-1.5 w-1.5 rounded-full bg-sun" /> Conta de luz pesando todo mês?
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="h-display mt-6 text-[2.6rem] leading-[1.05] sm:text-6xl lg:text-[4.1rem]"
          >
            Transforme a luz do sol em <span className="bg-sun-gradient bg-clip-text text-transparent">economia</span> para sua vida.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/75"
          >
            A energia solar produz parte da eletricidade que você consome, no seu próprio imóvel. Menos dependência da rede, mais previsibilidade e um imóvel mais valorizado.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <a href="#calculadora" className="btn-primary">
              Quero economizar na minha conta <ArrowRight size={18} />
            </a>
            <a href="#como-funciona" className="btn-ghost-dark">
              Ver como funciona
            </a>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}>
          <BillCard />
        </motion.div>
      </div>
    </section>
  );
}
