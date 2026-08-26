import { useState } from "react";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your name.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.email.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return false;
    }

    if (!formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter your message.",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        toast({ title: "Sent!", description: "Your message has been sent." });
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Something went wrong.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      content: "info@quantrabyte.com",
      action: "mailto:info@quantrabyte.com",
    },
    {
      icon: Phone,
      title: "Call Us",
      content: "+91 7617294185",
      action: "tel:+917617294185",
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Vijay Nagar, Indore, 452010",
      action: "https://maps.google.com/?q=Vijay+Nagar+Indore+452010",
    },
  ];

  const launchFlow = [
    "Share the idea, goal, or problem you want solved.",
    "We align on scope, timeline, and the right delivery model.",
    "Design, build, and ship with tight communication loops.",
  ];

  return (
    <section id="contact" className="py-20 sm:py-24 lg:py-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <div className="section-kicker fade-in-up">
            <span className="accent-dot" />
            Contact and kickoff
          </div>
          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-ink fade-in-up sm:text-4xl lg:text-5xl">
            Bring the idea. We will shape the product path.
          </h2>
          <p
            className="section-copy mt-5 fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Use the form for project enquiries, redesign requests, AI product
            work, or dedicated delivery support. We keep the first response fast.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          {/* Form */}
          <div className="section-shell rounded-2xl p-6 fade-in-left sm:p-8 lg:p-10">
            <p className="mono-label">Project enquiry</p>
            <h3 className="mt-3 text-xl font-semibold text-ink sm:text-2xl">Send us the brief.</h3>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              The cleaner the context, the faster we can propose the right
              direction. Include goals, constraints, and any deadlines that matter.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mono-label block">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="mt-2 h-11 rounded-lg border-line bg-surface px-4 text-ink placeholder:text-ink-soft/50 focus-visible:ring-lime"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mono-label block">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="mt-2 h-11 rounded-lg border-line bg-surface px-4 text-ink placeholder:text-ink-soft/50 focus-visible:ring-lime"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mono-label block">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project inquiry"
                  className="mt-2 h-11 rounded-lg border-line bg-surface px-4 text-ink placeholder:text-ink-soft/50 focus-visible:ring-lime"
                />
              </div>

              <div>
                <label htmlFor="message" className="mono-label block">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows={6}
                  required
                  className="mt-2 min-h-[10rem] resize-none rounded-lg border-line bg-surface px-4 py-3 text-ink placeholder:text-ink-soft/50 focus-visible:ring-lime"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-paper transition-all duration-300 hover:bg-ink/90 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <div className="mr-1 h-4 w-4 rounded-full border-2 border-paper/20 border-t-paper animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div className="space-y-4 fade-in-right" style={{ animationDelay: "0.2s" }}>
            <div className="grid gap-3">
              {contactInfo.map((info) => (
                <a
                  key={info.title}
                  href={info.action}
                  target={info.action.startsWith("http") ? "_blank" : undefined}
                  rel={info.action.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="section-shell elevated-hover block rounded-xl p-5"
                >
                  <div className="flex items-start gap-4 sm:items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface text-ink">
                      <info.icon className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="mono-label">{info.title}</p>
                      <p className="mt-1.5 break-words text-sm font-medium text-ink sm:break-normal">
                        {info.content}
                      </p>
                    </div>
                    <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-ink-soft" />
                  </div>
                </a>
              ))}
            </div>

            <div className="section-shell rounded-xl p-5">
              <div className="flex items-center gap-2.5">
                <Clock3 className="h-5 w-5 text-ink" />
                <h3 className="text-base font-semibold text-ink">How we kick off</h3>
              </div>
              <div className="mt-4 space-y-3">
                {launchFlow.map((step, index) => (
                  <div key={step} className="surface-soft rounded-lg px-4 py-3">
                    <p className="mono-label">Step 0{index + 1}</p>
                    <p className="mt-1.5 text-sm leading-6 text-ink-soft">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="surface-soft rounded-xl p-5">
              <div className="flex items-center gap-2.5">
                <MapPin className="h-5 w-5 text-ink" />
                <h3 className="text-base font-semibold text-ink">Location</h3>
              </div>
              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Vijay Nagar, Indore, Madhya Pradesh, India. Remote-friendly
                delivery with a local base for direct collaboration.
              </p>
              <a
                href="https://maps.google.com/?q=Vijay+Nagar+Indore+452010"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink"
              >
                Open map
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
