"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

/** Perguntas que não repetem o que a seção "Como funciona" já explica. */
export const faqs = [
  {
    q: "Energia solar funciona em dias nublados?",
    a: "Sim. Os painéis continuam gerando em dias nublados, porém em menor quantidade do que em dias de sol forte. O dimensionamento considera a irradiação média da sua região ao longo do ano, e não apenas os dias ensolarados.",
  },
  {
    q: "Preciso ter baterias?",
    a: "Na maioria dos casos de sistemas conectados à rede, não. A própria rede funciona como um “armazenamento”: o excedente gera créditos e, quando você precisa, consome da distribuidora. Baterias são indicadas para quem quer backup durante quedas de energia, e costumam elevar o custo do projeto.",
  },
  {
    q: "Quanto custa instalar energia solar?",
    a: "Depende do tamanho do sistema, definido pelo seu consumo, além do tipo de telhado, dos equipamentos e das condições de instalação. Por isso não existe um preço único. Use a calculadora e solicite uma análise personalizada: apresentamos uma proposta dimensionada para você, com opções de pagamento.",
  },
  {
    q: "Quanto tempo demora a instalação?",
    a: "A instalação física costuma ser relativamente rápida, mas o prazo total inclui análise, projeto, entrega dos equipamentos e a homologação junto à distribuidora, que depende dos prazos dela. Informamos uma estimativa realista na proposta.",
  },
  {
    q: "Quanto tempo dura um sistema solar e precisa de manutenção?",
    a: "Sistemas fotovoltaicos são projetados para operar por muitos anos. Os painéis costumam ter garantia de desempenho de longo prazo, enquanto o inversor tem vida útil menor e pode precisar de troca. A manutenção é simples: limpeza periódica, inspeções e acompanhamento da geração pelo aplicativo do inversor. As garantias variam por fabricante.",
  },
  {
    q: "Energia solar realmente reduz a conta de luz?",
    a: "Sim, pode reduzir de forma significativa, pois você passa a produzir parte da energia que consome. A conta não costuma chegar a zero: permanecem cobranças como o custo de disponibilidade e outros encargos da regra vigente. O resultado depende de consumo, tarifa, irradiação e dimensionamento.",
  },
  {
    q: "Posso instalar em um imóvel comercial?",
    a: "Sim. Comércios, escritórios e empresas podem usar energia solar. Como o consumo comercial costuma ocorrer durante o dia, quando há geração, o sistema pode ser bastante aderente ao perfil de uso. O projeto é dimensionado conforme a demanda de cada negócio.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-y bg-white">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <div className="lg:sticky lg:top-28">
            <span className="eyebrow border-sun/30 bg-sun/10 text-[#c2570c]">Dúvidas frequentes</span>
            <h2 className="h-display mt-5 text-3xl sm:text-5xl">Ainda com alguma dúvida?</h2>
            <p className="mt-5 text-lg text-navy/65">Respondemos as mais comuns. Para o seu caso, fale com a nossa equipe.</p>
            <a href="#orcamento" className="btn-ghost-light mt-7">Falar com um especialista</a>
          </div>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={Math.min(i * 0.04, 0.2)}>
                <div className={cn("overflow-hidden rounded-2xl bg-mist ring-1 transition-shadow", isOpen ? "shadow-card ring-sun/40" : "ring-navy/5")}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-${i}`}
                      id={`faq-btn-${i}`}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left font-display text-[17px] font-semibold sm:p-6"
                    >
                      {f.q}
                      <ChevronDown className={cn("shrink-0 text-sun transition-transform duration-300", isOpen && "rotate-180")} />
                    </button>
                  </h3>
                  <div
                    id={`faq-${i}`}
                    role="region"
                    aria-labelledby={`faq-btn-${i}`}
                    className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                  >
                    <div className="overflow-hidden">
                      <p className="px-5 pb-6 leading-relaxed text-navy/70 sm:px-6">{f.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        }}
      />
    </section>
  );
}
