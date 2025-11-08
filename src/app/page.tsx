import Footer from "@/components/footer";
import Header from "@/components/header";
import Hero from "@/components/hero";
import QualityBadges from "@/components/quality-badges";
import TeeCustomizer from "@/components/tee-customizer";
import { product } from "@/lib/data/product";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-bg text-text">
      <Header />
      <Hero />
      <section id="shop" className="container mx-auto px-4 py-20">
        <TeeCustomizer product={product} />
      </section>
      <section
        id="quality"
        className="container mx-auto border-t border-outline/60 px-4 py-20"
      >
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.3em] text-subtext/70">Quality</p>
          <h2 className="mt-2 text-3xl font-semibold text-text">Built for longevity</h2>
          <p className="mt-2 max-w-2xl text-subtext">
            Every Plain Tee is engineered for durability and comfort so you can rotate it daily and trust it to hold form. The short list of things we sweat: fibre quality, dye chemistry, and the finish on every seam.
          </p>
        </div>
        <QualityBadges />
      </section>
      <Footer />
    </main>
  );
}

