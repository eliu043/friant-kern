import * as maplibregl from 'maplibre-gl';
import type {FeatureCollection, Feature, Geometry, GeoJsonProperties} from 'geojson';
import groundMeta from '../../public/data/raster-meta.json';

const base=import.meta.env.BASE_URL.replace(/\/$/,'')+'/';
const el=(id:string)=>document.getElementById(id)!;
const input=(id:string)=>el(id) as HTMLInputElement;
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const repairBounds: [[number,number],[number,number]]=[[-119.32,35.86],[-118.96,36.10]];
const regionBounds: [[number,number],[number,number]]=[[-119.65,35.65],[-118.75,36.35]];
let started=false;
const controls=Array.from(document.querySelectorAll<HTMLInputElement|HTMLButtonElement|HTMLSelectElement>('.explorer-sidebar input,.explorer-sidebar button,.explorer-sidebar select,#end-imagery'));
controls.forEach(control=>{control.disabled=true;});

async function start(){
 if(started)return;
 started=true;
 try{
  const [canal,repair,areas,places]=await Promise.all(['canal.geojson','repair-corridor.geojson','community-block-groups.geojson','explorer-places.geojson'].map(async file=>{
   const r=await fetch(`${base}data/${file}`);if(!r.ok)throw new Error(`Missing closing-map data: ${file}`);return r.json();
  })) as [FeatureCollection,Feature,FeatureCollection,FeatureCollection];
  const map=new maplibregl.Map({container:'end-map',center:[-119.14,35.98],zoom:10,pitch:0,attributionControl:{compact:true},style:{version:8,sources:{streets:{type:'raster',tiles:['https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'],maxzoom:16,tileSize:256,attribution:'Basemap: Esri, HERE, Garmin, OpenStreetMap contributors'},imagery:{type:'raster',tiles:['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],tileSize:256,attribution:'Imagery © Esri, Maxar, Earthstar Geographics, and GIS User Community'}},layers:[{id:'paper',type:'background',paint:{'background-color':'#090d10'}},{id:'streets',type:'raster',source:'streets',paint:{'raster-opacity':.94,'raster-saturation':-.75}},{id:'imagery',type:'raster',source:'imagery',layout:{visibility:'none'}}]}});
  map.scrollZoom.disable();map.dragRotate.disable();map.touchZoomRotate.disableRotation();
  map.addControl(new maplibregl.NavigationControl({showCompass:false}),'top-right');
  map.addControl(new maplibregl.ScaleControl({unit:'metric'}),'bottom-left');
  const details=(type:string,title:string,body:string)=>{el('end-selection-type').textContent=type;el('end-selection-title').textContent=title;el('end-selection-body').textContent=body;};
  let mobilePopup:maplibregl.Popup|undefined;
  function showMobileDetails(point:maplibregl.LngLatLike){
   mobilePopup?.remove();
   if(window.innerWidth>760)return;
   const content=document.createElement('div');const title=document.createElement('strong');title.textContent=el('end-selection-title').textContent;const body=document.createElement('p');body.textContent=el('end-selection-body').textContent;content.append(title,body);
   mobilePopup=new maplibregl.Popup({maxWidth:'250px'}).setLngLat(point).setDOMContent(content).addTo(map);
  }
  const number=(value:unknown)=>Number(value)>0?Number(value).toLocaleString('en-US'):'Unavailable';
  const select=el('end-place') as HTMLSelectElement;
  const placeFeatures=places.features as Feature<Geometry,GeoJsonProperties>[];
  for(const f of placeFeatures){const o=document.createElement('option');o.value=String(f.properties!.geoid);o.textContent=String(f.properties!.name);select.append(o);}
  function showPlace(f:Feature){
   const p=f.properties!;const xy=(f.geometry as {coordinates:number[]}).coordinates as [number,number];
   select.value=String(p.geoid);
   for(const id of ['end-reach','end-region','end-close'])el(id).setAttribute('aria-pressed','false');
   const area=areas.features.find(a=>a.properties!.GEOID20===p.reference_block_group)?.properties;
   const description=area?`The 2020 place reference point falls in block group ${area.GEOID20}. Median household income: ${Number(area.MHI23)>0?'$'+number(area.MHI23):'unavailable'}; population estimate: ${number(area.Pop23)} (ACS 2019–2023). These describe the block group, not the town as a whole.`:'2020 Census Gazetteer reference point. No matching Census block group is available in this extract.';
   details(String(p.kind),String(p.name),description);
   map.setFilter('area-selected',['==',['get','GEOID20'],String(p.reference_block_group??'')]);
   map.easeTo({center:xy,zoom:11.7,duration:reduced?0:650});
   map.setFilter('place-selected',['==',['get','geoid'],String(p.geoid)]);
  }
  map.on('load',()=>{
   map.addSource('areas',{type:'geojson',data:areas,attribution:'Community areas: DWR · US Census ACS 2019–2023'});
   const areaColor:maplibregl.ExpressionSpecification=['match',['get','DAC23'],'Y','#5579ff','N','#35434b','#81888b'];
   map.addLayer({id:'areas',type:'fill',source:'areas',paint:{'fill-color':areaColor,'fill-opacity':.44}});
   map.addLayer({id:'area-edges',type:'line',source:'areas',paint:{'line-color':'#85a5cf','line-width':.7,'line-opacity':.55}});
   map.addLayer({id:'area-selected',type:'line',source:'areas',filter:['==',['get','GEOID20'],''],paint:{'line-color':'#f3f5ed','line-width':2.5}});
   map.addSource('ground',{type:'image',url:`${base}data/displacement.png`,coordinates:groundMeta.coordinates as [[number,number],[number,number],[number,number],[number,number]]});
   map.addLayer({id:'ground',type:'raster',source:'ground',layout:{visibility:'none'},paint:{'raster-opacity':.78,'raster-resampling':'nearest','raster-fade-duration':0}},'area-edges');
   map.addSource('canal',{type:'geojson',data:canal,attribution:'Canal: federal / ArcGIS mirror · Repair locator: FWA, approximate'});
   map.addLayer({id:'canal-halo',type:'line',source:'canal',paint:{'line-color':'#0a0d0f','line-width':5}});
   map.addLayer({id:'canal',type:'line',source:'canal',paint:{'line-color':'#e9ede7','line-width':2,'line-dasharray':[3,2]}});
   map.addSource('repair',{type:'geojson',data:repair});
   map.addLayer({id:'repair-halo',type:'line',source:'repair',paint:{'line-color':'#0a0d0f','line-width':13,'line-opacity':.8}});
   map.addLayer({id:'repair',type:'line',source:'repair',paint:{'line-color':'#ff8a3d','line-width':7,'line-opacity':.9}});
   map.addSource('places',{type:'geojson',data:places,attribution:'Places: Census Gazetteer 2020'});
   map.addLayer({id:'places',type:'circle',source:'places',paint:{'circle-radius':['interpolate',['linear'],['zoom'],8,3,12,6],'circle-color':'#0a0d0f','circle-stroke-color':'#edf1e9','circle-stroke-width':1.6}});
   map.addLayer({id:'place-selected',type:'circle',source:'places',filter:['==',['get','geoid'],''],paint:{'circle-radius':10,'circle-color':'#0a0d0f','circle-opacity':0,'circle-stroke-color':'#ff8a3d','circle-stroke-width':3}});
   // DOM labels avoid a remote font dependency and remain available on aerial imagery.
   const labels:maplibregl.Marker[]=[];
   for(const f of placeFeatures.filter(f=>['Terra Bella','Porterville','Ducor','Richgrove','Earlimart','Pixley','Delano'].includes(String(f.properties!.name)))){
    const label=document.createElement('span');label.className='explorer-map-label';label.textContent=String(f.properties!.name);
    labels.push(new maplibregl.Marker({element:label,anchor:'left',offset:[9,0]}).setLngLat((f.geometry as {coordinates:number[]}).coordinates as [number,number]).addTo(map));
   }
   const fit=(bounds:[[number,number],[number,number]])=>map.fitBounds(bounds,{padding:window.innerWidth<=760?36:55,duration:reduced?0:700});
   function setView(region:boolean){fit(region?regionBounds:repairBounds);el('end-reach').setAttribute('aria-pressed',String(!region));el('end-region').setAttribute('aria-pressed',String(region));el('end-close').setAttribute('aria-pressed','false');if(!region){input('end-repair').checked=true;input('end-dac').checked=true;input('end-places').checked=true;input('end-ground').checked=false;select.value='';map.setFilter('area-selected',['==',['get','GEOID20'],'']);map.setFilter('place-selected',['==',['get','geoid'],'']);mobilePopup?.remove();details('Phase 1 · completed 2024','Ten miles of new canal','The highlighted corridor locates the work between Avenue 136 and Avenue 64. Select a community point or Census area to inspect its context.');setAerial(false);sync();}}
   el('end-reach').addEventListener('click',()=>setView(false));el('end-region').addEventListener('click',()=>setView(true));
   let aerial=false;
   function setAerial(value:boolean){aerial=value;map.setLayoutProperty('imagery','visibility',aerial?'visible':'none');map.setLayoutProperty('streets','visibility',aerial?'none':'visible');el('end-imagery').setAttribute('aria-pressed',String(aerial));el('end-imagery').textContent=aerial?'Street map':'Aerial imagery';}
   el('end-imagery').addEventListener('click',()=>setAerial(!aerial));
   el('end-close').addEventListener('click',()=>{
    select.value='';mobilePopup?.remove();
    for(const id of ['end-repair','end-dac','end-places','end-ground'])input(id).checked=false;
    setAerial(true);sync();
    map.easeTo({center:[-119.106,35.98037],zoom:16.5,duration:reduced?0:900});
    for(const id of ['end-reach','end-region'])el(id).setAttribute('aria-pressed','false');el('end-close').setAttribute('aria-pressed','true');
    details('Aerial view · image dates vary','Canal near Terra Bella','Inspect the channels and farmland at a closer scale. The dashed line is the older reference alignment. Imagery dates vary; this is not a dated before/after comparison. The photograph below documents the completed Phase 1 canal.');
   });
   function sync(){
    for(const id of ['repair','repair-halo'])map.setLayoutProperty(id,'visibility',input('end-repair').checked?'visible':'none');
    for(const id of ['areas','area-edges','area-selected'])map.setLayoutProperty(id,'visibility',input('end-dac').checked?'visible':'none');
    for(const id of ['places','place-selected'])map.setLayoutProperty(id,'visibility',input('end-places').checked?'visible':'none');
    labels.forEach(m=>{m.getElement().hidden=!input('end-places').checked});
    map.setLayoutProperty('ground','visibility',input('end-ground').checked?'visible':'none');
    map.setPaintProperty('areas','fill-opacity',input('end-ground').checked?.18:.44);
    el('end-repair-key').hidden=!input('end-repair').checked;el('end-income-key').hidden=!input('end-dac').checked;el('end-ground-key').hidden=!input('end-ground').checked;
   }
   for(const id of ['end-repair','end-dac','end-places','end-ground'])el(id).addEventListener('change',sync);
   select.addEventListener('change',()=>{const f=placeFeatures.find(f=>String(f.properties!.geoid)===select.value);if(f)showPlace(f);});
   map.on('click',e=>{
    const hits=map.queryRenderedFeatures(e.point,{layers:['places','repair','areas']});
    const f=hits[0];if(!f)return;
    if(f.layer.id==='places'){showPlace(f);showMobileDetails(e.lngLat);return;}
    if(f.layer.id==='repair'){
     details('Phase 1 · completed 2024','Ten miles of new canal','New parallel canal was built between Avenue 136 and Avenue 64. The orange line locates this corridor on the older centerline; it does not trace the rebuilt channel.');showMobileDetails(e.lngLat);return;
    }
    const p=f.properties!;select.value='';map.setFilter('place-selected',['==',['get','geoid'],'']);
    map.setFilter('area-selected',['==',['get','GEOID20'],String(p.GEOID20)]);
    const status=p.DAC23==='Y'?'DWR disadvantaged designation':p.DAC23==='N'?'Not designated by DWR':'Income data unavailable';
    details('Census block group · ACS 2019–2023',`Area ${p.GEOID20}`,`${status}. Median household income: ${Number(p.MHI23)>0?'$'+number(p.MHI23):'unavailable'}. Population estimate: ${number(p.Pop23)}. Estimates describe this whole block group, not canal customers or people affected by repair.`);
    showMobileDetails(e.lngLat);
   });
   map.on('mousemove',e=>{map.getCanvas().style.cursor=map.queryRenderedFeatures(e.point,{layers:['places','repair','areas']}).length?'pointer':'grab';});
   fit(repairBounds);sync();controls.forEach(control=>{control.disabled=false;});
  });
  let errors=0;map.on('error',()=>{if(++errors>2)el('end-map-help').textContent='Some map resources are unavailable. Local evidence can still be explored when loaded.';});
  new ResizeObserver(()=>map.resize()).observe(el('end-map'));
 }catch(error){el('end-map-error').hidden=false;console.error('Closing map failed',error);}
}
const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){observer.disconnect();void start();}},{rootMargin:'500px'});
observer.observe(el('explore-canal'));
