"use strict";

/**
 * Loads server/.env into process.env.
 *
 * Node 20.6+ ships process.loadEnvFile(), so there is no need for dotenv.
 * Missing or malformed files are non-fatal - the app validates the values it
 * actually needs at the point of use.
 */

const path = require("node:path");
const fs = require("node:fs");

function load() {
  const file = path.join(__dirname, "..", ".env");
  if (!fs.existsSync(file)) return;

  try {
    process.loadEnvFile(file);
  } catch {
    // Older Node, or a parse error - fall back to a minimal parser.
    for (const line of fs.readFileSync(file, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;

      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!(key in process.env)) process.env[key] = value;
    }
  }
}

module.exports = { load };
