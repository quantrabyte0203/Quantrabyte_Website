"use strict";

/**
 * Single-admin session handling.
 *
 * The session is an HMAC-signed cookie - no JWT library and no session store.
 * The payload is just an expiry, because there is only ever one admin.
 */

const crypto = require("node:crypto");

const COOKIE = "qb_admin";
const MAX_AGE_MS = 1000 * 60 * 60 * 12; // 12 hours

const secret = () =>
  process.env.ADMIN_SESSION_SECRET || "dev-only-insecure-secret";

const sign = (value) =>
  crypto.createHmac("sha256", secret()).update(value).digest("base64url");

/** Parse a Cookie header without pulling in cookie-parser. */
function readCookie(req, name) {
  const header = req.headers.cookie;
  if (!header) return null;
  for (const part of header.split(";")) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    if (part.slice(0, idx).trim() === name) {
      return decodeURIComponent(part.slice(idx + 1).trim());
    }
  }
  return null;
}

function issueSession(res) {
  const expires = Date.now() + MAX_AGE_MS;
  const payload = String(expires);
  const token = `${payload}.${sign(payload)}`;

  const attrs = [
    `${COOKIE}=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    `Max-Age=${Math.floor(MAX_AGE_MS / 1000)}`,
  ];
  if (process.env.NODE_ENV === "production") attrs.push("Secure");

  res.setHeader("Set-Cookie", attrs.join("; "));
}

function clearSession(res) {
  res.setHeader(
    "Set-Cookie",
    `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
  );
}

function isAuthenticated(req) {
  const raw = readCookie(req, COOKIE);
  if (!raw) return false;

  const dot = raw.lastIndexOf(".");
  if (dot === -1) return false;

  const payload = raw.slice(0, dot);
  const provided = raw.slice(dot + 1);
  const expected = sign(payload);

  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  const expires = Number(payload);
  return Number.isFinite(expires) && Date.now() < expires;
}

/** Constant-time password comparison against ADMIN_PASSWORD. */
function verifyPassword(candidate) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;

  // Hash both sides first so the compare is always over equal-length buffers.
  const a = crypto.createHash("sha256").update(String(candidate)).digest();
  const b = crypto.createHash("sha256").update(expected).digest();
  return crypto.timingSafeEqual(a, b);
}

function requireAdmin(req, res, next) {
  if (!isAuthenticated(req)) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  next();
}

module.exports = {
  issueSession,
  clearSession,
  isAuthenticated,
  verifyPassword,
  requireAdmin,
};
