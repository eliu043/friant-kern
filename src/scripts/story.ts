import * as maplibregl from 'maplibre-gl';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url';
maplibregl.setWorkerUrl(workerUrl);
import 'maplibre-gl/dist/maplibre-gl.css';
import meta from '../../public/data/raster-meta.json';
import samples from '../../public/data/samples.geojson?raw';
import canal from '../../public/data/canal.geojson?raw';
import communities from '../../public/data/communities.geojson?raw';
import terrainMeta from '../../public/data/terrain-meta.json';
import section from '../../public/data/terrain-section.json';
const $ = (id:string) => document.getElementById(id)!;
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Every chapter selects complete, reversible evidence states, not just a camera.
const views = [
 {center:[-119.38,36.22],zoom:7.7,pitch:0}, {center:[-119.3,36.2],zoom:8.1,pitch:48},
 {center:[-119.25,36.2],zoom:8.5,pitch:0}, {center:[-119.13,36.00],zoom:9.3},
 {center:[-119.10,35.95],zoom:9.5}, {center:[-119.10,35.95],zoom:9.5},
 {center:[-119.38,36.22],zoom:7.7}
];
const stages=['01 / The route','02 / The terrain','03 / The moving ground','04 / Three regional readings','05 / The bottleneck','06 / The repair','07 / Below the surface'];
const notes=['Friant Dam → Kern River','A — A′ · terrain section at 36.2° N','Cumulative vertical movement · 2015–Jan 2024','Select a dot to read a regional raster cell','Regional displacement · not a capacity model','Reference alignment · repair boundaries not mapped','Conveyance and aquifer storage are different questions'];
let active=0,loaded=false,exploring=false,opacity=.85;
let lastMobile=window.innerWidth<=760;
let showPeople=false,showMovement=false,showTerrain=false;
let popup:maplibregl.Popup | undefined;
try {
 const map = new maplibregl.Map({container:'map',center:views[0].center as [number,number],zoom:views[0].zoom,attributionControl:{compact:true},pitch:0,bearing:0,style:{version:8,sources:{context:{type:'raster',tiles:['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],tileSize:256,attribution:'© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}},layers:[{id:'paper',type:'background',paint:{'background-color':'#e2e8da'}},{id:'context',type:'raster',source:'context',paint:{'raster-opacity':.26,'raster-saturation':-.9}}]}});
 map.addControl(new maplibregl.NavigationControl({showCompass:false}),'top-right');
 map.addControl(new maplibregl.ScaleControl({unit:'metric'}),'bottom-left');
 map.scrollZoom.disable();map.dragPan.disable();map.dragRotate.disable();map.doubleClickZoom.disable();map.touchZoomRotate.disable();map.keyboard.disable();
 function syncLayers(){
  $('legend').hidden=!showMovement;
  // When both are selected, the compact population key moves above the ground key.
  $('population-legend').hidden=!showPeople;
  $('population-legend').classList.toggle('both-legends',showMovement);
  ($('terrain-toggle') as HTMLInputElement).checked=showTerrain;
  $('terrain-key').hidden=!showTerrain;
  ($('people') as HTMLInputElement).checked=showPeople;
  ($('movement') as HTMLInputElement).checked=showMovement;
  if(!loaded)return;
  map.setTerrain(showTerrain?{source:'terrain-dem',exaggeration:2}:null);
  map.setLayoutProperty('terrain-tint','visibility',showTerrain||active<=1?'visible':'none');
  map.setLayoutProperty('terrain-shade','visibility',showTerrain||active<=1?'visible':'none');
  map.setLayoutProperty('terrain-extent','visibility',showTerrain?'visible':'none');
  map.setLayoutProperty('section-line','visibility',active===1?'visible':'none');
  map.setLayoutProperty('section-cursor','visibility',active===1?'visible':'none');
  map.setPaintProperty('displacement','raster-opacity',showMovement?opacity:0);
  map.setLayoutProperty('communities','visibility',showPeople?'visible':'none');
  map.setLayoutProperty('samples','visibility',active===3?'visible':'none');
 }
 function update(){
  popup?.remove();
  document.querySelectorAll('.chapter-nav a').forEach((a,i)=>a.setAttribute('aria-current',String(i===active)));
  $('map-stage').textContent=stages[active];$('map-note').textContent=notes[active];
  showPeople=false;
  showTerrain=active===1;
  document.querySelectorAll('.chapter').forEach((el,i)=>el.classList.toggle('is-active',i===active));
  showMovement=active>=2;
  syncLayers();
  if(!loaded)return;
  if(active>=4)return;
  map.easeTo({...views[active],center:views[active].center as [number,number],pitch:showTerrain?48:0,duration:reduced?0:1050});
 }
 map.on('load',()=>{
  map.addSource('terrain-dem',{type:'raster-dem',tiles:[`${location.origin}${import.meta.env.BASE_URL}data/terrain/{z}/{x}/{y}.png`],tileSize:256,minzoom:6,maxzoom:10,bounds:terrainMeta.bounds as [number,number,number,number],encoding:'terrarium',attribution:'Terrain: USGS 3DEP'});
  map.addSource('terrain-color',{type:'image',url:`${import.meta.env.BASE_URL}data/elevation-tint.png`,coordinates:terrainMeta.coordinates as [[number,number],[number,number],[number,number],[number,number]]});
  map.addLayer({id:'terrain-tint',type:'raster',source:'terrain-color',paint:{'raster-opacity':.72,'raster-fade-duration':0}},'context');
  map.addLayer({id:'terrain-shade',type:'hillshade',source:'terrain-dem',paint:{'hillshade-exaggeration':.42,'hillshade-shadow-color':'#465847','hillshade-highlight-color':'#fffbef','hillshade-accent-color':'#69735e'}},'context');
  map.addSource('displacement',{type:'image',url:`${import.meta.env.BASE_URL}data/displacement.png`,coordinates:meta.coordinates as [[number,number],[number,number],[number,number],[number,number]]});
  map.addLayer({id:'displacement',type:'raster',source:'displacement',paint:{'raster-opacity':0,'raster-opacity-transition':{duration:reduced?0:700,delay:0},'raster-fade-duration':0,'raster-resampling':'nearest'}});
  map.addSource('communities',{type:'geojson',data:JSON.parse(communities),attribution:'Population: US Census Bureau'});
  map.addLayer({id:'communities',type:'circle',source:'communities',layout:{visibility:'none'},paint:{'circle-radius':['*',['sqrt',['get','population']],window.innerWidth<=760?.05059644:.06324555],'circle-color':'#326d8a','circle-opacity':.23,'circle-stroke-color':'#326d8a','circle-stroke-width':1.2}});
  map.addSource('canal',{type:'geojson',data:JSON.parse(canal),attribution:'Canal: federal / ArcGIS mirror · Ground: DWR / TRE ALTAMIRA'});
  map.addLayer({id:'canal-halo',type:'line',source:'canal',paint:{'line-color':'#f6f4e9','line-width':5}});
  map.addLayer({id:'canal',type:'line',source:'canal',paint:{'line-color':'#244d43','line-width':2.2}});
  const [west,south,east,north]=terrainMeta.bounds;
  map.addSource('terrain-footprint',{type:'geojson',data:{type:'Feature',properties:{},geometry:{type:'LineString',coordinates:[[west,south],[east,south],[east,north],[west,north],[west,south]]}}});
  map.addLayer({id:'terrain-extent',type:'line',source:'terrain-footprint',layout:{visibility:'none'},paint:{'line-color':'#69735e','line-width':1,'line-dasharray':[2,3]}});
  map.addSource('section-transect',{type:'geojson',data:{type:'Feature',properties:{},geometry:{type:'LineString',coordinates:[[-120.15,36.2],[-118.45,36.2]]}}});
  map.addLayer({id:'section-line',type:'line',source:'section-transect',layout:{visibility:'none'},paint:{'line-color':'#9a482e','line-width':2,'line-dasharray':[3,3]}});
  const initialSection=section.samples[Number(($('section-position') as HTMLInputElement).value)];
  map.addSource('section-point',{type:'geojson',data:{type:'Feature',properties:{},geometry:{type:'Point',coordinates:[initialSection.longitude,36.2]}}});
  map.addLayer({id:'section-cursor',type:'circle',source:'section-point',layout:{visibility:'none'},paint:{'circle-radius':5,'circle-color':'#f4f1e9','circle-stroke-color':'#9a482e','circle-stroke-width':2}});
  map.addSource('samples',{type:'geojson',data:JSON.parse(samples)});
  map.addLayer({id:'samples',type:'circle',source:'samples',layout:{visibility:'none'},paint:{'circle-radius':7,'circle-color':'#f8f4e8','circle-stroke-color':'#243d33','circle-stroke-width':2}});
  // Local DOM locators remain legible even if external map tiles are unavailable.
  for(const [name,lng,lat] of [['Friant Dam',-119.705,36.999],['Lindsay',-119.088,36.203],['Terra Bella',-119.045,35.962],['Delano',-119.248,35.768],['Bakersfield',-119.019,35.374]] as [string,number,number][]){
   const el=document.createElement('span');el.textContent=name;el.style.cssText='font:10px Mona,Arial;color:#203e32;background:#f4f1e9c9;padding:2px 4px;pointer-events:none';
   new maplibregl.Marker({element:el,anchor:'left',offset:[8,0]}).setLngLat([lng,lat]).addTo(map);
  }
  map.on('click','samples',e=>{const f=e.features?.[0];if(!f)return;const p=f.properties!;const content=document.createElement('div');const strong=document.createElement('strong');strong.textContent=p.name;const text=document.createElement('p');text.textContent=`${p.feet??'No data'} ft · 13 Jun 2015–1 Jan 2024. ${p.note}`;content.append(strong,text);popup?.remove();popup=new maplibregl.Popup().setLngLat((f.geometry as {type:'Point';coordinates:number[]}).coordinates as [number,number]).setDOMContent(content).addTo(map);});
  map.on('mouseenter','samples',()=>{map.getCanvas().style.cursor='pointer'});map.on('mouseleave','samples',()=>{map.getCanvas().style.cursor=exploring?'grab':''});
  map.on('click','communities',e=>{
   const f=e.features?.[0];if(!f)return;
   const p=f.properties!;const content=document.createElement('div');
   const title=document.createElement('strong');title.textContent=p.name;
   const description=document.createElement('p');description.textContent=`${Number(p.population).toLocaleString('en-US')} residents · Census estimate, 1 July 2025. Whole city population; not a count of canal customers.`;
   content.append(title,description);popup?.remove();
   popup=new maplibregl.Popup().setLngLat((f.geometry as {type:'Point';coordinates:number[]}).coordinates as [number,number]).setDOMContent(content).addTo(map);
  });
  map.on('mouseenter','communities',()=>{map.getCanvas().style.cursor='pointer'});
  map.on('mouseleave','communities',()=>{map.getCanvas().style.cursor=exploring?'grab':''});
  loaded=true;update();
  // Start compact attribution closed on small screens; the source credit remains expandable.
  if(window.innerWidth<=760){
   const attribution=map.getContainer().querySelector<HTMLDetailsElement>('.maplibregl-ctrl-attrib');
   if(attribution)attribution.open=false;
  }
 });
 let tileErrors=0;
 map.on('error',()=>{tileErrors++;if(tileErrors>2)$('map-note').textContent='Some map resources failed. Local evidence layers remain available when loaded.';});
 $('explore').addEventListener('click',()=>{exploring=!exploring;$('explore').setAttribute('aria-pressed',String(exploring));$('explore').textContent=exploring?'Exit exploration':'Explore map';if(exploring){map.dragPan.enable();map.doubleClickZoom.enable();map.touchZoomRotate.enable();map.touchZoomRotate.disableRotation();map.keyboard.enable();}else{map.dragPan.disable();map.doubleClickZoom.disable();map.touchZoomRotate.disable();map.keyboard.disable();} });
 $('reset').addEventListener('click',update);
 $('context').addEventListener('change',e=>map.setLayoutProperty('context','visibility',(e.target as HTMLInputElement).checked?'visible':'none'));
 $('opacity').addEventListener('input',e=>{opacity=Number((e.target as HTMLInputElement).value)/100;if(loaded&&showMovement)map.setPaintProperty('displacement','raster-opacity',opacity);});
 $('terrain-toggle').addEventListener('change',e=>{showTerrain=(e.target as HTMLInputElement).checked;syncLayers();map.easeTo({pitch:showTerrain?48:0,duration:reduced?0:800});});
 function moveSection(){
  const p=section.samples[Number(($('section-position') as HTMLInputElement).value)];
  $('section-readout').textContent=`${Math.round(p.km)} km · ≈ ${Math.round(p.elevation_m/10)*10} m`;
  $('profile-cursor').setAttribute('cx',String(48+p.km/section.length_km*384));
  $('profile-cursor').setAttribute('cy',String(212-p.elevation_m/3000*174));
  if(loaded){
   (map.getSource('section-point') as maplibregl.GeoJSONSource).setData({type:'Feature',properties:{},geometry:{type:'Point',coordinates:[p.longitude,36.2]}});
   if(active===1&&!map.getBounds().contains([p.longitude,36.2]))map.easeTo({center:[p.longitude,36.2],duration:reduced?0:450});
  }
 }
 $('section-position').addEventListener('input',moveSection);moveSection();
 $('people').addEventListener('change',e=>{showPeople=(e.target as HTMLInputElement).checked;popup?.remove();syncLayers();});
 $('movement').addEventListener('change',e=>{showMovement=(e.target as HTMLInputElement).checked;syncLayers();});
 const sections=Array.from(document.querySelectorAll<HTMLElement>('.chapter'));
 let scheduled=false;
 function selectChapter(){
  scheduled=false;
  const target=window.innerHeight*(window.innerWidth<=760?.63:.34);
  let best=0;
  sections.forEach((el,i)=>{if(el.getBoundingClientRect().top<=target)best=i;});
  if(best!==active){active=best;update();}
 }
 // Reveal text on entry, once; map states follow chapter boundaries independently.
 if(!reduced){
  const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-revealed');reveal.unobserve(entry.target);}}),{threshold:.08});
  document.querySelectorAll('.chapter-inner,.hero-facts,.opening-photo').forEach(el=>{el.classList.add('will-reveal');reveal.observe(el);});
 }
 function openSource(){
  if(location.hash.startsWith('#source-'))($('source-notes') as HTMLDetailsElement).open=true;
 }
 document.querySelectorAll<HTMLAnchorElement>('.source-link').forEach(a=>a.addEventListener('click',()=>{($('source-notes') as HTMLDetailsElement).open=true;}));
 window.addEventListener('hashchange',openSource);openSource();
 window.addEventListener('scroll',()=>{if(!scheduled){scheduled=true;requestAnimationFrame(selectChapter)}},{passive:true});
 window.addEventListener('resize',()=>{const mobile=window.innerWidth<=760;if(mobile&&!lastMobile){const attribution=map.getContainer().querySelector<HTMLDetailsElement>('.maplibregl-ctrl-attrib');if(attribution)attribution.open=false;}lastMobile=mobile;map.resize();if(loaded)map.setPaintProperty('communities','circle-radius',['*',['sqrt',['get','population']],window.innerWidth<=760?.05059644:.06324555]);selectChapter()});
 window.addEventListener('load',selectChapter,{once:true});
 document.fonts.ready.then(selectChapter);
 update();selectChapter();
} catch(error){$('map-failure').hidden=false;console.error('Map initialization failed',error);}
