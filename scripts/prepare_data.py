"""Regenerate display assets. pip install rasterio numpy pillow pyproj. No network."""
from pathlib import Path
import json, hashlib
import numpy as np
import rasterio
from rasterio.warp import calculate_default_transform, reproject, Resampling, transform_bounds
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
raw=ROOT/'research/raw'; dest=ROOT/'public/data'
with rasterio.open(raw/'displacement-2024.tif') as s:
    tr,w,h=calculate_default_transform(s.crs,'EPSG:3857',s.width,s.height,*s.bounds)
    a=np.full((h,w),-9999,dtype=np.float32)
    reproject(rasterio.band(s,1),a,src_transform=s.transform,src_crs=s.crs,dst_transform=tr,dst_crs='EPSG:3857',resampling=Resampling.nearest,src_nodata=-9999,dst_nodata=-9999)
    rgba=np.zeros((h,w,4),dtype=np.uint8)
    # Feet; categories distinguish lowering from stability/uplift. No-data is transparent.
    colors=['#f4ecd8','#e9d3a5','#dba870','#c0784f','#9e483a','#682c32']
    for i,(lo,hi) in enumerate([(-.1,100),(-.5,-.1),(-1,-.5),(-2,-1),(-4,-2),(-100,-4)]):
        m=(a>=lo)&(a<hi)&(a!=-9999)
        rgba[m]=[int(colors[i][k:k+2],16) for k in (1,3,5)]+[235]
    Image.fromarray(rgba).save(dest/'displacement.png')
    west,south,east,north=transform_bounds('EPSG:3857','EPSG:4326',tr.c,tr.f+tr.e*h,tr.c+tr.a*w,tr.f)
    meta={'coordinates':[[west,north],[east,north],[east,south],[west,south]],'bounds':list(s.bounds),'resolution':list(s.res),'units':'feet','start':'2015-06-13','end':'2024-01-01','displayResampling':'nearest, Web Mercator','minimum':float(a[a!=-9999].min()),'maximum':float(a[a!=-9999].max())}
    # Three genuine raster samples at named approximate locators; no canal deformation inference.
    samples=[]
    for name,x,y in [('Near Lindsay',-119.09,36.20),('Near Terra Bella',-119.08,35.96),('Near Delano',-119.15,35.78)]:
        value=next(s.sample([(x,y)]))[0]
        samples.append({'type':'Feature','properties':{'name':name,'feet':None if value==-9999 else round(float(value),2),'note':'Regional raster cell at approximate locator; not a canal survey.'},'geometry':{'type':'Point','coordinates':[x,y]}})
    (dest/'samples.geojson').write_text(json.dumps({'type':'FeatureCollection','features':samples}))
    (dest/'raster-meta.json').write_text(json.dumps(meta,indent=2))
manifest=[]
for p in sorted(raw.iterdir()):
    if not p.is_file():
        continue  # Census inputs have their own nested provenance manifest.
    manifest.append({'file':p.name,'bytes':p.stat().st_size,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
(ROOT/'research/checksums.json').write_text(json.dumps(manifest,indent=2))
print(json.dumps(meta));print(json.dumps(samples))
