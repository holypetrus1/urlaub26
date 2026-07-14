(()=>{
  const previousTips=['Lützlower See','Großsteingrab Seehausen','Oberuckersee bei Warnitz'];
  W.w1.items.forEach(item=>{if(previousTips.includes(item.name))item.tip=false});

  W.w1.items.push(
    {
      icon:'🏊',name:'Haussee Polßen & Spielplatz',lat:53.1643,lng:13.9665,
      desc:'Tipp der Vermieterin: Von der Dorfstraße an der Kirche vorbei und links in den Weg „Seedrift“. Der kurze Spaziergang führt zu einer meist ruhigen, unbewachten Badestelle; ein kleiner Spielplatz liegt am Weg. Morgens und gegen Abend ist es dort häufig besonders leer. Beim Baden Abstand zu Schwänen halten, vor allem wenn sie Junge führen.',
      open:'frei zugänglich',price:'kostenlos',reserve:'nein',drive:'zu Fuß',tip:true,weather:'good',activity:'low',duration:'short',type:'swimming',
      gm:'https://www.google.com/maps/search/?api=1&query=53.1643%2C13.9665'
    },
    {
      icon:'🌿',name:'Spaziergang zum Polßensee',lat:53.1500,lng:13.9615,
      desc:'Tipp der Vermieterin: Von Polßen auf der Dorfstraße Richtung Grünheide gehen. Nach gut zwei Kilometern, kurz hinter der kleinen Stromleitung, links den Hügel hinunter. Der See ist ruhig, recht tief und nicht überwacht. Der Marker zeigt den ungefähren Zielbereich; vor Ort die Wegbeschreibung nutzen.',
      open:'frei zugänglich',price:'kostenlos',reserve:'nein',drive:'ca. 2 km zu Fuß',tip:true,weather:'good',activity:'high',duration:'long',type:'nature',
      gm:'https://www.google.com/maps/search/?api=1&query=53.1500%2C13.9615'
    },
    {
      icon:'🐴',name:'Kutschfahrt in Warnitz',lat:53.1870,lng:13.8790,
      desc:'Tipp der Vermieterin: In Warnitz werden Kutschfahrten für bis zu acht Personen angeboten. Termin, Dauer und Preis müssen vorab abgestimmt werden. Die Kontaktdaten liegen privat vor und werden auf dieser öffentlichen Seite bewusst nicht veröffentlicht.',
      open:'nur nach Absprache',price:'vorab erfragen',reserve:'ja, unbedingt',drive:'ca. 12 Min.',tip:true,weather:'good',activity:'low',duration:'long',type:'animals',
      gm:'https://www.google.com/maps/search/?api=1&query=Kutschfahrt+Warnitz+Uckermark'
    },
    {
      icon:'🛶',name:'Kanu auf den Uckerseen',lat:53.1906,lng:13.8606,
      desc:'Ober- und Unteruckersee eignen sich für eine Kanutour. Laut Vermieterin kommen unter anderem Camp Solaris, Strandcafé Balu und Otto Mobils infrage; Otto Mobils bringt und holt Boote auch an vereinbarten Orten. Für jüngere Kinder nur mit passenden Schwimmwesten, ruhigem Wetter und vorher abgestimmter Route planen.',
      open:'saisonal; vorab anfragen',price:'anbieterabhängig',reserve:'ja, sinnvoll',drive:'ca. 15–25 Min.',weather:'good',activity:'high',duration:'long',type:'excursion',
      gm:'https://www.google.com/maps/search/?api=1&query=Kanuverleih+Oberuckersee'
    },
    {
      icon:'⛴️',name:'Fahrgastschiff ab Prenzlau',lat:53.3155,lng:13.8628,
      desc:'Eine ruhige Alternative zum eigenen Paddeln ist eine Fahrt auf dem Unteruckersee ab Prenzlau. Fahrplan, Strecke und Preise vor dem Besuch auf der Website der Uckerseeschifffahrt prüfen; bei einer größeren Gruppe ist eine vorherige Anfrage sinnvoll.',
      open:'nach Fahrplan',price:'aktuell online prüfen',reserve:'bei Gruppe sinnvoll',drive:'ca. 25 Min.',weather:'both',activity:'low',duration:'long',type:'excursion',
      gm:'https://www.google.com/maps/search/?api=1&query=Uckerseeschifffahrt+Prenzlau'
    },
    {
      icon:'🍽️',name:'Huberhof Seehausen · Boot & Einkehr',lat:53.2168,lng:13.8798,
      desc:'Der Huberhof liegt direkt am Oberuckersee. Laut Vermieterin können dort Boote geliehen werden; außerdem gibt es ein Restaurant mit Terrasse. Den Bootsverleih vorher erfragen und für das Essen möglichst reservieren.',
      open:'Restaurant Mo–Fr 17–21 Uhr · Sa/So 12–21 Uhr',price:'Boot und Verzehr vorab prüfen',reserve:'Tisch sinnvoll; Boot erfragen',drive:'ca. 14 Min.',weather:'both',activity:'low',duration:'long',type:'food',
      gm:'https://www.google.com/maps/search/?api=1&query=Seehotel+Huberhof+Seehausen+Uckermark'
    }
  );

  const tierpark=W.w1.items.find(item=>item.name==='Tierpark Angermünde');
  if(tierpark&&!tierpark.desc.includes('Zooschule')){
    tierpark.desc+=' Nach Hinweis der Vermieterin gehört auch eine Zooschule zum Angebot; aktuelle Termine sollten direkt beim Tierpark geprüft werden.';
  }

  const websites={
    'Fahrgastschiff ab Prenzlau':'https://www.uckerseeschiff.de',
    'Huberhof Seehausen · Boot & Einkehr':'https://www.seehotel-huberhof.de/'
  };

  function addWebsiteLinks(){
    document.querySelectorAll('#cards-w1 .place').forEach(article=>{
      const title=article.querySelector('h3')?.textContent?.trim();
      const url=websites[title];
      const actions=article.querySelector('.actions');
      if(!url||!actions||actions.querySelector('[data-extra-site]'))return;
      const link=document.createElement('a');
      link.href=url;
      link.target='_blank';
      link.rel='noopener';
      link.dataset.extraSite='true';
      link.textContent='Website';
      actions.appendChild(link);
    });
  }

  const originalRenderPlaces=renderPlaces;
  renderPlaces=function(week){
    originalRenderPlaces(week);
    if(week==='w1')addWebsiteLinks();
  };

  window.addEventListener('DOMContentLoaded',()=>{
    const list=document.querySelector('#week-w1-local .local-list');
    if(!list)return;
    list.insertAdjacentHTML('afterbegin',
      '<div class="local-row"><b>🚗 Anreise zur Unterkunft</b><br>Nicht über die Abfahrt Warnitz fahren: Die Zufahrt endet dort in einem sehr schlechten Waldweg. Besser über Gramzow oder Pfingstberg anreisen. Vor Ort am Haus die ersten beiden Eingänge passieren und den dritten nehmen; Parken auf dem Grasstreifen vor dem Haus.<div class="actions"><a href="https://www.google.com/maps/search/?api=1&query=Am+Sportplatz+4+17291+Gramzow+Pol%C3%9Fen" target="_blank" rel="noopener">Google Maps</a><a href="https://maps.apple.com/?q=Am%20Sportplatz%204%2C%2017291%20Gramzow%20OT%20Pol%C3%9Fen" target="_blank" rel="noopener">Apple Maps</a></div></div>'+ 
      '<div class="local-row"><b>🚲 Fahrradservice Angermünde</b><br>BARUM E-Bike-Verleih liefert Fahrräder auf Anfrage an einen Wunschort und holt sie wieder ab. E-Bikes und Anhänger sind nach Verfügbarkeit möglich; vorher reservieren.<div class="actions"><a href="https://www.barum-ebike-verleih.de" target="_blank" rel="noopener">Website</a><a href="https://www.google.com/maps/search/?api=1&query=BARUM+E-Bike-Verleih+Angerm%C3%BCnde" target="_blank" rel="noopener">Google Maps</a></div></div>'
    );
    addWebsiteLinks();
  });
})();
