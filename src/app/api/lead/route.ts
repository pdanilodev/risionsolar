import { NextResponse } from "next/server";

/**
 * Recebe os leads do formulário e os encaminha para um webhook
 * (Make, Zapier, n8n, CRM, Google Apps Script, etc.).
 *
 * Configure LEAD_WEBHOOK_URL no ambiente (.env.local). Sem essa variável
 * a rota responde 503 e o formulário mostra erro: o envio NUNCA é simulado.
 */
export const runtime = "nodejs";

const required = ["name", "whatsapp", "email", "city", "uf", "type", "bill"] as const;

export async function POST(req: Request) {
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json(
      { error: "O envio de formulários ainda não foi configurado." },
      { status: 503 },
    );
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }

  for (const k of required) {
    if (typeof data[k] !== "string" || !(data[k] as string).trim()) {
      return NextResponse.json({ error: "Dados incompletos." }, { status: 400 });
    }
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(String(res.status));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Falha ao encaminhar sua solicitação." }, { status: 502 });
  }
}
