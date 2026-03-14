import { ArrowUp, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useEffect, useState } from "react";
import Qblogo from "../assets/QBlogo.png";

const Footer = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigationLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Projects" },
    { href: "#team", label: "Founder" },
    { href: "#contact", label: "Contact" },
  ];

  const serviceLinks = [
    "Agentic AI & GenAI",
    "Chatbots & Assistants",
    "Shopify / Magento / WordPress",
    "Squarespace Websites",
    "Electron Desktop Apps",
    "Blockchain & DeFi",
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/QuantraByte",
      label: "LinkedIn",
    },
    {
      icon: Github,
      href: "https://github.com/quantraByte0203",
      label: "GitHub",
    },
    {
      icon: Twitter,
      href: "https://twitter.com/QuantraByte",
      label: "Twitter",
    },
    {
      icon: Mail,
      href: "mailto:info@quantrabyte.com",
      label: "Email",
    },
  ];

  return (
    <footer className="relative pb-10 pt-6">
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-[linear-gradient(135deg,#5bf7dd_0%,#2ad4ff_55%,#33cc8c_100%)] text-slate-950 shadow-quantum transition-transform duration-300 hover:scale-105"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      <div className="container mx-auto px-4">
        <div className="section-shell overflow-hidden rounded-[28px] px-5 py-6 sm:px-6 sm:py-8 md:rounded-[34px] md:px-8 lg:px-10">
          <div className="mb-10 flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <p className="mono-label text-primary/80">Build something sharper</p>
              <h2 className="mt-3 text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
                Premium product UI, reliable delivery, and direct collaboration.
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/65">
                QuantraByte builds the interfaces, systems, and launch momentum
                modern businesses need to stand out.
              </p>
            </div>
            <button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="inline-flex w-full items-center justify-center rounded-full border border-primary/20 bg-[linear-gradient(135deg,#5bf7dd_0%,#2ad4ff_55%,#33cc8c_100%)] px-6 py-4 font-semibold text-slate-950 transition-transform duration-300 hover:scale-[1.02] sm:w-auto"
            >
              Start a conversation
            </button>
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.96),rgba(120,250,229,0.88)_36%,rgba(10,21,36,0.96)_100%)] p-0 shadow-[0_12px_32px_rgba(91,247,221,0.18)] ring-1 ring-white/10">
                  <img
                    src={Qblogo}
                    alt="QuantraByte"
                    className="h-full w-full scale-[1.38] object-cover brightness-110 contrast-125"
                  />
                </div>
                <div>
                  <p className="mono-label text-primary/70">AI-native studio</p>
                  <p className="text-xl font-semibold text-white">QuantraByte</p>
                </div>
              </div>
              <p className="leading-7 text-white/65">
                AI, SaaS, web, and mobile product delivery with a stronger visual
                edge and practical engineering under the hood.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      social.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/65 transition-all duration-300 hover:border-primary/30 hover:bg-primary/10 hover:text-white"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">Navigation</h3>
              <ul className="mt-5 space-y-3">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      type="button"
                      onClick={() => scrollToSection(link.href)}
                      className="text-left text-white/65 transition-colors duration-300 hover:text-white"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">Capabilities</h3>
              <ul className="mt-5 space-y-3">
                {serviceLinks.map((service) => (
                  <li key={service} className="break-words text-white/65">
                    {service}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white">Contact</h3>
              <div className="mt-5 space-y-4">
                <div>
                  <p className="mono-label text-white/45">Email</p>
                  <a
                    href="mailto:info@quantrabyte.com"
                    className="mt-2 inline-block text-white transition-colors duration-300 hover:text-primary"
                  >
                    info@quantrabyte.com
                  </a>
                </div>
                <div>
                  <p className="mono-label text-white/45">Phone</p>
                  <a
                    href="tel:+917617294185"
                    className="mt-2 inline-block text-white transition-colors duration-300 hover:text-primary"
                  >
                    +91 7617294185
                  </a>
                </div>
                <div>
                  <p className="mono-label text-white/45">Base</p>
                  <p className="mt-2 text-white">Vijay Nagar, Indore, MP</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/55 md:flex-row md:items-center md:justify-between">
            <p>&copy; {new Date().getFullYear()} QuantraByte. All rights reserved.</p>
            <div className="flex flex-wrap gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="transition-colors duration-300 hover:text-white"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
