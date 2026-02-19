import React from "react";
import Hero from "../components/landing/hero";
import Features from "../components/landing/Features";
import Stats from "../components/landing/Stats";
import ExploreDataSection from "../components/landing/LucknowLocal";
import CTA from "../components/landing/CTA";
import Footer from "../components/Footer";
import ForDevelopers from "../components/landing/ForDevlopers";

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-[#FFEFEF] via-[#756AB6]/40 to-[#FFEFEF]">

      {/* Hero */}
      <section className="mb-28">
        <Hero />
      </section>

      {/* Features */}
      <section className="mb-28">
        <Features />
      </section>

      {/* Local Data / Map */}
      <section className="mb-32">
        <ExploreDataSection />
      </section>

      {/* Stats */}
      <section className="mb-32">
        <Stats />
      </section>

      

      <section className="mb-20">
        <ForDevelopers/>
      </section>
      
      {/* Call to Action */}
      <section className="mb-20">
        <CTA />
      </section>

      

      {/* Footer (no extra spacing) */}
      <Footer />

    </div>
  );
}

export default LandingPage;
