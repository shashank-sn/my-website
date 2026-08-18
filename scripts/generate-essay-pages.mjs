import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";

const sourceDir = "thoughts/drafts";
const siteUrl = "https://shashanksn.xyz";

function esc(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function parse(file) {
  const raw = readFileSync(file, "utf8");
  const [, frontmatter, body] = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? [];
  if (!frontmatter) throw new Error(`Missing frontmatter: ${file}`);
  const meta = Object.fromEntries(frontmatter.split("\n").map((line) => {
    const index = line.indexOf(":");
    return [line.slice(0, index).trim(), line.slice(index + 1).trim()];
  }));
  return { ...meta, body: body.trim() };
}

function renderBody(body) {
  return body.split(/\n\s*\n/).map((block) => {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    if (!lines.length) return "";
    if (lines[0].startsWith("> ")) return `<blockquote class="pull"><p>${esc(lines.join(" ").replace(/^> /, ""))}</p></blockquote>`;
    if (lines.every((line) => /^\d+\. /.test(line))) {
      return `<ol class="principles">${lines.map((line) => {
        const [, number, text] = line.match(/^(\d+)\. (.*)$/);
        const parts = text.split(" — ");
        return `<li><b>${number.padStart(2, "0")}</b><span>${parts.length > 1 ? `<strong>${esc(parts.shift())}.</strong> ${esc(parts.join(" — "))}` : esc(text)}</span></li>`;
      }).join("")}</ol>`;
    }
    if (lines[0].startsWith("## ")) return `<h2>${esc(lines[0].slice(3))}</h2>${lines.slice(1).map((line) => `<p>${esc(line)}</p>`).join("")}`;
    return `<p>${esc(lines.join(" "))}</p>`;
  }).join("\n      ");
}

function html(post) {
  const imageStem = post.image.replace(/\.webp$/, "");
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${esc(post.title)} - shashank sn</title>
  <meta name="description" content="${esc(post.dek)}">
  <link rel="canonical" href="${siteUrl}/thoughts/${post.slug}/">
  <link rel="icon" type="image/svg+xml" href="../../favicon.svg">
  <link rel="stylesheet" href="../site.css?v=20260810-3">
  <link rel="stylesheet" href="../layout.css">
  <link rel="stylesheet" href="../collection.css?v=20260810-3">
</head>
<body>
  <a class="skip" href="#article">skip to article</a>
  <header class="wrap nav"><a class="wordmark" href="../../index.html">shashank <span>sn</span></a><a class="nav-link" href="../index.html">← thoughts</a></header>
  <main>
    <header class="wrap article-hero">
      <p class="eyebrow">${esc(post.type)}</p>
      <h1 class="article-title">${esc(post.title)}</h1>
      <p class="article-dek">${esc(post.dek)}</p>
      <div class="article-meta"><time datetime="${esc(post.date)}">${esc(post.dateLabel)}</time><span>by shashank sn</span><span>·</span><span>${esc(post.readTime)}</span></div>
    </header>
    <figure class="story-cover"><img src="../images/${esc(post.image)}" srcset="../images/${esc(imageStem)}-480.webp 480w, ../images/${esc(imageStem)}-960.webp 960w, ../images/${esc(post.image)} 1440w" sizes="(max-width: 720px) calc(100vw - 44px), (max-width: 980px) calc(100vw - 96px), 960px" width="1440" height="960" alt="${esc(post.imageAlt)}"></figure>
    <article class="wrap article" id="article">
      ${renderBody(post.body)}
      <div class="story-source">adapted from a newsletter first published on ${esc(post.dateLabel)}. promotional material and unsupported claims were removed; the argument and reported details were rebuilt for this site.</div>
    </article>
  </main>
  <footer class="wrap footer"><span>say something obvious. then build it.</span><a href="../index.html">all thoughts →</a></footer>
</body>
</html>
`;
}

if (!existsSync(sourceDir)) throw new Error(`Missing ${sourceDir}`);
for (const file of readdirSync(sourceDir).filter((name) => name.endsWith(".md"))) {
  const post = parse(`${sourceDir}/${file}`);
  const dir = `thoughts/${post.slug}`;
  mkdirSync(dir, { recursive: true });
  writeFileSync(`${dir}/index.html`, html(post), "utf8");
  console.log(`generated ${dir}/index.html`);
}
