import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";

const outputDir = "cloudflare/dist";
const publicPaths = [
  ".well-known",
  "404.html",
  "_headers",
  "_redirects",
  "favicon.png",
  "favicon.svg",
  "hero-ascii.svg",
  "logo-s.svg",
  "thumbnail.png",
  "brand-engine",
  "brand-engine.md",
  "cbo",
  "cbo.md",
  "ghost.html",
  "ghost.md",
  "home.html",
  "hold your voice.png",
  "holdyourvoice",
  "humans.txt",
  "ai.txt",
  "index.html",
  "index.md",
  "just nai.png",
  "llms.txt",
  "llms-full.txt",
  "menta-site.css",
  "newsletter-engine",
  "newsletter-engine.md",
  "opensource",
  "robots.txt",
  "say about us.png",
  "security.txt",
  "shashank-cutout.png",
  "signal-engine",
  "signal-engine.md",
  "sitemap.xml",
  "thoughts",
  "websites-and-apps",
  "websites-and-apps.md",
  "gostocks-presentation",
  "tata-aia",
  "proposal",
];

execFileSync(process.execPath, ["scripts/generate-discovery.mjs"], { stdio: "inherit" });

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
