import { CreditCard, Landmark, QrCode, HandCoins } from "lucide-react";
import { Reveal } from "./Reveal";

/** Edite conforme as condições comerciais reais da empresa. */
const options = [
  { icon: CreditCard, title: "Cartão de crédito", text: "Pague no cartão e facilite o início do seu projeto." },
  { icon: Landmark, title: "Financiamento", text: "Parcele o investimento e comece a gerar a sua energia." },
  { icon: QrCode, title: "À vista", text: "Pix ou transferência, com condições para pagamento à vista." },
  { icon: HandCoins, title: "Outras condições", text: "Fale com a nossa equipe e encontre a melhor opção." },
];

export function Payment() {
  return (
    <section id="pagamento" className="bg-mist pb-20 sm:pb-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-5xl">
          <div className="rounded-[2rem] bg-white p-6 shadow-card ring-1 ring-navy/5 sm:p-10">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="h-display text-2xl sm:text-3xl">Aceitamos cartão, financiamento e outras formas de pagamento.</h2>
                <p className="mt-2 text-navy/60">Escolha o formato que cabe no seu bolso.</p>
              </div>
              <a href="#orcamento" className="btn-ghost-light shrink-0">Consultar condições</a>
            </div>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {options.map(({ icon: Icon, title, text }) => (
                <li key={title} className="group rounded-2xl bg-mist p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-navy hover:text-white">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-sun transition-colors group-hover:bg-sun group-hover:text-navy">
                    <Icon size={21} />
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-navy/60 transition-colors group-hover:text-white/70">{text}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-navy/45">Condições sujeitas à análise e disponibilidade.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
