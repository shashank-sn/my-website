#!/usr/bin/env python3
"""Generate neofetch-style profile SVG for GitHub README."""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASCII_PATH = ROOT / "assets" / "shashank-ascii.txt"
STATS_PATH = ROOT / "assets" / "profile-stats.json"
OUTPUT_PATH = ROOT / "assets" / "profile-neofetch.svg"

DEFAULT_STATS = {
    "hostname": "shashank@sn",
    "os": "macOS, iOS, Linux",
    "uptime": "4 years, 254 days",
    "shell": "Brandeey / Hold Your Voice",
    "kernel": "Brand Strategist & Founder",
    "ide": "Cursor, VS Code",
    "lang_prog": "TypeScript, JavaScript, Python, Swift",
    "lang_markup": "HTML, CSS, JSON, YAML, MDX",
    "lang_human": "English, Tamil",
    "hobby_software": "AI tooling, brand systems, vanilla web",
    "hobby_business": "positioning, newsletters, product building",
    "website": "shashanksn.xyz",
    "linkedin": "thestupidpreneur",
    "twitter": "istupidpreneur",
    "repos": "32",
    "stars": "12",
    "commits": "213",
    "followers": "6",
}

FIELDS = [
    ("OS", "os"),
    ("Uptime", "uptime"),
    ("Shell", "shell"),
    ("Kernel", "kernel"),
    ("IDE", "ide"),
    ("Languages (Programming)", "lang_prog"),
    ("Languages (Markup)", "lang_markup"),
    ("Languages (Human)", "lang_human"),
    ("Hobbies (Software)", "hobby_software"),
    ("Hobbies (Business)", "hobby_business"),
    ("Contact", None),
    ("  Website", "website"),
    ("  LinkedIn", "linkedin"),
    ("  X / Twitter", "twitter"),
    ("GitHub Stats", None),
    ("  Repos", "repos"),
    ("  Stars", "stars"),
    ("  Commits", "commits"),
    ("  Followers", "followers"),
]


def esc(text: str) -> str:
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


def load_stats() -> dict[str, str]:
    stats = DEFAULT_STATS.copy()
    if STATS_PATH.exists():
        stats.update({k: str(v) for k, v in json.loads(STATS_PATH.read_text()).items()})
    return stats


def build_svg(ascii_lines: list[str], profile: dict[str, str]) -> str:
    ascii_x = 24
    ascii_y = 92
    line_h = 14
    info_x = 250
    info_y = 92
    info_line_h = 17
    value_x = 500

    ascii_blocks = []
    for i, line in enumerate(ascii_lines):
        y = ascii_y + i * line_h
        ascii_blocks.append(
            f'<text x="{ascii_x}" y="{y}" class="ascii">{esc(line)}</text>'
        )

    info_blocks = []
    for i, (label, key) in enumerate(FIELDS):
        y = info_y + i * info_line_h
        if key is None:
            info_blocks.append(
                f'<text x="{info_x}" y="{y}" class="label">{esc(label)}</text>'
            )
            continue

        value = profile[key]
        label_text = f"{label}:"
        if label.strip() in {"Website", "LinkedIn", "X / Twitter"}:
            if "Website" in label:
                href = f"https://{value}"
                display = value
            elif "LinkedIn" in label:
                href = f"https://www.linkedin.com/in/{value}/"
                display = value
            else:
                href = f"https://x.com/{value}"
                display = f"@{value}"

            info_blocks.append(
                f'<text x="{info_x}" y="{y}"><tspan class="label">{esc(label_text)} </tspan></text>'
                f'<a href="{href}"><text x="{value_x}" y="{y}" class="link">{esc(display)}</text></a>'
            )
        else:
            info_blocks.append(
                f'<text x="{info_x}" y="{y}"><tspan class="label">{esc(label_text)} </tspan>'
                f'<tspan x="{value_x}" class="value">{esc(value)}</tspan></text>'
            )

    content_h = max(
        ascii_y + len(ascii_lines) * line_h,
        info_y + len(FIELDS) * info_line_h,
    )
    height = content_h + 36

    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="860" height="{height}" viewBox="0 0 860 {height}" role="img" aria-label="Shashank SN neofetch profile">
  <defs>
    <style>
      .bg {{ fill: #0d1117; }}
      .frame {{ fill: none; stroke: #30363d; stroke-width: 1; }}
      .titlebar {{ fill: #161b22; }}
      .title {{ font: 600 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; fill: #c9d1d9; }}
      .prompt {{ font: 600 14px ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; fill: #58a6ff; }}
      .divider {{ stroke: #30363d; stroke-width: 1; }}
      .ascii {{ font: 12px ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; fill: #8b949e; }}
      .label {{ font: 600 13px ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; fill: #d29922; }}
      .value {{ font: 13px ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; fill: #e6edf3; }}
      .link {{ font: 13px ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, monospace; fill: #58a6ff; }}
      a {{ text-decoration: none; }}
    </style>
  </defs>
  <rect class="bg" width="860" height="{height}" rx="8"/>
  <rect class="frame" x="0.5" y="0.5" width="859" height="{height - 1}" rx="8"/>
  <rect class="titlebar" x="1" y="1" width="858" height="34" rx="8"/>
  <rect class="titlebar" x="1" y="18" width="858" height="17"/>
  <text x="16" y="22" class="title">shashank-sn / README.md</text>
  <text x="24" y="62" class="prompt">{esc(profile["hostname"])}</text>
  <line class="divider" x1="24" y1="72" x2="836" y2="72"/>
  {''.join(ascii_blocks)}
  {''.join(info_blocks)}
</svg>
'''


def main() -> None:
    ascii_lines = [
        line.rstrip()
        for line in ASCII_PATH.read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]
    profile = load_stats()
    OUTPUT_PATH.write_text(build_svg(ascii_lines, profile), encoding="utf-8")
    print(f"wrote {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
