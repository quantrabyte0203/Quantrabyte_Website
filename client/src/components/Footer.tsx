import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "@/components/Icon";
import BrandIcon from "@/components/BrandIcon";
import Container from "@/components/kit/Container";
import { scrollToSection } from "@/components/kit/scroll";
import { cn } from "@/lib/utils";
import logoMark from "@/assets/QBlogo-mark.png";

const navigationLinks = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { to: "/wall-of-fame", label: "Wall of Fame" },
  { href: "#why-us", label: "Why Us" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const serviceLinks = [
  "AI Products",
  "Digital Products",
  "Commerce & Platforms",
  "Mobile Applications",
  "Cloud & Integrations",
  "Staff Augmentation",
];

const socialLinks = [
  {
    brand: "linkedin",
    href: "https://linkedin.com/company/QuantraByte",
    label: "LinkedIn",
  },
  {
    brand: "github",
    href: "https://github.com/quantraByte0203",
    label: "GitHub",
  },
  { brand: "x", href: "https://twitter.com/QuantraByte", label: "X" },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Anchors only exist on the home page - hop there first from other routes.
  const goToSection = (href: string) => {
    if (location.pathname !== "/") {
      navigate(`/${href}`);
      return;
    }
    scrollToSection(href);
  };

  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className="border-t border-line bg-surface">
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={cn(
          "fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-ink shadow-card transition-all duration-300",
          showTop
            ? "translate-y-0 opacity-100 hover:-translate-y-1 hover:border-lime hover:bg-lime"
            : "pointer-events-none translate-y-3 opacity-0",
        )}
        aria-label="Back to top"
      >
        <Icon name="arrow_upward" size={20} />
      </button>

      <Container>
        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr] lg:gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[0.7rem] border border-line bg-surface p-1">
                <img
                  src={logoMark}
                  alt=""
                  className="h-full w-full object-contain"
                  style={{ filter: "brightness(0)" }}
                />
              </span>
              <span className="text-[1.05rem] font-bold tracking-tight text-ink">
                QuantraByte
              </span>
            </div>

            <p className="body-sm mt-5 max-w-xs text-[0.9rem]">
              AI-native product engineering. We design and build digital products
              for startups, SaaS and modern businesses.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-[0.65rem] border border-line bg-paper text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-lime hover:bg-lime hover:text-ink"
                  aria-label={social.label}
                >
                  <BrandIcon name={social.brand} size={16} />
                </a>
              ))}
              <a
                href="mailto:info@quantrabyte.com"
                className="flex h-9 w-9 items-center justify-center rounded-[0.65rem] border border-line bg-paper text-ink-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-lime hover:bg-lime hover:text-ink"
                aria-label="Email"
              >
                <Icon name="mail" size={17} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <nav>
            <h3 className="field-label">Navigate</h3>
            <ul className="mt-5 space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.to ?? link.href}>
                  {link.to ? (
                    <Link
                      to={link.to}
                      className="text-left text-[0.9rem] text-ink-soft transition-colors duration-200 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => goToSection(link.href)}
                      className="text-left text-[0.9rem] text-ink-soft transition-colors duration-200 hover:text-ink"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="field-label">Services</h3>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((service) => (
                <li key={service} className="text-[0.9rem] text-ink-soft">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="field-label">Contact</h3>
            <div className="mt-5 space-y-4">
              <a
                href="mailto:info@quantrabyte.com"
                className="group flex items-start gap-3"
              >
                <Icon name="mail" size={18} className="mt-0.5 text-ink-dim" />
                <span className="text-[0.9rem] text-ink-soft transition-colors group-hover:text-ink">
                  info@quantrabyte.com
                </span>
              </a>
              <a href="tel:+917617294185" className="group flex items-start gap-3">
                <Icon name="call" size={18} className="mt-0.5 text-ink-dim" />
                <span className="text-[0.9rem] text-ink-soft transition-colors group-hover:text-ink">
                  +91 7617294185
                </span>
              </a>
              <div className="flex items-start gap-3">
                <Icon
                  name="location_on"
                  size={18}
                  className="mt-0.5 text-ink-dim"
                />
                <span className="text-[0.9rem] text-ink-soft">
                  Vijay Nagar, Indore,
                  <br />
                  Madhya Pradesh, India
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-6 text-[0.85rem] text-ink-soft sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} QuantraByte. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-lime" />
            Built by QuantraByte, India
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
