# AI Bubble Signal Framework

Purpose: separate "is there a bubble?" (froth indicators) from "is it popping right now?" (deflation indicators),
and give each signal a green / yellow / red threshold so a daily check can score it mechanically.

Baseline date: 2026-09-15. All thresholds are absolute. Revision 2026-09-17: C1 moved from baseline-relative to absolute bands after an unverified CDS print would otherwise have scored green. Revision 2026-09-25: Pillar G (circularity) added; G reds join the Stage 2 and 3 rules; a Circularity level (LOW / HIGH / BREAKING) is reported next to the macro amplifier.

## How bubbles actually pop: the dot-com sequence as a template

| Stage | Dot-com timing | What it looked like | Signals that catch it |
|---|---|---|---|
| 1. Price break | Mar 10 – Apr 14, 2000 | Nasdaq -25% in 5 weeks; leaders fell first; violent bounces | Drawdowns, VIX, breadth |
| 2. Funding window closes | Apr – Jun 2000 | IPO calendar dries up; late-stage rounds pulled; secondaries mark down | Private-market signals |
| 3. Revenue misses | Q3 – Q4 2000 | Customers slow orders; "visibility" language appears; channel inventory builds | Guidance, ARR growth, GPU pricing |
| 4. Capex cliff | Jan – Apr 2001 | Telecom and enterprise capex guidance cut 20-40%; Cisco $2.2B inventory write-down | Capex guidance, lease cancellations |
| 5. Credit and bankruptcies | 2001 – 2002 | Debt-funded builders (Global Crossing, WorldCom) default; spreads blow out | CDS, HY spreads, covenant breaches |

Two lessons for the monitor: (a) price falls first but is noisy; capex cuts and credit stress are the confirmations.
(b) The whole process took 12-18 months. "Popping" is a stage progression, not a single day.

## Pillar A: Price and market structure (Stage 1 detectors, noisy but earliest)

| # | Signal | Green | Yellow | Red | How to check |
|---|---|---|---|---|---|
| A1 | NVDA drawdown from 52-week high | < 15% | 15-25% | > 25% | Yahoo Finance NVDA; compare close to 52w high |
| A2 | SOX (semis) drawdown from high | < 10% | 10-20% | > 20% | Yahoo Finance ^SOX |
| A3 | Nasdaq-100 drawdown from high | < 10% | 10-20% | > 20% | Yahoo Finance ^NDX |
| A4 | Rotation: AI leaders vs equal-weight S&P (RSP) over trailing 20 trading days | Leaders ≥ RSP | Leaders lag RSP by 5-10 pts | Leaders lag RSP by > 10 pts while RSP flat/up | Compare NVDA/MSFT/AVGO basket vs RSP |
| A5 | VIX close | < 20 | 20-30 | > 30 | Yahoo Finance ^VIX |
| A6 | Single-day rout in AI complex | none | NVDA or SOX -5% in a day | NVDA -10% or SOX -8% in a day, or two -5% days in a week | Daily closes |

## Pillar B: Capex and guidance (Stage 3-4 detectors, the true "pop" confirmation)

| # | Signal | Green | Yellow | Red | How to check |
|---|---|---|---|---|---|
| B1 | Hyperscaler capex guidance (MSFT, GOOGL, AMZN, META, ORCL) | Raised or maintained | One company trims, or uses "digestion" / "moderating growth" language | Two or more cut 2027 guidance, or any announces a spending pause | Earnings calls, 8-Ks, Reuters/Bloomberg |
| B2 | Data-center project pauses, lease cancellations, power-contract cancellations | None credible | Analyst reports (TD Cowen-style) of cancellations; developer delays | Company-confirmed pauses at a hyperscaler, OpenAI Stargate, xAI, or a top neocloud | Search news daily |
| B3 | Nvidia quarterly results and guide vs consensus | Beat and raise | In line; data-center growth decelerating sharply | Miss, guide below consensus, or sequential data-center decline | Nvidia IR, quarterly (next report ~late Nov 2026) |
| B4 | Supply-chain signals: TSMC monthly revenue, HBM/DRAM contract prices, server ODM orders | Growing YoY, prices firm | TSMC YoY growth halves; memory prices flat | TSMC YoY negative; memory contract prices falling; ODM order cuts reported | TSMC monthly release (~10th of month), TrendForce |

## Pillar C: Financing and credit (Stage 5 detectors, the systemic ones)

