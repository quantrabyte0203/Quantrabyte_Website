import { Linkedin, Github, Twitter, Mail, ArrowUp } from "lucide-react";
import { useState, useEffect } from "react";
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
    { href: "#portfolio", label: "Portfolio" },
    { href: "#team", label: "Team" },
    { href: "#contact", label: "Contact" },
  ];

  const serviceLinks = [
    "Web Development",
    "AI/ML Solutions",
    "Cloud Integration",
    "Mobile Applications",
    "Data Engineering",
    "Cybersecurity",
  ];

  const socialLinks = [
    {
      icon: Linkedin,
      href: "https://linkedin.com/company/QuantraByte",
      label: "LinkedIn",
    },
    {
      icon: Github,
      href: "https://github.com/QuantraByte",
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
    <footer className="bg-foreground text-background relative">
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 quantum-gradient rounded-full flex items-center justify-center shadow-quantum hover:shadow-glow transition-all duration-300 z-50 scale-on-hover"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-white" />
        </button>
      )}

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                {/* <span className="text-white font-bold text-sm">♣</span> */}
                <img src={Qblogo} alt="QB" />
              </div>
              <span className="text-xl font-bold">QuantraByte</span>
            </div>
            <p className="text-background/70 mb-6 leading-relaxed">
              Transforming quantum-level ideas into practical, byte-sized
              solutions. Your partner in digital innovation and technological
              excellence.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    social.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="w-10 h-10 bg-background/10 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-background/70 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-background/70 hover:text-white transition-colors duration-300 text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((service, index) => (
                <li key={index}>
                  <span className="text-background/70 hover:text-white transition-colors duration-300 cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact</h3>
            <div className="space-y-4">
              <div>
                <p className="text-background/70 mb-1">Email</p>
                <a
                  href="mailto:info@quantrabyte.com"
                  className="text-white hover:text-primary transition-colors duration-300"
                >
                  info@quantrabyte.com
                </a>
              </div>
              <div>
                <p className="text-background/70 mb-1">Phone</p>
                <a
                  href="tel:+91 7617294185, 8770022687"
                  className="text-white hover:text-primary transition-colors duration-300"
                >
                  +91 7617294185
                </a>
              </div>
              <div>
                <p className="text-background/70 mb-1">Location</p>
                <p className="text-white">Vijay Nagar Indore, MP</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-background/20 pt-8 mb-8">
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-background/70 mb-6">
              Subscribe to our newsletter for the latest tech insights and
              updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-background/10 border border-background/20 rounded-l-lg text-white placeholder-background/50 focus:outline-none focus:border-primary"
              />
              <button className="px-6 py-3 quantum-gradient rounded-r-lg hover:quantum-gradient-hover transition-all font-semibold">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-background/70 text-sm mb-4 md:mb-0">
            <p>&copy; 2025 QuantraByte. All rights reserved.</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a
              href="#"
              className="text-background/70 hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-background/70 hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-background/70 hover:text-white transition-colors"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 quantum-gradient"></div>
    </footer>
  );
};

export default Footer;
