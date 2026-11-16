"use client";
import { whatsappLink } from "@/lib/site";
import { track } from "@/lib/track";
import { WhatsAppIcon } from "./WhatsAppIcon";

/**
 * Botão flutuante do WhatsApp.
 * Para mudar o tamanho: altere h-[68px] w-[68px] (celular) e sm:h-20 sm:w-20 (desktop),
 * e o `size` dos ícones abaixo.
 */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { origin: "float" })}
      aria-label="Fale com a gente pelo WhatsApp"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-3 sm:bottom-7 sm:right-7"
    >
      <span className="hidden rounded-full bg-white px-5 py-3 text-[15px] font-semibold text-navy shadow-card ring-1 ring-navy/5 transition group-hover:-translate-x-1 sm:block">
        Fale com a gente
      </span>
      <span className="relative grid h-[68px] w-[68px] place-items-center rounded-full bg-[#25D366] text-white shadow-[0_12px_34px_-6px_rgba(37,211,102,.75)] transition group-hover:scale-110 sm:h-20 sm:w-20">
        <span
          className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]"
          aria-hidden
        />
        <WhatsAppIcon size={38} className="relative sm:hidden" />
        <WhatsAppIcon size={44} className="relative hidden sm:block" />
      </span>
    </a>
  );
}
