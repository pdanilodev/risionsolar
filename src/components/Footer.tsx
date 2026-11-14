import {
  Instagram,
  Facebook,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { Logo } from "./Logo";
import { site, whatsappLink } from "@/lib/site";

const nav = [
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#etapas", label: "Como trabalhamos" },
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
                <MessageCircle size={17} className="text-sun" /> Conversar no
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
