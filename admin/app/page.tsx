import React from "react";
import Header from "@/components/header";
import HeroSection from "@/components/heroSection";
import FeaturesSection from "@/components/featuresSection";
import IndustrySolutions from "@/components/industrySolutions";
import PlatformSection from "@/components/platform";
import Integrations from "@/components/integrations";
import Testimonials from "@/components/testimonials";
import Pricing from "@/components/pricing";
import FAQAccordion from "@/components/faq";
import CTA from "@/components/cta";
import Footer from "@/components/footer";

const App = () => {
  return (
    <div className="antialiased text-gray-800 min-h-screen flex flex-col">
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-black"
      >
        Skip to main content
      </a>

      <Header />

      {/* Main content area */}
      <main id="main-content" className="flex-1 relative h-full pt-16">
        <HeroSection />
        <FeaturesSection />
        <IndustrySolutions />
        <PlatformSection />
        <Integrations />
        <Testimonials />
        <Pricing />
        <FAQAccordion />
        <CTA />
        <Footer />
      </main>

    </div>
  );
};

export default App;