| # | Signal | Green | Yellow | Red | How to check |
|---|---|---|---|---|---|
| C1 | Oracle 5-year CDS spread (absolute bands; use only a print with a date, else carry the last dated value and mark it stale) | < 150 bp | 150-250 bp | > 250 bp | Search "Oracle CDS" news; Bloomberg/Reuters/LSEG coverage |
| C2 | HY tech bond yield minus 10y Treasury (whalequant.io/en/tech-bubble-spread) | < 3.5% | 3.5-5.0% | > 5.0% | Fetch whalequant page |
| C3 | US high-yield OAS (FRED BAMLH0A0HYM2) | < 350 bp | 350-500 bp | > 500 bp | FRED |
| C4 | AI debt deal reception (Oracle, CoreWeave, Meta SPVs, xAI, data-center ABS/CMBS) | Deals oversubscribed | Deals repriced wider, downsized, or delayed | Deal pulled, covenant breach, rating downgrade to junk, or private-credit fund gates redemptions | Search news daily |
| C5 | Neocloud equity and debt (CRWV, NBIS, IREN, APLD) | Stable | CRWV -30% from high or bonds < 90 cents | CRWV bonds < 80 cents, going-concern language, or a peer default | Yahoo Finance, FINRA TRACE coverage in press |

## Pillar D: Demand and revenue validation (Stage 2-3 detectors)

| # | Signal | Green | Yellow | Red | How to check |
|---|---|---|---|---|---|
| D1 | OpenAI / Anthropic / xAI revenue run-rate growth | Still doubling or better YoY | Growth rate halves vs prior report; internal targets reportedly missed | Run-rate flat or down; layoffs at a top lab | The Information, Reuters, Bloomberg |
| D2 | Private-market pricing: secondary discounts, down rounds, pulled rounds | Rounds oversubscribed, secondaries at premium | Secondaries 10-20% below last round; a round delayed | Down round at a top-5 lab; secondaries > 25% below; tender offer cancelled | Search news |
| D3 | GPU rental price (H100 per hour) 3-month change | Flat or up | -15% to -30% | < -30%, or reports of idle capacity / neoclouds cutting prices to fill | Lambda, SFCompute index, Vast.ai, news |
| D4 | Enterprise adoption evidence | Seat/usage growth accelerating (Copilot, Gemini, ChatGPT Enterprise, Claude) | Growth flat; ROI studies negative; pilots not converting | Disclosed seat declines; major customers publicly cutting AI budgets | Earnings calls, surveys (Census BTOS AI use rate) |
| D5 | AI-startup casualty rate | Isolated | Several notable shutdowns or fire-sales in a month | Wave of shutdowns; secondhand GPU glut reported | Search news |

## Pillar E: Sentiment and narrative (coincident/contrarian, NOT confirmation)

| # | Signal | Green | Yellow | Red | How to check |
|---|---|---|---|---|---|
| E1 | BofA Global Fund Manager Survey: "AI bubble" as top tail risk; "Long Mag7" most crowded | < 30% cite AI bubble | 30-45% | > 45%, AND cash levels rising | Monthly, ~2nd Tuesday |
| E2 | Google Trends "AI bubble" vs 12-month average | < 1.5x | 1.5-3x | > 3x (new all-time high) | trends.google.com |
| E3 | Composite trackers: aibubble.watch score, aibubblemonitor.com index, boomorbubble.ai red-gauge count | Disagreeing (as on baseline day) | Two of three deteriorating | All three deteriorating; boomorbubble ≥ 2 red gauges | Fetch each site |
| E4 | Insider selling and IPO froth | Normal | Record insider sales at AI names; IPOs of unprofitable AI companies doubling on day one | Sudden IPO withdrawals (funding window closing) | SEC Form 4 coverage, Renaissance Capital |

Important: E-pillar signals have fired several times since 2025 (Aug 2025 MIT "95%" study, Nov 2025 Burry short, etc.) without a Stage 3-5 progression. Treat narrative spikes as a prompt to check Pillars B-D, not as evidence on their own.

## Pillar F: Macro transmission (added 2026-09-17; amplifier, never a stage trigger)

Why it exists: the 5% Treasury did more damage to the AI trade in September 2026 than any AI-specific fact, and the Fed chair tied rising long yields to hyperscaler issuance ("competition for capital"). That is a feedback loop specific to this boom: AI debt raises the risk-free rate, which raises AI's discount rate and funding cost. Inflation matters because it decides whether the Fed can cut to refloat long-duration assets.

