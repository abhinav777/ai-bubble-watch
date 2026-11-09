# Changelog

Changes to the rules, the data sources and the dashboard, newest first. This file mirrors the `changelog` array in `data/framework.json`; daily readings live in `data/runs.json` and the briefs.

## 2026-11-09

The dashboard header now states which close the scoring covers, when the next scoring is due in the viewer's time zone and whether a run is late, with a strip for the morning overnight watch; both routines write a heartbeat to data/status.json, and the overnight watch commits it even on quiet mornings. The page reloads itself when the evening row lands.

## 2026-11-06

Pass one of the retrospective's recommendations. Stage 5 now requires two fresh credit reds, broad spreads above 500 bp, or a default; a lone or stale credit red sets a credit-stress flag instead. Two-close hysteresis on level-based signals; Pillar F moves no longer listed as changes. C4 scored on first-week secondary trading. New B5 policy-and-power signal (pillars A-E now 25 signals, 34 in total). E4 redefined as equity issuance plus insider selling, D4 as the Census BTOS AI-use rate, E2 as GDELT volume, F5 as the 2-year minus the fed funds midpoint, G4 as lab economics from filings. The daily check moves to 23:00 UTC, after the US close; an overnight watch at 13:00 UTC alerts before the open and writes events, not rows.

## 2026-11-06 (C3, D4, F1, F3, F4)

Feeds keyed through the cloud environment's network secrets, so no key ever enters a run: FRED's API replaces the CSV for high-yield and investment-grade spreads, yields, the breakeven and the term premium; FINRA's corporate-bond breadth and sentiment aggregates join Pillar C as daily context (FINRA's public API has no per-bond prices, so C1, C4 and C5 stay on wire reports); D4 is read from the Census BTOS national file (question 7, current AI use, three latest cycles) rather than a keyed API, which does not exist for that survey. Manual runs before the close write a row marked "open" that the after-close run replaces. The Retro section moved to its own page, retro.html, with the full ledger and the list of reviews; the changelog is mirrored to docs/CHANGELOG.md.

## 2026-11-04

Seven-week retrospective (docs/review-2026-11-04.md). Concerns ledger added (data/concerns.json) with 28 back-filled concerns and their outcomes; the dashboard gains a Retro section with a month-ago look-back, recently settled concerns, open concerns by deadline, and what followed each stage call. Plumbing fixes in the routine: Treasury yield-curve CSV as the FRED fallback, a 6-second gap between GDELT calls, and G3 scored from the latest filed 10-Q instead of waiting for the next one.

## 2026-11-02 (A2, A4, A6, F2)

Intel's Q3 report (Oct 29) -- a beat on revenue but weak Q4 guidance and continued AI-capex cash-burn concerns -- triggered the sharpest broad semiconductor selloff since Oct 22 (SOX -7.20%, AMD -10.88%, NVDA -4.22%, Oct 30), flipping A6 (single-day rout) from green back to yellow and deepening A2 (SOX drawdown, -26.96%) and A4 (rotation lag, now 16.6-24.5pts). MOVE also crossed back above 100 (100.20), flipping F2 to yellow (Pillar F: 0 red / 5 yellow, amplifier stays MEDIUM). None of this touched Pillar B: Micron's Sep 30 fiscal Q4 results (record $54.2bn revenue, memory ASPs up 232-383% YoY) keep B4 green, and all four hyperscalers' 2027 capex guidance stands with zero cuts. Oracle's 288bp CDS and CoreWeave's CDS/bond distress (both Oct 15) remain the only dated Stage-5 confirmations, now 12 trading days stale. The calendar item tracking OpenAI's ~$30bn round deadline is removed: investors were reportedly given until Oct 30 to commit near a $1.2-1.5T valuation, still outside-capital led, but no confirmed close was found as of Nov 2 -- logged as an event, to be re-checked each run. Reds hold at 4 (A2, A4, C1, C5); yellows rise from 6 to 7. Stage holds at 5; circularity holds HIGH.

## 2026-10-30

