import Icon from "@/components/Icon";
import BrandIcon from "@/components/BrandIcon";
import { useEffect, useState } from "react";
import Qblogo from "../assets/QBlogo-mark.png";

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
    { brand: "linkedin", href: "https://linkedin.com/company/QuantraByte", label: "LinkedIn" },
    { brand: "github", href: "https://github.com/quantraByte0203", label: "GitHub" },
    { brand: "x", href: "https://twitter.com/QuantraByte", label: "X" },
    { brand: "mail", href: "mailto:info@quantrabyte.com", label: "Email" },
  ];

  return (
    <footer className="relative border-t border-line bg-surface/30 pb-10 pt-14 backdrop-blur-sm">
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-lime/40 bg-surface text-lime shadow-hover backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-lime hover:text-paper"
          aria-label="Back to top"
        >
          <Icon name="arrow_upward" size={22} />
        </button>
      )}

      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5 flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-lime/25 bg-lime/[0.08] p-1.5 shadow-[0_0_18px_hsl(76_77%_57%_/_0.12)]">
                <img
                  src={Qblogo}
                  alt="QuantraByte"
                  className="h-full w-full object-contain"
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
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-surface text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-lime/50 hover:text-lime"
                  aria-label={social.label}
                >
                  {social.brand === "mail" ? (
                    <Icon name="mail" size={18} />
                  ) : (
                    <BrandIcon name={social.brand} size={17} />
                  )}
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
                    className="text-left text-sm text-ink-soft transition-colors duration-200 hover:text-lime"
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
                  className="mt-1 inline-block text-sm text-ink-soft transition-colors duration-200 hover:text-lime"
                >
                  info@quantrabyte.com
                </a>
              </div>
              <div>
                <p className="mono-label">Phone</p>
                <a
                  href="tel:+917617294185"
                  className="mt-1 inline-block text-sm text-ink-soft transition-colors duration-200 hover:text-lime"
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
                className="transition-colors duration-200 hover:text-lime"
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
