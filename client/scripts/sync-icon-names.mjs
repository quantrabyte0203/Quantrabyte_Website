/**
 * Keeps the Material Symbols subset in index.html in sync with the icons the
 * app actually uses.
 *
 * The unsubsetted Material Symbols Rounded variable font is ~5.3 MB. With
 * font-display: block that means roughly three seconds of nothing, then the
 * raw ligature names ("star", "format_quote") rendered as text until the
 * download finishes. Passing icon_names= brings it to ~90 KB.
 *
 * Google silently ignores unknown names, so a missing one fails quietly — which
 * is exactly why this list is generated rather than hand-maintained. Runs from
 * `prebuild`, so it can never drift from the source.
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(root, "src");
const INDEX = join(root, "index.html");

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (/\.tsx?$/.test(entry)) out.push(full);
  }
  return out;
}

function collect() {
  const names = new Set();

  for (const file of walk(SRC)) {
    const source = readFileSync(file, "utf8");
    if (!source.includes("Icon") && !source.includes("icon:")) continue;

    // <Icon name="foo" />
    for (const m of source.matchAll(/<Icon\b[^>]*?\bname="([a-z0-9_]+)"/gs)) {
      names.add(m[1]);
    }

    // name={cond ? "a" : "b"} — but not the operand of a comparison,
    // e.g. name={reason === "used" ? "task_alt" : "link_off"}
    for (const m of source.matchAll(/\bname=\{([^}]*)\}/gs)) {
      const expr = m[1];
      for (const q of expr.matchAll(/(={2,3}|!={1,2})?\s*"([a-z][a-z0-9_]{2,})"/g)) {
        if (!q[1]) names.add(q[2]);
      }
    }

    // Data arrays: { icon: "foo", ... }
    for (const m of source.matchAll(/\bicon:\s*"([a-z0-9_]+)"/g)) {
      names.add(m[1]);
    }
  }

  return [...names].sort();
}

const icons = collect();
if (icons.length === 0) {
  console.error("[icons] found none — refusing to write an empty subset");
  process.exit(1);
}

const href =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded" +
  ":opsz,wght,FILL,GRAD@20..48,200..700,0..1,-50..200" +
  `&icon_names=${icons.join(",")}` +
  "&display=block";

const LINK = /href="https:\/\/fonts\.googleapis\.com\/css2\?family=Material\+Symbols\+Rounded[^"]*"/;

const html = readFileSync(INDEX, "utf8");
if (!LINK.test(html)) {
  console.error("[icons] could not find the Material Symbols <link> in index.html");
  process.exit(1);
}

const updated = html.replace(LINK, `href="${href}"`);

if (updated === html) {
  console.log(`[icons] subset already current — ${icons.length} icons`);
} else {
  writeFileSync(INDEX, updated);
  console.log(`[icons] subset synced — ${icons.length} icons`);
}
