/* eslint-disable @next/next/no-img-element */
import { site } from "@/lib/site";

/** Símbolo oficial (public/logo-symbol.png), sem alterações. */
export function Symbol({ className = "h-10 w-auto" }: { className?: string }) {
  return <img src="/logo-symbol.png" alt="" aria-hidden className={`${className} select-none object-contain`} draggable={false} />;
}

/** Símbolo + nome. A logo completa (com wordmark) pode substituir este componente quando for enviada. */
export function Logo({ className = "h-9", variant = "dark" }: { className?: string; variant?: "dark" | "light" }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} role="img" aria-label={site.name}>
      <Symbol className="h-full w-auto" />
      <span
        className={`font-display text-[17px] font-bold leading-none tracking-[0.14em] sm:text-[19px] ${
          variant === "dark" ? "text-white" : "text-navy"
        }`}
      >
        RISION <span className="text-sun">SOLAR</span>
      </span>
    </span>
  );
}
