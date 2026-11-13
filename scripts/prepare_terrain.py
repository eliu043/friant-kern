"""Derive local terrain tiles and a mapped section from retained USGS 3DEP export."""
from pathlib import Path
import json,math,hashlib
import numpy as np
import rasterio
from rasterio.warp import reproject,Resampling,transform_bounds
from rasterio.transform import from_bounds
from PIL import Image
from pyproj import Transformer,Geod
R=Path(__file__).resolve().parents[1];raw=R/'research/raw/elevation';dest=R/'public/data';tile_root=dest/'terrain';M=20037508.342789244
with rasterio.open(raw/'terrain.tif') as s:
 a=s.read(1);bounds=transform_bounds(s.crs,'EPSG:4326',*s.bounds);tile_count=0
 for z in range(6,11):
  n=2**z;span=2*M/n
  x0=int((s.bounds.left+M)/span);x1=int((s.bounds.right+M)/span)
  y0=int((M-s.bounds.top)/span);y1=int((M-s.bounds.bottom)/span)
  for x in range(x0,x1+1):
   for y in range(y0,y1+1):
    tb=(-M+x*span,M-(y+1)*span,-M+(x+1)*span,M-y*span)
    ar=np.zeros((256,256),dtype=np.float32)
    reproject(a,ar,src_transform=s.transform,src_crs=s.crs,dst_transform=from_bounds(*tb,256,256),dst_crs=s.crs,dst_nodata=0,resampling=Resampling.bilinear)
    encoded=np.round((ar+32768)*256).astype(np.uint32)
    rgb=np.stack([(encoded>>16)&255,(encoded>>8)&255,encoded&255],axis=-1).astype(np.uint8)
    p=tile_root/str(z)/str(x)/f'{y}.png';p.parent.mkdir(exist_ok=True,parents=True);Image.fromarray(rgb).save(p);tile_count+=1
 # A real west-east transect at Lindsay latitude. NOT an along-canal slope profile.
 lat=36.2;xs=np.linspace(-120.15,-118.45,181);ll=Transformer.from_crs('EPSG:4326',s.crs,always_xy=True)
 coords=list(zip(xs,[lat]*len(xs)));projected=[ll.transform(x,y) for x,y in coords]
 elevations=[float(v[0]) for v in s.sample(projected)]
 geod=Geod(ellps='WGS84');dist=[geod.inv(xs[0],lat,x,lat)[2]/1000 for x in xs]
 # Intersect the retained reference centerline with this section, rather than inventing a canal position.
 crosses=[]
 canal=json.loads((dest/'canal.geojson').read_text())
 for f in canal['features']:
  for line in f['geometry']['coordinates']:
   for p,q in zip(line,line[1:]):
    if (p[1]-lat)*(q[1]-lat)<=0 and p[1]!=q[1]:
     x=p[0]+(q[0]-p[0])*(lat-p[1])/(q[1]-p[1])
     if xs[0]<=x<=xs[-1]:crosses.append(x)
 assert crosses,'Transect must intersect the reference canal'
 xcanal=min(crosses,key=lambda x:abs(x+119.09));canal_km=geod.inv(xs[0],lat,xcanal,lat)[2]/1000
 section={'latitude':lat,'coordinates':coords,'samples':[{'km':round(k,3),'elevation_m':round(h,1),'longitude':round(float(x),6)} for k,h,x in zip(dist,elevations,xs)],'length_km':float(dist[-1]),'canal_km':canal_km,'canal_longitude':xcanal,'method':'Nearest exported DEM cell sampled at 181 evenly spaced longitude positions along 36.2 N. Reference canal intersection calculated from retained GeoJSON. Not a canal-bed profile.'}
 (dest/'terrain-section.json').write_text(json.dumps(section,indent=2)+'\n')
 coordinates=[[bounds[0],bounds[3]],[bounds[2],bounds[3]],[bounds[2],bounds[1]],[bounds[0],bounds[1]]]
 # A restrained elevation tint, separate from the displacement palette.
 stops=np.array([0,200,600,1400,2500,4500]);colors=np.array([[239,237,222],[217,225,201],[168,186,157],[139,155,133],[178,173,153],[224,219,204]])
 rgba=np.stack([np.interp(a,stops,colors[:,i]) for i in range(3)]+[np.full(a.shape,255)],axis=-1).astype(np.uint8)
 Image.fromarray(rgba).save(dest/'elevation-tint.png')
 meta={'source':'USGS 3DEP Bare Earth DEM Dynamic Service','retrieved':'2026-11-13','service_snapshot':'2026-10-26','acquisition_date':'Mixed source dates; snapshot and retrieval are not acquisition dates','bounds':list(bounds),'coordinates':coordinates,'export_resolution_3857_m':list(s.res),'approx_ground_resolution_at_36_2_m':s.res[0]*math.cos(math.radians(36.2)),'units':'meters','minimum_m':float(a.min()),'maximum_m':float(a.max()),'tiles':{'minzoom':6,'maxzoom':10,'size':256,'encoding':'terrarium','count':tile_count},'exaggeration':2,'section':{'latitude':36.2,'canal_longitude':xcanal,'length_km':float(dist[-1])},'request_url':'https://elevation.nationalmap.gov/arcgis/rest/services/3DEPElevation/ImageServer/exportImage?bbox=-120.4,35,-118.2,37.3&bboxSR=4326&imageSR=3857&size=1000,1300&format=tiff&pixelType=F32&f=json','raw_sha256':hashlib.sha256((raw/'terrain.tif').read_bytes()).hexdigest(),'limitations':'Regional resampled terrain. No fine canal geometry, water-surface height, freeboard, bed slope, dated terrain-change measurement, or repair performance implied. Export cells about 198 m on ground at section latitude; tiles may oversample. Edge tiles use 0 outside bounded export; map views constrained away from edges.'}
 (dest/'terrain-meta.json').write_text(json.dumps(meta,indent=2)+'\n');(R/'research/TERRAIN_PROVENANCE.json').write_text(json.dumps(meta,indent=2)+'\n')
 print(json.dumps({'tiles':tile_count,'section_range_m':[min(elevations),max(elevations)],'canal_crossing':xcanal,'ground_resolution':meta['approx_ground_resolution_at_36_2_m']}))
