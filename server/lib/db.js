"use strict";

/**
 * Persistence for the Wall of Fame.
 *
 * Uses node:sqlite, which ships with Node 22.5+ - no external dependency and
 * no native build step. Every query in the app goes through this module, so
 * moving to Postgres later means rewriting this file only.
 */

const { DatabaseSync } = require("node:sqlite");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const DATA_DIR = process.env.WOF_DATA_DIR || path.join(__dirname, "..", "data");
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const db = new DatabaseSync(path.join(DATA_DIR, "wall-of-fame.db"));

db.exec("PRAGMA journal_mode = WAL");
db.exec("PRAGMA foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS submission_links (
    id              TEXT PRIMARY KEY,
    token           TEXT NOT NULL UNIQUE,
    clientNameHint  TEXT,
    used            INTEGER NOT NULL DEFAULT 0,
    createdAt       TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS testimonials (
    id          TEXT PRIMARY KEY,
    clientName  TEXT NOT NULL,
    company     TEXT,
    role        TEXT,
    rating      INTEGER NOT NULL,
    message     TEXT NOT NULL,
    photoUrl    TEXT,
    status      TEXT NOT NULL DEFAULT 'pending',
    linkToken   TEXT NOT NULL UNIQUE,
    createdAt   TEXT NOT NULL,
    updatedAt   TEXT NOT NULL
  )
`);

db.exec(
  "CREATE INDEX IF NOT EXISTS idx_testimonials_status ON testimonials(status, createdAt DESC)",
);

const nowIso = () => new Date().toISOString();
const newId = () => crypto.randomUUID();

/** URL-safe, unguessable token for a client link. */
const newToken = () => crypto.randomBytes(18).toString("base64url");

const links = {
  create(clientNameHint) {
    const row = {
      id: newId(),
      token: newToken(),
      clientNameHint: clientNameHint || null,
      used: 0,
      createdAt: nowIso(),
    };
    db.prepare(
      `INSERT INTO submission_links (id, token, clientNameHint, used, createdAt)
       VALUES (?, ?, ?, ?, ?)`,
    ).run(row.id, row.token, row.clientNameHint, row.used, row.createdAt);
    return row;
  },

  list() {
    return db
      .prepare("SELECT * FROM submission_links ORDER BY createdAt DESC")
      .all();
  },

  findByToken(token) {
    return db
      .prepare("SELECT * FROM submission_links WHERE token = ?")
      .get(token);
  },

  markUsed(token) {
    db.prepare("UPDATE submission_links SET used = 1 WHERE token = ?").run(token);
  },

  remove(id) {
    return db.prepare("DELETE FROM submission_links WHERE id = ?").run(id);
  },
};

const testimonials = {
  create(data) {
    const row = {
      id: newId(),
      clientName: data.clientName,
      company: data.company || null,
      role: data.role || null,
      rating: data.rating,
      message: data.message,
      photoUrl: data.photoUrl || null,
      status: "pending",
      linkToken: data.linkToken,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    db.prepare(
      `INSERT INTO testimonials
         (id, clientName, company, role, rating, message, photoUrl, status, linkToken, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      row.id,
      row.clientName,
      row.company,
      row.role,
      row.rating,
      row.message,
      row.photoUrl,
      row.status,
      row.linkToken,
      row.createdAt,
      row.updatedAt,
    );
    return row;
  },

  list(status) {
    if (status) {
      return db
        .prepare(
          "SELECT * FROM testimonials WHERE status = ? ORDER BY createdAt DESC",
        )
        .all(status);
    }
    return db.prepare("SELECT * FROM testimonials ORDER BY createdAt DESC").all();
  },

  /** Public projection - never leaks linkToken or status. */
  listApproved() {
    return db
      .prepare(
        `SELECT id, clientName, company, role, rating, message, photoUrl, createdAt
           FROM testimonials
          WHERE status = 'approved'
          ORDER BY rating DESC, createdAt DESC`,
      )
      .all();
  },

  find(id) {
    return db.prepare("SELECT * FROM testimonials WHERE id = ?").get(id);
  },

  update(id, patch) {
    const current = testimonials.find(id);
    if (!current) return null;

    const next = {
      clientName: patch.clientName ?? current.clientName,
      company: patch.company !== undefined ? patch.company : current.company,
      role: patch.role !== undefined ? patch.role : current.role,
      rating: patch.rating ?? current.rating,
      message: patch.message ?? current.message,
      status: patch.status ?? current.status,
    };

    db.prepare(
      `UPDATE testimonials
          SET clientName = ?, company = ?, role = ?, rating = ?, message = ?,
              status = ?, updatedAt = ?
        WHERE id = ?`,
    ).run(
      next.clientName,
      next.company,
      next.role,
      next.rating,
      next.message,
      next.status,
      nowIso(),
      id,
    );

    return testimonials.find(id);
  },

  remove(id) {
    const row = testimonials.find(id);
    if (!row) return null;
    db.prepare("DELETE FROM testimonials WHERE id = ?").run(id);
    return row;
  },

  counts() {
    const rows = db
      .prepare("SELECT status, COUNT(*) AS n FROM testimonials GROUP BY status")
      .all();
    const out = { pending: 0, approved: 0, rejected: 0 };
    rows.forEach((r) => {
      out[r.status] = r.n;
    });
    return out;
  },
};

module.exports = { db, links, testimonials };
