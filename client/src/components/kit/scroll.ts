/** Smooth-scroll to an in-page section, shared by the nav, hero and CTAs. */
export const scrollToSection = (selector: string) => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};