Amazon's Q3 2026 report (Oct 29 after close) resolved the final 'Big Four' capex calendar item: AWS revenue +39% YoY, FY2026 capex held near $220bn, 'meaningfully more' guided for 2027 -- joining Meta, Microsoft and Alphabet in raising or maintaining 2027 capex guidance, with zero of four cutting or pausing. B1 stays green on its strongest confirmation yet. Separately, A6 (single-day rout) reset from yellow to green as Oct 22's SOX -6.72% session rolled outside the trailing-week window; reds hold at 4 (A2, A4, C1, C5) and yellows fall from 7 to 6. Alphabet (-12.6%) and Amazon (-6% after-hours) both sold off post-earnings on EPS/FCF concerns rather than capex cuts, deepening A2 and A4 but not flipping any Pillar B signal -- a clean illustration of Pillar A price noise versus Pillar B capex confirmation. Stage holds at 5; circularity holds HIGH (OpenAI's round unclosed as of the Oct 30 FT-reported investor deadline).

## 2026-10-27

Second straight no-change session: reds hold at 4 (A2, A4, C1, C5), yellows at 7, Stage remains 5. Markets extended Friday's bounce into a broad Monday rally (SOX +2.82%, NVDA +2.39%, AMD +2.80%) ahead of today's FOMC decision and Wednesday/Thursday's Microsoft, Alphabet and Amazon capex guidance. Oracle's 288bp CDS and CoreWeave's CDS/bond distress (both Oct 15-16) remain the only dated credit confirmations, now 8 trading days stale. aibubblemonitor.com's composite score round-tripped from 56.8 'Heating Up' back to 48.3 'Neutral' in a single day while aibubble.watch and boomorbubble.ai held roughly flat; trackers still disagree (E3 stays green). Corrected an error carried in recent F4 readings: September CPI (released Oct 14) was 3.7% headline, not the 3.4% figure (August's reading) mistakenly carried forward; F4 stays yellow either way. Amplifier holds MEDIUM; circularity holds HIGH (G3, G4 still not yet scorable). No calendar items passed -- the FOMC decision (Oct 28) and Microsoft/Alphabet (Oct 28) and Amazon (Oct 29) earnings are still pending.

## 2026-10-26

First run after the weekend, reflecting Friday Oct 23's close. Markets stabilized (SOX +0.44%, NVDA -0.59%, VIX down to 19.45, MOVE easing to 103.31 but still above 100) with no signal changing color: reds hold at 4 (A2, A4, C1, C5), yellows at 7, Stage remains 5. No fresher Oracle CDS or CoreWeave bond/CDS print surfaced despite renewed searches -- both remain dated Oct 15-16, now roughly a week and a half stale. The one notable mover was aibubblemonitor.com's composite score, which rose from 48.3 'Neutral' to 56.8 'Heating Up' while aibubble.watch and boomorbubble.ai held flat, leaving the three trackers still disagreeing (E3 stays green). Amplifier holds MEDIUM (0 red / 5 yellow in Pillar F); circularity holds HIGH (G3, G4 still not yet scorable; Ramp AI Index has no October update yet). This week's FOMC decision (Oct 27-28) and Microsoft/Alphabet/Amazon capex guidance (Oct 28-29) are the live catalysts.

## 2026-10-23 (A4, A6, F2)

Thursday Oct 22 was the sharpest one-day deterioration in weeks (SOX -6.72%, NVDA -4.40%, AMD -8.10%) on a $9.89bn Meta legal charge and a 4% Brent spike to $113.17 on renewed Iran-strike reports, despite Meta's capex guidance having been raised, not cut. Two Pillar A signals worsened: the 20-session rotation (A4) flipped yellow to red as SOX/AMD/NVDA now lag RSP by 9-23 points, and the single-day-rout signal (A6) flipped green to yellow. Bond volatility (MOVE) reversed back above 100 (106.84, Oct 22), flipping F2 back to yellow (Pillar F: 0 red / 5 yellow, amplifier stays MEDIUM). Reds (Pillars A-E) rose from 3 to 4 (A2, A4, C1, C5); yellows rose from 7 to 7 net (A6 added, offset by no change elsewhere). Oracle's 288bp CDS and CoreWeave's CDS/bond distress (both Oct 15-16) stayed unconfirmed by any fresher print. Stage held at 5; circularity stayed HIGH.

## 2026-10-22

Meta's Q3 2026 report (Oct 21 after close) resolved the 'first Big Four capex signal' calendar item cleanly for B1: FY2026 capex guidance was narrowed to $135-145bn, raising the low end from $130bn, and management declined to give a 2027 figure while saying compute, not demand, is the constraint on growth -- a posture of under-building, not digestion. B1 stays green; the item is removed from the calendar with Microsoft and Alphabet (~Oct 28) and Amazon (Oct 29) still pending. Separately, bond-market stress eased further: the MOVE index closed at 95.94 (Oct 21), its first sub-100 print in weeks, flipping F2 from yellow to green and cutting Pillar F to 0 red / 4 yellow (amplifier stays MEDIUM). Reds hold at 3 (A2, C1, C5) and yellows at 7 -- Oracle's 288bp CDS and CoreWeave's CDS/bond distress (both Oct 15) remain the last dated prints, now seven trading days stale despite renewed searches. Stage holds at 5; circularity stays HIGH.

## 2026-10-21

Pillar F improved to zero reds for the first time since early October: fresh FRED data through Oct 16 showed the term premium easing to 0.9857% (from a 1.0729% reading stuck stale since Oct 9), flipping F3 from red to yellow; amplifier stays MEDIUM on 0 red / 5 yellow. Narrative and sentiment also normalized: Google News RSS's weekly 'AI bubble' pace returned to baseline and none of the three public trackers deteriorated, flipping both E2 and E3 from yellow to green. Reds hold at 3 (A2, C1, C5) -- Oracle's 288bp CDS record and CoreWeave's CDS/bond distress, both dated Oct 15, stayed unconfirmed by any fresher print despite targeted searches and are now six trading days stale. Yellows fall from 9 to 7; greens rise from 12 to 14. Stage holds at 5 (credit event); circularity stays HIGH. Calendar refreshed: Meta reports Q3 2026 today (Oct 21) as the first Big Four capex signal, with Microsoft and Alphabet (~Oct 28) and Amazon (Oct 29, confirmed) to follow, plus a new Nov 23 New Mexico air-permit item tied to Oracle's Project Jupiter force majeure.

## 2026-10-20

Oracle's 5-year CDS record of 288bp (Oct 15), previously seen only as unattributed aggregator claims, was corroborated this run by convergent WebSearch snippets citing Reuters wire reporting (S&P Global Market Intelligence/ICE data) across at least six independent outlets after direct access to reuters.com, Bloomberg, CNBC and the aggregator sites themselves was blocked by the network proxy. C1 flips yellow to red, crossing the 250bp threshold for the first time since baseline. Reds (Pillars A-E) rise to 3 from 2 (A2, C1, C5); Stage holds at 5. Separately, A4 (20-day rotation) and E2 (narrative volume) both flipped green to yellow on fresh data (a widened AI-leader lag vs RSP; Google News RSS's weekly cap filling in ~4 days instead of 7). Microsoft confirmed its fiscal Q1 2027 earnings date as Oct 28 after the close, the first concrete date for the 'late Oct hyperscaler capex' calendar item.

## 2026-10-16

First Stage 5 (credit event) trigger of the tracker's life: CoreWeave's 9.625% senior unsecured notes due 2032 traded below 80 cents on the dollar on Oct 14 (Bloomberg, citing TRACE pricing data; yield >15%) and continued trading in the high-$70s to low-$80s through Oct 15 (Reuters/Tradeweb via CNBC), crossing C5's 'bonds <80' red threshold for the first time -- even as CRWV equity itself recovered +5.94% on Oct 15. Oracle fell 8.83% on Oct 14 as the bond scare spread through the neocloud/hyperscaler-supplier complex; SoftBank fell a further 9.33% on Oct 15 (after -8.50% Oct 13), extending its decline to -43.8% from its June high. SOX deepened to -20.86% below its high (A2 stays red). Separately, F2 (MOVE) flipped back yellow (102.49, Oct 15) one session after going green, and the Mid-Oct BofA fund manager survey (released Oct 13, fielded Oct 2-8) resolved the calendar item: 'AI bubble' tail risk eased to 23% of respondents (from 28% in September, now third behind bond yields at 31% and a second inflation wave at 20%), even as 11% named a hyperscaler/AI credit event as the likeliest trigger -- a risk that began showing up in CoreWeave's bond market the same week the survey was fielded. Stage is now reported as 5 (credit event), the most advanced stage yet triggered, though the underlying bond print is fresh, narrow (within a few cents of the threshold) and could reverse quickly; Pillar A's Stage-1 price break (A2) persists concurrently. Pillar G stays HIGH (G1, G2 yellow; G3, G4 not yet scorable).

## 2026-10-16

Trackers strip restored on the dashboard: aibubble.watch, aibubblemonitor.com, Exponential View (boomorbubble.ai) and Polymarket readings are now recorded in every run row (trackers object) and were back-filled since Sep 15 from the recorded E3 readings, the briefs and aibubblemonitor.com's own history API. boomorbubble.ai, Polymarket and aibubblemonitor.com are read via JSON endpoints instead of search snippets.

## 2026-10-15

SOX closed Oct 14 at 20.16% below its June 22 52-week high, crossing the >20% red threshold for the first time since the Sep 15 baseline: A2 flips yellow to red and the Stage moves from 0+ to 1 (price break). The move came amid a broad AI-complex selloff (Oracle -8.83%, CoreWeave -15.46%, Nvidia -3.16%, AMD -5.73%, Micron -4.10%) following a hotter-than-expected September CPI print (3.7% headline, up from 3.4%). Separately, this tracker corrects D1 from green to yellow: an Oct 8 FT/Reuters report that OpenAI's September run-rate is nearer $50bn -- about $20bn (29%) below the ~$70bn figure this brief had carried since September -- was missed for a week of runs and is being caught up now. F2 (MOVE) eased back to green (99.06, Oct 14). Net Pillar A-E count: 1 red, 8 yellow, 15 green -- numerically identical to the Sep 15 baseline, though the composition of yellows has shifted (demand-validation concerns now present; price-rotation concerns absent). TSMC's Oct 15 Q3 results beat and raised (revenue +50.9% YoY, Q4 guide $52.3-54.3bn), resolving the 'Oct 15 TSMC earnings' calendar item with no AI-demand softening. FRED was unreachable all run (HY OAS, term premium, breakeven carried stale).

## 2026-10-14

Pillars A-E held flat for a fourth straight session (8 yellows, 0 reds). Within Pillar F, MOVE (bond volatility) closed back above 100 for the first time in weeks (101.09, Oct 13), flipping F2 from green to yellow; the amplifier stays MEDIUM because F3 (term premium) remains the lone Pillar F red, now on a fresher Oct 9 reading (1.0729%) after FRED resumed publishing. CXMT memory-competition fallout stayed contained to memory-adjacent names (Micron -3.62%, CoreWeave -3.05%) while NVDA, Broadcom, AMD, Oracle and Meta rebounded the same session. Unverified social-media claims of a fresh ~261bp Oracle CDS record (Oct 8) could not be corroborated by any T1-T3 source and did not change C1.

## 2026-10-12

First run after the weekend, reflecting Friday Oct 9's close. Pillars A-E fully unchanged for a second straight session (8 yellows, 0 reds, Stage holds at 0+). Within Pillar F, the MOVE bond-volatility index closed back under 100 for the first time in several weeks (98.47, Oct 9), flipping F2 from yellow to green; the amplifier still holds at MEDIUM because the term-premium series (F3) remains stuck at a 10-day-stale Oct 2 reading. No calendar items passed this run.

## 2026-10-09

The Oct 8 30-year Treasury reopening cleared at 5.618% with in-line demand and no tail, resolving the 'Oct 8' calendar item (removed). Separately, the 10-year yield closed back below 5.25% (5.231%, Oct 8), flipping F1 from red to yellow and cutting the macro amplifier from HIGH to MEDIUM for the first time since the amplifier was added Sep 17 -- even as a broad AI-complex selloff hit equities the same day (SOX -3.4%, Oracle -5.5%, CoreWeave -7.8%). Pillars A-E unchanged: same 8 yellows, 0 reds, Stage holds at 0+.

## 2026-10-08

SOX's drawdown widened back above 10% (A2: green to yellow) one session after its first sub-10% reading since baseline; narrative volume normalized back to roughly the baseline pace (E2: yellow to green) after Google News RSS's 7-day cap took the full week to fill instead of ~3 days. Net yellow count unchanged at 8. TSMC's September revenue (+54.6% YoY, record) resolved the '~Oct 10' calendar item early with no softening; the Oct 7 10-year Treasury auction cleared strongly with no tail, resolving half of the 'Oct 7-8 auctions' item (30-year still pending Oct 8).

## 2026-10-07

SOX's drawdown narrowed below 10% (A2: yellow to green), putting Pillar A at zero reds and zero yellows for the first time since the Sep 15 baseline. Offsetting this, narrative volume (E2) flipped green to yellow after Google News RSS's 7-day 'AI bubble' query hit its 100-item cap in roughly 3 days instead of 7, while GDELT's volume comparator stayed rate-limited (429). Total yellow count unchanged at 8; Stage holds at 0+ (stress building).

## 2026-10-06

Calendar refreshed: added the Oct 7-8 Treasury auctions (F3 watch) and TSMC's Oct 15 earnings call; the 'Mid-Oct Anthropic IPO marketing' item is replaced with a confirmed slip to the week of Nov 9 / mid-November at up to $2T. No signal changed color this run -- the same 8 yellows held for a second straight session.

## 2026-10-01

Two Sep 30 / Early Oct calendar items resolved and removed: Micron's fiscal Q4 (Sep 30) showed no softening in DRAM commentary -- record revenue and HBM growth, B4 stays green, outcome logged as an event. SoftBank's new notes' first-week secondary price (96.75 bid, per Reuters-sourced reporting dated Sep 24) came in below the 98 threshold before the official FINRA TRACE window even opened, flipping C4 from green to yellow; outcome logged as an event rather than left pending.

## 2026-09-25

Pillar G (circularity) added with four signals: insider share of lab funding (G1), loop cash gap (G2), vendor filing fingerprints (G3), growth outside the loop (G4). Scored on funding events and filings rather than daily prices; excluded from the 24-signal count so history stays comparable; reported as a Circularity level (LOW / HIGH / BREAKING) beside the macro amplifier. G1 red joins the Stage 2 rule; G2-G4 red join the Stage 3 rule. Provisional baseline G1 Y, G2 Y, G3 N, G4 N (HIGH).

## 2026-09-25

Pillar G's provisional baseline confirmed with dated sources on the routine's first scoring run: G1 Y (OpenAI's $1.2-1.5T round still in talks, unclosed), G2 Y (~$1.4T commitments vs run-rate), G3 N and G4 N (awaiting Nvidia/Oracle 10-Qs and Microsoft's earnings call). Circularity HIGH.

## 2026-09-24

SoftBank's $11.1bn OpenAI-funding bond priced with ~3x oversubscription (C4: yellow to green), the first Pillar C signal to turn green since the baseline, even as its coupons are SoftBank's highest-ever on dollar debt. Same day, the 10-year Treasury yield hit 5.11-5.13%, highest since 2007, keeping the macro amplifier's own signals (F1, F2) close to their thresholds.

## 2026-09-21

SOX drawdown fell to 18.5% (A2: red to yellow) and the 20-day rotation flipped to leaders-ahead (A4: yellow to green); Pillar A now holds zero reds for the first time since the Sep 15 baseline. Stage revised from 1 (price break) to 0+ (stress building).

## 2026-09-17

C1 moved from baseline-relative to absolute bands after an unverified CDS print would have scored green.

## 2026-09-17

Five-tier source register with incentive tags added; T4/T5-only figures cannot change a color.

## 2026-09-17

Pillar F macro transmission added as an amplifier (10y level, MOVE, term premium, inflation regime, Fed path).

## 2026-09-17

Dashboard moved to GitHub Pages; the daily routine now appends a row to data/runs.json each weekday.

## 2026-09-17

Correction: pillars A-E hold 24 signals, not 20; green counts restated (baseline 1 red, 8 yellow, 15 green). Total signals 29 with pillar F.

## 2026-09-15

Framework created; baseline set at Stage 1 with 1 red and 8 yellows.
