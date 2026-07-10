const DB_URL='https://ymdhxqaeywktvnalrbvl.supabase.co/rest/v1/ideas';
const DB_KEY='sb_publishable_ucgevxmugcFAMWNZZbVzJA_7FDjvXdq';
const DB_HEADERS={apikey:DB_KEY,Authorization:'Bearer '+DB_KEY,'Content-Type':'application/json'};

async function dbRequest(path='',options={}){
  const response=await fetch(DB_URL+path,{...options,headers:{...DB_HEADERS,...(options.headers||{})}});
  if(!response.ok){const text=await response.text();throw new Error(text||('HTTP '+response.status));}
  if(response.status===204)return null;
  const text=await response.text();return text?JSON.parse(text):null;
}

function decodeMeta(value){
  const raw=String(value||'');
  const parts=raw.split('|');
  return {environment:parts[0]||'',level:parts[1]||'',type:parts[2]||''};
}
function labelMeta(meta,duration){
  const labels={outdoor:'draußen',indoor:'indoor',both:'drinnen & draußen',low:'wenig Aktivität',high:'viel Aktivität',excursion:'Ausflug',playground:'Spielplatz',food:'Restaurant',ice:'Eis',swimming:'Baden',animals:'Tiere',nature:'Natur',culture:'Kultur/Museum',short:'kurz',long:'lang'};
  return [meta.environment,meta.level,meta.type,duration].filter(Boolean).map(x=>labels[x]||x).join(' · ');
}

async function loadIdeas(){
  setStatus('Lade gemeinsame Ideen …',false);
  try{
    const query='?select=*&week=eq.'+encodeURIComponent(currentWeek)+'&order=created_at.desc';
    const data=await dbRequest(query);
    const enriched=(data||[]).map(x=>{
      const meta=decodeMeta(x.category);
      const prefix=labelMeta(meta,x.duration);
      return {...x,description:(prefix?prefix+'\n':'')+(x.description||'')};
    });
    const target=document.getElementById('shared-ideas');
    if(target)target.innerHTML=enriched.length?enriched.map(x=>card(x,true)).join(''):'<div class="card muted">Noch keine gemeinsamen Ideen.</div>';
    setStatus('Synchronisiert',true);
  }catch(error){
    const target=document.getElementById('shared-ideas');
    if(target)target.innerHTML='<div class="card"><b>Synchronisierung fehlgeschlagen.</b><p class="muted">'+escapeHtml(error.message)+'</p></div>';
    setStatus('Fehler',false);console.error('Supabase REST error',error);
  }
}

async function addIdea(){
  const title=document.getElementById('f-title').value.trim();
  if(!title)return alert('Bitte Titel eingeben.');
  const category=[document.getElementById('f-env').value,document.getElementById('f-level').value,document.getElementById('f-type').value].join('|');
  const row={week:currentWeek,title,icon:document.getElementById('f-icon').value,category,duration:document.getElementById('f-duration').value,description:document.getElementById('f-desc').value.trim(),maps_url:document.getElementById('f-link').value.trim()};
  try{
    await dbRequest('',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify(row)});
    document.getElementById('f-title').value='';document.getElementById('f-desc').value='';document.getElementById('f-link').value='';
    await loadIdeas();
  }catch(error){alert('Speichern fehlgeschlagen: '+error.message)}
}

async function deleteIdea(id){
  if(!confirm('Kachel wirklich löschen?'))return;
  try{await dbRequest('?id=eq.'+encodeURIComponent(id),{method:'DELETE',headers:{Prefer:'return=minimal'}});await loadIdeas();}
  catch(error){alert('Löschen fehlgeschlagen: '+error.message)}
}
function escapeHtml(value){return String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));}
