# shashanksn.xyz

personal website and portfolio of [shashank sn](https://shashanksn.xyz). built with vanilla html/css/js, deployed on cloudflare pages + workers.

## pages

| path | description |
|---|---|
| `/` | home — hero logo + faq accordion |
| `/cbo/` | fractional chief brand officer offer |
| `/ghost` | claude ghostwriter skill product |
| `/websites-and-apps/` | shipped product portfolio |
| `/opensource/` | open source projects |
| `/holdyourvoice/` | responsive hold your voice open-source landing page |
| `/thoughts/` | editorial index for shashank’s writing and case studies |
| `/thoughts/inside-guvis-two-guinness-world-records-strategy/` | GUVI brand strategy case study |
| `/thoughts/*/` | eight articles generated into one consistent grid from `thoughts/posts.json` |

## tech

- **zero frameworks.** vanilla html/css/js. no build step for local dev.
- **google sans** via fontsource cdn (variable weight 400–700).
- **dark theme** with accent colors (amber, sky, mint, plum, rose).
- **scroll-reveal** via intersection observer.
- **responsive** with a single breakpoint at 680px.
- **hosting** cloudflare pages + workers (wrangler).

## local dev

open any `.html` file directly in a browser — no server needed.

```bash
open index.html
open websites-and-apps/index.html
```

## deploy

```bash
npx wrangler deploy
```

the build script copies the public directory to `cloudflare/dist/` and deploys via wrangler. a cloudflare worker handles https redirects and security headers.

## structure

```
.
├── index.html               # homepage
├── 404.html                 # custom 404
├── ghost.html               # ghostwriter service page
├── menta-site.css           # global design system
├── _headers                 # security + content-type headers
├── _redirects               # http→https 301s
├── sitemap.xml              # search index
├── websites-and-apps/       # portfolio page
│   ├── index.html
│   ├── just-nai.png
│   └── happy-beginnings.png
├── cbo/                     # fractional cbo offer page
│   └── index.html
├── opensource/              # open source projects
│   └── index.html
├── holdyourvoice/            # hold your voice project page
│   └── index.html
├── thoughts/                 # manifest, publishing guide, thumbnails, and published posts
│   ├── index.html
│   └── inside-guvis-two-guinness-world-records-strategy/
├── brand-arsenal/           # brand arsenal offer
├── brand-engine/            # brand engine offer
├── newsletter-engine/       # newsletter engine offer
├── signal-engine/           # signal engine offer
├── cloudflare/
│   ├── worker.mjs           # cf worker: https + security headers
│   └── dist/                # build output (gitignored)
├── scripts/
│   ├── build-cloudflare-assets.mjs
│   └── generate-discovery.mjs
└── wrangler.jsonc           # cloudflare config
```

## license

mit — see [license](license) (if applicable).
