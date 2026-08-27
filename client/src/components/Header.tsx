import { useEffect, useRef, useState } from "react";
import Icon from "@/components/Icon";
import Container from "@/components/kit/Container";
import { scrollToSection } from "@/components/kit/scroll";
import { cn } from "@/lib/utils";
import logoMark from "@/assets/QBlogo-mark.png";

const serviceMenu = [
  {
    label: "AI Products",
    description: "Agents, GenAI assistants, RAG and automation.",
    icon: "neurology",
  },
  {
    label: "Digital Products",
    description: "SaaS, web apps, mobile apps and dashboards.",
    icon: "deployed_code",
  },
  {
    label: "Commerce & Platforms",
    description: "Shopify, WordPress and custom storefronts.",
    icon: "storefront",
  },
];

const navItems = [
  { href: "#services", label: "Services", menu: serviceMenu },
  { href: "#work", label: "Work" },
  { href: "#why-us", label: "Why Us" },
  { href: "#about", label: "About" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeTimer = useRef<number>();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock the page behind the mobile sheet
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const go = (href: string) => {
    setMobileOpen(false);
    setMenuOpen(false);
    scrollToSection(href);
  };

  const openMenu = () => {
    window.clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };

  const closeMenu = () => {
    closeTimer.current = window.setTimeout(() => setMenuOpen(false), 140);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-paper/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <Container>
        <div className="flex h-[4.5rem] items-center justify-between gap-6">
          {/* Brand */}
          <button
            type="button"
            onClick={() => go("#home")}
            className="group flex items-center gap-2.5"
            aria-label="QuantraByte - back to top"
          >
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[0.7rem] border border-line bg-surface p-1 transition-colors duration-300 group-hover:border-line-strong">
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
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) =>
              item.menu ? (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={openMenu}
                  onMouseLeave={closeMenu}
                >
                  <button
                    type="button"
                    onClick={() => go(item.href)}
                    aria-expanded={menuOpen}
                    className="flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.9rem] font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
                  >
                    {item.label}
                    <Icon
                      name="expand_more"
                      size={16}
                      className={cn(
                        "transition-transform duration-300",
                        menuOpen && "rotate-180",
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "absolute left-1/2 top-full w-[23rem] -translate-x-1/2 pt-3 transition-all duration-200",
                      menuOpen
                        ? "pointer-events-auto translate-y-0 opacity-100"
                        : "pointer-events-none -translate-y-1 opacity-0",
                    )}
                  >
                    <div className="card overflow-hidden p-2 shadow-card">
                      {item.menu.map((entry) => (
                        <button
                          key={entry.label}
                          type="button"
                          onClick={() => go(item.href)}
                          className="flex w-full items-start gap-3 rounded-[0.9rem] p-3 text-left transition-colors duration-200 hover:bg-surface-soft"
                        >
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-lime-soft text-ink">
                            <Icon name={entry.icon} size={17} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[0.9rem] font-semibold text-ink">
                              {entry.label}
                            </span>
                            <span className="mt-0.5 block text-[0.8rem] leading-5 text-ink-soft">
                              {entry.description}
                            </span>
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => go(item.href)}
                  className="rounded-full px-3.5 py-2 text-[0.9rem] font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                </button>
              ),
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <button
              type="button"
              onClick={() => go("#contact")}
              className="btn btn-outline group h-10 pl-5 pr-1.5"
            >
              Let's Talk
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lime text-ink transition-transform duration-300 group-hover:translate-x-0.5">
                <Icon name="arrow_forward" size={15} />
              </span>
            </button>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink lg:hidden"
            aria-label="Open navigation"
          >
            <Icon name="menu" size={22} />
          </button>
        </div>
      </Container>

      {/* Mobile sheet */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-ink/20 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileOpen(false)}
        />

        <div
          className={cn(
            "absolute inset-x-0 top-0 flex max-h-[100dvh] flex-col overflow-y-auto bg-paper transition-transform duration-[400ms] ease-out",
            mobileOpen ? "translate-y-0" : "-translate-y-full",
          )}
        >
          <div className="flex h-[4.5rem] items-center justify-between border-b border-line px-5">
            <span className="flex items-center gap-2.5">
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
            </span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink"
              aria-label="Close navigation"
            >
              <Icon name="close" size={22} />
            </button>
          </div>

          <nav className="flex flex-col gap-1 px-5 py-6">
            {navItems.map((item, index) => (
              <button
                key={item.href}
                type="button"
                onClick={() => go(item.href)}
                className="flex items-center justify-between rounded-2xl px-4 py-4 text-left text-[1.35rem] font-semibold tracking-tight text-ink transition-colors duration-200 active:bg-surface-soft"
                style={{
                  animation: mobileOpen
                    ? `fadeUpIn 0.4s ${0.05 + index * 0.05}s both`
                    : undefined,
                }}
              >
                {item.label}
                <Icon name="arrow_outward" size={20} className="text-ink-dim" />
              </button>
            ))}
          </nav>

          <div className="mt-auto border-t border-line px-5 py-6">
            <p className="overline">Services</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {serviceMenu.map((entry) => (
                <span key={entry.label} className="chip">
                  {entry.label}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => go("#contact")}
              className="btn btn-primary mt-6 h-12 w-full"
            >
              Let's Talk
              <Icon name="arrow_forward" size={18} />
            </button>

            <a
              href="mailto:info@quantrabyte.com"
              className="mt-4 block text-center text-sm text-ink-soft"
            >
              info@quantrabyte.com
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
