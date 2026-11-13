"use client";
import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/site";
import { track } from "@/lib/track";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { origin: "float" })}
      aria-label="Falar pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-6px_rgba(37,211,102,.7)] transition hover:scale-110 sm:bottom-7 sm:right-7"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/40 [animation-duration:2.5s]" aria-hidden />
      <MessageCircle size={26} className="relative" />
    </a>
  );
}