| # | Signal | Green | Yellow | Red | How to check |
|---|---|---|---|---|---|
| F1 | 10-year Treasury yield level | < 4.5% | 4.5-5.25% | > 5.25% | FRED DGS10, Yahoo ^TNX |
| F2 | Bond volatility, MOVE index | < 100 | 100-130 | > 130 | Yahoo ^MOVE |
| F3 | Term premium (FRED THREEFYTP10) or auction reception | < 0.5% | 0.5-1.0%, or one tailed 10y/30y auction | > 1.0%, or two consecutive tails | FRED; auction coverage |
| F4 | Inflation regime: 10y breakeven, Brent, headline CPI | Breakeven < 2.4%, Brent < $80, CPI < 3% | Any of breakeven 2.4-2.7%, Brent $80-100, CPI 3-4% | Breakeven > 2.7%, or Brent > $100 with CPI > 4% | FRED T10YIE, Yahoo BZ=F, BLS |
| F5 | Fed path implied by futures and dots | Cuts priced | 1-2 hikes priced | 3+ hikes priced, or 2027 median dot > 4.5% | CME FedWatch coverage, SEP |

Amplifier rule: LOW = 0 red and at most 1 yellow; MEDIUM = 0 red and 2+ yellow, or exactly 1 red; HIGH = 2+ red. The amplifier never changes the stage. HIGH shortens the watch horizon and flags rate-sensitive signals C1, C4, C5 and D2 as at elevated risk.

Readings on 2026-09-17: F1 Y (4.95-5.01%), F2 G (MOVE 76), F3 Y (0.96%, 12-month high), F4 Y (breakeven 2.33% anchored, but Brent $104 and CPI 3.4%), F5 Y (~2.5 hikes priced). Amplifier MEDIUM. The decomposition matters: high yields with anchored breakevens and low MOVE is an orderly term-premium repricing, not an inflation panic and not yet a disorderly market.

## Pillar G: Circularity (added 2026-09-25; Stage 2-3 detector, scored on funding events and filings, not daily prices)

Why it exists: a material share of reported AI revenue is funded by the vendors' own balance sheets. Nvidia commits equity to OpenAI, CoreWeave and xAI, which buy Nvidia chips; Microsoft, Amazon, Google and Oracle fund or contract with labs that commit spend back to their clouds; SoftBank borrows at 9.75% to fund OpenAI, which pays Oracle and Nvidia; AMD sells chips for warrants. The revenue is real under GAAP, but the cash originates from lab fundraising rather than end customers, so reported growth is only as durable as the labs' ability to keep raising at rising valuations. Pillar D asks whether demand exists; Pillar G asks whether the reported growth would exist without the loop.

| # | Signal | Green | Yellow | Red | How to check |
|---|---|---|---|---|---|
| G1 | Insider share of frontier-lab funding (OpenAI, Anthropic, xAI; each primary round or tender) | Latest round majority outside capital (sovereign funds, pensions, mutual and crossover funds), plain equity, valuation step-up | Suppliers or counterparties (Nvidia, Microsoft, Amazon, Google, Oracle, AMD, Broadcom, CoreWeave, SoftBank as conduit) commit 50% or more of a round; or structured terms (ratchets, more than 1x preference, compute or revenue guarantees, chips-for-equity); or a round open more than 90 days from first report | Round closes flat or down with suppliers as the majority; a supplier raises its commitment to close a round because outsiders declined; or compute credits or vendor financing are converted to equity to cover a shortfall | Company releases (T1); Reuters, Bloomberg, FT, WSJ (T2); The Information (T3). Event-driven; carry the last value between events |
| G2 | Loop cash gap: OpenAI's annualized compute commitments (each divided by its stated term) over its revenue run-rate, plus the state of those contracts | Ratio below 2x and not rising; no deferrals | Ratio 2-5x, or rising; or credible T2/T3 reports of a site delay, capacity deferral or payment renegotiation | Company-confirmed deferral, downsizing, cancellation or restructuring of a major commitment (Oracle, Microsoft, CoreWeave, Nvidia, AMD, Broadcom, a Stargate site); or a vendor discloses a receivable problem tied to a lab | Company statements, filings, wires. Distinct from B2, which covers supply-side data-center pauses; if both apply, score both |
| G3 | Vendor filing fingerprints: Nvidia DSO, customer concentration and equity stakes in customers; Oracle current vs total RPO; server useful-life changes at any hyperscaler or neocloud | Nvidia DSO within 5 days of the year-ago quarter; top-customer share not rising; stakes in customers under 10% of quarterly revenue; Oracle current RPO growing at least half as fast as total RPO; no useful-life extensions | Any one of: DSO up 10+ days YoY; top-two-customer share up 5+ points YoY; a new multi-billion stake in a customer announced with a purchase commitment; Oracle current-RPO growth under half of total-RPO growth; a useful-life extension | A credit-loss provision or receivable write-down tied to an AI customer; Nvidia impairs a stake in a customer; Oracle total RPO falls quarter on quarter or discloses a contract modification with its largest customer; a neocloud impairs GPUs | 10-Q, 10-K and earnings calls (T1). Re-score only on a new filing: Nvidia late Aug / Nov / Feb / May, Oracle mid Sep / Dec / Mar / Jun, hyperscalers late Jan / Apr / Jul / Oct |
| G4 | Growth outside the loop: Azure growth minus Microsoft's disclosed OpenAI contribution; Ramp AI Index (share of US businesses paying for AI tools, monthly) | Azure ex-OpenAI within 3 points of headline and steady or accelerating; Ramp AI adoption rising over 3 months | OpenAI's contribution to Azure growth rising for two quarters, or Microsoft stops disclosing it; or Ramp AI Index flat for 3 months | Azure ex-OpenAI decelerates 5+ points while headline holds; Ramp AI Index falls 3 consecutive months; or a hyperscaler names a lab as its largest growth source while cutting guidance | Microsoft earnings call and 10-Q (T1); Ramp Economics Lab (T3, own domain). The Census BTOS AI-use rate stays in D4 |

