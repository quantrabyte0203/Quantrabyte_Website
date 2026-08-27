/**
 * Client for the Wall of Fame API.
 *
 * Paths are root-relative to match the existing `fetch("/contact")` convention;
 * the Vite dev proxy (and your reverse proxy in production) forwards them to
 * the Express server.
 */

export type TestimonialStatus = "pending" | "approved" | "rejected";

export interface Testimonial {
  id: string;
  clientName: string;
  company: string | null;
  role: string | null;
  rating: number;
  message: string;
  photoUrl: string | null;
  status: TestimonialStatus;
  linkToken: string;
  createdAt: string;
  updatedAt: string;
}

/** Public projection - no status, no linkToken. */
export type PublicTestimonial = Pick<
  Testimonial,
  "id" | "clientName" | "company" | "role" | "rating" | "message" | "photoUrl" | "createdAt"
>;

export interface SubmissionLink {
  id: string;
  token: string;
  clientNameHint: string | null;
  used: number;
  createdAt: string;
}

export interface StatusCounts {
  pending: number;
  approved: number;
  rejected: number;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    credentials: "same-origin",
    ...init,
    headers: {
      ...(init?.body ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });

  const text = await res.text();
  let data: unknown = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    // The dev server returns index.html when the proxy is missing - surface
    // that clearly instead of a confusing JSON parse error.
    throw new ApiError(
      "The API did not return JSON. Is the API server running on port 5000?",
      res.status,
    );
  }

  if (!res.ok) {
    const message =
      (data as { error?: string })?.error ?? `Request failed (${res.status})`;
    throw new ApiError(message, res.status);
  }

  return data as T;
}

/* ------------------------------------------------------------------ public */

export const getWall = () =>
  request<{ testimonials: PublicTestimonial[] }>("/api/wall").then(
    (r) => r.testimonials,
  );

export type TokenCheck =
  | { valid: true; clientNameHint: string | null }
  | { valid: false; reason: "not_found" | "used" };

export async function checkToken(token: string): Promise<TokenCheck> {
  try {
    return await request<TokenCheck>(
      `/api/feedback/${encodeURIComponent(token)}`,
    );
  } catch (err) {
    if (err instanceof ApiError && (err.status === 404 || err.status === 410)) {
      return { valid: false, reason: err.status === 410 ? "used" : "not_found" };
    }
    throw err;
  }
}

export interface SubmissionPayload {
  clientName: string;
  company?: string;
  role?: string;
  rating: number;
  message: string;
  /** data: URL produced by downscaleImage(). */
  photo?: string | null;
  /** Honeypot - must stay empty. */
  website?: string;
}

export const submitFeedback = (token: string, payload: SubmissionPayload) =>
  request<{ success: true }>(`/api/feedback/${encodeURIComponent(token)}`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

/* ------------------------------------------------------------------- admin */

export const adminSession = () =>
  request<{ authenticated: boolean }>("/api/admin/session");

export const adminLogin = (password: string) =>
  request<{ success: true }>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });

export const adminLogout = () =>
  request<{ success: true }>("/api/admin/logout", { method: "POST" });

export const listLinks = () =>
  request<{ links: SubmissionLink[] }>("/api/admin/links").then((r) => r.links);

export const createLink = (clientNameHint: string) =>
  request<{ link: SubmissionLink }>("/api/admin/links", {
    method: "POST",
    body: JSON.stringify({ clientNameHint }),
  }).then((r) => r.link);

export const deleteLink = (id: string) =>
  request<{ success: true }>(`/api/admin/links/${id}`, { method: "DELETE" });

export const listTestimonials = (status?: TestimonialStatus) =>
  request<{ testimonials: Testimonial[]; counts: StatusCounts }>(
    `/api/admin/testimonials${status ? `?status=${status}` : ""}`,
  );

export const updateTestimonial = (
  id: string,
  patch: Partial<
    Pick<
      Testimonial,
      "status" | "clientName" | "company" | "role" | "rating" | "message"
    >
  >,
) =>
  request<{ testimonial: Testimonial }>(`/api/admin/testimonials/${id}`, {
    method: "PATCH",
    body: JSON.stringify(patch),
  }).then((r) => r.testimonial);

export const deleteTestimonial = (id: string) =>
  request<{ success: true }>(`/api/admin/testimonials/${id}`, {
    method: "DELETE",
  });

/* ------------------------------------------------------------------ upload */

export const IMAGE_MAX_BYTES = 600 * 1024;
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

/**
 * Downscale a chosen image in a canvas before upload.
 *
 * Keeps payloads small enough to send as JSON, which avoids multipart handling
 * on the server, and means a 5 MB phone photo still uploads fine.
 */
export function downscaleImage(file: File, maxSize = 512): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      reject(new Error("Please choose a JPG, PNG or WebP image."));
      return;
    }
    // Guard before decoding, so a huge file cannot exhaust memory.
    if (file.size > 12 * 1024 * 1024) {
      reject(new Error("That image is too large. Please choose one under 12MB."));
      return;
    }

    const url = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      URL.revokeObjectURL(url);

      const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
      const w = Math.max(1, Math.round(img.width * scale));
      const h = Math.max(1, Math.round(img.height * scale));

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not process that image."));
        return;
      }
      ctx.drawImage(img, 0, 0, w, h);

      // PNG keeps transparency for logos; everything else is cheaper as JPEG.
      const type = file.type === "image/png" ? "image/png" : "image/jpeg";
      let out = canvas.toDataURL(type, 0.85);

      // Fall back to progressively harder compression if still too big.
      if (out.length * 0.75 > IMAGE_MAX_BYTES && type !== "image/png") {
        out = canvas.toDataURL("image/jpeg", 0.65);
      }
      if (out.length * 0.75 > IMAGE_MAX_BYTES) {
        reject(new Error("That image is too large after compression."));
        return;
      }

      resolve(out);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read that image."));
    };

    img.src = url;
  });
}
