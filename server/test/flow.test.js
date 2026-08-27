"use strict";

/**
 * End-to-end check of the Wall of Fame flow against a live server:
 *   generate link -> submit as client -> approve as admin -> appears on wall
 *
 * Run with:  npm test        (from server/)
 * Uses a throwaway database via WOF_DATA_DIR so it never touches real data.
 */

const assert = require("node:assert");
const { test, before, after } = require("node:test");
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");
const os = require("node:os");

const PORT = 5199;
const BASE = `http://127.0.0.1:${PORT}`;
const PASSWORD = "test-admin-password";

let server;
let tmpDir;
let cookie = "";

const api = async (method, url, body, opts = {}) => {
  const res = await fetch(BASE + url, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(opts.auth ? { Cookie: cookie } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    /* non-JSON response */
  }
  return { status: res.status, json, raw: text, headers: res.headers };
};

before(async () => {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "wof-test-"));

  server = spawn(
    process.execPath,
    ["--disable-warning=ExperimentalWarning", path.join(__dirname, "..", "server.js")],
    {
      env: {
        ...process.env,
        PORT: String(PORT),
        ADMIN_PASSWORD: PASSWORD,
        ADMIN_SESSION_SECRET: "test-secret",
        WOF_DATA_DIR: tmpDir,
        WOF_UPLOAD_DIR: path.join(tmpDir, "uploads"),
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  server.stderr.on("data", (d) => process.stderr.write(`[server] ${d}`));

  // Wait for the port to answer.
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(BASE + "/");
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 100));
    }
  }
  throw new Error("Server did not start");
});

after(async () => {
  if (server && server.exitCode === null) {
    const exited = new Promise((resolve) => server.once("exit", resolve));
    server.kill();
    await exited;
  }

  // Windows keeps a handle on the SQLite WAL briefly after the process exits,
  // so retry a few times before giving up. Cleanup failure is not a test failure.
  for (let i = 0; i < 10; i++) {
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 100));
    }
  }
});

let token;
let testimonialId;

test("admin routes reject anonymous callers", async () => {
  const res = await api("GET", "/api/admin/links");
  assert.strictEqual(res.status, 401);
});

test("login rejects a wrong password", async () => {
  const res = await api("POST", "/api/admin/login", { password: "nope" });
  assert.strictEqual(res.status, 401);
});

test("login with the correct password issues a session", async () => {
  const res = await api("POST", "/api/admin/login", { password: PASSWORD });
  assert.strictEqual(res.status, 200);

  const setCookie = res.headers.get("set-cookie");
  assert.ok(setCookie, "expected a Set-Cookie header");
  assert.match(setCookie, /HttpOnly/);
  cookie = setCookie.split(";")[0];
});

test("admin generates a submission link", async () => {
  const res = await api(
    "POST",
    "/api/admin/links",
    { clientNameHint: "Ramesh - ABC Traders" },
    { auth: true },
  );
  assert.strictEqual(res.status, 201);
  assert.ok(res.json.link.token);
  assert.strictEqual(res.json.link.used, 0);
  token = res.json.link.token;
});

test("an unknown token is reported invalid", async () => {
  const res = await api("GET", "/api/feedback/does-not-exist");
  assert.strictEqual(res.status, 404);
  assert.strictEqual(res.json.valid, false);
});

test("a fresh token is valid and carries the hint", async () => {
  const res = await api("GET", `/api/feedback/${token}`);
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.json.valid, true);
  assert.strictEqual(res.json.clientNameHint, "Ramesh - ABC Traders");
});

test("submission requires a message of reasonable length", async () => {
  const res = await api("POST", `/api/feedback/${token}`, {
    clientName: "Ramesh",
    rating: 5,
    message: "too short",
  });
  assert.strictEqual(res.status, 400);
});

