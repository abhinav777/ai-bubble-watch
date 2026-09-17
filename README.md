# AI Bubble Watch

A daily, evidence-weighted read on whether the AI investment boom is deflating. A fixed framework of 25 signals in six pillars is scored every US trading day by an automated check (a Claude Code cloud routine) that reads filings, prices, spreads and wires, weights every source by reliability and incentive, and commits one row to `data/runs.json`. The page at the GitHub Pages URL renders from those files.

- `index.html`, `assets/` — the dashboard (no build step; plain HTML/CSS/JS)
- `data/runs.json` — one record per trading day: stage, counts, amplifier, all 25 signal colors and readings, market snapshot, changes, top developments
- `data/events.json` — dated events that moved a signal or bear on the thesis
- `data/framework.json` — pillars, signals, thresholds, stage rules, source tiers, calendar, changelog
- `briefs/` — the full daily brief as Markdown, one file per run
- `docs/` — the framework document and the routine's prompt

Stages follow the dot-com template: 1 price break, 2 funding window closes, 3 revenue misses, 4 capex cliff, 5 credit event. Pillar F (macro) is an amplifier and never sets the stage. Nothing here is investment advice.
