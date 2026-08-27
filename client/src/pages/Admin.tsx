import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Icon from "@/components/Icon";
import Container from "@/components/kit/Container";
import StarRating from "@/components/wall/StarRating";
import { useToast } from "@/hooks/use-toast";
import logoMark from "@/assets/QBlogo-mark.png";
import { cn } from "@/lib/utils";
import {
  adminLogin,
  adminLogout,
  adminSession,
  createLink,
  deleteLink,
  deleteTestimonial,
  listLinks,
  listTestimonials,
  updateTestimonial,
  type Testimonial,
  type TestimonialStatus,
} from "@/lib/wallOfFame";

const Admin = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "session"],
    queryFn: adminSession,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-ink"
          aria-hidden="true"
        />
      </div>
    );
  }

  return data?.authenticated ? <Dashboard /> : <Login />;
};

/* ------------------------------------------------------------------- login */

const Login = () => {
  const qc = useQueryClient();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await adminLogin(password);
      await qc.invalidateQueries({ queryKey: ["admin"] });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-5">
      <form onSubmit={submit} className="card w-full max-w-sm p-8">
        <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-[0.8rem] border border-lime/25 bg-lime/[0.08] p-2">
          <img
            src={logoMark}
            alt=""
            className="h-full w-full object-contain"
            style={{ filter: "brightness(0)" }}
          />
        </span>

        <h1 className="display-3 mt-5">Wall of Fame admin</h1>
        <p className="body-sm mt-2">Sign in to manage links and testimonials.</p>

        <label htmlFor="password" className="mt-7 block">
          <span className="field-label">Password</span>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            autoComplete="current-password"
            className="mt-2 h-11 w-full rounded-xl border border-line bg-surface px-4 text-ink outline-none transition-colors placeholder:text-ink-dim focus:border-lime focus:ring-2 focus:ring-lime/30"
          />
        </label>

        {error && (
          <p role="alert" className="mt-4 text-[0.85rem] text-destructive">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="btn btn-primary mt-6 h-11 w-full disabled:pointer-events-none disabled:opacity-60"
        >
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
};

/* --------------------------------------------------------------- dashboard */

type Tab = TestimonialStatus | "links";

const Dashboard = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [tab, setTab] = useState<Tab>("pending");

  const testimonialsQuery = useQuery({
    queryKey: ["admin", "testimonials"],
    queryFn: () => listTestimonials(),
  });

  const linksQuery = useQuery({
    queryKey: ["admin", "links"],
    queryFn: listLinks,
  });

  const counts = testimonialsQuery.data?.counts ?? {
    pending: 0,
    approved: 0,
    rejected: 0,
  };

  const visible = useMemo(() => {
    const all = testimonialsQuery.data?.testimonials ?? [];
    return tab === "links" ? [] : all.filter((t) => t.status === tab);
  }, [testimonialsQuery.data, tab]);

  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin"] });
    qc.invalidateQueries({ queryKey: ["wall"] });
  };

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TestimonialStatus }) =>
      updateTestimonial(id, { status }),
    onSuccess: (_data, vars) => {
      refresh();
      toast({
        title: vars.status === "approved" ? "Approved" : "Moved to rejected",
        description:
          vars.status === "approved"
            ? "It is now live on the Wall of Fame."
            : "It will not appear publicly.",
      });
    },
    onError: (err: Error) =>
      toast({ title: "Failed", description: err.message, variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTestimonial,
    onSuccess: () => {
      refresh();
      toast({ title: "Deleted", description: "The testimonial has been removed." });
    },
  });

  const logout = async () => {
    await adminLogout();
    qc.clear();
  };

  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: "pending", label: "Pending", count: counts.pending },
    { key: "approved", label: "Approved", count: counts.approved },
    { key: "rejected", label: "Rejected", count: counts.rejected },
    { key: "links", label: "Links", count: linksQuery.data?.length },
  ];

  return (
    <div className="min-h-screen bg-paper">
      <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-xl">
        <Container>
          <div className="flex h-[4.5rem] items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-[0.7rem] border border-lime/25 bg-lime/[0.08] p-1.5">
                <img
                  src={logoMark}
                  alt=""
                  className="h-full w-full object-contain"
                  style={{ filter: "brightness(0)" }}
                />
              </span>
              <span className="text-[1.05rem] font-bold tracking-tight text-ink">
                Wall of Fame
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="/wall-of-fame"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline h-10 px-4 text-[0.85rem]"
              >
                <Icon name="open_in_new" size={16} />
                <span className="hidden sm:inline">View wall</span>
              </a>
              <button
                type="button"
                onClick={logout}
                className="btn btn-outline h-10 px-4 text-[0.85rem]"
              >
                <Icon name="logout" size={16} />
                <span className="hidden sm:inline">Sign out</span>
              </button>
            </div>
          </div>
        </Container>
      </header>

      <main className="py-8 sm:py-10">
        <Container>
          <NewLinkPanel />

          <div className="mt-8 flex flex-wrap gap-2">
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTab(t.key)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-4 py-2 text-[0.85rem] font-medium transition-all duration-200",
                  tab === t.key
                    ? "border-ink bg-ink text-paper"
                    : "border-line bg-surface text-ink-soft hover:border-line-strong hover:text-ink",
                )}
              >
                {t.label}
                {t.count !== undefined && (
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[0.7rem] font-semibold",
                      tab === t.key ? "bg-paper/20" : "bg-surface-soft",
                    )}
                  >
                    {t.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {tab === "links" ? (
              <LinksTable links={linksQuery.data ?? []} onChange={refresh} />
            ) : visible.length === 0 ? (
              <div className="card-soft p-12 text-center">
                <Icon name="inbox" size={32} className="mx-auto text-ink-dim" />
                <p className="mt-4 font-semibold text-ink">Nothing here yet</p>
                <p className="body-sm mt-1.5">
                  {tab === "pending"
                    ? "New submissions will appear here for review."
                    : `No ${tab} testimonials.`}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                {visible.map((t) => (
                  <ReviewCard
                    key={t.id}
                    testimonial={t}
                    onStatus={(status) =>
                      statusMutation.mutate({ id: t.id, status })
                    }
                    onDelete={() => deleteMutation.mutate(t.id)}
                    onSaved={refresh}
                  />
                ))}
              </div>
            )}
          </div>
        </Container>
      </main>
    </div>
  );
};

