import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Qblogo from "../assets/QBlogo.png";

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
              ? "border-line bg-paper/85 shadow-soft backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <button
            type="button"
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.01]"
          >
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
          </button>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex">
            <button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-paper transition-all duration-300 hover:bg-ink/90"
            >
              Start a Project
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink transition-colors duration-200 hover:bg-surface lg:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-2 rounded-2xl border border-line bg-paper p-4 shadow-card backdrop-blur-xl lg:hidden">
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
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 font-medium text-paper"
              >
                Start a Project
                <ArrowRight className="h-4 w-4" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
