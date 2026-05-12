/**
 * Web hero from existing Planet PNG (no AI). Use when GEMINI_API_KEY is not set.
 * npm run sharp:planet-hero
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "public/images/products/photobutane-lighter-planet.png");
const out = path.join(root, "public/images/products/photobutane-lighter-planet-hero.webp");

const buf = await sharp(src)
  .resize({ width: 1400, height: 1750, fit: "cover", position: "centre" })
  .modulate({ saturation: 1.05, brightness: 1.02 })
  .sharpen({ sigma: 0.8 })
  .webp({ quality: 86, effort: 6 })
  .toBuffer();

fs.writeFileSync(out, buf);
console.log("Wrote", path.relative(root, out), `(${(buf.length / 1024).toFixed(1)} KB)`);
