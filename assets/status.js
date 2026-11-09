// Header status helpers shared by index.html and retro.html (also loadable in node for tests).
(function(root){
  const DAILY_HOUR=23, OVN_HOUR=13, DAY=86400000;           // routine slots, UTC, weekdays
  const pad=(n)=>String(n).padStart(2,'0');
  const isoUTC=(d)=>d.getUTCFullYear()+'-'+pad(d.getUTCMonth()+1)+'-'+pad(d.getUTCDate());
  const weekday=(d)=>{const w=d.getUTCDay();return w>=1&&w<=5;};
  const slotOn=(d,h)=>new Date(Date.UTC(d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate(),h));
  const lastSlot=(now,h)=>{let s=slotOn(now,h); if(s>now) s=new Date(s.getTime()-DAY); while(!weekday(s)) s=new Date(s.getTime()-DAY); return s;};
  const nextSlot=(now,h)=>{let s=slotOn(now,h); if(s<=now) s=new Date(s.getTime()+DAY); while(!weekday(s)) s=new Date(s.getTime()+DAY); return s;};
  const fmtDate=(iso)=>new Date(iso+'T12:00:00Z').toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric',timeZone:'UTC'});
  const esc=(s)=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  const localDay=(d,now)=>{                                  // today, tomorrow or a weekday name, in the viewer's zone
    const k=(x)=>x.toLocaleDateString('en-US',{year:'numeric',month:'2-digit',day:'2-digit'});
    if(k(d)===k(now)) return 'today';
    if(k(d)===k(new Date(now.getTime()+DAY))) return 'tomorrow';
    return d.toLocaleDateString('en-US',{weekday:'long'});
  };
  const localTime=(d)=>d.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',timeZoneName:'short'});

  // What the latest row covers, and whether the next scoring is due, running or late.
  function daily(latest, now){
    const slot=lastSlot(now,DAILY_HOUR), expected=isoUTC(slot);
    const scored = latest.date>expected || (latest.date===expected && latest.as_of!=='open');
    const out={through: latest.close_date||latest.date, pre: latest.as_of==='open', expected};
    if(scored){ const n=nextSlot(now,DAILY_HOUR); out.state='ok'; out.next=n; out.nextLabel=localDay(n,now)+', '+localTime(n); }
    else { const late=(now-slot)/60000; out.state = late<75 ? 'running' : 'late'; out.lateMinutes=Math.round(late); }
    return out;
  }
  // The morning overnight watch: today's heartbeat, else today's overnight event, else a missing report.
  function overnight(latest, status, events, now){
    if(!weekday(now)) return null;
    const today=isoUTC(now);
    if(latest && latest.date>=today && latest.as_of!=='open') return null;   // the day is scored
    const due=slotOn(now,OVN_HOUR);
    if(now<due) return null;
    const o=status&&status.overnight;
    if(o && o.date===today) return {state:o.result==='alert'?'alert':'quiet', time:o.last_run_utc?new Date(o.last_run_utc):null, note:o.note||''};
    const ev=(events||[]).filter(e=>e.type==='overnight'&&e.date===today);
    if(ev.length){ const t=ev[ev.length-1].t||''; return {state:'alert', time:null, note:t.length>150?t.slice(0,147).replace(/\s+\S*$/,'')+'…':t}; }
    if((now-due)/60000>45) return {state:'missing', time:null, note:'has not reported today'};
    return null;
  }
  const throughHTML=(latest)=> latest.as_of==='open'
    ? `Pre-close reading <b>${esc(fmtDate(latest.date))}</b>`
    : `Scored through <b>${esc(fmtDate(latest.close_date||latest.date))}</b> close`;
  function headerHTML(latest, nRuns, now){
    const d=daily(latest, now);
    const second = d.state==='ok' ? `Next scoring ${esc(d.nextLabel)}`
      : d.state==='running' ? `<span class="run">Scoring the ${esc(fmtDate(d.expected))} close now</span>`
      : `<span class="late">${esc(fmtDate(d.expected))} scoring is late</span>`;
    return `${throughHTML(latest)} &middot; ${second} &middot; ${nRuns} trading days`;
  }
  function stripHTML(latest, status, events, now){
    const o=overnight(latest,status,events,now);
    if(!o) return null;
    if(o.state==='missing') return {cls:'missing', html:`<span class="dot"></span><b>Overnight watch ${esc(o.note)}</b>`};
    const when=o.time?esc(localTime(o.time)):'this morning';
    return {cls:o.state, html:`<span class="dot"></span><b>Overnight watch ${when}</b><span>${esc(o.note)}</span>`};
  }
  const api={daily,overnight,headerHTML,stripHTML,throughHTML,fmtDate};
  if(typeof module!=='undefined'&&module.exports) module.exports=api; else root.AIBW=api;
})(typeof window!=='undefined'?window:globalThis);
