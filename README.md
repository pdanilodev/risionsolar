# RISION SOLAR — Landing page

Next.js 14 · TypeScript · Tailwind · Framer Motion

## Rodar localmente
    npm install
    cp .env.example .env.local
    npm run dev        # http://localhost:3000

## Deploy automático (Vercel)
1. Crie um repositório vazio no GitHub e envie este projeto:
       git remote add origin https://github.com/SEU-USUARIO/rision-solar.git
       git push -u origin main
2. Em vercel.com → **Add New → Project** → importe o repositório. Framework: Next.js (detectado automaticamente). Clique em **Deploy**.
3. Pronto: cada `git push` na `main` publica em produção, e cada branch/PR gera uma URL de preview.

Variáveis de ambiente (Vercel → Settings → Environment Variables), veja `.env.example`.

## Onde editar
- `src/lib/site.ts`: WhatsApp, Instagram, e-mail, telefone, endereço, GA.
- `public/logo-symbol.png`: símbolo da marca. Quando houver a logo completa, troque o componente `src/components/Logo.tsx`.
- `src/components/Payment.tsx`: formas de pagamento (ajuste às condições reais).
- `src/components/Calculator.tsx`: hipótese da simulação (`ASSUMPTION`), sempre exibida como ilustrativa.
- Formulário: configure `LEAD_WEBHOOK_URL` (rota `/api/lead`) ou `NEXT_PUBLIC_FORM_ENDPOINT` (Formspree etc.). Sem isso o envio retorna erro, nunca é simulado.
