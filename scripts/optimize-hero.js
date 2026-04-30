import sharp from "sharp";
import { mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, "../src/assets/Voyfai-hero.jpg");
const OUT = resolve(__dirname, "../public/hero");

const variants = [
  { width: 1280, format: "avif", quality: 32 },
  { width: 1920, format: "avif", quality: 30 },
  { width: 2560, format: "avif", quality: 28 },
  { width: 1280, format: "webp", quality: 58 },
  { width: 1920, format: "webp", quality: 55 },
  { width: 2560, format: "webp", quality: 52 },
  { width: 1920, format: "jpg",  quality: 70 },
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
