(async function(){
  const $ = (id)=>document.getElementById(id);
  const esc = (s)=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const chip = (c)=> c==='N' ? `<span class="chip n">Not scored</span>` : `<span class="chip ${c==='R'?'r':c==='Y'?'y':'g'}">${c==='R'?'Red':c==='Y'?'Yellow':'Green'}</span>`;
  const fmt = (v,d=1,suf='')=> (v===null||v===undefined||isNaN(v)) ? '—' : (Number(v).toFixed(d)+suf);
  const fmtDate = (iso)=>{const d=new Date(iso+'T12:00:00Z');return d.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:'UTC'});};
  let runs, events, fw;
  try{
    [runs, events, fw] = await Promise.all(['data/runs.json','data/events.json','data/framework.json'].map(u=>fetch(u,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(u+' '+r.status);return r.json();})));
  }catch(e){ $('now-body').innerHTML=`<div class="err">Could not load data: ${esc(e.message)}</div>`; return; }
  runs.sort((a,b)=>a.date<b.date?-1:1);
  const latest = runs[runs.length-1], prev = runs.length>1?runs[runs.length-2]:null, base = runs[0];
  const stageName = (n)=>{const s=fw.stages.find(x=>x.n===n);return s?s.name:('Stage '+n);};

  // live line
  $('live').innerHTML = `Last run <b>${esc(fmtDate(latest.date))}</b> &middot; ${runs.length} trading days on record`;

  // NOW
  const ampClass = latest.amplifier==='HIGH'?'r':latest.amplifier==='MEDIUM'?'y':'g';
  const stageClass = latest.stage>=4?'r':latest.stage>=1?'y':'g';
  const circClass = latest.circularity==='BREAKING'?'r':latest.circularity==='HIGH'?'y':latest.circularity?'g':'';
  const changedHtml = (latest.changed&&latest.changed.length)
    ? `<ul class="changed">${latest.changed.map(c=>`<li><b>${esc(c.signal)}</b> ${chip(c.from)} &rarr; ${chip(c.to)} &middot; ${esc(c.why)}</li>`).join('')}</ul>`
    : `<p class="small" style="margin-top:8px">No signal changed color in the latest run.</p>`;
  $('now-body').innerHTML = `
    <p class="lead">Stage ${latest.stage} of 5: ${esc(latest.stage_label||stageName(latest.stage))}.</p>
    <div class="now-grid">
      <div class="kpi"><div class="k">Stage</div><div class="v ${stageClass}">${latest.stage}</div><div class="s">${esc(stageName(latest.stage))}</div></div>
      <div class="kpi"><div class="k">Signals, A to E</div><div class="v"><span class="r">${latest.reds}</span> <span style="color:var(--muted);font-size:18px">red</span> <span class="y">${latest.yellows}</span> <span style="color:var(--muted);font-size:18px">yellow</span></div><div class="s">${latest.greens} green of 24</div></div>
      <div class="kpi"><div class="k">Macro amplifier</div><div class="v ${ampClass}" style="font-size:24px;padding-top:6px">${esc(latest.amplifier||'—')}</div><div class="s">${esc(latest.amplifier_note||'Pillar F: rates, bond volatility, term premium, inflation, Fed path')}</div></div>
      <div class="kpi"><div class="k">Circularity</div><div class="v ${circClass}" style="font-size:24px;padding-top:6px">${esc(latest.circularity||'—')}</div><div class="s">${esc(latest.circularity_note||'Pillar G: insider funding share, loop cash gap, filing fingerprints, growth outside the loop')}</div></div>
      <div class="kpi"><div class="k">As of</div><div class="v" style="font-size:22px;padding-top:8px">${esc(fmtDate(latest.date))}</div><div class="s">${latest.as_of==='close'?'US close':esc(latest.as_of||'')}${latest.run_url?` &middot; <a href="${esc(latest.run_url)}">run</a>`:''}</div></div>
    </div>
    <p style="margin-top:12px;max-width:80ch">${esc(latest.read||'')}</p>
    <div class="eyebrow" style="margin-top:14px">Changed since previous run</div>
    ${changedHtml}
    ${latest.top&&latest.top.length?`<div class="eyebrow" style="margin-top:14px">Top developments</div><ul class="changed">${latest.top.map(t=>`<li><span class="mark ${t.kind==='HARD'?'hot':''}" style="margin-left:0;margin-right:6px">${esc(t.kind)}</span>${esc(t.t)}${t.url?` <a href="${esc(t.url)}">source</a>`:''}</li>`).join('')}</ul>`:''}
  `;

  // SPARKLINES
  const spark = (key, label, fmtFn, invert=false)=>{
    const pts = runs.map(r=>r.market&&r.market[key]!=null?Number(r.market[key]):null);
    const vals = pts.filter(v=>v!==null);
    if(!vals.length) return '';
    const W=240,H=48,P=4; const min=Math.min(...vals), max=Math.max(...vals); const span=(max-min)||1;
    const x=(i)=>P+(runs.length===1?W/2:(i*(W-2*P)/(runs.length-1)));
    const y=(v)=>P+(H-2*P)*(1-(v-min)/span);
    let d='', first=true, circles='';
    pts.forEach((v,i)=>{ if(v===null) return; d+=(first?'M':'L')+x(i).toFixed(1)+' '+y(v).toFixed(1)+' '; first=false; });
    const li=pts.length-1; const lastV=pts[li];
    if(lastV!==null) circles=`<circle cx="${x(li).toFixed(1)}" cy="${y(lastV).toFixed(1)}" r="3.5" fill="var(--accent)"/>`;
    return `<div class="spark"><div class="k">${esc(label)}</div><svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img" aria-label="${esc(label)} trend"><path d="${d.trim()}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>${circles}</svg><div class="last">${fmtFn(lastV)} <span style="color:var(--muted)">&middot; range ${fmtFn(min)} to ${fmtFn(max)}</span></div></div>`;
  };
  const yellowsSpark = (()=>{ const fake = runs.map(r=>({market:{yl:r.yellows+r.reds*3}})); return ''; })();
  $('sparks').innerHTML = [
    spark('sox_dd','SOX drawdown from high',v=>fmt(v,1,'%')),
    spark('nvda_dd','Nvidia drawdown from high',v=>fmt(v,1,'%')),
    spark('tnx','10-year yield',v=>fmt(v,2,'%')),
    spark('hy_oas','High-yield OAS',v=>fmt(v,0,' bp')),
  ].join('');

  // TREND TABLE
  const trendRows = [...runs].reverse().map(r=>{
    const m=r.market||{};
    const note = r.changed&&r.changed.length ? r.changed.map(c=>`${c.signal} ${c.from}&rarr;${c.to}`).join(', ') : (r.top&&r.top[0]?esc(r.top[0].t).slice(0,90)+(r.top[0].t.length>90?'&hellip;':''):'');
    return `<tr><td>${esc(fmtDate(r.date))}</td><td>${r.stage}</td><td style="color:var(--r)">${r.reds}</td><td style="color:var(--y)">${r.yellows}</td><td class="amp">${esc(r.amplifier||'—')}</td><td class="amp">${esc(r.circularity||'—')}</td><td>${fmt(m.sox_dd,1,'%')}</td><td>${fmt(m.nvda_dd,1,'%')}</td><td>${fmt(m.tnx,2,'%')}</td><td>${fmt(m.hy_oas,0)}</td><td>${fmt(m.vix,1)}</td><td>${fmt(m.move,0)}</td><td class="note">${note}</td></tr>`;
  }).join('');
  $('trend').innerHTML = `<thead><tr><th>Date</th><th>Stage</th><th>Red</th><th>Yellow</th><th>Amplifier</th><th>Circularity</th><th>SOX dd</th><th>NVDA dd</th><th>10y</th><th>HY OAS</th><th>VIX</th><th>MOVE</th><th>Changed / driver</th></tr></thead><tbody>${trendRows}</tbody>`;

  // SCOREBOARD
  let sb='<thead><tr><th>#</th><th>Signal</th><th>Reading</th><th>Status</th><th>Thresholds</th></tr></thead><tbody>';
  for(const p of fw.pillars){
    sb += `<tr class="pillar"><th colspan="5">${esc(p.id)} &middot; ${esc(p.name)}. ${esc(p.role)}</th></tr>`;
    for(const s of p.signals){
      const cur = latest.signals?.[s.id]; const was = base.signals?.[s.id]; const pv = prev?.signals?.[s.id];
      let marks='';
      if(was && cur && was.c!==cur.c) marks += `<span class="mark hot">vs baseline ${esc(was.c)}&rarr;${esc(cur.c)}</span>`;
      if(pv && cur && pv.c!==cur.c) marks += `<span class="mark hot">vs prev ${esc(pv.c)}&rarr;${esc(cur.c)}</span>`;
      sb += `<tr><td class="id">${esc(s.id)}</td><td>${esc(s.name)}</td><td class="val">${esc(cur?.v||'—')}</td><td>${cur?chip(cur.c):'<span class="chip n">n/a</span>'}${marks}</td><td class="note">Green ${esc(s.g)} &middot; Yellow ${esc(s.y)} &middot; Red ${esc(s.r)}</td></tr>`;
    }
  }
  $('score').innerHTML = sb+'</tbody>';

  // EVENT LOG
  const evSorted=[...events].sort((a,b)=>a.date<b.date?1:-1);
  const renderLog=(n)=>{ $('log').innerHTML = evSorted.slice(0,n).map(e=>`<li><span class="d">${esc(e.date)}</span><div><span class="kind ${esc(e.type)}">${esc(e.type)}</span>${e.tier?`<span class="mark" style="margin-left:0;margin-right:6px">${esc(e.tier)}</span>`:''}${esc(e.t)}${e.url?` <a href="${esc(e.url)}">source</a>`:''}${e.tag?`<div class="small">${esc(e.tag)}</div>`:''}${e.signals&&e.signals.length?`<div class="small">Signals: ${e.signals.map(esc).join(', ')}</div>`:''}</div></li>`).join(''); };
  renderLog(30);
  if(evSorted.length>30){ $('log-more').hidden=false; $('log-more').onclick=()=>{renderLog(evSorted.length); $('log-more').hidden=true;}; }

  // CALENDAR
  $('cal').innerHTML = (fw.calendar||[]).map(c=>`<li><span class="d">${esc(c.when)}</span><div>${esc(c.what)}</div></li>`).join('');

  // FRAMEWORK REFERENCE
  let fb = `<h3>Stages and the dot-com template</h3><div class="tblwrap"><table class="stagetbl"><thead><tr><th>Stage</th><th>Rule</th><th>Dot-com analogue</th></tr></thead><tbody>${fw.stages.map(s=>`<tr><td><b>${s.n} &middot; ${esc(s.name)}</b></td><td>${esc(s.rule)}</td><td>${esc(s.dotcom||'')}</td></tr>`).join('')}</tbody></table></div>`;
  fb += `<h3>Macro amplifier</h3><p>${esc(fw.amplifier.rule)}</p>`;
  if(fw.circularity) fb += `<h3>Circularity</h3><p>${esc(fw.circularity.rule)}</p>`;
  fb += `<h3>Source register</h3><div class="tblwrap"><table><thead><tr><th>Tier</th><th>What</th><th>May it change a color?</th><th>Examples</th></tr></thead><tbody>${fw.source_tiers.map(t=>`<tr><td class="id">${esc(t.tier)}</td><td>${esc(t.name)}</td><td>${esc(t.can)}</td><td class="note">${esc(t.examples)}</td></tr>`).join('')}</tbody></table></div>`;
  fb += `<h3>Changelog</h3><ul class="log">${(fw.changelog||[]).map(c=>`<li><span class="d">${esc(c.date)}</span><div>${esc(c.t)}</div></li>`).join('')}</ul>`;
  fb += `<p class="small" style="margin-top:14px">Full definitions: <a href="docs/ai-bubble-signal-framework.md">framework document</a> &middot; <a href="docs/routine-prompt.md">the routine's prompt</a>.</p>`;
  $('framework-body').innerHTML = fb;

  // BASELINE REFERENCE (static HTML fragment)
  try{ const r=await fetch('assets/reference.html',{cache:'no-store'}); $('baseline-body').innerHTML = r.ok ? await r.text() : '<p class="small">Reference unavailable.</p>'; }catch(e){ $('baseline-body').innerHTML='<p class="small">Reference unavailable.</p>'; }
})();
