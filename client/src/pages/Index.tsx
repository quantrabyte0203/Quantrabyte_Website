import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import About from "@/components/About";
import Team from "@/components/Team";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="site-shell min-h-screen">
      <Header />
      <main className="relative z-10">
        <Hero />
        <Stats />
        <Services />
        <Portfolio />
        <About />
        <Team />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
