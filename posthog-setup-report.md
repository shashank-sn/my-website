# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into shashanksn.xyz — a personal brand website for Shashank SN. PostHog is initialized via a shared `posthog-init.js` script (using window globals set by a generated `posthog-config.js`, produced from `.env` by running `node scripts/build-posthog-config.js`). Thirteen custom events were instrumented across 12 HTML files covering every major conversion and engagement surface: the CBO consulting funnel, three paid product pages, the Brand Arsenal micro-course library, and the homepage.

| Event | Description | File(s) |
|---|---|---|
| `cbo_page_viewed` | User views the Fractional CBO service page — top of consulting funnel | `cbo/index.html` |
| `cbo_call_clicked` | User clicks "schedule a free discovery call" — primary conversion for consulting | `cbo/index.html` |
| `product_page_viewed` | User views a paid product page (Brand Engine, Newsletter Engine, Signal Engine) | `brand-engine/index.html`, `newsletter-engine/index.html`, `signal-engine/index.html` |
| `brand_engine_checkout_clicked` | User clicks the $497 Brand Engine checkout CTA | `brand-engine/index.html` |
| `newsletter_engine_checkout_clicked` | User clicks the $197 Newsletter Engine checkout CTA | `newsletter-engine/index.html` |
| `signal_engine_checkout_clicked` | User clicks the $497 Signal Engine checkout CTA | `signal-engine/index.html` |
| `brand_arsenal_purchase_clicked` | User clicks the $39 Brand Arsenal purchase CTA | `brand-arsenal/index.html` |
| `free_course_started` | User clicks a free course link from the Brand Arsenal page | `brand-arsenal/index.html` |
| `free_course_viewed` | User views a free course page — top of free→paid funnel | `brand-arsenal/free-1.html` – `free-5.html` |
| `nav_hire_cta_clicked` | User clicks "hire me as fractional cbo →" in the homepage nav | `index.html` |
| `social_link_clicked` | User clicks X, LinkedIn, or email in the homepage connect section | `index.html` |
| `external_project_link_clicked` | User clicks a link to sayabout.us or holdyourvoice.com | `index.html` |
| `faq_item_opened` | User opens a FAQ accordion item on a product page | `brand-engine/index.html` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics:** https://us.posthog.com/project/373457/dashboard/1442322
- **CBO Discovery Call Funnel** (`cbo_page_viewed` → `cbo_call_clicked`): https://us.posthog.com/project/373457/insights/wGFLQdzu
- **Product Page to Checkout Funnel** (`product_page_viewed` → checkout clicked): https://us.posthog.com/project/373457/insights/zB0xjNh7
- **Free-to-Paid Brand Arsenal Funnel** (`free_course_viewed` → `free_course_started` → `brand_arsenal_purchase_clicked`): https://us.posthog.com/project/373457/insights/ePBVeKVU
- **Checkout Clicks by Product** (daily trend across all 4 products): https://us.posthog.com/project/373457/insights/14a3wgrC
- **Homepage Engagement Trend** (hire CTA, social links, project links): https://us.posthog.com/project/373457/insights/hmgFpI3D

### Before deploying

Run `node scripts/build-posthog-config.js` to generate `posthog-config.js` from `.env`. This file is gitignored — regenerate it on each environment before building Cloudflare assets.

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/integration-javascript_web/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.
