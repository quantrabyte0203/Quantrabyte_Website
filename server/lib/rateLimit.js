"use strict";

/**
 * Minimal in-memory fixed-window rate limiter.
 *
 * Enough to stop a script hammering the public endpoints. State lives in the
 * process, so it resets on restart - fine for a single-instance deployment.
 */

function rateLimit({ windowMs, max, message }) {
  const hits = new Map();

  // Drop expired buckets periodically so the map cannot grow unbounded.
  const sweep = setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of hits) {
      if (now > entry.resetAt) hits.delete(key);
    }
  }, windowMs);
  sweep.unref?.();

  return (req, res, next) => {
    const key = req.ip || req.socket.remoteAddress || "unknown";
    const now = Date.now();
    const entry = hits.get(key);

    if (!entry || now > entry.resetAt) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    entry.count += 1;
    if (entry.count > max) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      res.setHeader("Retry-After", String(retryAfter));
      return res.status(429).json({ error: message });
    }

    next();
  };
}

module.exports = { rateLimit };