test("submission rejects an out-of-range rating", async () => {
  const res = await api("POST", `/api/feedback/${token}`, {
    clientName: "Ramesh",
    rating: 9,
    message: "This is a perfectly long enough testimonial message.",
  });
  assert.strictEqual(res.status, 400);
});

test("honeypot submissions are rejected", async () => {
  const res = await api("POST", `/api/feedback/${token}`, {
    clientName: "Spam Bot",
    rating: 5,
    message: "This is a perfectly long enough testimonial message.",
    website: "http://spam.example",
  });
  assert.strictEqual(res.status, 400);
});

test("a valid submission is stored as pending", async () => {
  const res = await api("POST", `/api/feedback/${token}`, {
    clientName: "Ramesh Kumar",
    company: "ABC Traders",
    role: "Founder",
    rating: 5,
    message:
      "QuantraByte rebuilt our storefront and the whole process was clear from day one.",
  });
  assert.strictEqual(res.status, 201);
});

test("the link cannot be reused", async () => {
  const check = await api("GET", `/api/feedback/${token}`);
  assert.strictEqual(check.status, 410);
  assert.strictEqual(check.json.reason, "used");

  const resubmit = await api("POST", `/api/feedback/${token}`, {
    clientName: "Someone Else",
    rating: 1,
    message: "Trying to reuse a link that has already been consumed.",
  });
  assert.strictEqual(resubmit.status, 410);
});

test("pending submissions are not public yet", async () => {
  const res = await api("GET", "/api/wall");
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.json.testimonials.length, 0);
});

test("admin sees it in the pending queue", async () => {
  const res = await api("GET", "/api/admin/testimonials?status=pending", null, {
    auth: true,
  });
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.json.testimonials.length, 1);
  assert.strictEqual(res.json.counts.pending, 1);
  testimonialId = res.json.testimonials[0].id;
});

test("admin approves it", async () => {
  const res = await api(
    "PATCH",
    `/api/admin/testimonials/${testimonialId}`,
    { status: "approved" },
    { auth: true },
  );
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.json.testimonial.status, "approved");
});

test("it now appears on the public wall, without private fields", async () => {
  const res = await api("GET", "/api/wall");
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.json.testimonials.length, 1);

  const item = res.json.testimonials[0];
  assert.strictEqual(item.clientName, "Ramesh Kumar");
  assert.strictEqual(item.rating, 5);
  assert.strictEqual(item.linkToken, undefined, "linkToken must not be public");
  assert.strictEqual(item.status, undefined, "status must not be public");
});

test("admin can edit copy without changing meaning", async () => {
  const res = await api(
    "PATCH",
    `/api/admin/testimonials/${testimonialId}`,
    { company: "ABC Traders Pvt Ltd" },
    { auth: true },
  );
  assert.strictEqual(res.status, 200);
  assert.strictEqual(res.json.testimonial.company, "ABC Traders Pvt Ltd");
  assert.strictEqual(res.json.testimonial.status, "approved");
});

test("rejecting removes it from the wall again", async () => {
  await api(
    "PATCH",
    `/api/admin/testimonials/${testimonialId}`,
    { status: "rejected" },
    { auth: true },
  );
  const res = await api("GET", "/api/wall");
  assert.strictEqual(res.json.testimonials.length, 0);
});

test("admin can delete a testimonial", async () => {
  const res = await api(
    "DELETE",
    `/api/admin/testimonials/${testimonialId}`,
    null,
    { auth: true },
  );
  assert.strictEqual(res.status, 200);

  const after = await api("GET", "/api/admin/testimonials", null, { auth: true });
  assert.strictEqual(after.json.testimonials.length, 0);
});

test("logout clears the session cookie", async () => {
  const res = await api("POST", "/api/admin/logout");
  assert.strictEqual(res.status, 200);
  assert.match(res.headers.get("set-cookie"), /Max-Age=0/);

  // A request carrying no cookie at all is refused.
  const anon = await api("GET", "/api/admin/links");
  assert.strictEqual(anon.status, 401);
});
