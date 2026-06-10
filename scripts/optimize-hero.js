import sharp from "sharp";
import { mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, "../src/assets/Voyfai-hero-ship.png");
const OUT = resolve(__dirname, "../public/hero");

// Source is now 3010px wide, so 1920/2560 render at true width (no capping).
// Quality raised from the old overlay-hides-it lows to proper hero fidelity;
// taper by width keeps the largest files in check. AVIF is what modern
// browsers actually fetch — WebP/JPG are progressively older fallbacks.
const variants = [
  { width: 1280, format: "avif", quality: 52 },
  { width: 1920, format: "avif", quality: 50 },
  { width: 2560, format: "avif", quality: 48 },
  { width: 1280, format: "webp", quality: 82 },
  { width: 1920, format: "webp", quality: 80 },
  { width: 2560, format: "webp", quality: 78 },
  { width: 1920, format: "jpg",  quality: 84 },
];

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const base = sharp(SRC).rotate();

await Promise.all(
  variants.map(async ({ width, format, quality }) => {
    const out = resolve(OUT, `hero-${width}.${format}`);
    const pipeline = base.clone().resize({ width, withoutEnlargement: true });
    if (format === "avif") await pipeline.avif({ quality, effort: 9 }).toFile(out);
    else if (format === "webp") await pipeline.webp({ quality, effort: 6 }).toFile(out);
    else await pipeline.jpeg({ quality, progressive: true, mozjpeg: true }).toFile(out);
    const { size } = await sharp(out).metadata().then(() => import("node:fs/promises").then(fs => fs.stat(out)));
    console.log(`  ${format.padEnd(4)} ${String(width).padStart(4)}w  ${(size / 1024).toFixed(1).padStart(7)} KB`);
  })
);

console.log(`\n✓ wrote ${variants.length} variants to public/hero/`);
