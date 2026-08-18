<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
  <xsl:output method="html" encoding="UTF-8" />
  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>sitemap · shashank sn</title>
        <style>
          :root { color-scheme: dark; --ink: #090a0b; --panel: #111315; --line: #2b2e31; --muted: #969ba3; --paper: #f1eee7; --amber: #f4b44b; }
          * { box-sizing: border-box; }
          body { margin: 0; min-width: 320px; background: var(--ink); color: var(--paper); font: 16px/1.5 ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
          main { width: min(1120px, calc(100% - 40px)); margin: 0 auto; padding: 72px 0 88px; }
          header { display: flex; justify-content: space-between; align-items: end; gap: 24px; padding-bottom: 34px; border-bottom: 1px solid var(--line); }
          .eyebrow { margin: 0 0 12px; color: var(--amber); font-size: 12px; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; }
          h1 { margin: 0; max-width: 700px; font-size: clamp(42px, 7vw, 78px); line-height: .92; letter-spacing: -.065em; }
          .count { margin: 0; color: var(--muted); text-align: right; font-size: 15px; }
          .count strong { display: block; color: var(--paper); font-size: 42px; line-height: 1; letter-spacing: -.05em; }
          .table { margin-top: 28px; overflow: hidden; border: 1px solid var(--line); border-radius: 18px; background: var(--panel); }
          .row { display: grid; grid-template-columns: minmax(0, 1fr) 132px 116px; gap: 20px; align-items: center; padding: 17px 22px; border-bottom: 1px solid var(--line); }
          .row:last-child { border-bottom: 0; }
          .row.head { color: var(--muted); font-size: 12px; letter-spacing: .1em; text-transform: uppercase; background: #17191b; }
          a { color: var(--paper); text-decoration: none; overflow-wrap: anywhere; }
          a:hover { color: var(--amber); }
          .date, .freq { color: var(--muted); font-size: 14px; }
          footer { margin-top: 22px; color: var(--muted); font-size: 14px; }
          @media (max-width: 680px) {
            main { width: min(100% - 28px, 560px); padding: 42px 0 56px; }
            header { display: block; }
            .count { margin-top: 22px; text-align: left; }
            .count strong { display: inline; margin-right: 8px; font-size: 30px; }
            .row { grid-template-columns: 1fr; gap: 4px; padding: 16px; }
            .row.head { display: none; }
            .date::before { content: "updated · "; color: var(--muted); }
            .freq::before { content: "cadence · "; color: var(--muted); }
          }
        </style>
      </head>
      <body>
        <main>
          <header>
            <div><p class="eyebrow">shashank sn · index</p><h1>everything worth finding.</h1></div>
            <p class="count"><strong><xsl:value-of select="count(s:urlset/s:url)" /></strong> public routes</p>
          </header>
          <section class="table" aria-label="site routes">
            <div class="row head"><span>url</span><span>updated</span><span>cadence</span></div>
            <xsl:for-each select="s:urlset/s:url">
              <div class="row">
                <a href="{s:loc}"><xsl:value-of select="s:loc" /></a>
                <span class="date"><xsl:value-of select="s:lastmod" /></span>
                <span class="freq"><xsl:value-of select="s:changefreq" /></span>
              </div>
            </xsl:for-each>
          </section>
          <footer>machine-readable source: sitemap.xml · human-readable view for shashanksn.xyz</footer>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
