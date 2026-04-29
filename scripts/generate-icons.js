// AGENT.md §3.2 deviation, authorized by Elie on 2026-04-28.
// The OG image background uses a two-source teal mesh (radial duotone),
// which §3.2 lists as a "firable offense." Approved on the basis that
// the OG asset is shown once per share and is the brand's single allowed
// "radial teal haze" moment, here pushed to two stops at the user's
// explicit direction. Do not extend this pattern to other surfaces.

import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import opentype from "opentype.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const pub = resolve(root, "public");

const TEAL = "#03A696";
const TEAL_700 = "#028A7D";
const TEAL_800 = "#025951";
const INK = "#0A0A0A";
const WHITE = "#FFFFFF";

const W = 1200;
const H = 630;
const PAD = 80;

const adrianna = opentype.loadSync(resolve(pub, "AdriannaExtended-Bold.ttf"));

const headline = ["Independent freight forwarders,", "stronger together."];
const HEADLINE_SIZE = 56;
const TRACKING = -0.02;

function textPath(font, text, size, x, y) {
  const tracking = size * TRACKING;
  let cursor = 0;
  const subPaths = [];
  const glyphs = font.stringToGlyphs(text);
  for (let i = 0; i < glyphs.length; i++) {
    const glyph = glyphs[i];
    const path = glyph.getPath(x + cursor, y, size);
    subPaths.push(path.toPathData(2));
    cursor += (glyph.advanceWidth / font.unitsPerEm) * size + tracking;
  }
  return { d: subPaths.join(" "), width: cursor - tracking };
}

function measure(font, text, size) {
  const tracking = size * TRACKING;
  let w = 0;
  const glyphs = font.stringToGlyphs(text);
  for (const g of glyphs) {
    w += (g.advanceWidth / font.unitsPerEm) * size + tracking;
  }
  return w - tracking;
}

const wordmarkSvg = readFileSync(resolve(pub, "Voyfai.svg"), "utf8");
const wordmarkInner = wordmarkSvg
  .replace(/^[\s\S]*?<svg[^>]*>/, "")
  .replace(/<\/svg>\s*$/, "");

const WORDMARK_HEIGHT = 64;
const WORDMARK_VB_W = 435;
const WORDMARK_VB_H = 142;
const wordmarkScale = WORDMARK_HEIGHT / WORDMARK_VB_H;
const wordmarkWidth = WORDMARK_VB_W * wordmarkScale;

const ascent = (adrianna.ascender / adrianna.unitsPerEm) * HEADLINE_SIZE;
const lineHeight = HEADLINE_SIZE * 1.05;

const HAIRLINE_W = 96;
const HAIRLINE_Y = H - PAD - 8;
const lastBaseline = HAIRLINE_Y - 36;
const firstBaseline = lastBaseline - lineHeight * (headline.length - 1);

const lines = headline.map((text, i) => {
  const baseline = firstBaseline + i * lineHeight;
  return textPath(adrianna, text, HEADLINE_SIZE, PAD, baseline);
});

for (const [i, line] of lines.entries()) {
  if (line.width > W - PAD * 2) {
    console.warn(`Line ${i + 1} too wide: ${line.width.toFixed(0)}px > ${W - PAD * 2}px`);
  }
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Voyfai — independent freight forwarders, stronger together">
  <defs>
    <radialGradient id="hazeBright" cx="90%" cy="10%" r="62%" fx="96%" fy="2%">
      <stop offset="0%" stop-color="${TEAL}" stop-opacity="0.62"/>
      <stop offset="22%" stop-color="${TEAL}" stop-opacity="0.34"/>
      <stop offset="55%" stop-color="${TEAL}" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="${TEAL}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="hazeDeep" cx="8%" cy="92%" r="60%" fx="2%" fy="98%">
      <stop offset="0%" stop-color="${TEAL_700}" stop-opacity="0.55"/>
      <stop offset="26%" stop-color="${TEAL_700}" stop-opacity="0.26"/>
      <stop offset="60%" stop-color="${TEAL_700}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${TEAL_700}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <rect width="${W}" height="${H}" fill="url(#hazeDeep)"/>
  <rect width="${W}" height="${H}" fill="url(#hazeBright)"/>
  <g transform="translate(${PAD} ${PAD}) scale(${wordmarkScale})">
    ${wordmarkInner}
  </g>
  ${lines.map((l) => `<path d="${l.d}" fill="${WHITE}"/>`).join("\n  ")}
  <rect x="${PAD}" y="${HAIRLINE_Y}" width="${HAIRLINE_W}" height="1" fill="${TEAL}"/>
</svg>
`;

writeFileSync(resolve(pub, "og-image.svg"), svg);

await sharp(Buffer.from(svg), { density: 300 })
  .resize(W, H)
  .png({ compressionLevel: 9 })
  .toFile(resolve(pub, "og-image.png"));

console.log(`✓ og-image.png  ${W}×${H}`);
console.log(`✓ og-image.svg`);

const faviconSvg = readFileSync(resolve(pub, "favicon.svg"));

for (const size of [16, 32]) {
  await sharp(faviconSvg, { density: 384 })
    .resize(size, size, { kernel: "lanczos3" })
    .png({ compressionLevel: 9 })
    .toFile(resolve(pub, `favicon-${size}x${size}.png`));
  console.log(`✓ favicon-${size}x${size}.png`);
}
