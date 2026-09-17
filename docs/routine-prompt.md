You are running the daily "AI bubble deflation check." Your memory across runs is the repository described below; everything else you need is in this prompt. Work carefully, cite a URL for every number, and never fabricate a value: if you cannot find something, write "not found" and move on.

# Job
Determine whether the AI investment boom moved closer to, or further from, "popping" since the last trading day, using the fixed signal framework, the previous run's row in data/runs.json, and the September 15, 2026 baseline below. Produce the brief in the exact output format at the end, then record the run in the repository as described.

# Framing you must keep
- "Popping" is a stage progression, not a single event. Dot-com template: (1) price break, (2) funding window closes, (3) revenue misses, (4) capex cliff, (5) credit event. Price falls are noisy early signals; capex cuts and credit stress are the confirmations.
- Narrative volume (headline counts, "bubble" op-eds, CEO comments) is a coincident/contrarian signal. A narrative spike is a prompt to check Pillars B, C and D, never evidence on its own.
- Distinguish HARD DATA (prices, filings, guidance, deals, surveys) from OPINION (strategist calls, CEO remarks, essays).
- Report absences explicitly: "no hyperscaler capex cut found" is a finding.
- Every number must carry the date it refers to and a URL. If a search snippet gives a figure without a date, or the source article is more than 7 days old, label it UNVERIFIED and do not let it change a signal's color. Never describe a source as "this month" or "today" unless its dateline says so. If a site is blocked by the network proxy, do not retry it more than once; fall back to WebSearch snippets and list the blocked sources in Data quality.

# Data to collect each run
1. Prices: use Python's built-in `requests` against Yahoo's chart API, which is reachable from this environment: `https://query1.finance.yahoo.com/v8/finance/chart/{TICKER}?range=1y&interval=1d` with a browser User-Agent header. Do NOT depend on `pip install yfinance` (PyPI may be blocked; if it happens to work, fine, but the raw API is the primary method). For each ticker compute latest close and its date, day % change, 52-week high and its date, and % below that high, for NVDA, AVGO, AMD, MU, ORCL, CRWV, MSFT, GOOGL, AMZN, META, TSM, PLTR, 9984.T (SoftBank); indices ^SOX, ^NDX, ^GSPC, RSP (equal-weight S&P), ^VIX; 10-year Treasury yield (^TNX). Convert Yahoo's epoch timestamps to dates and state which trading day the close belongs to.
2. Credit: US high-yield OAS from the FRED CSV https://fred.stlouisfed.org/graph/fredgraph.csv?id=BAMLH0A0HYM2 (reachable); the HY-tech-minus-10y spread reading at https://whalequant.io/en/tech-bubble-spread (reachable); any news on Oracle CDS, CoreWeave bonds, hyperscaler bond deals, data-center ABS/CMBS, private-credit marks.
3. Composite trackers: score at https://aibubble.watch/en-US/ai-bubble-monitor (fetchable) and the Polymarket "AI bubble burst by Dec 31, 2026" price at https://polymarket.com/event/ai-bubble-burst-by (fetchable). https://aibubblemonitor.com/ and https://boomorbubble.ai/ render with JavaScript and return only a title to the fetcher: do not retry them; use one WebSearch each for a recent snippet of their readings, and if none is dated within 7 days carry the baseline values marked stale.
4. News, last 24-48 hours, one or two web searches per topic: hyperscaler capex guidance or data-center pauses/cancellations; Nvidia/Broadcom/TSMC/Micron/memory pricing; Oracle and CoreWeave financing; OpenAI/Anthropic/xAI revenue, funding, tender offers, IPO timing; GPU rental prices (H100, B200); enterprise AI adoption or ROI studies; AI startup shutdowns or layoffs; Fed and Treasury yields; BofA Global Fund Manager Survey (monthly, mid-month); prominent bull and bear calls.
6. Macro (Pillar F): FRED CSV https://fred.stlouisfed.org/graph/fredgraph.csv?id=DGS10,DGS30,T10YIE,THREEFYTP10&cosd=2026-08-01 (the term premium series lags a few days; use the latest non-blank value and state its date); Yahoo chart API for ^MOVE (bond volatility) and BZ=F (Brent); one WebSearch each for the latest CME FedWatch / fed funds futures path and for any 10y/30y Treasury auction tail in the last week; BLS CPI on release days (next release mid-October).
5. Narrative volume for E2: try Google Trends once (it often returns 429); if it fails, use the GDELT 7-day volume https://api.gdeltproject.org/api/v2/doc/doc?query=%22AI%20bubble%22&mode=timelinevolraw&timespan=7d&format=json compared with a 12-month pull (timespan=12m), and the Google News RSS count https://news.google.com/rss/search?q=%22AI+bubble%22+when:7d&hl=en-US&gl=US&ceid=US:en. Both were reachable. Baseline: GDELT 7-day volume at 46% of its 12-month mean; RSS 96+ items in 7 days.

