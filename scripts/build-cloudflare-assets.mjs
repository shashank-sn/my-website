import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";

const outputDir = "cloudflare/dist";
const siteUrl = "https://shashanksn.xyz";
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
  "holdyourvoice.md",
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
  "opensource.md",
  "robots.txt",
  "say about us.png",
  "security.txt",
  "shashank-cutout.png",
  "signal-engine",
  "signal-engine.md",
  "sitemap.xml",
  "sitemap.xsl",
  "thoughts",
  "thoughts.md",
  "websites-and-apps",
  "websites-and-apps.md",
  "gostocks-presentation",
  "tata-aia",
  "proposal",
];

execFileSync(process.execPath, ["scripts/generate-thoughts-index.mjs"], { stdio: "inherit" });
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

function decodeHtml(value) {
  return value
    .replaceAll("&nbsp;", " ").replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"').replaceAll("&#39;", "'").replaceAll("&rsquo;", "’").replaceAll("&lsquo;", "‘")
    .replaceAll("&ldquo;", "“").replaceAll("&rdquo;", "”").replaceAll("&mdash;", "—").replaceAll("&ndash;", "–")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)));
}

function htmlToMarkdown(html, baseUrl) {
  return decodeHtml(html)
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(head|style|script|svg|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => {
      const resolved = href.startsWith("#") ? href : new URL(href, baseUrl).href;
      return `[${label.replace(/<[^>]+>/g, "").trim()}](${resolved})`;
    })
    .replace(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n").replace(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n")
    .replace(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n").replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, "\n- $1")
    .replace(/<blockquote\b[^>]*>([\s\S]*?)<\/blockquote>/gi, "\n> $1\n").replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|section|article|header|footer|figure|ul|ol)>/gi, "\n").replace(/<[^>]+>/g, "")
    .replace(/[ \t]+\n/g, "\n").replace(/\n[ \t]+/g, "\n").replace(/\n{3,}/g, "\n\n").trim();
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}

for (const htmlPath of walk(outputDir).filter((path) => path.endsWith(".html"))) {
  const relative = htmlPath.slice(`${outputDir}/`.length);
  const markdownRelative = relative === "index.html"
    ? "index.md"
    : relative.endsWith("/index.html")
      ? `${relative.slice(0, -"/index.html".length)}.md`
      : relative.replace(/\.html$/, ".md");
  const publicPath = relative === "index.html"
    ? "/"
    : relative.endsWith("/index.html")
      ? `/${relative.slice(0, -"index.html".length)}`
      : `/${relative}`;
  const markdownPath = join(outputDir, markdownRelative);
  mkdirSync(dirname(markdownPath), { recursive: true });
  writeFileSync(markdownPath, `${htmlToMarkdown(readFileSync(htmlPath, "utf8"), `${siteUrl}${publicPath}`)}\n`, "utf8");
}

execFileSync(process.execPath, ["scripts/check-thoughts-release.mjs"], { stdio: "inherit" });
console.log(`Cloudflare assets written to ${outputDir}/ with ${publicPaths.length} public entries.`);
