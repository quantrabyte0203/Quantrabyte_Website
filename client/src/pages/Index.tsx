import { useEffect } from "react";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import WhyUs from "@/components/WhyUs";
import Process from "@/components/Process";
import Capabilities from "@/components/Capabilities";
import Team from "@/components/Team";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Index = () => {
  // Arriving from another route as /#contact should land on that section.
  useEffect(() => {
    const { hash } = window.location;
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth" }));
  }, []);

  return (
    <div className="min-h-screen bg-paper">
    <Header />
    <main>
      <Hero />
      <TrustStrip />
      <Services />
      <Portfolio />
      <Testimonials />
      <WhyUs />
      <Process />
      <Capabilities />
      <Team />
      <CTA />
      <Contact />
    </main>
      <Footer />
    </div>
  );
};

export default Index;