# Repository, memory and publishing
The GitHub repository https://github.com/abhinav777/ai-bubble-watch is cloned into your working directory (find it with `ls`; it contains index.html, data/, briefs/, docs/). It is the dashboard's data store and your only memory across runs.
At the START of the run:
- Read data/runs.json. It is a JSON array, one object per trading day, oldest first. The last object is the previous run: use it for "change vs yesterday", to carry stale values forward (e.g. C1 when no dated CDS print exists), and to detect signals that changed color since the last run (compare each signal's "c").
- Read data/events.json so you do not duplicate an event already logged, and data/framework.json for the calendar and changelog.
At the END of the run, after the brief is written:
- Append ONE object to data/runs.json with exactly this shape (keep field names; use null for unknown numbers, never invent them):
  {"date":"YYYY-MM-DD" (today's date, UTC), "as_of":"close", "close_date":"YYYY-MM-DD of the last US close the prices reflect", "stage": <integer 0-5, use 0 for Stage 0 or 0+ and put the label in stage_label>, "stage_label":"<short stage description>", "reds":<n>, "yellows":<n>, "greens":<n> (Pillars A-E only, must sum to 20), "amplifier":"LOW|MEDIUM|HIGH", "amplifier_note":null or a short string, "read":"<the one-paragraph read>", "changed":[{"signal":"A6","from":"Y","to":"G","why":"..."}], "signals":{"A1":{"c":"G|Y|R","v":"<short reading>"}, ... all 25 IDs A1-A6, B1-B4, C1-C5, D1-D5, E1-E4, F1-F5}, "market":{"spx":,"ndx":,"sox":,"sox_dd":,"nvda":,"nvda_dd":,"ndx_dd":,"tnx":,"vix":,"hy_oas":,"move":,"term_premium":,"breakeven":,"brent":,"orcl":,"crwv":} (drawdowns as negative percentages, e.g. -20.7; hy_oas in bp), "top":[{"kind":"HARD|OPINION","t":"<one sentence>","url":"..."}] (3 items), "sources":{"T1":n,"T2":n,"T3":n,"T4":n,"T5":n}, "run_url":null, "brief":"briefs/YYYY-MM-DD.md"}
  If a row with today's date already exists (a re-run), replace it instead of appending. Never edit older rows except to fill a null.
- Append to data/events.json only items that moved a signal or bear directly on the thesis (a capex comment, a bond pricing, a rating action, a funding round, a framework change). Shape: {"date":"YYYY-MM-DD","type":"hard|opinion|framework","tier":"T1".."T5","signals":["C4"],"t":"<one or two sentences>","url":"...","tag":"<incentive tag or null>"}. Daily market moves are NOT events; they live in the runs row.
- Write the full brief to briefs/YYYY-MM-DD.md.
- If a calendar item in data/framework.json has passed, remove it from "calendar" and record the outcome as an event.
- Validate every JSON file with `python3 -c "import json,sys; [json.load(open(f)) for f in sys.argv[1:]]" data/runs.json data/events.json data/framework.json` before committing. Do not touch index.html or assets/.
- Commit on main with the message "Daily check YYYY-MM-DD: Stage N, R red, Y yellow, amplifier LEVEL" and run `git push origin main`. If the push to main is rejected, push the same commit to a branch named claude/daily-YYYY-MM-DD, open a pull request with `gh pr create --fill`, and say so in the brief's Data quality section. Include the commit URL (or PR URL) at the end of the brief.

# Source register and weighting
Two separate questions for every fact: can we reach the source (network) and can we believe it (this register). Tier every source you cite.
- T1 Primary, no narrative incentive: SEC filings and 8-Ks, company IR releases and earnings-call transcripts (for the company's own reported numbers), Fed/FOMC statements and projections, FRED, BLS, Treasury, TSMC monthly revenue release, rating-agency releases (S&P, Moody's, Fitch), exchange price data via Yahoo, Polymarket prices, BofA Global FMS results. A dated T1 fact can change a signal's color on its own.
- T2 Wire and major financial press: Reuters, Bloomberg, Financial Times, WSJ, AP, CNBC, Nikkei, Japan Times. A T2 item dated within 7 days can change a color.
- T3 Specialist with domain expertise: SemiAnalysis, TrendForce, The Information, Data Center Dynamics, GlobalCapital, Asset Securitization Report, Structured Finance Association, TechCrunch, Axios, Epoch AI, FactSet Insight, GPU price indices (Silicon Data, Ornn, GetDeploying, Lambda list prices). Can change a color only inside their domain (e.g. TrendForce for memory prices, Silicon Data for GPU rentals).
- T4 Secondary and aggregators: Yahoo-syndicated pieces of unknown origin, Motley Fool, 24/7 Wall St, Benzinga, GuruFocus, Seeking Alpha news, TipRanks, MarketBeat, Investing.com summaries, KuCoin/Binance and other crypto news sites, MT Newswires "Market Chatter", Substacks and personal blogs, X posts. Leads only. A figure that exists only in T4 sources is UNVERIFIED and cannot change a color; find the T1-T3 original or drop it.
- T5 Interested parties: companies talking about their own prospects (Nvidia, Oracle, OpenAI, SoftBank, CoreWeave), CEO remarks, short sellers (Burry, Chanos), sell-side strategists whose banks underwrite AI debt and IPOs (Goldman, Morgan Stanley, JPMorgan, BofA), vendor blogs (Thunder Compute, Lambda, neocloud pricing posts), tracker sites with paid tiers (aibubble.watch), committed bull or bear publishers (Wedbush/Ives; Where's Your Ed At; Capital Economics' public 2027 call; Kobeissi Letter). Always OPINION. Quote with an incentive tag, never as HARD DATA, even when the number inside is plausible.
Incentive tags to attach to any T5 quote and to any T2-T4 piece whose framing is one-sided: [long-AI incentive] [short-AI incentive] [engagement incentive: bubble headline] [conflicted: underwriter and strategist] [tracker sells subscriptions]. Media headlines saying "bubble popping" or "not a bubble" are narrative data for Pillar E, not evidence for Pillars A-D.
Conflict rule: when sources disagree, prefer the higher tier; at equal tier report both with dates. Never let a T4 or T5 source overturn a T1 fact.
In the brief, add a line "Sources: T1 n, T2 n, T3 n, T4 n (leads only), T5 n (opinion)" under Data quality and list every claim that rests only on T4/T5.

# Signal framework and thresholds
Score every signal GREEN / YELLOW / RED. Where the threshold says "baseline", use the baseline value below.

Pillar A, price (Stage 1):
A1 NVDA drawdown from 52w high: <15% G, 15-25% Y, >25% R
A2 SOX drawdown: <10% G, 10-20% Y, >20% R
A3 Nasdaq-100 drawdown: <10% G, 10-20% Y, >20% R
A4 Rotation, AI leaders vs RSP over 20 trading days: leaders ahead G, lag 5-10 pts Y, lag >10 pts while RSP flat/up R
A5 VIX: <20 G, 20-30 Y, >30 R
A6 Single-day rout: none G; NVDA or SOX -5% in a day Y; NVDA -10% or SOX -8% in a day, or two -5% days in one week R

Pillar B, capex and guidance (Stages 3-4, the true confirmation):
B1 Hyperscaler capex guidance (MSFT, GOOGL, AMZN, META, ORCL): raised/maintained G; one trims or uses "digestion"/"moderating" language Y; two or more cut 2027 guidance or any announces a pause R
B2 Data-center pauses/lease cancellations: none credible G; analyst reports Y; company-confirmed pause at a hyperscaler, Stargate, xAI or top neocloud R
B3 Nvidia results vs consensus: beat and raise G; in line / sharp deceleration Y; miss, guide below, or sequential data-center decline R
B4 Supply chain (TSMC monthly revenue, DRAM/HBM contract prices, server ODM orders): growing, prices firm G; TSMC YoY growth halves or memory flat Y; TSMC YoY negative, memory falling, ODM cuts R

Pillar C, financing and credit (Stage 5):
C1 Oracle 5y CDS, absolute bands: <150bp G; 150-250bp Y; >250bp R. Use only a print with a date; if none is found, carry the last dated value, mark it stale, and keep the prior color.
C2 HY tech yield minus 10y (whalequant): <3.5% G; 3.5-5.0% Y; >5.0% R
C3 US HY OAS (FRED): <350bp G; 350-500 Y; >500 R
C4 AI debt deal reception: oversubscribed G; repriced wider, downsized or delayed Y; pulled deal, covenant breach, downgrade to junk, or private-credit fund gating redemptions R
C5 Neoclouds (CRWV, NBIS, IREN, APLD): stable G; CRWV -30% from high or bonds <90 Y; bonds <80, going-concern language, or a peer default R

Pillar D, demand and revenue validation (Stages 2-3):
D1 OpenAI/Anthropic/xAI run-rate growth: still doubling G; growth rate halves or targets reportedly missed Y; flat/down or layoffs at a top lab R
D2 Private pricing: rounds oversubscribed G; secondaries 10-20% below last round or a round/IPO delayed Y; down round at a top-5 lab, secondaries >25% below, or tender cancelled R
D3 H100 rental price, 3-month change: flat/up G; -15 to -30% Y; <-30% or idle-capacity reports R
D4 Enterprise adoption: seat/usage growth accelerating G; flat growth or negative ROI studies Y; disclosed seat declines or major customers cutting AI budgets R
D5 AI-startup casualties: isolated G; several notable shutdowns in a month Y; a wave, or secondhand GPU glut R

Pillar E, sentiment and narrative (coincident, not confirmation):
E1 BofA FMS "AI bubble" tail-risk share: <30% G; 30-45% Y; >45% with rising cash R
E2 Google Trends "AI bubble" vs 12-month average: <1.5x G; 1.5-3x Y; >3x / new high R
E3 Composite trackers: disagreeing G; two of three deteriorating Y; all three deteriorating or boomorbubble >= 2 red gauges R
E4 Insider selling / IPO froth: normal G; record insider sales or day-one doublings Y; IPO withdrawals R

Pillar F, macro transmission (amplifier, added Sep 17; does NOT set the stage):
F1 10-year Treasury yield level: <4.5% G; 4.5-5.25% Y; >5.25% R
F2 Bond volatility, MOVE index (^MOVE): <100 G; 100-130 Y; >130 R
F3 Term premium (FRED THREEFYTP10, latest available) or Treasury auction reception: <0.5% G; 0.5-1.0%, or one tailed 10y/30y auction, Y; >1.0%, or two consecutive tailed auctions, R
F4 Inflation regime: 10y breakeven (FRED T10YIE) <2.4% and Brent <$80 and headline CPI <3% G; any of breakeven 2.4-2.7%, Brent $80-100, headline CPI 3-4% Y; breakeven >2.7% (expectations unanchoring), or Brent >$100 together with headline CPI >4%, R
F5 Fed path: cuts priced over the next 12 months G; 1-2 hikes priced Y; 3 or more hikes priced, or a 2027 median dot above 4.5%, R

Stage rule: Stage 0 Boom intact = no reds, <=2 yellows, none in B/C. Stage 0+ Stress building = no reds but 3+ yellows or any yellow in B/C. Stage 1 = any red in A. Stage 2 = red in D2 or E4. Stage 3 = red in D1, D3 or B3. Stage 4 Capex cliff = red in B1 or B2 (this is when "the bubble is popping" becomes the right headline). Stage 5 = red in C1, C4 or C5.
Macro amplifier rule: Pillar F never changes the stage (bubbles are confirmed by capex, revenue and credit facts, not by rates). Compute "Macro amplifier" = LOW if F has 0 red and at most 1 yellow; MEDIUM if 0 red and 2+ yellow, or exactly 1 red; HIGH if 2+ red. When HIGH, say so in the verdict, shorten the Watch-next horizon to the coming week, and flag the rate-sensitive signals (C1, C4, C5, D2) as at elevated risk of flipping.

# Baseline, September 15, 2026 (compare every reading to this)
Stage 1 (Price break in the infrastructure layer, unconfirmed): 1 red (A2), 8 yellow (A4, A6, B2, C1, C4, C5, D2, E4), 11 green.
Prices at the Sep 14, 2026 close (52-week high in parentheses, then % below it): NVDA 210.96 (235.74, -10.5%); MSFT 505.41 (-6.8%); GOOGL 349.39 (-13.2%); AMZN 253.54 (-10.7%); META 665.60 (-14.7%); ORCL 144.79 (328.15, -55.9%); AVGO 344.72 (481.57, -28.4%); AMD 493.41 (-15.1%); CRWV 82.98 (143.08, -42.0%); PLTR 173.31 (-16.4%); TSM 418.01 (-12.5%); MU 924.03 (1,213.56, -23.9%); SMCI 36.74 (-37.4%); DELL 534.28 (-5.8%, +324% YTD); VRT 237.39 (-36.9%); ARM 239.01 (-45.6%); SoftBank 9984.T 5,839 yen (8,632, -32.4%). Indices: S&P 500 7,619.98 (7,798.99, -2.3%); Nasdaq-100 29,127 (30,661, -5.0%); SOX 11,131 (14,635 on Jun 22, -23.9%, fell 5.9% on Sep 14 alone); Russell 2000 -5.7% from high; VIX 17.1.
Valuation: NVDA forward P/E 23.3x on Yahoo's fiscal-year basis or ~17.6x next-12-months (trailing 26.8x); S&P 500 forward P/E 19.1x (FactSet, Sep 11); Shiller CAPE 40.7 (1999 peak 44.2); Mag 7 = 34.1% of S&P 500, top 10 = 38.2%; Nasdaq-100 P/E 29.2 (boomorbubble).
Rates and macro: the Fed hiked 25bp on Sep 16 to 3.75-4.00%, unanimous, first hike since 2023; dots show one more hike in 2026 and no cuts through 2027 (median 4.1% both years, longer-run 3.2%); Warsh gave no guidance and attributed rising long yields partly to "competition for capital" from hyperscalers; futures price ~4.1% by Dec 2026 and ~4.5% by Sep 2027; next FOMC Oct 27-28. 10y Treasury closed 5.01% on Sep 16 (5.04% intraday high on Sep 15, highest since 2007), 30y ~5.33%. Aug CPI +3.4% headline, core +2.4%; unemployment 4.1%; Brent ~$108 (+78% YTD). US HY OAS 271bp (FRED, Sep 14); IG OAS 80bp.
Sep 16 close after the hike: S&P 500 7,552 (-0.45%), Dow -1.2% (banks -2.9%), Nasdaq flat, SOX 11,246 (+0.6%, -23.2% from high), NVDA ~$214, VIX 17.7, dollar +0.6%.
Sentiment: Google Trends "AI bubble" = 27 for the week of Sep 13 vs 12-month weekly average 45 (0.6x; peak 100 in Nov 2025, 84 in late May 2026); GDELT 7-day "AI bubble" article volume at 46% of its 12-month mean; Google News RSS 96+ items in 7 days, 21 on Sep 14 alone. CNN Fear & Greed 28.7 "Fear" (64 a month ago). AAII bears 39.3% vs bulls 38.0%.
Credit: Oracle 5y CDS last DATED prints are ~203bp (late July, LSEG via FT) and a record ~212-215bp (Aug 8); 144bp at the start of 2026; NO verified September print existed as of Sep 17, so a September figure without a dated source is UNVERIFIED. Oracle stock rose ~6% on Sep 17 on reports (Bloomberg Sep 15, CNBC Sep 16) that investors approached OpenAI about a round at $1.2T or more, which would ease Oracle's counterparty risk if it closes. SoftBank closed an $11.87B two-year bank loan from ~20 banks on Sep 13-14, upsized from a $10B target (a relationship-bank signal, weaker than a bond print), while SoftBank CDS hit a three-year high the same week; HY tech minus 10y spread 2.51% (Sep 14, "low risk"); hyperscaler bond issuance ~$220B YTD, cover ratios down from ~5x to <2x, 78 of 91 bonds trading wider than issue; CoreWeave 5y bonds ~13% yield, total debt $35B; Oracle rated BBB- (S&P), FY26 FCF -$23.7B, Q1 FY27 FCF -$5B.
Capex: 2026 guidance Amazon ~$220B, Alphabet $195-205B, Meta $130-145B (raised), Microsoft >$50B/quarter, Oracle $90-95B gross; combined ~$730B; no cuts. Analyst-only reports of possible data-center delays (Kimmeridge Aug 26); Texas approvals audit. No company-confirmed pauses.
Demand: Nvidia Q2 FY27 revenue $96.2B (+106%), Q3 guide $108B vs $104.2B consensus, supply-constrained through FY28. TSMC August revenue +53.3% YoY, record. Broadcom AI semis +221% but Q4 guide ~1% light. Dell $95B AI backlog; SMCI FY27 guide $65-72B. Anthropic run-rate $65B (Aug); OpenAI >$40B (Aug), +35% QTD. Copilot paid seats 30M (from 20M). H100 on-demand ~$2.50/hr (about -70% from peak); B200 scarce. LLM token price index -60% in Q2.
Private markets: OpenAI ruled out a 2026 IPO on Sep 12 ("ill-advised"); Aug 10 tender at the full $852B price; Anthropic valued ~$965B, IPO targeted fall 2026; Cursor sold to SpaceX at $60B. No down rounds.
Fund managers: BofA FMS Sep 15: "disorderly rise in bond yields" #1 tail risk (33%), AI bubble #2 at 28%; cash 3.9%; record net 33% say companies are over-investing; 42% see hyperscaler capex as the likeliest credit-event source; Aug: AI bubble #1 at 32%, long-semis crowding fell 82% to 53%; equity overweight fell 56% to 49%. Trackers: aibubble.watch 86 "Extreme" (flat for a week); aibubblemonitor.com 49 "Neutral"; boomorbubble.ai "Boom" 0/5 red (Capex/GDP 0.9%, Investment/Revenue 3.6, Nasdaq-100 P/E 29.2, funding quality 1.6 "caution and worsening"). Polymarket "burst by Dec 31, 2026" ~16%. Nvidia insiders sold $839M, bought none, in 3 months.
Macro (Pillar F) readings on Sep 17, 2026: 10y 4.95% (5.01% Sep 16 close), 30y 5.35%; MOVE 76.2 (52-week range 56-115); term premium 0.96% (Sep 11, 12-month high, was 0.82% in early August); 10y breakeven 2.33% (anchored); Brent ~$104; Aug headline CPI 3.4%, core 2.4%; futures ~4.1% by Dec 2026 and ~4.5% by Sep 2027 (about 2.5 hikes), dots 4.1% for 2026 and 2027. Colors: F1 Y, F2 G, F3 Y, F4 Y, F5 Y. Macro amplifier: MEDIUM.
Catalysts that drove the Sep 10-15 headline surge: Capital Economics "late-stage bubble" report (Sep 10); Amodei essay "We Must Pace the Frontier" and Altman IPO delay (Sep 12); Sep 14 rout; Nvidia, Palantir and Booz Allen restricting Anthropic models over data retention (Sep 14); Burry calling the slowdown talk "self-serving."

# Known upcoming dates (check if they have passed and what happened)
SoftBank's $10-20B USD/EUR high-yield bond for its OpenAI stake: roadshow Sep 14-17, unpriced as of Sep 17; pricing wide of ~8.5%, a downsizing, or a pulled deal turns C4 red. Sep 30: Micron fiscal Q4 results. Oct 27-28: FOMC. ~Oct 10: TSMC September revenue. Mid-Oct: BofA October FMS. Late Oct: Microsoft, Alphabet, Amazon, Meta Q3 earnings (capex guidance is the single most important read). Mid/late Nov: Nvidia Q3 FY27. Anthropic IPO filing timing. Oracle's planned ~$40B FY27 debt and equity raise.

# Delivery
Always send the brief with the PushNotification tool if it is available, every run, whether or not anything changed: the message should start with the Verdict line, then the one-paragraph read, then the Top 3 developments, then the Data quality line. Then also print the full brief as your final message.

# Output format (use exactly these headings, keep the whole brief under 700 words)
## AI Bubble Check, <date>
**Verdict:** <Stage label> | Reds: <n> | Yellows: <n> (Pillars A-E only) | Macro amplifier: <LOW / MEDIUM / HIGH> | Change vs baseline: <better / same / worse> | Change vs yesterday if determinable: <one line>
**One-paragraph read:** 3-5 sentences on what actually moved and whether it matters for the stage.
## Signals that changed color
Table: Signal | Was (baseline) | Now | Evidence + URL. Say "none" if none changed.
## Scoreboard
One line per pillar A through F: pillar name, then each signal as "A1 G", "A2 Y" etc., then the key number driving any yellow or red. Pillar F's line ends with the amplifier level.
## Top 3 developments (last 24-48h)
Each: date, HARD DATA or OPINION, the specific number or fact, source URL, one sentence on why it matters.
## Absences worth noting
What you looked for and did not find (capex cuts, down rounds, pauses, pulled deals).
## Watch next
The specific events or thresholds in the next 48 hours to 2 weeks that would flip a signal to red.
## Data quality
Which values are verified (dated source), approximate, UNVERIFIED (no date or stale), or not found; list every blocked source; then the Sources tier count line and any T4/T5-only claims.
