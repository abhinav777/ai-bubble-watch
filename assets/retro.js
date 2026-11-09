(async function(){
  const $ = (id)=>document.getElementById(id);
  const esc = (s)=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const fmtDate = (iso)=>{const d=new Date(iso+'T12:00:00Z');return d.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:'UTC'});};
  let runs, concerns, fw;
  try{
    [runs, concerns, fw] = await Promise.all(['data/runs.json','data/concerns.json','data/framework.json'].map(u=>fetch(u,{cache:'no-store'}).then(r=>{if(!r.ok)throw new Error(u+' '+r.status);return r.json();})));
  }catch(e){ $('retro').innerHTML=`<div class="err">Could not load data: ${esc(e.message)}</div>`; return; }
  runs.sort((a,b)=>a.date<b.date?-1:1);
  const latest = runs[runs.length-1];
  $('live').innerHTML = `${AIBW.throughHTML(latest)} &middot; ${concerns.length} concerns logged`;

  const today=new Date(latest.date+'T12:00:00Z'); const ago=(d)=>Math.round((today-new Date(d+'T12:00:00Z'))/86400000);
  const stChip=(s)=>({materialized:'<span class="chip r">Materialized</span>',partly:'<span class="chip y">Partly</span>',did_not:'<span class="chip g">Did not</span>',expired:'<span class="chip n">Expired</span>',open:'<span class="chip n">Open</span>'})[s]||esc(s);
  const item=(c)=>`<li><span class="d">${esc(c.opened)}</span><div>${stChip(c.status)} ${esc(c.concern)}${c.signals&&c.signals.length?` <span class="mark">${c.signals.map(esc).join(', ')}</span>`:''}${c.outcome?`<div class="small"><b>${c.resolved?esc(fmtDate(c.resolved)):''}.</b> ${esc(c.outcome)}${c.url?` <a href="${esc(c.url)}">source</a>`:''}</div>`:(c.status==='open'?`<div class="small">Settles by ${esc(c.deadline?fmtDate(c.deadline):'—')}: ${esc(c.resolve_if||'')}</div>`:'')}</div></li>`;
  const counts={}; concerns.forEach(c=>{counts[c.status]=(counts[c.status]||0)+1;});
  const settledN=(counts.materialized||0)+(counts.partly||0)+(counts.did_not||0)+(counts.expired||0);
  let lo=23,hi=37; let month=concerns.filter(c=>{const a=ago(c.opened);return a>=lo&&a<=hi;});
  if(month.length<3){lo=16;hi=45;month=concerns.filter(c=>{const a=ago(c.opened);return a>=lo&&a<=hi;});}
  const recent=concerns.filter(c=>c.status!=='open'&&c.resolved&&ago(c.resolved)<=14).sort((a,b)=>a.resolved<b.resolved?1:-1);
  const openL=concerns.filter(c=>c.status==='open').sort((a,b)=>(a.deadline||'9')<(b.deadline||'9')?-1:1);
  const all=concerns.slice().sort((a,b)=>a.opened<b.opened?1:(a.opened>b.opened?-1:(a.id<b.id?1:-1)));

  let sc='',prevStage=null;
  runs.forEach((r,i)=>{ if(prevStage!==null&&r.stage===prevStage) return; prevStage=r.stage;
    const f=(k,n)=>{const j=Math.min(i+n,runs.length-1); const a=r.market&&r.market[k], b=runs[j].market&&runs[j].market[k]; return (a&&b)?((b/a-1)*100).toFixed(1)+'%':'—';};
    const hy=(n)=>{const j=Math.min(i+n,runs.length-1); const a=r.market&&r.market.hy_oas, b=runs[j].market&&runs[j].market.hy_oas; return (a!=null&&b!=null)?((b-a>=0?'+':'')+(b-a).toFixed(0)+' bp'):'—';};
    const have=runs.length-1-i;
    sc+=`<tr><td>${esc(fmtDate(r.date))}</td><td>${r.stage}</td><td>${f('spx',15)}</td><td>${f('sox',15)}</td><td>${f('orcl',15)}</td><td>${f('crwv',15)}</td><td>${hy(15)}</td><td class="note">${have<15?`${have} trading days of outcome so far`:''}</td></tr>`;
  });

  const reviews=(fw.reviews||[]).slice().sort((a,b)=>a.date<b.date?1:-1);

  $('retro').innerHTML = `
    <p class="small">${concerns.length} concerns logged since the baseline: <span class="r"><b>${counts.materialized||0}</b></span> materialized, <span class="y"><b>${counts.partly||0}</b></span> partly, <span class="g"><b>${counts.did_not||0}</b></span> did not, ${counts.expired||0} expired, ${counts.open||0} still open. Of the ${settledN} settled, ${settledN?Math.round(((counts.materialized||0)+(counts.partly||0))/settledN*100):0}% came true at least in part.</p>
    <div class="cols">
      <div><h3>About a month ago we worried about</h3>${month.length?`<ul class="log">${month.map(item).join('')}</ul>`:'<p class="small">No concerns were opened in that window.</p>'}</div>
      <div><h3>Settled in the last two weeks</h3>${recent.length?`<ul class="log">${recent.map(item).join('')}</ul>`:'<p class="small">Nothing settled in the last two weeks.</p>'}</div>
    </div>
    <h3>Still open, nearest deadline first</h3>${openL.length?`<ul class="log">${openL.map(item).join('')}</ul>`:'<p class="small">Nothing open.</p>'}
    <h3>Stage calls, and what followed over the next 15 trading days</h3>
    <div class="tblwrap"><table><thead><tr><th>Call date</th><th>Stage</th><th>S&amp;P 500</th><th>SOX</th><th>Oracle</th><th>CoreWeave</th><th>HY spread</th><th></th></tr></thead><tbody>${sc}</tbody></table></div>
    <p class="small">A stage is a claim about the next weeks. Stage 1 calls are expected to be noisy; a Stage 4 or 5 call that is not followed by a capex cut or wider credit stress is one the rules should be tightened on.</p>
    <h3>Reviews</h3>
    <p class="small">Periodic looks back at how the sources, the signals and the stage calls performed, with the rule changes that followed.</p>
    ${reviews.length?`<ul class="log">${reviews.map(r=>`<li><span class="d">${esc(r.date)}</span><div><a href="${esc(r.url)}">${esc(r.title)}</a>${r.note?` <span class="small">${esc(r.note)}</span>`:''}</div></li>`).join('')}</ul>`:'<p class="small">No reviews yet.</p>'}
    <details class="ref"><summary>Every concern, newest first (${concerns.length})</summary><ul class="log">${all.map(item).join('')}</ul></details>`;
})();
