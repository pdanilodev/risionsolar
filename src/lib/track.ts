type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

/** Dispara um evento de conversão no GA4, se configurado. */
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  (window as GtagWindow).gtag?.("event", event, params);
}
