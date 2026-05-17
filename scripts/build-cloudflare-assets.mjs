import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";

const outputDir = "cloudflare/dist";
const publicPaths = [
  ".well-known",
  "_headers",
  "_redirects",
  "brand-arsenal",
  "brand-engine",
  "cbo",
  "ghost.html",
  "home.html",
  "hold your voice.png",
  "index.html",
  "just nai.png",
  "menta-site.css",
  "newsletter-engine",
  "robots.txt",
  "say about us.png",
  "security.txt",
  "shashank-cutout.png",
  "signal-engine",
  "sitemap.xml",
  "websites-and-apps",
];

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

for (const path of publicPaths) {
  if (!existsSync(path)) {
    throw new Error(`Missing public path: ${path}`);
  }
  const target = join(outputDir, path);
  mkdirSync(dirname(target), { recursive: true });
  cpSync(path, target, { recursive: true });
}

console.log(`Cloudflare assets written to ${outputDir}/ with ${publicPaths.length} public entries.`);
