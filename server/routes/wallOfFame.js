"use strict";

/**
 * Wall of Fame API.
 *
 * Public:  GET  /api/wall
 *          GET  /api/feedback/:token
 *          POST /api/feedback/:token
 *
 * Admin:   POST /api/admin/login
 *          POST /api/admin/logout
 *          GET  /api/admin/session
 *          GET  /api/admin/links
 *          POST /api/admin/links
 *          DELETE /api/admin/links/:id
 *          GET  /api/admin/testimonials?status=
 *          PATCH  /api/admin/testimonials/:id
 *          DELETE /api/admin/testimonials/:id
 */

const express = require("express");
const { links, testimonials } = require("../lib/db");
const {
  issueSession,
  clearSession,
  isAuthenticated,
  verifyPassword,
  requireAdmin,
} = require("../lib/auth");
const { validateSubmission, saveImage, deleteImage } = require("../lib/validate");
const { rateLimit } = require("../lib/rateLimit");

const router = express.Router();

// Image data URLs need more headroom than the global 100 KB JSON default.
const jsonLarge = express.json({ limit: "2mb" });
const jsonSmall = express.json({ limit: "32kb" });

const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many submissions from this address. Please try again later.",
});

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many login attempts. Please wait a few minutes.",
});

/* ------------------------------------------------------------------ public */

router.get("/wall", (_req, res) => {
  res.json({ testimonials: testimonials.listApproved() });
});

/** Check a link before rendering the form. */
router.get("/feedback/:token", (req, res) => {
  const link = links.findByToken(req.params.token);

  if (!link) {
    return res.status(404).json({ valid: false, reason: "not_found" });
  }
  if (link.used) {
    return res.status(410).json({ valid: false, reason: "used" });
  }

  res.json({ valid: true, clientNameHint: link.clientNameHint });
});

router.post("/feedback/:token", submitLimiter, jsonLarge, (req, res) => {
  const { token } = req.params;
  const link = links.findByToken(token);

  if (!link) {
    return res.status(404).json({ error: "This link is no longer active." });
  }
  if (link.used) {
    return res.status(410).json({ error: "This link has already been used." });
  }

  const parsed = validateSubmission(req.body);
  if (!parsed.ok) {
    return res.status(400).json({ error: parsed.error });
  }

  const image = saveImage(req.body.photo);
  if (!image.ok) {
    return res.status(400).json({ error: image.error });
  }

  try {
    testimonials.create({ ...parsed.value, photoUrl: image.url, linkToken: token });
    links.markUsed(token);
  } catch (err) {
    deleteImage(image.url);
    // A duplicate linkToken means the link was consumed by a concurrent request.
    if (String(err.message).includes("UNIQUE")) {
      return res.status(410).json({ error: "This link has already been used." });
    }
    throw err;
  }

  res.status(201).json({ success: true });
});

/* ------------------------------------------------------------------- admin */

router.post("/admin/login", loginLimiter, jsonSmall, (req, res) => {
  if (!process.env.ADMIN_PASSWORD) {
    return res
      .status(500)
      .json({ error: "Admin password is not configured on the server." });
  }

  if (!verifyPassword(req.body?.password)) {
    return res.status(401).json({ error: "Incorrect password." });
  }

  issueSession(res);
  res.json({ success: true });
});

router.post("/admin/logout", (_req, res) => {
  clearSession(res);
  res.json({ success: true });
});

router.get("/admin/session", (req, res) => {
  res.json({ authenticated: isAuthenticated(req) });
});

router.get("/admin/links", requireAdmin, (_req, res) => {
  res.json({ links: links.list() });
});

router.post("/admin/links", requireAdmin, jsonSmall, (req, res) => {
  const hint =
    typeof req.body?.clientNameHint === "string"
      ? req.body.clientNameHint.trim().slice(0, 120)
      : "";

  res.status(201).json({ link: links.create(hint || null) });
});

router.delete("/admin/links/:id", requireAdmin, (req, res) => {
  links.remove(req.params.id);
  res.json({ success: true });
});

router.get("/admin/testimonials", requireAdmin, (req, res) => {
  const { status } = req.query;
  const allowed = ["pending", "approved", "rejected"];
  const filter = allowed.includes(status) ? status : undefined;

  res.json({
    testimonials: testimonials.list(filter),
    counts: testimonials.counts(),
  });
});

router.patch("/admin/testimonials/:id", requireAdmin, jsonSmall, (req, res) => {
  const patch = {};

  if (req.body.status !== undefined) {
    if (!["pending", "approved", "rejected"].includes(req.body.status)) {
      return res.status(400).json({ error: "Invalid status." });
    }
    patch.status = req.body.status;
  }

  // Light editing only - enough to fix typos before publishing.
  if (req.body.clientName !== undefined) {
    const name = String(req.body.clientName).trim().slice(0, 80);
    if (name.length < 2) {
      return res.status(400).json({ error: "Name is too short." });
    }
    patch.clientName = name;
  }
  if (req.body.company !== undefined) {
    patch.company = String(req.body.company).trim().slice(0, 80) || null;
  }
  if (req.body.role !== undefined) {
    patch.role = String(req.body.role).trim().slice(0, 80) || null;
  }
  if (req.body.rating !== undefined) {
    const rating = Number(req.body.rating);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5." });
    }
    patch.rating = rating;
  }
  if (req.body.message !== undefined) {
    const message = String(req.body.message).trim();
    if (message.length < 20 || message.length > 1200) {
      return res
        .status(400)
        .json({ error: "Message must be between 20 and 1200 characters." });
    }
    patch.message = message;
  }

  const updated = testimonials.update(req.params.id, patch);
  if (!updated) return res.status(404).json({ error: "Not found." });

  res.json({ testimonial: updated });
});

router.delete("/admin/testimonials/:id", requireAdmin, (req, res) => {
  const removed = testimonials.remove(req.params.id);
  if (!removed) return res.status(404).json({ error: "Not found." });

  deleteImage(removed.photoUrl);
  res.json({ success: true });
});

module.exports = router;
