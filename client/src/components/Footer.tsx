import { ArrowUp, GitFork as Github, Link as Linkedin, Mail, Battery as Twitter } from "lucide-react";
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
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Work" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  const serviceLinks = [
    "AI Products",
    "Digital Products",
    "Commerce & Platforms",
    "Mobile Applications",
    "Cloud Integration",
    "Staff Augmentation",
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://linkedin.com/company/QuantraByte", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/quantraByte0203", label: "GitHub" },
    { icon: Twitter, href: "https://twitter.com/QuantraByte", label: "Twitter" },
    { icon: Mail, href: "mailto:info@quantrabyte.com", label: "Email" },
  ];

  return (
    <footer className="border-t border-line bg-surface/40 pb-10 pt-14">
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink shadow-hover transition-all duration-300 hover:bg-surface"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}

      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-line bg-white">
                <img
                  src={Qblogo}
                  alt="QuantraByte"
                  className="h-full w-full scale-[1.35] object-cover"
                />
              </span>
              <span className="text-lg font-semibold tracking-tight text-ink">
                QuantraByte
              </span>
            </div>
            <p className="text-sm leading-6 text-ink-soft">
              AI-native product engineering. We design and build serious digital
              products for startups, SaaS, and modern businesses.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white text-ink-soft transition-all duration-200 hover:border-ink/20 hover:text-ink"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold text-ink">Navigation</h3>
            <ul className="mt-4 space-y-2.5">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="text-left text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-ink">Services</h3>
            <ul className="mt-4 space-y-2.5">
              {serviceLinks.map((service) => (
                <li key={service} className="text-sm text-ink-soft">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold text-ink">Contact</h3>
            <div className="mt-4 space-y-3">
              <div>
                <p className="mono-label">Email</p>
                <a
                  href="mailto:info@quantrabyte.com"
                  className="mt-1 inline-block text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
                >
                  info@quantrabyte.com
                </a>
              </div>
              <div>
                <p className="mono-label">Phone</p>
                <a
                  href="tel:+917617294185"
                  className="mt-1 inline-block text-sm text-ink-soft transition-colors duration-200 hover:text-ink"
                >
                  +91 7617294185
                </a>
              </div>
              <div>
                <p className="mono-label">Base</p>
                <p className="mt-1 text-sm text-ink-soft">Vijay Nagar, Indore, MP</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} QuantraByte. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
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
                className="transition-colors duration-200 hover:text-ink"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