Scoring notes: Pillar G colors are excluded from the 24-signal A-E count so historical rows stay comparable. A G signal that cannot yet be scored with a dated source carries "N" (not scored); this state is allowed only in Pillar G. Circularity level: LOW = 0 red and at most 1 yellow (N not counted); HIGH = 0 red and 2 or more yellow; BREAKING = any red. Stage linkage: a G1 red joins the Stage 2 rule; a G2, G3 or G4 red joins the Stage 3 rule.

Provisional readings on 2026-09-25, to be confirmed by the routine's first scoring with dated sources: G1 Y (Nvidia's staged up-to-$100B investment tied to deployments, Sep 2025; AMD's 6 GW deal with warrants, Oct 2025; SoftBank's debt-funded $30B; an outside-led round at $1.2T or more under discussion per Bloomberg, Sep 15, would turn this green if it closes on plain terms). G2 Y (about $1.4T of commitments reported in Nov 2025 over roughly eight years is near 4x a $40B-plus run-rate; no confirmed deferral). G3 N and G4 N until scored from Nvidia's Q2 FY27 10-Q, Oracle's Q1 FY27 10-Q, Microsoft's FY26 Q4 call and the latest Ramp AI Index. Circularity: HIGH.

## Scoring and the daily verdict

Composite stage estimate:
- **Stage 0 (Boom intact):** no reds; at most 2 yellows, none in Pillar B or C.
- **Stage 0+ (Stress building):** no reds, but 3 or more yellows, or any yellow in Pillar B or C.
- **Stage 1 (Price break):** any red in Pillar A, no reds in B-D. Baseline state on 2026-09-15: A2 red (SOX -23.9% from its June 22 high), 8 yellows (A4, A6, B2, C1, C4, C5, D2, E4), 15 greens.
- **Stage 2 (Funding window closing):** red in D2, E4-withdrawals or G1, with Pillar A yellow/red.
- **Stage 3 (Revenue validation failing):** red in D1, D3, B3, G2, G3 or G4.
- **Stage 4 (Capex cliff):** red in B1 or B2. This is the point at which "the bubble is popping" is the right headline.
- **Stage 5 (Credit event):** red in C1, C4, or C5.

Also report: count of reds, count of yellows (Pillars A-E), the macro amplifier (Pillar F), the circularity level (Pillar G), and which signals changed color since the previous check.

## Source register (added 2026-09-17)

Network access decides what the routine can reach; this register decides what it may believe. Tiers: T1 primary (filings, Fed, FRED, BLS, company IR for own numbers, rating agencies, exchange data, Polymarket, BofA FMS) can change a color alone; T2 wire and major financial press (Reuters, Bloomberg, FT, WSJ, AP, CNBC, Nikkei) can change a color if dated within 7 days; T3 specialists (SemiAnalysis, TrendForce, The Information, DCD, GlobalCapital, ASR, SFA, TechCrunch, Axios, Epoch AI, FactSet Insight, GPU price indices) only inside their domain; T4 aggregators and secondary (Fool, 24/7, Benzinga, GuruFocus, Seeking Alpha news, TipRanks, MarketBeat, Investing.com, crypto news, MT Newswires Market Chatter, Substacks, X) are leads only and cannot change a color; T5 interested parties (companies on themselves, CEOs, short sellers, underwriter-strategists, vendor blogs, subscription trackers, committed bull/bear publishers) are always OPINION and carry an incentive tag: [long-AI incentive], [short-AI incentive], [engagement incentive], [conflicted: underwriter and strategist], [tracker sells subscriptions]. Higher tier wins a conflict. The brief reports source counts by tier and lists T4/T5-only claims.
