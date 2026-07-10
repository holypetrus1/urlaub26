const DB_URL='https://ymdhxqaeywktvnalrbvl.supabase.co/rest/v1/ideas';
const DB_KEY='sb_publishable_ucgevxmugcFAMWNZZbVzJA_7FDjvXdq';
const DB_HEADERS={apikey:DB_KEY,Authorization:'Bearer '+DB_KEY,'Content-Type':'application/json'};

async function dbRequest(path='',options={}){
  const response=await fetch(DB_URL+path,{...options,headers:{...DB_HEADERS,...(options.headers||{})}});
  if(!response.ok){
    const text=await response.text();
    throw new Error(text||('HTTP '+response.status));
  }
  if(response.status===204)return null;
  const text=await response.text();
  return text?JSON.parse(text):null;
}

async function loadIdeas(){
  setStatus('Lade gemeinsame Ideen …',false);
  try{
    const query='?select=*&week=eq.'+encodeURIComponent(currentWeek)+'&order=created_at.desc';
    const data=await dbRequest(query);
    const target=document.getElementById('shared-ideas');
    if(target)target.innerHTML=data&&data.length?data.map(x=>card(x,true)).join(''):'<div class="card muted">Noch keine gemeinsamen Ideen.</div>';
    setStatus('Synchronisiert',true);
  }catch(error){
    const target=document.getElementById('shared-ideas');
    if(target)target.innerHTML='<div class="card"><b>Synchronisierung fehlgeschlagen.</b><p class="muted">'+escapeHtml(error.message)+'</p></div>';
    setStatus('Fehler',false);
    console.error('Supabase REST error',error);
  }
}

async function addIdea(){
  const title=document.getElementById('f-title').value.trim();
  if(!title)return alert('Bitte Titel eingeben.');
  const row={week:currentWeek,title,icon:document.getElementById('f-icon').value,category:document.getElementById('f-cat').value,duration:document.getElementById('f-duration').value,description:document.getElementById('f-desc').value.trim(),maps_url:document.getElementById('f-link').value.trim()};
  try{
    await dbRequest('',{method:'POST',headers:{Prefer:'return=minimal'},body:JSON.stringify(row)});
    document.getElementById('f-title').value='';
    document.getElementById('f-desc').value='';
    document.getElementById('f-link').value='';
    await loadIdeas();
  }catch(error){alert('Speichern fehlgeschlagen: '+error.message)}
}

async function deleteIdea(id){
  if(!confirm('Kachel wirklich löschen?'))return;
  try{
    await dbRequest('?id=eq.'+encodeURIComponent(id),{method:'DELETE',headers:{Prefer:'return=minimal'}});
    await loadIdeas();
  }catch(error){alert('Löschen fehlgeschlagen: '+error.message)}
}

function escapeHtml(value){return String(value).replace(/[&<>'"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));}
