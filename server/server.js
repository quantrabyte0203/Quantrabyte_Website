const path = require("node:path");
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

require("./lib/env").load();

const wallOfFame = require("./routes/wallOfFame");
const { UPLOAD_DIR } = require("./lib/validate");

const app = express();

// Behind a reverse proxy in production, so req.ip reflects the real client.
app.set("trust proxy", 1);

const allowedOrigins = [
  "https://quantrabyte.com",
  "https://www.quantrabyte.com",
  // Vite dev server
  "http://localhost:8080",
  "http://127.0.0.1:8080",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);

// Client photos/logos. Immutable: filenames are content-unique.
app.use(
  "/uploads",
  express.static(UPLOAD_DIR, {
    maxAge: "30d",
    setHeaders: (res) => res.setHeader("X-Content-Type-Options", "nosniff"),
  })
);

// Wall of Fame mounts its own body parsers per route, since image submissions
// need a larger limit than everything else.
app.use("/api", wallOfFame);

// Contact form
app.post("/contact", express.json(), async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER || "info@quantrabyte.com",
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: email,
    to: process.env.MAIL_TO || "info@quantrabyte.com",
    subject: subject || "New Contact Form",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Mail sent!" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Health check
app.get("/", (req, res) => {
  res.json({ message: "API Server is running" });
});

// JSON errors, so the client never has to parse an HTML error page.
app.use((err, _req, res, _next) => {
  if (err?.type === "entity.too.large") {
    return res.status(413).json({ error: "Upload is too large." });
  }
  console.error(err);
  res.status(500).json({ error: "Something went wrong." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Server running on port ${PORT}`));
