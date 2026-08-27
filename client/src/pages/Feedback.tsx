import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Icon from "@/components/Icon";
import Container from "@/components/kit/Container";
import Eyebrow from "@/components/kit/Eyebrow";
import Reveal from "@/components/kit/Reveal";
import StarRating from "@/components/wall/StarRating";
import logoMark from "@/assets/QBlogo-mark.png";
import {
  ACCEPTED_IMAGE_TYPES,
  ApiError,
  checkToken,
  downscaleImage,
  submitFeedback,
  type TokenCheck,
} from "@/lib/wallOfFame";

const MESSAGE_MIN = 20;
const MESSAGE_MAX = 1200;

type Stage = "checking" | "form" | "invalid" | "done";

const Feedback = () => {
  const { token = "" } = useParams();

  const [stage, setStage] = useState<Stage>("checking");
  const [check, setCheck] = useState<TokenCheck | null>(null);

  const [clientName, setClientName] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState("");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const honeypot = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let alive = true;
    checkToken(token)
      .then((result) => {
        if (!alive) return;
        setCheck(result);
        setStage(result.valid ? "form" : "invalid");
      })
      .catch(() => {
        if (!alive) return;
        setCheck({ valid: false, reason: "not_found" });
        setStage("invalid");
      });
    return () => {
      alive = false;
    };
  }, [token]);

  const handlePhoto = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    try {
      setPhoto(await downscaleImage(file));
      setPhotoName(file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read that image.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (clientName.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (rating === 0) {
      setError("Please choose a star rating.");
      return;
    }
    if (message.trim().length < MESSAGE_MIN) {
      setError(`Please write at least ${MESSAGE_MIN} characters.`);
      return;
    }

    setSubmitting(true);
    try {
      await submitFeedback(token, {
        clientName: clientName.trim(),
        company: company.trim(),
        role: role.trim(),
        rating,
        message: message.trim(),
        photo,
        website: honeypot.current?.value ?? "",
      });
      setStage("done");
    } catch (err) {
      if (err instanceof ApiError && err.status === 410) {
        setCheck({ valid: false, reason: "used" });
        setStage("invalid");
      } else {
        setError(
          err instanceof Error ? err.message : "Something went wrong. Please try again.",
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const remaining = MESSAGE_MAX - message.length;
  const invalidReason = check && check.valid === false ? check.reason : null;
  const greeting =
    check && check.valid === true && check.clientNameHint
      ? `Hi ${check.clientNameHint.split(/[-–-]/)[0].trim()} - thanks for taking a moment.`
      : "Thanks for taking a moment.";

  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <header className="border-b border-line bg-surface/70 backdrop-blur-xl">
        <Container>
          <div className="flex h-[4.5rem] items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[0.7rem] border border-lime/25 bg-lime/[0.08] p-1.5">
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
        </Container>
      </header>

      <main className="flex-1 py-12 sm:py-16">
        <Container>
          <div className="mx-auto w-full max-w-2xl">
            {stage === "checking" && (
              <div className="card p-10 text-center">
                <div
                  className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-line border-t-ink"
                  aria-hidden="true"
                />
                <p className="body-sm mt-4">Checking your link…</p>
              </div>
            )}

            {stage === "invalid" && invalidReason && (
              <div className="card p-10 text-center sm:p-12">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface-soft">
                  <Icon
                    name={invalidReason === "used" ? "task_alt" : "link_off"}
                    size={28}
                    className="text-ink-soft"
                  />
                </span>
                <h1 className="display-3 mt-6">
                  {invalidReason === "used"
                    ? "This link has already been used"
                    : "This link is no longer active"}
                </h1>
                <p className="lead mt-3">
                  {invalidReason === "used"
                    ? "Thanks - we have already received your feedback. If you need to change it, just reply to our email and we will sort it out."
                    : "The link may have expired or been mistyped. Please ask us for a fresh one."}
                </p>
                <a
                  href="mailto:info@quantrabyte.com"
                  className="btn btn-outline mt-8 h-11 px-6"
                >
                  <Icon name="mail" size={17} />
                  Contact us
                </a>
              </div>
            )}

            {stage === "done" && (
              <Reveal>
                <div className="card p-10 text-center sm:p-12">
                  <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lime">
                    <Icon name="check" size={32} className="text-ink" />
                  </span>
                  <h1 className="display-2 mt-6">Thank you</h1>
                  <p className="lead mx-auto mt-4 max-w-md">
                    Your feedback has been sent to our team. Once we have looked
                    it over it may appear on our Wall of Fame.
                  </p>
                  <a href="/wall-of-fame" className="btn btn-primary group mt-8 h-12 px-7">
                    See the Wall of Fame
                    <Icon
                      name="arrow_forward"
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </a>
                </div>
              </Reveal>
            )}

            {stage === "form" && (
              <>
                <div className="text-center">
                  <Eyebrow>Client feedback</Eyebrow>
                  <h1 className="display-2 mt-5">
                    How did we{" "}
                    <span className="lime-underline">do?</span>
                  </h1>
                  <p className="lead mx-auto mt-4 max-w-lg">
                    {greeting}{" "}
                    Your words help other businesses decide whether we are the
                    right partner.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="card mt-8 p-6 sm:p-8">
                  {/* Honeypot - visually and programmatically hidden */}
                  <input
                    ref={honeypot}
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="pointer-events-none absolute h-0 w-0 opacity-0"
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Your name" required htmlFor="clientName">
                      <input
                        id="clientName"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        maxLength={80}
                        required
                        autoComplete="name"
                        placeholder="Ramesh Kumar"
                        className={inputClass}
                      />
                    </Field>

                    <Field label="Company" htmlFor="company">
                      <input
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        maxLength={80}
                        autoComplete="organization"
                        placeholder="ABC Traders"
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <div className="mt-5">
                    <Field label="Your role" htmlFor="role">
                      <input
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        maxLength={80}
                        autoComplete="organization-title"
                        placeholder="Founder"
                        className={inputClass}
                      />
                    </Field>
                  </div>

                  <div className="mt-6">
                    <span className="field-label">
                      Rating <span className="text-lime-ink">*</span>
                    </span>
                    <div className="mt-2.5">
                      <StarRating value={rating} size={30} onChange={setRating} />
                    </div>
                  </div>

                  <div className="mt-6">
                    <Field label="Your feedback" required htmlFor="message">
                      <textarea
                        id="message"
                        value={message}
                        onChange={(e) =>
                          setMessage(e.target.value.slice(0, MESSAGE_MAX))
                        }
                        rows={6}
                        required
                        placeholder="What did we build for you, and how was it to work with us?"
                        className={`${inputClass} min-h-[9rem] resize-y py-3`}
                      />
                    </Field>
                    <p className="mt-1.5 text-right text-[0.78rem] text-ink-dim">
                      {message.length < MESSAGE_MIN
                        ? `${MESSAGE_MIN - message.length} more characters needed`
                        : `${remaining} characters left`}
                    </p>
                  </div>

                  <div className="mt-5">
                    <span className="field-label">Photo or logo</span>
                    <div className="mt-2.5 flex flex-wrap items-center gap-3">
                      <label className="btn btn-outline h-11 cursor-pointer px-5">
                        <Icon name="add_photo_alternate" size={18} />
                        {photo ? "Change image" : "Add an image"}
                        <input
                          type="file"
                          accept={ACCEPTED_IMAGE_TYPES.join(",")}
                          onChange={(e) => handlePhoto(e.target.files?.[0])}
                          className="sr-only"
                        />
                      </label>

                      {photo && (
                        <span className="flex items-center gap-2.5">
                          <img
                            src={photo}
                            alt=""
                            className="h-11 w-11 rounded-full object-cover ring-2 ring-lime/50 ring-offset-2 ring-offset-surface"
                          />
                          <span className="max-w-[10rem] truncate text-[0.82rem] text-ink-soft">
                            {photoName}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setPhoto(null);
                              setPhotoName("");
                            }}
                            className="text-ink-dim transition-colors hover:text-ink"
                            aria-label="Remove image"
                          >
                            <Icon name="close" size={18} />
                          </button>
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-[0.78rem] text-ink-dim">
                      Optional. JPG, PNG or WebP - resized automatically.
                    </p>
                  </div>

                  {error && (
                    <p
                      role="alert"
                      className="mt-6 flex items-start gap-2 rounded-xl border border-destructive/25 bg-destructive/5 px-4 py-3 text-[0.88rem] text-destructive"
                    >
                      <Icon name="error" size={18} className="mt-px shrink-0" />
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn btn-primary mt-7 h-12 w-full disabled:pointer-events-none disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <span
                          className="h-4 w-4 animate-spin rounded-full border-2 border-ink/25 border-t-ink"
                          aria-hidden="true"
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send feedback
                        <Icon name="arrow_forward" size={18} />
                      </>
                    )}
                  </button>

                  <p className="mt-4 text-center text-[0.78rem] leading-5 text-ink-dim">
                    We review every submission before publishing. Nothing appears
                    on our site without our approval.
                  </p>
                </form>
              </>
            )}
          </div>
        </Container>
      </main>
    </div>
  );
};

const inputClass =
  "mt-2 h-11 w-full rounded-xl border border-line bg-surface px-4 text-[0.95rem] text-ink outline-none transition-colors duration-200 placeholder:text-ink-dim focus:border-lime focus:ring-2 focus:ring-lime/30";

const Field = ({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <label htmlFor={htmlFor} className="block">
    <span className="field-label">
      {label} {required && <span className="text-lime-ink">*</span>}
    </span>
    {children}
  </label>
);

export default Feedback;
