import { existsSync, readFileSync, writeFileSync } from "node:fs";

const posts = JSON.parse(readFileSync("thoughts/posts.json", "utf8"));

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

for (const post of posts) {
  const required = ["slug", "title", "date", "dateLabel", "updated", "type", "readTime", "dek", "cta", "image", "imageAlt", "summary"];
  for (const field of required) {
    if (!post[field]) throw new Error(`thoughts/posts.json: ${post.slug ?? "post"} is missing ${field}`);
  }
  if (!existsSync(`thoughts/${post.slug}/index.html`)) throw new Error(`Missing article: thoughts/${post.slug}/index.html`);
  if (!existsSync(`thoughts/images/${post.image}`)) throw new Error(`Missing thumbnail: thoughts/images/${post.image}`);
  const imageStem = post.image.replace(/\.webp$/, "");
  for (const width of [480, 960]) {
    if (!existsSync(`thoughts/images/${imageStem}-${width}.webp`)) throw new Error(`Missing responsive thumbnail: thoughts/images/${imageStem}-${width}.webp`);
  }
}

const cards = posts.map((post, index) => {
  const imageStem = post.image.replace(/\.webp$/, "");
  return `        <a class="story-card" href="${escapeHtml(post.slug)}/">
          <div class="card-art"><img src="images/${escapeHtml(post.image)}" srcset="images/${escapeHtml(imageStem)}-480.webp 480w, images/${escapeHtml(imageStem)}-960.webp 960w, images/${escapeHtml(post.image)} 1440w" sizes="(max-width: 720px) calc(100vw - 44px), (max-width: 1200px) calc(50vw - 60px), 504px" alt="${escapeHtml(post.imageAlt)}" width="1440" height="960"${index === 0 ? "" : ' loading="lazy"'}></div>
          <div class="card-body">
            <div class="card-meta"><time datetime="${escapeHtml(post.date)}">${escapeHtml(post.dateLabel)}</time><span>·</span><span>${escapeHtml(post.type)}</span><span>·</span><span>${escapeHtml(post.readTime)}</span></div>
            <h2 class="card-title">${escapeHtml(post.title)}</h2>
            <p class="card-dek">${escapeHtml(post.dek)}</p>
            <span class="card-read">${escapeHtml(post.cta)} <span aria-hidden="true">→</span></span>
          </div>
        </a>`;
}).join("\n");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>thoughts - shashank sn</title>
  <meta name="description" content="notes on brand, business, and the work behind the work by shashank sn.">
  <link rel="canonical" href="https://shashanksn.xyz/thoughts/">
  <link rel="icon" type="image/svg+xml" href="../favicon.svg">
  <link rel="stylesheet" href="site.css?v=20260810-3">
  <link rel="stylesheet" href="layout.css">
  <link rel="stylesheet" href="collection.css?v=20260810-3">
</head>
<body>
  <!-- generated from thoughts/posts.json by scripts/generate-thoughts-index.mjs -->
  <a class="skip" href="#main">skip to content</a>
  <header class="wrap nav">
    <a class="wordmark" href="../index.html">shashank <span>sn</span></a>
    <a class="nav-link" href="../index.html">← home</a>
  </header>
  <main id="main">
    <section class="wrap index-hero">
      <h1 class="display">notes from<br>the inside.</h1>
      <p class="intro">brand work gets cleaner when you stop talking about it from a distance. these are the rooms, bets, and decisions behind the headline.</p>
    </section>
    <section class="wrap stories" aria-label="thoughts">
      <div class="story-grid">
${cards}
      </div>
    </section>
  </main>
  <footer class="wrap footer">
    <span>say something obvious. then build it.</span>
    <a href="https://x.com/istupidpreneur" target="_blank" rel="noopener">follow on x ↗</a>
  </footer>
</body>
</html>
`;

writeFileSync("thoughts/index.html", html, "utf8");
console.log(`Thoughts index generated from ${posts.length} posts.`);
