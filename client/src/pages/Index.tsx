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
import Footer from "@/components/Footer";

const Index = () => (
  <div className="min-h-screen bg-paper">
    <Header />
    <main>
      <Hero />
      <TrustStrip />
      <Services />
      <Portfolio />
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

export default Index;