/* -------------------------------------------------------------- link panel */

const NewLinkPanel = () => {
  const qc = useQueryClient();
  const { toast } = useToast();
  const [hint, setHint] = useState("");
  const [latest, setLatest] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: () => createLink(hint),
    onSuccess: (link) => {
      setLatest(`${window.location.origin}/feedback/${link.token}`);
      setHint("");
      qc.invalidateQueries({ queryKey: ["admin", "links"] });
    },
    onError: (err: Error) =>
      toast({ title: "Failed", description: err.message, variant: "destructive" }),
  });

  return (
    <div className="card p-6 sm:p-7">
      <h2 className="display-3">Generate a client link</h2>
      <p className="body-sm mt-2">
        Each link works once. The note is only for your reference - clients never
        see it.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
        className="mt-5 flex flex-col gap-3 sm:flex-row"
      >
        <input
          value={hint}
          onChange={(e) => setHint(e.target.value)}
          maxLength={120}
          placeholder="Ramesh - ABC Traders"
          className="h-11 flex-1 rounded-xl border border-line bg-surface px-4 text-ink outline-none transition-colors placeholder:text-ink-dim focus:border-lime focus:ring-2 focus:ring-lime/30"
        />
        <button
          type="submit"
          disabled={mutation.isPending}
          className="btn btn-primary h-11 shrink-0 px-6 disabled:pointer-events-none disabled:opacity-60"
        >
          <Icon name="add_link" size={18} />
          {mutation.isPending ? "Generating…" : "Generate link"}
        </button>
      </form>

      {latest && <CopyRow url={latest} />}
    </div>
  );
};

