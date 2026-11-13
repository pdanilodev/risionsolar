import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "RISION SOLAR | Energia solar residencial e comercial",
    template: "%s | RISION SOLAR",
  },
  description: site.description,
  keywords: [
    "energia solar",
    "instalação de energia solar",
    "energia solar residencial",
    "energia solar comercial",
    "orçamento de energia solar",
    "sistema fotovoltaico",
    "economia na conta de luz",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.name,
    title: "RISION SOLAR | Transforme a luz do sol em economia",
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "RISION SOLAR | Energia solar residencial e comercial",
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#061536",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap"
        />
      </head>
      <body>
        {children}
        {site.gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${site.gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
