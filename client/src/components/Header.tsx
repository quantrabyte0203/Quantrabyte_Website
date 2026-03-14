import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Qblogo from "../assets/QBlogo.png";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#portfolio", label: "Projects" },
  { href: "#team", label: "Founder" },
  { href: "#contact", label: "Contact" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
      <div className="mx-auto max-w-7xl">
        <div
          className={cn(
            "flex items-center justify-between gap-3 rounded-[28px] border px-2.5 py-2.5 transition-all duration-300 sm:gap-4 sm:rounded-full sm:px-3 sm:py-3",
            isScrolled
              ? "glass-card border-white/15 bg-[#07111d]/80 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
              : "border-white/10 bg-[#07111d]/35",
          )}
        >
          <button
            type="button"
            onClick={() => scrollToSection("#home")}
            className="flex min-w-0 items-center gap-2 rounded-full px-2 py-1 text-left transition-transform duration-300 hover:scale-[1.01] sm:gap-3"
          >
            <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl border border-white/15 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.96),rgba(120,250,229,0.88)_36%,rgba(10,21,36,0.96)_100%)] p-0 shadow-[0_12px_32px_rgba(91,247,221,0.22)] ring-1 ring-white/10 sm:h-12 sm:w-12">
              <img
                src={Qblogo}
                alt="QuantraByte"
                className="h-full w-full scale-[1.38] object-cover brightness-110 contrast-125"
              />
            </span>
            <span className="hidden min-w-0 sm:block">
              <span className="mono-label block text-primary/80">AI-native studio</span>
              <span className="truncate text-base font-semibold text-white sm:text-lg">QuantraByte</span>
            </span>
          </button>

          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-xl lg:flex">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollToSection(item.href)}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-all duration-300 hover:bg-white/8 hover:text-white"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button
              type="button"
              variant="ghost"
              onClick={() => scrollToSection("#portfolio")}
              className="rounded-full border border-white/10 bg-white/5 px-5 text-white/80 hover:bg-white/10 hover:text-white"
            >
              Live Work
            </Button>
            <Button
              type="button"
              onClick={() => scrollToSection("#contact")}
              className="rounded-full border border-primary/30 bg-[linear-gradient(135deg,#5bf7dd_0%,#2ad4ff_55%,#33cc8c_100%)] px-6 text-slate-950 shadow-quantum transition-transform duration-300 hover:scale-[1.02]"
            >
              Start a Build
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-colors duration-300 hover:bg-white/10 lg:hidden"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Close navigation" : "Open navigation"}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-3 rounded-[28px] border border-white/10 bg-[#07111d]/90 p-4 shadow-[0_28px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl lg:hidden">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  type="button"
                  onClick={() => scrollToSection(item.href)}
                  className="rounded-2xl border border-transparent bg-white/0 px-4 py-3 text-left font-medium text-white/75 transition-all duration-300 hover:border-white/10 hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </button>
              ))}
              <Button
                type="button"
                onClick={() => scrollToSection("#contact")}
                className="mt-2 rounded-2xl bg-[linear-gradient(135deg,#5bf7dd_0%,#2ad4ff_55%,#33cc8c_100%)] py-6 font-semibold text-slate-950"
              >
                Start a Build
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
