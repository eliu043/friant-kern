"""Audit original rasters without interpreting encoding diagnostics as irrigation loss."""
from pathlib import Path
import json,hashlib
import numpy as np
import rasterio
R=Path(__file__).resolve().parents[1];out={}
for year in (2021,2024):
    p=R/f'research/raw/irrigation-{year}.tif'
    with rasterio.open(p) as s:
        counts={}
        for row in range(0,s.height,256):
            a=s.read(1,window=rasterio.windows.Window(0,row,s.width,min(256,s.height-row)))
            u,c=np.unique(a,return_counts=True)
            for v,n in zip(u,c):counts[str(v)]=counts.get(str(v),0)+int(n)
        out[year]={'crs':str(s.crs),'bounds':list(s.bounds),'resolution':list(s.res),'shape':list(s.shape),'dtype':s.dtypes,'nodata':s.nodata,'values':counts,'md5':hashlib.md5(p.read_bytes()).hexdigest()}
assert out[2021]['md5']=='c7443b9d54737e58c0cb3d4b0f23e0fc'
assert out[2024]['md5']=='8679044fa62ccbafe310e07ec21fc327'
(R/'research/irrigation-audit.json').write_text(json.dumps(out,indent=2))
counts=dict.fromkeys(['valid_2021','ones_2021','ones_2024_on_2021_mask','ones_2024_outside_2021_mask','ones_both'],0)
with rasterio.open(R/'research/raw/irrigation-2021.tif') as a,rasterio.open(R/'research/raw/irrigation-2024.tif') as b:
    assert a.shape==b.shape and a.transform.almost_equals(b.transform)
    for row in range(0,a.height,256):
        win=rasterio.windows.Window(0,row,a.width,min(256,a.height-row));x=a.read(1,window=win);y=b.read(1,window=win);valid=x!=-999
        for key,m in [('valid_2021',valid),('ones_2021',x==1),('ones_2024_on_2021_mask',(y==1)&valid),('ones_2024_outside_2021_mask',(y==1)&~valid),('ones_both',(x==1)&(y==1))]:counts[key]+=int(np.sum(m))
(R/'research/irrigation-mask-check.json').write_text(json.dumps(counts,indent=2))
print('Checksums and effective grid alignment verified. Mask encoding differs; no loss estimate generated.')
