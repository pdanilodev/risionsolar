"use client";
import { motion } from "framer-motion";
import { MessageCircle, SearchCheck, DraftingCompass, HardHat, Zap } from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  { icon: MessageCircle, title: "Contato", text: "Você solicita uma avaliação." },
  { icon: SearchCheck, title: "Análise", text: "Avaliamos consumo, imóvel e condições técnicas." },
  { icon: DraftingCompass, title: "Projeto", text: "Dimensionamos o sistema para a sua necessidade." },
  { icon: HardHat, title: "Instalação e homologação", text: "Executamos o projeto e cuidamos dos procedimentos junto à distribuidora." },
  { icon: Zap, title: "Geração de energia", text: "O sistema entra em operação após os procedimentos aplicáveis." },
];

export function Process() {
  return (
    <section id="etapas" className="section-y relative overflow-hidden bg-navy text-white">
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow border-white/15 bg-white/5 text-sun-light">Como a Rision trabalha</span>
          <h2 className="h-display mt-5 text-3xl sm:text-5xl">Do primeiro contato à geração da sua própria energia.</h2>
        </Reveal>

        <ol className="relative mt-16 grid gap-10 lg:grid-cols-5 lg:gap-6">
          <div className="absolute left-[10%] right-[10%] top-8 hidden h-px bg-white/10 lg:block" aria-hidden>
            <motion.div
              className="h-full origin-left bg-sun-gradient"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-120px" }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
            />
          </div>
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 0.12}>
              <li className="group relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
                {i < steps.length - 1 && <span className="absolute left-8 top-16 h-[calc(100%-1rem)] w-px bg-white/15 lg:hidden" aria-hidden />}
                <div className="relative z-10 grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-sun/50 bg-navy-2 text-sun shadow-glow transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-105">
                  <Icon size={26} strokeWidth={1.6} />
                  <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-sun-gradient text-xs font-bold text-navy">{i + 1}</span>
                </div>
                <div className="pb-2 lg:mt-5">
                  <h3 className="font-display text-lg font-semibold">{title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-white/65">{text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
