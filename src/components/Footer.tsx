import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Logo } from "./Logo";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { site, whatsappLink } from "@/lib/site";

const nav = [
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#etapas", label: "Como trabalhamos" },
  { href: "/#parceiros", label: "Parceiros" },
  { href: "/#calculadora", label: "Calculadora" },
  { href: "/#pagamento", label: "Pagamento" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#orcamento", label: "Orçamento" },
];

export function Footer() {
  const wa = whatsappLink();
  const socials = [
    { href: site.social.instagram, icon: Instagram, label: "Instagram" },
    { href: site.social.facebook, icon: Facebook, label: "Facebook" },
    { href: site.social.linkedin, icon: Linkedin, label: "LinkedIn" },
    { href: site.social.youtube, icon: Youtube, label: "YouTube" },
  ].filter((s) => s.href);

  return (
    <footer className="bg-navy text-white">
      <div className="container-x pt-16">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-navy-2 p-8 sm:p-12">
          <div
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#25D366]/20 blur-[80px]"
            aria-hidden
          />
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h2 className="h-display text-2xl sm:text-4xl">
                Fale com a gente pelo WhatsApp
              </h2>
              <p className="mt-2 max-w-xl text-white/65">
                Tire suas dúvidas e peça seu orçamento direto com a nossa
                equipe.
              </p>
            </div>
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-5 text-lg font-bold text-white shadow-[0_12px_34px_-8px_rgba(37,211,102,.7)] transition hover:-translate-y-0.5 hover:brightness-110 sm:w-auto"
            >
              <WhatsAppIcon size={28} /> Chamar no WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <Logo className="h-9" />
          <p className="mt-5 max-w-sm leading-relaxed text-white/65">
            Soluções em energia solar para residências e empresas, com
            atendimento consultivo e projetos dimensionados para a sua
            necessidade.
          </p>
          <div className="mt-6 flex gap-3">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/75 transition hover:border-sun hover:text-sun"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Rodapé">
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-sun-light">
            Navegação
          </h3>
          <ul className="mt-5 space-y-3">
            {nav.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-white/70 transition hover:text-white"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-sun-light">
            Contato
          </h3>
          <ul className="mt-5 space-y-3 text-white/70">
            <li>
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 hover:text-white"
              >
                <WhatsAppIcon size={17} className="text-sun" /> Conversar no
                WhatsApp
              </a>
            </li>
            {site.social.instagram && (
              <li>
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-white"
                >
                  <Instagram size={17} className="text-sun" />{" "}
                  {site.social.instagramHandle}
                </a>
              </li>
            )}
            <li>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2.5 hover:text-white"
              >
                <Mail size={17} className="text-sun" /> {site.email}
              </a>
            </li>
            {site.phoneDisplay && (
              <li className="inline-flex items-center gap-2.5">
                <Phone size={17} className="text-sun" /> {site.phoneDisplay}
              </li>
            )}
            {site.address && (
              <li className="inline-flex items-center gap-2.5">
                <MapPin size={17} className="text-sun" /> {site.address}
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-sm text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
