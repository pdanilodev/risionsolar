import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SunExplainer } from "@/components/SunExplainer";
import { Process } from "@/components/Process";
import { Calculator } from "@/components/Calculator";
import { Payment } from "@/components/Payment";
import { FAQ } from "@/components/FAQ";
import { QuoteForm } from "@/components/QuoteForm";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { site } from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.email,
    sameAs: [site.social.instagram].filter(Boolean),
  };
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SunExplainer />
        <Process />
        <Calculator />
        <Payment />
        <FAQ />
        <QuoteForm />
      </main>
      <Footer />
      <WhatsAppFloat />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
