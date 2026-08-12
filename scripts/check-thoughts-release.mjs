import { existsSync, readFileSync, readdirSync } from "node:fs";

const posts = JSON.parse(readFileSync("thoughts/posts.json", "utf8"));
const index = readFileSync("thoughts/index.html", "utf8");
const sitemap = readFileSync("sitemap.xml", "utf8");
const llms = readFileSync("llms.txt", "utf8");
const required = ["slug", "title", "date", "dateLabel", "updated", "type", "readTime", "dek", "cta", "image", "imageAlt", "summary"];
const seen = new Set();

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(posts.length > 0, "thoughts/posts.json must contain at least one post");

for (const post of posts) {
  assert(!seen.has(post.slug), `Duplicate thought slug: ${post.slug}`);
  seen.add(post.slug);
  for (const field of required) assert(post[field], `${post.slug} is missing ${field}`);

  const imageStem = post.image.replace(/\.webp$/, "");
  const articlePath = `thoughts/${post.slug}/index.html`;
  const mirrorPath = `thoughts/${post.slug}.md`;
  const article = readFileSync(articlePath, "utf8");
  const publicUrl = `https://shashanksn.xyz/thoughts/${post.slug}/`;

  for (const path of [
    articlePath,
    mirrorPath,
    `thoughts/images/${post.image}`,
    `thoughts/images/${imageStem}-480.webp`,
    `thoughts/images/${imageStem}-960.webp`,
    `cloudflare/dist/${articlePath}`,
    `cloudflare/dist/${mirrorPath}`,
    `cloudflare/dist/thoughts/images/${post.image}`,
    `cloudflare/dist/thoughts/images/${imageStem}-480.webp`,
    `cloudflare/dist/thoughts/images/${imageStem}-960.webp`,
  ]) assert(existsSync(path), `Missing thoughts release asset: ${path}`);

  assert(index.includes(`href="${post.slug}/"`), `Thoughts index is missing ${post.slug}`);
  assert(index.includes(`${imageStem}-480.webp 480w`), `Thoughts index is missing the 480w source for ${post.slug}`);
  const canonical = article.match(/<link\s+rel="canonical"\s+href=\s*"([^"]+)"/s)?.[1];
  assert(canonical === publicUrl, `Canonical URL drifted for ${post.slug}`);
  assert(article.includes(`${imageStem}-480.webp 480w`), `Article is missing the 480w source for ${post.slug}`);
  assert(article.includes(`${imageStem}-960.webp 960w`), `Article is missing the 960w source for ${post.slug}`);
  assert(article.includes("collection.css?v=20260810-3"), `Article stylesheet version drifted for ${post.slug}`);
  const sitemapBlock = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)]
    .map((match) => match[1])
    .find((block) => block.includes(`<loc>${publicUrl}</loc>`));
  assert(sitemapBlock, `Sitemap is missing ${post.slug}`);
  assert(sitemapBlock.includes(`<lastmod>${post.updated}</lastmod>`), `Sitemap has the wrong update date for ${post.slug}`);
  assert(llms.includes(publicUrl), `llms.txt is missing ${post.slug}`);
  assert(llms.includes(`${publicUrl.slice(0, -1)}.md`), `llms.txt is missing the text mirror for ${post.slug}`);
}

assert((index.match(/class="story-card"/g) ?? []).length === posts.length, "Thoughts card count does not match the manifest");
assert(existsSync("thoughts.md"), "Generated thoughts.md is missing");
assert(existsSync("cloudflare/dist/thoughts.md"), "Cloudflare bundle is missing thoughts.md");

const sitemapUrls = [...sitemap.matchAll(/<loc>https:\/\/shashanksn\.xyz([^<]+)<\/loc>/g)].map((match) => match[1]);
for (const publicPath of sitemapUrls) {
  const markdownPath = publicPath === "/"
    ? "index.md"
    : publicPath.startsWith("/thoughts/") && publicPath !== "/thoughts/"
      ? `${publicPath.slice(1, -1)}.md`
      : `${publicPath.slice(1).replace(/\/$/, "")}.md`;
  assert(existsSync(markdownPath), `Sitemap page is missing Markdown twin: ${markdownPath}`);
  assert(existsSync(`cloudflare/dist/${markdownPath}`), `Cloudflare bundle is missing Markdown twin: ${markdownPath}`);
}

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = `${dir}/${entry.name}`;
    return entry.isDirectory() ? walk(path) : [path];
  });
}

for (const htmlPath of walk("cloudflare/dist").filter((path) => path.endsWith(".html"))) {
  const relative = htmlPath.slice("cloudflare/dist/".length);
  const markdownRelative = relative === "index.html"
    ? "index.md"
    : relative.endsWith("/index.html")
      ? `${relative.slice(0, -"/index.html".length)}.md`
      : relative.replace(/\.html$/, ".md");
  const markdownPath = `cloudflare/dist/${markdownRelative}`;
  assert(existsSync(markdownPath), `Deployed HTML is missing Markdown twin: ${markdownRelative}`);
  assert(readFileSync(markdownPath, "utf8").trim().split(/\s+/).length >= 3, `Markdown twin is empty: ${markdownRelative}`);
}

console.log(`Thoughts release checks passed for ${posts.length} posts.`);
