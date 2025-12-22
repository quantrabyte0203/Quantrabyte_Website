const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["https://quantrabyte.com", "https://www.quantrabyte.com"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// API endpoint
app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "info@quantrabyte.com",
      pass: "xdpx lxjf fyga bwki",
    },
  });

  const mailOptions = {
    from: email,
    to: "info@quantrabyte.com",
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

// Sirf API health check - static file serving hata di
app.get("/", (req, res) => {
  res.json({ message: "API Server is running" });
});

app.listen(5000, () => console.log("API Server running on port 5000"));
