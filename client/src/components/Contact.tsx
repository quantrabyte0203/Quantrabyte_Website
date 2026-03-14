import { useState } from "react";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Send,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="section-kicker mx-auto fade-in-up">
              <Sparkles className="h-4 w-4" />
              Contact and kickoff
            </div>
            <h2 className="mt-6 text-3xl font-semibold text-white fade-in-up sm:text-4xl md:text-6xl">
              Bring the idea. We will shape the product path.
            </h2>
            <p
              className="section-copy mx-auto mt-5 max-w-3xl fade-in-up"
              style={{ animationDelay: "0.12s" }}
            >
              Use the form for project enquiries, redesign requests, AI product
              work, or dedicated delivery support. We keep the first response fast.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="section-shell rounded-[28px] p-6 fade-in-left sm:p-8 md:rounded-[34px] md:p-10">
              <div className="flex flex-col gap-3">
                <p className="mono-label text-primary/80">Project enquiry</p>
                <h3 className="text-2xl font-semibold text-white sm:text-3xl">Send us the brief.</h3>
                <p className="text-sm leading-7 text-white/65">
                  The cleaner the context, the faster we can propose the right
                  direction. Include goals, constraints, and any deadlines that matter.
                </p>
              </div>

              <div className="mt-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mono-label block text-primary/75">
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
                        className="mt-2 h-12 rounded-2xl border-white/10 bg-white/5 px-4 text-white placeholder:text-white/35 focus-visible:ring-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mono-label block text-primary/75">
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
                        className="mt-2 h-12 rounded-2xl border-white/10 bg-white/5 px-4 text-white placeholder:text-white/35 focus-visible:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="mono-label block text-primary/75">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project inquiry"
                      className="mt-2 h-12 rounded-2xl border-white/10 bg-white/5 px-4 text-white placeholder:text-white/35 focus-visible:ring-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mono-label block text-primary/75">
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
                      className="mt-2 min-h-[11rem] resize-none rounded-[24px] border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/35 focus-visible:ring-primary"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-14 w-full rounded-full border border-primary/20 bg-[linear-gradient(135deg,#5bf7dd_0%,#2ad4ff_55%,#33cc8c_100%)] text-base font-semibold text-slate-950 shadow-quantum transition-transform duration-300 hover:scale-[1.01]"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 rounded-full border-2 border-slate-950/20 border-t-slate-950 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            <div className="space-y-6 fade-in-right" style={{ animationDelay: "0.6s" }}>
              <div className="grid gap-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.action}
                    target={info.action.startsWith("http") ? "_blank" : undefined}
                    rel={info.action.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="section-shell elevated-hover block rounded-[28px] p-5"
                  >
                    <div className="flex items-start gap-4 sm:items-center">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                        <info.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="mono-label text-white/45">{info.title}</p>
                        <p className="mt-2 break-words text-base font-medium text-white sm:break-normal">
                          {info.content}
                        </p>
                      </div>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-white/45 sm:mt-0" />
                    </div>
                  </a>
                ))}
              </div>

              <div className="section-shell rounded-[24px] p-5 sm:rounded-[30px] sm:p-6">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-white">How we kick off</h3>
                </div>
                <div className="mt-5 space-y-4">
                  {launchFlow.map((step, index) => (
                    <div
                      key={step}
                      className="rounded-[22px] border border-white/10 bg-white/5 px-4 py-4"
                    >
                      <p className="mono-label text-white/45">Step 0{index + 1}</p>
                      <p className="mt-3 text-sm leading-7 text-white/70">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="section-shell surface-grid rounded-[24px] p-5 sm:rounded-[30px] sm:p-6">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold text-white">Location</h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-white/68">
                  Vijay Nagar, Indore, Madhya Pradesh, India. Remote-friendly
                  delivery with a local base for direct collaboration.
                </p>
                <a
                  href="https://maps.google.com/?q=Vijay+Nagar+Indore+452010"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary"
                >
                  Open map
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
