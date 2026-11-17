"use client";
/* eslint-disable @next/next/no-img-element */
import { useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  PackageCheck,
  Cpu,
  Handshake,
} from "lucide-react";
import { Reveal } from "./Reveal";

/**
 * Parceiros. Para adicionar outro, copie um item do array.
 * - logo: caminho do arquivo oficial em /public (ex.: "/parceiros/fortlev.png"). Peça o arquivo à Fortlev (kit de marca).
 *   Enquanto estiver vazio, o nome aparece escrito.
 * - url: site do parceiro (opcional). Se vazio, o link não aparece.
 * Revise o texto com a empresa antes de divulgar.
 */
const partners: {
  name: string;
  role: string;
  text: string;
  points: { icon: typeof PackageCheck; label: string }[];
  logo?: string;
  url?: string;
}[] = [
  {
    name: "Fortlev Solar",
    role: "Nosso parceiro",
    text: "Trabalhamos com a Fortlev Solar, distribuidora de equipamentos para energia solar, para levar mais confiança à escolha dos componentes do seu sistema.",
    points: [
      { icon: PackageCheck, label: "Kits e equipamentos fotovoltaicos" },
      { icon: Cpu, label: "Inversores e componentes do sistema" },
      { icon: Handshake, label: "Parceria com a Rision no seu projeto" },
    ],
    logo: "",
    url: "",
  },
];

function PartnerCard({ p }: { p: (typeof partners)[number] }) {
  const ref = useRef<HTMLDivElement>(null);

  // Brilho que acompanha o mouse
  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className="group relative overflow-hidden rounded-[2rem] bg-navy text-white shadow-card ring-1 ring-navy/10"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "30%" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgba(255,138,53,.22), transparent 60%)",
        }}
        aria-hidden
      />
      <div className="grid-bg absolute inset-0 opacity-40" aria-hidden />

      <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* Marca */}
        <div className="flex min-h-[200px] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur transition-transform duration-500 group-hover:scale-[1.02]">
          {p.logo ? (
            <span className="rounded-2xl bg-white px-8 py-6">
              <img
                src={p.logo}
                alt={p.name}
                loading="lazy"
                className="max-h-16 w-auto sm:max-h-20"
              />
            </span>
          ) : (
            <p className="text-center font-display text-4xl font-bold tracking-tight sm:text-5xl">
              {p.name.split(" ")[0]}
              <span className="block bg-sun-gradient bg-clip-text text-transparent">
                {p.name.split(" ").slice(1).join(" ")}
              </span>
            </p>
          )}
        </div>

        {/* Texto */}
        <div>
          <span className="eyebrow border-white/15 bg-white/5 text-sun-light">
            {p.role}
          </span>
          <h3 className="h-display mt-4 text-2xl sm:text-3xl">{p.name}</h3>
          <p className="mt-3 leading-relaxed text-white/70">{p.text}</p>

          <ul className="mt-6 grid gap-3 sm:grid-cols-1">
            {p.points.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-3 text-[15px] text-white/85"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sun/15 text-sun transition-colors group-hover:bg-sun group-hover:text-navy">
                  <Icon size={18} />
                </span>
                {label}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#orcamento" className="btn-primary">
              Quero um projeto com essa parceria <ArrowRight size={18} />
            </a>
            {p.url && (
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost-dark"
              >
                Conhecer a {p.name.split(" ")[0]} <ArrowUpRight size={18} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Partners() {
  return (
    <section id="parceiros" className="section-y bg-white">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow border-sun/30 bg-sun/10 text-[#c2570c]">
            Parceiros
          </span>
          <h2 className="h-display mt-5 text-3xl sm:text-5xl">
            Um projeto sólido começa com bons parceiros.
          </h2>
          <p className="mt-4 text-lg text-navy/65">
            Unimos nossa experiência em projeto e instalação a quem fornece o
            que vai no seu telhado.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 max-w-5xl space-y-6">
          {partners.map((p) => (
            <Reveal key={p.name} y={30}>
              <PartnerCard p={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
