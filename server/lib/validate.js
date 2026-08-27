"use strict";

/**
 * Server-side validation and image persistence for testimonial submissions.
 *
 * The client downscales images in a canvas and posts them as a data URL, so
 * there is no multipart parsing here - but nothing below trusts the client.
 */

const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const UPLOAD_DIR = process.env.WOF_UPLOAD_DIR || path.join(__dirname, "..", "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const LIMITS = {
  clientName: 80,
  company: 80,
  role: 80,
  messageMin: 20,
  messageMax: 1200,
  imageBytes: 600 * 1024, // 600 KB after the client-side downscale
};

const ALLOWED_IMAGE_TYPES = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
};

const clean = (value, max) => {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ").slice(0, max);
};

/**
 * @returns {{ ok: true, value: object } | { ok: false, error: string }}
 */
function validateSubmission(body) {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  // Honeypot - real people never fill a field they cannot see.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return { ok: false, error: "Submission rejected." };
  }

  const clientName = clean(body.clientName, LIMITS.clientName);
  if (clientName.length < 2) {
    return { ok: false, error: "Please enter your name." };
  }

  const rating = Number(body.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { ok: false, error: "Please choose a rating between 1 and 5." };
  }

  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (message.length < LIMITS.messageMin) {
    return {
      ok: false,
      error: `Please write at least ${LIMITS.messageMin} characters.`,
    };
  }
  if (message.length > LIMITS.messageMax) {
    return {
      ok: false,
      error: `Please keep your feedback under ${LIMITS.messageMax} characters.`,
    };
  }

  return {
    ok: true,
    value: {
      clientName,
      company: clean(body.company, LIMITS.company) || null,
      role: clean(body.role, LIMITS.role) || null,
      rating,
      message,
    },
  };
}

/**
 * Decode a `data:image/...;base64,...` URL and write it to /uploads.
 *
 * @returns {{ ok: true, url: string | null } | { ok: false, error: string }}
 */
function saveImage(dataUrl) {
  if (!dataUrl) return { ok: true, url: null };

  if (typeof dataUrl !== "string" || !dataUrl.startsWith("data:")) {
    return { ok: false, error: "Invalid image." };
  }

  const match = /^data:([^;,]+);base64,(.+)$/s.exec(dataUrl);
  if (!match) return { ok: false, error: "Invalid image encoding." };

  const [, mime, b64] = match;
  const ext = ALLOWED_IMAGE_TYPES[mime];
  if (!ext) {
    return { ok: false, error: "Image must be a JPG, PNG or WebP file." };
  }

  let buffer;
  try {
    buffer = Buffer.from(b64, "base64");
  } catch {
    return { ok: false, error: "Invalid image data." };
  }

  if (buffer.length === 0) return { ok: false, error: "Image is empty." };
  if (buffer.length > LIMITS.imageBytes) {
    return { ok: false, error: "Image is too large." };
  }

  // Verify magic bytes rather than trusting the declared MIME type.
  const sniffed = sniff(buffer);
  if (sniffed !== mime) {
    return { ok: false, error: "Image content does not match its type." };
  }

  const name = `${Date.now()}-${crypto.randomBytes(6).toString("hex")}${ext}`;
  fs.writeFileSync(path.join(UPLOAD_DIR, name), buffer);

  return { ok: true, url: `/uploads/${name}` };
}

function sniff(buf) {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  ) {
    return "image/png";
  }
  if (
    buf.length >= 12 &&
    buf.toString("ascii", 0, 4) === "RIFF" &&
    buf.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "image/webp";
  }
  return null;
}

function deleteImage(url) {
  if (!url || !url.startsWith("/uploads/")) return;
  const name = path.basename(url);
  const target = path.join(UPLOAD_DIR, name);
  // basename() already strips traversal, but re-check we stayed in the dir.
  if (!target.startsWith(UPLOAD_DIR)) return;
  fs.rm(target, { force: true }, () => {});
}

module.exports = { validateSubmission, saveImage, deleteImage, LIMITS, UPLOAD_DIR };
