# Wall of Fame

Client testimonial collection and showcase, built into the existing site.

Flow: **you generate a one-time link → the client fills the form → it lands in
a pending queue → you approve it → it appears publicly.**

---

## 1. One-time setup

### a. Install server dependencies

```bash
cd server
npm install
```

Requires **Node 22.5 or newer** — persistence uses the built-in `node:sqlite`
module, so there is no database server and no native build step.

### b. Create `server/.env`

Copy `server/.env.example` to `server/.env` and fill it in:

```ini
ADMIN_PASSWORD=pick-something-long
ADMIN_SESSION_SECRET=<paste the output of the command below>
MAIL_USER=info@quantrabyte.com
MAIL_PASS=<your Gmail app password>
PORT=5000
NODE_ENV=development
```

Generate a session secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

> **Two things that need your attention**
>
> 1. `MAIL_PASS` is now read from the environment. It used to be hardcoded in
>    `server.js`, which means **the old app password is in your git history**.
>    Rotate it in your Google Account, then put the new one here. Until you set
>    `MAIL_PASS`, the contact form will fail to send.
> 2. Without `ADMIN_PASSWORD`, the admin login returns a clear error rather
>    than letting anyone in.

### c. Run both servers

```bash
cd server && npm run dev     # API on :5000
cd client && npm run dev     # site on :8080
```

The Vite dev server proxies `/api`, `/uploads` and `/contact` to port 5000, so
`http://localhost:8080` behaves exactly like production.

---

## 2. Day-to-day use

### Generate a link for a client

1. Go to **`/admin`** and sign in with `ADMIN_PASSWORD`.
2. In **Generate a client link**, optionally type a note like
   `Ramesh — ABC Traders`. It is only for your reference; the client never sees it.
3. Click **Generate link**, then **Copy link**.
4. Send that URL over WhatsApp or email. It looks like:
   `https://quantrabyte.com/feedback/DU45-dM1EnUVu9R3L6upYwHr`

Each link works **once**. After it is used it shows a friendly "already used"
message, so the same link cannot be submitted twice.

### Review submissions

Still in `/admin`, the tabs are **Pending / Approved / Rejected / Links**.

On each pending card you can:

| Action      | Effect                                                      |
| ----------- | ----------------------------------------------------------- |
| **Approve** | Publishes it to the Wall of Fame immediately                 |
| **Reject**  | Keeps it, but it never shows publicly                        |
| **Edit**    | Fix typos in name, company, role, rating or message          |
| **Delete**  | Removes it permanently, along with its uploaded photo        |

### Where it shows up

- **`/wall-of-fame`** — the full page, linked from the nav and footer. This is
  the link to share with prospects.
- **Home page** — a three-card teaser between Work and Why Us. It renders
  nothing at all until at least one testimonial is approved, so the page never
  shows an empty section.

---

## 3. What was added

### Server (`server/`)

| File                     | Purpose                                                      |
| ------------------------ | ------------------------------------------------------------ |
| `lib/db.js`              | All SQL. Swap this one file to move to Postgres.             |
| `lib/auth.js`            | HMAC-signed session cookie, constant-time password check.    |
| `lib/validate.js`        | Input validation, image sniffing and storage.                |
| `lib/rateLimit.js`       | In-memory fixed-window limiter.                              |
| `lib/env.js`             | Loads `.env` via `process.loadEnvFile`.                      |
| `routes/wallOfFame.js`   | Every endpoint.                                              |
| `test/flow.test.js`      | 19 end-to-end tests (`npm test`).                            |
| `data/wall-of-fame.db`   | SQLite file. Git-ignored.                                    |
| `uploads/`               | Client photos. Git-ignored.                                  |

`server.js` gained the router, static `/uploads`, a JSON error handler and
`trust proxy`. The contact route is unchanged apart from reading credentials
from the environment.

### Client (`client/src/`)

| File                             | Purpose                                  |
| -------------------------------- | ---------------------------------------- |
| `lib/wallOfFame.ts`              | Typed API client + browser image resizing |
| `pages/WallOfFame.tsx`           | Public `/wall-of-fame`                    |
| `pages/Feedback.tsx`             | Public `/feedback/:token`                 |
| `pages/Admin.tsx`                | `/admin` — login, links, review queue     |
| `components/Testimonials.tsx`    | Home page teaser                          |
| `components/wall/TestimonialCard.tsx` | Shared card                          |
| `components/wall/StarRating.tsx` | Display + interactive picker              |

Everything uses the existing design tokens and `components/kit/` primitives —
no new styling system, no new UI dependency.

---

## 4. API

| Method | Route                          | Auth   |
| ------ | ------------------------------ | ------ |
| GET    | `/api/wall`                    | public |
| GET    | `/api/feedback/:token`         | public |
| POST   | `/api/feedback/:token`         | public |
| POST   | `/api/admin/login`             | public |
| POST   | `/api/admin/logout`            | public |
| GET    | `/api/admin/session`           | public |
| GET    | `/api/admin/links`             | admin  |
| POST   | `/api/admin/links`             | admin  |
| DELETE | `/api/admin/links/:id`         | admin  |
| GET    | `/api/admin/testimonials`      | admin  |
| PATCH  | `/api/admin/testimonials/:id`  | admin  |
| DELETE | `/api/admin/testimonials/:id`  | admin  |

`/api/wall` returns a narrowed projection — `status` and `linkToken` are never
sent to the public.

---

## 5. Protections in place

- **Token single-use**, enforced by a `UNIQUE` constraint on `linkToken`, so two
  concurrent submissions cannot both win.
- **Honeypot field** — a hidden `website` input; any submission that fills it is
  rejected.
- **Rate limiting** — 5 submissions/hour and 10 login attempts/15 min per IP.
- **Image validation** — type allow-list, size cap, and **magic-byte sniffing**,
  so renaming `payload.exe` to `photo.jpg` does not get through.
- **Session cookie** is `HttpOnly`, `SameSite=Lax`, and `Secure` in production.
- **Password comparison is constant-time.**

---

## 6. Deploying

The API must be reachable from the site at the same origin. Point your reverse
proxy at the Express server for three paths:

```nginx
location /api      { proxy_pass http://127.0.0.1:5000; }
location /uploads  { proxy_pass http://127.0.0.1:5000; }
location /contact  { proxy_pass http://127.0.0.1:5000; }
```

**Two requirements to be aware of:**

1. **SPA fallback.** `/wall-of-fame`, `/feedback/:token` and `/admin` are
   client-side routes. Whatever serves `client/dist` must return `index.html`
   for unknown paths, or a client opening their link directly will get a 404.
   On nginx: `try_files $uri $uri/ /index.html;`
2. **Persistent disk.** The SQLite file and `uploads/` live on disk. This is
   fine on a VPS. On an ephemeral host (Vercel, Netlify functions) both would be
   wiped on redeploy — there you would move `lib/db.js` to a hosted Postgres
   (Neon/Supabase) and uploads to S3 or Cloudinary.

Set `NODE_ENV=production` so the session cookie gets the `Secure` flag.

---

## 7. Backups

Everything is two paths:

```bash
server/data/wall-of-fame.db   # testimonials + links
server/uploads/               # client photos
```

Copy both to back up. To reset entirely, stop the server and delete
`server/data/`; the schema is recreated on next start.
