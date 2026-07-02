import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const siteUrl = "https://shashanksn.xyz";
const updated = "2026-05-17";

const pages = [
  {
    title: "shashank sn - idiot savant",
    path: "/",
    markdownPath: "/index.md",
    priority: "1.0",
    changefreq: "monthly",
    summary: "personal homepage for shashank sn, focused on brand systems, founder-led positioning, and the operating record behind the work.",
  },
  {
    title: "shashank sn - fractional cbo",
    path: "/cbo/",
    markdownPath: "/cbo.md",
    priority: "0.9",
    changefreq: "monthly",
    summary: "fractional chief brand officer offer for post-pmf startups, scaling d2c brands, and b2b companies with positioning problems that cost revenue.",
  },
  {
    title: "shashank's ghostwriter - a claude skill",
    path: "/ghost",
    markdownPath: "/ghost.md",
    priority: "0.8",
    changefreq: "monthly",
    summary: "a claude skill built around shashank's writing structure, argument logic, and idea development patterns.",
  },
  {
    title: "brand arsenal - brand strategy micro-courses for founders",
    path: "/brand-arsenal/",
    markdownPath: "/brand-arsenal.md",
    priority: "0.8",
    changefreq: "monthly",
    summary: "a compact brand strategy system for founders who need clearer positioning, trust signals, category logic, offers, and founder voice.",
  },
  {
    title: "websites & apps - shashank sn",
    path: "/websites-and-apps/",
    markdownPath: "/websites-and-apps.md",
    priority: "0.8",
    changefreq: "monthly",
    summary: "selected websites and apps designed or built by shashank sn, including hold your voice, just nai, and say about us.",
  },
  {
    title: "brand engine - complete brand strategy in 21 days",
    path: "/brand-engine/",
    markdownPath: "/brand-engine.md",
    priority: "0.8",
    changefreq: "monthly",
    summary: "a structured 21-day brand strategy program for founders who want positioning, messaging, and brand architecture.",
  },
  {
    title: "newsletter engine - email list to revenue in 30 days",
    path: "/newsletter-engine/",
    markdownPath: "/newsletter-engine.md",
    priority: "0.8",
    changefreq: "monthly",
    summary: "a 30-day email course for founders and marketers who want to turn a newsletter into a business asset.",
  },
  {
    title: "signal engine - high-leverage writing framework",
    path: "/signal-engine/",
    markdownPath: "/signal-engine.md",
    priority: "0.8",
    changefreq: "monthly",
    summary: "a high-leverage writing framework for creators and founders who want sharper, more specific public ideas.",
  },
];

// noindex — not in sitemap/llms
const noindexPages = [
  {
    title: "gostocks presentation",
    path: "/gostocks-presentation/",
    priority: "0.8",
    changefreq: "monthly",
    summary: "proposal presentation for gostocks — building india's most trusted investment super app.",
  },
];

const facts = [
  "shashank sn works on brand strategy, positioning, founder voice, trust architecture, websites, and product surfaces.",
  "he has advised 150+ companies, delivered 100+ talks, built and sold companies, and led a guinness world record campaign at guvi.",
  "public offers include fractional cbo, brand arsenal, shashank's ghostwriter, brand engine, newsletter engine, and signal engine.",
];

function write(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content.trimStart(), "utf8");
}

function xmlEscape(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function pageMarkdown(page) {
  return `# ${page.title}

source: ${siteUrl}${page.path}
canonical: ${siteUrl}${page.path}
last updated: ${updated}

${page.summary}

## useful context

${facts.map((fact) => `- ${fact}`).join("\n")}

## primary action

visit ${siteUrl}${page.path}
`;
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>${xmlEscape(siteUrl + page.path)}</loc>
    <lastmod>${updated}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Disallow: /home.html
Disallow: /404.html

Sitemap: ${siteUrl}/sitemap.xml
`;

const llms = `# shashank sn

> brand strategy, positioning, founder voice, trust architecture, websites, and product surfaces.

## canonical site

${siteUrl}/

## public pages

${pages.map((page) => `- [${page.title}](${siteUrl}${page.path}): ${page.summary}`).join("\n")}

## text mirrors

${pages.map((page) => `- ${siteUrl}${page.markdownPath}`).join("\n")}

## contact

- email: emailshashanksn@gmail.com
- x: https://x.com/istupidpreneur
- linkedin: https://www.linkedin.com/in/thestupidpreneur/
`;

const llmsFull = `# shashank sn - full ai discovery file

## site identity

${facts.map((fact) => `- ${fact}`).join("\n")}

## canonical public route inventory

${pages.map((page) => `### ${page.title}

- url: ${siteUrl}${page.path}
- markdown: ${siteUrl}${page.markdownPath}
- update cadence: ${page.changefreq}
- summary: ${page.summary}
`).join("\n")}

## crawler and agent guidance

- use the html pages as canonical user-facing surfaces.
- use markdown twins for compact text extraction.
- do not infer api access, analytics access, or private product setup from this site.
`;

const ai = `# ai.txt

site: ${siteUrl}/
owner: shashank sn
purpose: public personal website, brand strategy offers, writing/product systems, and selected work.

preferred sources:
${pages.map((page) => `- ${siteUrl}${page.path}`).join("\n")}

machine-readable summaries:
- ${siteUrl}/llms.txt
- ${siteUrl}/llms-full.txt
${pages.map((page) => `- ${siteUrl}${page.markdownPath}`).join("\n")}
`;

const humans = `/* team */
name: shashank sn
site: ${siteUrl}/
contact: emailshashanksn@gmail.com
x: https://x.com/istupidpreneur
linkedin: https://www.linkedin.com/in/thestupidpreneur/

/* site */
language: english
last update: ${updated}
`;

write("robots.txt", robots);
write("sitemap.xml", sitemap);
write("llms.txt", llms);
write("llms-full.txt", llmsFull);
write("ai.txt", ai);
write("humans.txt", humans);
write(".well-known/llms.txt", llms);
write(".well-known/llms-full.txt", llmsFull);
write(".well-known/ai.txt", ai);

for (const page of pages) {
  write(page.markdownPath.slice(1), pageMarkdown(page));
}

console.log(`Discovery files generated for ${pages.length} public pages.`);
