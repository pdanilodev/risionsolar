"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { cn } from "@/lib/utils";

const links = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#etapas", label: "Como trabalhamos" },
  { href: "#calculadora", label: "Calculadora" },
  { href: "#pagamento", label: "Pagamento" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-white/10 bg-navy/85 py-3 backdrop-blur-xl"
          : "bg-transparent py-5",
      )}
    >
      <div className="container-x flex items-center justify-between">
        <a href="#inicio" aria-label="RISION SOLAR – ir para o início" onClick={() => setOpen(false)}>
          <Logo className="h-8 sm:h-9" />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group relative text-sm font-medium text-white/80 transition hover:text-white">
              {l.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-sun transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href="#orcamento" className="btn-primary hidden !py-2.5 text-sm sm:inline-flex">
            Solicitar orçamento
          </a>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white lg:hidden"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "calc(100dvh - 64px)" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden lg:hidden"
          >
            <nav aria-label="Menu móvel" className="container-x flex h-full flex-col gap-1 pt-6">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.05 }}
                  className="border-b border-white/10 py-4 font-display text-2xl font-semibold text-white"
                >
                  {l.label}
                </motion.a>
              ))}
              <a href="#orcamento" onClick={() => setOpen(false)} className="btn-primary mt-8">
                Solicitar orçamento
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
