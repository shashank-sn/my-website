# shashank sn — personal website

Minimal dark-themed personal website for [shashanksn.xyz](https://shashanksn.xyz). Five pages, one design system, built with vanilla HTML/CSS/JS.

## pages

- **/** — hero logo with FAQ cards (idiot savant, brand, cbo, newsletter, ventures, contact)
- **/cbo/** — fractional chief brand officer offering (4-quadrant layout)
- **/ghost** — claude ghostwriter skill product page
- **/websites-and-apps/** — shipped product portfolio
- **/opensource/** — open source projects from github
- **/404** — custom 404 page

## tech

- vanilla HTML + CSS + JS, zero frameworks
- Google Sans via Fontsource CDN
- dark theme with accent colours (amber, sky, mint, plum, rose)
- responsive with burger menu on mobile
- shadow-based borders, scale-on-press, staggered reveals
- Cloudflare Pages+Workers for SSR/hosting

## local development

```
open index.html
```

No build step. Open directly in a browser.

## deploy

```
npx wrangler deploy
```

The `cloudflare/worker.mjs` handles HTTPS redirects and security headers. Assets served via Cloudflare Pages under `cloudflare/dist/`.

## structure

```
├── index.html
├── ghost.html
├── 404.html
├── cbo/index.html
├── websites-and-apps/index.html
├── opensource/index.html
├── cloudflare/worker.mjs
├── wrangler.jsonc
├── sitemap.xml
├── favicon.png / favicon.svg
├── hero-thumbnail.svg / hero-cropped.svg
└── *.png (images)
```