const CopyRow = ({ url }: { url: string }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const id = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(id);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      toast({
        title: "Could not copy",
        description: "Select the link and copy it manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-3 rounded-xl border border-lime/40 bg-lime-soft/50 p-4 sm:flex-row sm:items-center">
      <code className="min-w-0 flex-1 truncate text-[0.85rem] text-ink">{url}</code>
      <button
        type="button"
        onClick={copy}
        className="btn btn-ink h-10 shrink-0 px-5 text-[0.85rem]"
      >
        <Icon name={copied ? "check" : "content_copy"} size={16} />
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
};

const LinksTable = ({
  links,
  onChange,
}: {
  links: { id: string; token: string; clientNameHint: string | null; used: number; createdAt: string }[];
  onChange: () => void;
}) => {
  const { toast } = useToast();

  if (links.length === 0) {
    return (
      <div className="card-soft p-12 text-center">
        <Icon name="link" size={32} className="mx-auto text-ink-dim" />
        <p className="mt-4 font-semibold text-ink">No links yet</p>
        <p className="body-sm mt-1.5">Generate one above to send to a client.</p>
      </div>
    );
  }

  return (
    <div className="card divide-y divide-line overflow-hidden">
      {links.map((link) => (
        <div
          key={link.id}
          className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4"
        >
          <span
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.72rem] font-semibold",
              link.used
                ? "bg-surface-soft text-ink-soft"
                : "bg-lime-soft text-ink",
            )}
          >
            <Icon name={link.used ? "task_alt" : "schedule"} size={13} />
            {link.used ? "Used" : "Waiting"}
          </span>

          <div className="min-w-0 flex-1">
            <p className="truncate text-[0.9rem] font-medium text-ink">
              {link.clientNameHint || "No note"}
            </p>
            <p className="mt-0.5 truncate text-[0.78rem] text-ink-dim">
              {new Date(link.createdAt).toLocaleDateString()} ·{" "}
              /feedback/{link.token.slice(0, 8)}…
            </p>
          </div>

          <div className="flex shrink-0 gap-2">
            {!link.used && (
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(
                    `${window.location.origin}/feedback/${link.token}`,
                  );
                  toast({ title: "Link copied" });
                }}
                className="btn btn-outline h-9 px-3 text-[0.8rem]"
              >
                <Icon name="content_copy" size={15} />
                Copy
              </button>
            )}
            <button
              type="button"
              onClick={async () => {
                await deleteLink(link.id);
                onChange();
              }}
              className="btn btn-outline h-9 px-3 text-[0.8rem] hover:!border-destructive/40 hover:!text-destructive"
              aria-label="Delete link"
            >
              <Icon name="delete" size={15} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

/* ------------------------------------------------------------ review card */

const ReviewCard = ({
  testimonial,
  onStatus,
  onDelete,
  onSaved,
}: {
  testimonial: Testimonial;
  onStatus: (status: TestimonialStatus) => void;
  onDelete: () => void;
  onSaved: () => void;
}) => {
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({
    clientName: testimonial.clientName,
    company: testimonial.company ?? "",
    role: testimonial.role ?? "",
    message: testimonial.message,
    rating: testimonial.rating,
  });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await updateTestimonial(testimonial.id, draft);
      setEditing(false);
      onSaved();
      toast({ title: "Saved" });
    } catch (err) {
      toast({
        title: "Could not save",
        description: err instanceof Error ? err.message : "",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="card flex flex-col p-5">
      <div className="flex items-start gap-3">
        {testimonial.photoUrl ? (
          <img
            src={testimonial.photoUrl}
            alt=""
            className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-line ring-offset-2 ring-offset-surface"
          />
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-soft text-[0.85rem] font-bold text-ink-soft">
            {testimonial.clientName.slice(0, 2).toUpperCase()}
          </span>
        )}

        <div className="min-w-0 flex-1">
          {editing ? (
            <div className="grid gap-2 sm:grid-cols-2">
              <input
                value={draft.clientName}
                onChange={(e) => setDraft({ ...draft, clientName: e.target.value })}
                className={editInput}
                placeholder="Name"
              />
              <input
                value={draft.company}
                onChange={(e) => setDraft({ ...draft, company: e.target.value })}
                className={editInput}
                placeholder="Company"
              />
              <input
                value={draft.role}
                onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                className={editInput}
                placeholder="Role"
              />
            </div>
          ) : (
            <>
              <p className="truncate font-semibold text-ink">
                {testimonial.clientName}
              </p>
              <p className="mt-0.5 truncate text-[0.82rem] text-ink-soft">
                {[testimonial.role, testimonial.company].filter(Boolean).join(" · ") ||
                  "-"}
              </p>
            </>
          )}
        </div>

        <span className="shrink-0 text-[0.72rem] text-ink-dim">
          {new Date(testimonial.createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="mt-4">
        {editing ? (
          <StarRating
            value={draft.rating}
            size={22}
            onChange={(rating) => setDraft({ ...draft, rating })}
          />
        ) : (
          <StarRating value={testimonial.rating} />
        )}
      </div>

      {editing ? (
        <textarea
          value={draft.message}
          onChange={(e) => setDraft({ ...draft, message: e.target.value })}
          rows={5}
          className={`${editInput} mt-3 min-h-[7rem] resize-y py-2.5`}
        />
      ) : (
        <p className="mt-3 flex-1 text-[0.92rem] leading-[1.65] text-ink-soft">
          {testimonial.message}
        </p>
      )}

      <div className="mt-5 flex flex-wrap gap-2 border-t border-line pt-4">
        {editing ? (
          <>
            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="btn btn-ink h-9 px-4 text-[0.82rem] disabled:opacity-60"
            >
              <Icon name="save" size={15} />
              {saving ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="btn btn-outline h-9 px-4 text-[0.82rem]"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            {testimonial.status !== "approved" && (
              <button
                type="button"
                onClick={() => onStatus("approved")}
                className="btn btn-primary h-9 px-4 text-[0.82rem]"
              >
                <Icon name="check" size={15} />
                Approve
              </button>
            )}
            {testimonial.status !== "rejected" && (
              <button
                type="button"
                onClick={() => onStatus("rejected")}
                className="btn btn-outline h-9 px-4 text-[0.82rem]"
              >
                <Icon name="block" size={15} />
                Reject
              </button>
            )}
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="btn btn-outline h-9 px-4 text-[0.82rem]"
            >
              <Icon name="edit" size={15} />
              Edit
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Delete this testimonial permanently?")) {
                  onDelete();
                }
              }}
              className="btn btn-outline ml-auto h-9 px-3 text-[0.82rem] hover:!border-destructive/40 hover:!text-destructive"
              aria-label="Delete"
            >
              <Icon name="delete" size={15} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const editInput =
  "w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-[0.88rem] text-ink outline-none focus:border-lime focus:ring-2 focus:ring-lime/30";

export default Admin;
