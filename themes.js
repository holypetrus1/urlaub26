(()=>{
  const KEY='urlaub26-theme';
  const THEMES={
    classic:{color:'#5d7d61'},
    neon:{color:'#080b14'},
    glitter:{color:'#f8efff'},
    journal:{color:'#e9dfc8'}
  };
  const valid=theme=>Object.prototype.hasOwnProperty.call(THEMES,theme);
  const read=()=>{
    try{const saved=localStorage.getItem(KEY);return valid(saved)?saved:'classic'}catch{return 'classic'}
  };
  const apply=(theme,persist=false)=>{
    const next=valid(theme)?theme:'classic';
    document.documentElement.dataset.theme=next;
    const meta=document.querySelector('meta[name="theme-color"]');
    if(meta)meta.setAttribute('content',THEMES[next].color);
    document.querySelectorAll('.skin-select').forEach(select=>{select.value=next});
    if(persist){try{localStorage.setItem(KEY,next)}catch{}}
  };
  apply(read());
  window.addEventListener('DOMContentLoaded',()=>{
    apply(read());
    document.querySelectorAll('.skin-select').forEach(select=>{
      select.addEventListener('change',event=>apply(event.target.value,true));
    });
  });
})();
