// AGENT.md §3.2 deviation, authorized by Elie on 2026-04-28.
// The OG image background uses a two-source teal mesh (radial duotone),
// which §3.2 lists as a "firable offense." Approved on the basis that
// the OG asset is shown once per share and is the brand's single allowed
// "radial teal haze" moment, here pushed to two stops at the user's
// explicit direction. Do not extend this pattern to other surfaces.
//
// 2026-06-10: composition centered (was left-aligned) and the headline
// re-wrapped to 3 phrase-clean lines, so the card survives the square
// center-crop that Apple/iMessage-style rich-link previews apply. The
// central 630px safe zone now holds the wordmark + full headline; the
// hazes were pulled inward so the cropped square isn't flat dark green.

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

const adrianna = opentype.loadSync(resolve(pub, "AdriannaExtended-Bold.ttf"));

// 3-line wrap keeps each phrase whole AND fits the central 630px square
// crop (safe text width ~550px). Each line measures ≤ 516px at 48px.
const headline = ["Independent", "freight forwarders,", "stronger together."];
const HEADLINE_SIZE = 48;
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

const CX = W / 2;
const capHeight =
  ((adrianna.tables.os2 && adrianna.tables.os2.sCapHeight) ||
    adrianna.unitsPerEm * 0.7) /
  adrianna.unitsPerEm *
  HEADLINE_SIZE;
const lineHeight = HEADLINE_SIZE * 1.1;

// Center-crop safe zone: rich-link previews crop to the central H×H (630px)
// square, so warn if any line would spill past ~550px of usable width there.
const SAFE_W = 550;

// Vertical rhythm, top-to-bottom: wordmark, gap, 3 headline lines, gap, hairline.
const GAP_WORDMARK = 52;
const GAP_HAIRLINE = 40;
const HAIRLINE_W = 96;
const HAIRLINE_H = 2;

const headlineBlockH = capHeight + lineHeight * (headline.length - 1);
const blockH =
  WORDMARK_HEIGHT + GAP_WORDMARK + headlineBlockH + GAP_HAIRLINE + HAIRLINE_H;
const blockTop = (H - blockH) / 2;

const wordmarkX = CX - wordmarkWidth / 2;
const wordmarkY = blockTop;

const firstBaseline = blockTop + WORDMARK_HEIGHT + GAP_WORDMARK + capHeight;
const lines = headline.map((text, i) => {
  const width = measure(adrianna, text, HEADLINE_SIZE);
  const baseline = firstBaseline + i * lineHeight;
  return textPath(adrianna, text, HEADLINE_SIZE, CX - width / 2, baseline);
});

const lastBaseline = firstBaseline + lineHeight * (headline.length - 1);
const HAIRLINE_Y = lastBaseline + GAP_HAIRLINE;

for (const [i, line] of lines.entries()) {
  if (line.width > SAFE_W) {
    console.warn(
      `Line ${i + 1} spills the square safe zone: ${line.width.toFixed(0)}px > ${SAFE_W}px`,
    );
  }
}

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Voyfai — independent freight forwarders, stronger together">
  <defs>
    <radialGradient id="hazeBright" cx="74%" cy="16%" r="60%" fx="84%" fy="6%">
      <stop offset="0%" stop-color="${TEAL}" stop-opacity="0.62"/>
      <stop offset="22%" stop-color="${TEAL}" stop-opacity="0.34"/>
      <stop offset="55%" stop-color="${TEAL}" stop-opacity="0.07"/>
      <stop offset="100%" stop-color="${TEAL}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="hazeDeep" cx="26%" cy="86%" r="58%" fx="16%" fy="96%">
      <stop offset="0%" stop-color="${TEAL_700}" stop-opacity="0.55"/>
      <stop offset="26%" stop-color="${TEAL_700}" stop-opacity="0.26"/>
      <stop offset="60%" stop-color="${TEAL_700}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${TEAL_700}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <rect width="${W}" height="${H}" fill="url(#hazeDeep)"/>
  <rect width="${W}" height="${H}" fill="url(#hazeBright)"/>
  <g transform="translate(${wordmarkX.toFixed(2)} ${wordmarkY.toFixed(2)}) scale(${wordmarkScale})">
    ${wordmarkInner}
  </g>
  ${lines.map((l) => `<path d="${l.d}" fill="${WHITE}"/>`).join("\n  ")}
  <rect x="${(CX - HAIRLINE_W / 2).toFixed(2)}" y="${HAIRLINE_Y.toFixed(2)}" width="${HAIRLINE_W}" height="${HAIRLINE_H}" fill="${TEAL}"/>
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
