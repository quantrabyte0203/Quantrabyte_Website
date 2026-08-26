import { useEffect, useState } from "react";
import Icon from "@/components/Icon";
import { cn } from "@/lib/utils";
import Qblogo from "../assets/QBlogo-mark.png";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        isScrolled ? "py-2" : "py-4",
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between gap-3 rounded-2xl border px-4 py-2.5 transition-all duration-300",
            isScrolled
              ? "border-line bg-paper/80 shadow-card backdrop-blur-2xl"
              : "border-transparent bg-transparent",
          )}
        >
          <button
            type="button"
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.01]"
          >
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
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors duration-200 hover:bg-surface hover:text-ink"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex">
            <button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="btn-primary group px-5 py-2.5 text-sm"
            >
              Start a Project
              <Icon name="arrow_forward" size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-surface text-ink transition-colors duration-200 hover:border-lime/40 hover:text-lime lg:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
          >
            <Icon name={isMobileMenuOpen ? "close" : "menu"} size={22} />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-2 rounded-2xl border border-line bg-paper/95 p-4 shadow-card backdrop-blur-2xl lg:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className="rounded-xl px-4 py-3 text-left font-medium text-ink-soft transition-colors duration-200 hover:bg-surface hover:text-ink"
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => scrollToSection("#contact")}
                className="btn-primary mt-2 px-5 py-3 !rounded-xl"
              >
                Start a Project
                <Icon name="arrow_forward" size={18} />
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
