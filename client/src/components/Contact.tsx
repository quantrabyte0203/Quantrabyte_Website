import { useState } from "react";
import Icon from "@/components/Icon";
import Container from "@/components/kit/Container";
import Reveal from "@/components/kit/Reveal";
import SectionHeading from "@/components/kit/SectionHeading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactInfo = [
  {
    icon: "mail",
    title: "Email us",
    content: "info@quantrabyte.com",
    action: "mailto:info@quantrabyte.com",
  },
  {
    icon: "call",
    title: "Call us",
    content: "+91 7617294185",
    action: "tel:+917617294185",
  },
  {
    icon: "location_on",
    title: "Visit us",
    content: "Vijay Nagar, Indore, 452010",
    action: "https://maps.google.com/?q=Vijay+Nagar+Indore+452010",
  },
];

const launchFlow = [
  "Share the idea, goal or problem you want solved.",
  "We align on scope, timeline and the right delivery model.",
  "Design, build and ship with tight communication loops.",
];

const fieldClass =
  "mt-2 h-12 rounded-xl border-line bg-paper px-4 text-ink placeholder:text-ink-dim focus-visible:border-ink focus-visible:ring-0";

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
        description:
          err instanceof Error ? err.message : "Something went wrong.",
        variant: "destructive",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="section-y bg-surface-soft/60">
      <Container>
        <SectionHeading
          eyebrow="Contact and kickoff"
          title={
            <>
              Bring the idea. We will shape the{" "}
              <span className="lime-underline">product path.</span>
            </>
          }
          description="Use the form for project enquiries, redesign requests, AI product work or dedicated delivery support. We keep the first response fast."
        />

        <div className="mt-12 grid gap-5 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Form */}
          <Reveal>
            <div className="card p-6 sm:p-8 lg:p-10">
              <p className="field-label">Project enquiry</p>
              <h3 className="display-3 mt-3">Send us the brief.</h3>
              <p className="body-sm mt-3">
                The cleaner the context, the faster we can propose the right
                direction. Include goals, constraints and any deadlines that
                matter.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="field-label block">
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
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="field-label block">
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
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="field-label block">
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="field-label block">
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
                    className="mt-2 min-h-[10rem] resize-none rounded-xl border-line bg-paper px-4 py-3 text-ink placeholder:text-ink-dim focus-visible:border-ink focus-visible:ring-0"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-ink group h-[3.25rem] w-full text-[0.95rem] disabled:pointer-events-none disabled:opacity-60"
                >
                  {isSubmitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-paper/30 border-t-paper" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Icon
                        name="send"
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>
              </form>
            </div>
          </Reveal>

          {/* Details */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.08}>
              <div className="grid gap-3">
                {contactInfo.map((info) => (
                  <a
                    key={info.title}
                    href={info.action}
                    target={info.action.startsWith("http") ? "_blank" : undefined}
                    rel={
                      info.action.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className="card card-lift group flex items-center gap-4 p-5"
                  >
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[0.8rem] bg-lime-soft text-ink transition-colors duration-300 group-hover:bg-lime">
                      <Icon name={info.icon} size={21} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="field-label block">{info.title}</span>
                      <span className="mt-1 block break-words text-[0.95rem] font-medium text-ink">
                        {info.content}
                      </span>
                    </span>
                    <Icon
                      name="arrow_outward"
                      size={18}
                      className="shrink-0 text-ink-dim transition-colors duration-200 group-hover:text-ink"
                    />
                  </a>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.14} className="flex-1">
              <div className="card h-full p-6">
                <div className="flex items-center gap-2.5">
                  <Icon name="schedule" size={20} className="text-lime-ink" />
                  <h3 className="text-[1rem] font-semibold tracking-tight text-ink">
                    How we kick off
                  </h3>
                </div>

                <ol className="mt-5 space-y-3">
                  {launchFlow.map((step, index) => (
                    <li key={step} className="card-soft flex gap-3 p-4">
                      <span className="text-[0.8rem] font-bold text-lime-ink">
                        0{index + 1}
                      </span>
                      <span className="text-[0.88rem] leading-6 text-ink-soft">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Contact;
