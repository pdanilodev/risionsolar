/**
 * Configuração central do site. Edite aqui para personalizar contatos,
 * integrações e conteúdo sem mexer nos componentes.
 */
export const site = {
  name: "RISION SOLAR",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.risionsolar.com.br",
  description:
    "Energia solar residencial e comercial com atendimento consultivo. Entenda como funciona, simule sua economia e solicite um orçamento.",

  /** Link do WhatsApp da empresa (link de mensagem oficial). */
  whatsappUrl: process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "https://wa.me/message/IRXYKLD4CCMQH1",

  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "risionsolar@gmail.com",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY ?? "",
  address: "",

  /** Deixe vazio para ocultar o ícone. */
  social: {
    instagram: "https://www.instagram.com/rision.solar",
    instagramHandle: "@rision.solar",
    facebook: "",
    linkedin: "",
    youtube: "",
  },

  /**
   * Destino do formulário: por padrão, e-mail via FormSubmit (sem conta).
   * No primeiro envio o FormSubmit manda um e-mail de ativação para o endereço;
   * clique no link uma vez e os próximos leads chegam normalmente.
   * Alternativas via NEXT_PUBLIC_FORM_ENDPOINT: Formspree, ou "/api/lead" (webhook).
   */
  formEndpoint:
    process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "https://formsubmit.co/ajax/risionsolar@gmail.com",

  /** Google Analytics 4 (ex.: G-XXXXXXXXXX). Vazio = desativado. */
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
};

/** O link de mensagem do WhatsApp não aceita texto pré-preenchido. */
export function whatsappLink(_message?: string): string {
  void _message;
  return site.whatsappUrl;
}