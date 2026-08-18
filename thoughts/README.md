# thoughts publishing system

`posts.json` is the single source of truth for the thoughts grid, thumbnails, and discovery metadata.

## add a thought

1. create `thoughts/drafts/<slug>.md` with the frontmatter and body contract below.
2. add one 3:2 thumbnail family to `thoughts/images/<descriptive-name>.webp`.
3. add the post to `thoughts/posts.json` in the order it should appear.
4. run `node scripts/build-cloudflare-assets.mjs`.

`scripts/generate-essay-pages.mjs` turns draft markdown into the shared article
shell. `scripts/generate-discovery.mjs` then creates the full-content `.md`
mirror at the public route, so agents and people read the same page.

Draft frontmatter fields are `slug`, `title`, `date`, `dateLabel`, `type`,
`readTime`, `dek`, `image`, and `imageAlt`. Use `##` headings, paragraphs,
`>` pull quotes, and numbered principles for the body.

The build stops when an article, required field, or thumbnail is missing. It generates the text mirror, thoughts index, sitemap, llms files, and Cloudflare bundle.

## card contract

Every card uses the same structure and dimensions. Keep featured cards, wide cards, manual spans, and one-off styles out of this grid.

Required manifest fields:

- `slug`, `title`, `date`, `dateLabel`, and `updated`
- `type`, `readTime`, `dek`, and `cta`
- `image`, `imageAlt`, and `summary`

Visible copy stays lowercase except for names that must remain uppercase, such as `GUVI` and `HCL`.

## thumbnail contract

- source ratio: horizontal 3:2
- project output: 1440 × 960 webp
- responsive outputs: 480 × 320 and 960 × 640 webp
- target size: under 200 kb when possible
- palette: black, charcoal, warm off-white, one restrained amber accent
- treatment: monochrome editorial photography, tactile paper collage, visible grain
- composition: one clear subject, safe crop on every edge
- exclude: readable text, logos, watermarks, glossy stock-photo styling, fake interfaces

Shared image-generation prompt:

```text
Use case: stylized-concept
Asset type: horizontal 3:2 blog thumbnail for shashanksn.xyz/thoughts
Primary request: [the concrete scene or metaphor for this article]
Style/medium: tactile monochrome editorial photography mixed with restrained cut-paper collage and visible film grain
Composition/framing: strong single focal point with crop safety on every edge
Lighting/mood: black, charcoal, warm off-white, one restrained amber accent
Constraints: no readable text, no logos, no watermark, no glossy corporate stock-photo look
```

Convert the chosen source with:

```bash
cwebp -quiet -q 82 -resize 1440 960 source.png -o thoughts/images/<descriptive-name>.webp
cwebp -quiet -q 82 -resize 480 320 source.png -o thoughts/images/<descriptive-name>-480.webp
cwebp -quiet -q 82 -resize 960 640 source.png -o thoughts/images/<descriptive-name>-960.webp
```

## article cover contract

Use the same thumbnail inside the article. The layout crops it to 16:9, caps it at 960px, and keeps 48px tablet gutters and 22px mobile gutters.

```html
<figure class="story-cover">
  <img src="../images/<descriptive-name>.webp" width="1440" height="960" alt="<plain description>">
</figure>
```

Every article must load `site.css`, `layout.css`, and `collection.css` in that order.
