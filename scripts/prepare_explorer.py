"""Prepare bounded, source-backed closing-map layers from retained inputs."""
from pathlib import Path
import csv, io, json, zipfile, hashlib

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / 'research/raw/explorer'
OUT = ROOT / 'public/data'
BOUNDS = [-119.65, 35.65, -118.75, 36.35]

def simplify(points, tolerance=.00004):
    if len(points) < 3:
        return points
    a, b = points[0], points[-1]
    dx, dy = b[0]-a[0], b[1]-a[1]
    denom = dx*dx+dy*dy
    distances = []
    for p in points[1:-1]:
        t = max(0, min(1, ((p[0]-a[0])*dx+(p[1]-a[1])*dy)/denom)) if denom else 0
        distances.append((p[0]-a[0]-t*dx)**2+(p[1]-a[1]-t*dy)**2)
    farthest = max(distances)
    if farthest <= tolerance*tolerance:
        return [a,b]
    i = distances.index(farthest)+1
    return simplify(points[:i+1])[:-1]+simplify(points[i:])

data = json.loads((RAW/'dwr-block-groups.geojson').read_text())
assert len(data['features']) == 329, 'Unexpected subset; inspect service pagination'
def in_ring(x, y, ring):
    inside = False
    for a,b in zip(ring,ring[1:]):
        if (a[1]>y)!=(b[1]>y) and x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0]:
            inside = not inside
    return inside

def containing_group(x, y, source):
    for f in source['features']:
        g = f['geometry']
        polygons = [g['coordinates']] if g['type']=='Polygon' else g['coordinates']
        if any(in_ring(x,y,p[0]) and not any(in_ring(x,y,h) for h in p[1:]) for p in polygons):
            return f['properties']['GEOID20']
    return None

# Compute point membership before display simplification.
original_data = json.loads(json.dumps(data))
for f in data['features']:
    p = f['properties']
    f['properties'] = {k:p[k] for k in ['GEOID20','Pop23','HH23','DAC23','MHI23']}
    g = f['geometry']
    polygons = [g['coordinates']] if g['type']=='Polygon' else g['coordinates']
    for polygon in polygons:
        for i, ring in enumerate(polygon):
            reduced = simplify(ring)
            polygon[i] = reduced if len(reduced)>=4 else ring
(OUT/'community-block-groups.geojson').write_text(json.dumps(data,separators=(',',':'))+'\n')

with zipfile.ZipFile(ROOT/'research/raw/census/2020_Gaz_place_national.zip') as z:
    rows = csv.DictReader(io.StringIO(z.read(z.namelist()[0]).decode('utf-8-sig')),delimiter='\t')
    rows.fieldnames = [f.strip() for f in rows.fieldnames]
    places = []
    for p in rows:
        if p['USPS']!='CA': continue
        x,y = float(p['INTPTLONG']),float(p['INTPTLAT'])
        if not (BOUNDS[0]<=x<=BOUNDS[2] and BOUNDS[1]<=y<=BOUNDS[3]): continue
        group = containing_group(x,y,original_data)
        places.append({'type':'Feature','properties':{'geoid':p['GEOID'],'name':p['NAME'].removesuffix(' CDP').removesuffix(' city'),'kind':'Census-designated place' if p['NAME'].endswith(' CDP') else 'Incorporated city','reference_block_group':group},'geometry':{'type':'Point','coordinates':[x,y]}})
places.sort(key=lambda f:f['properties']['name'])
(OUT/'explorer-places.geojson').write_text(json.dumps({'type':'FeatureCollection','features':places},separators=(',',':'))+'\n')

# This is a locator along the retained centerline, never an invented as-built alignment.
lines = json.loads((OUT/'canal.geojson').read_text())['features'][0]['geometry']['coordinates']
north = json.loads((RAW/'north-crossing.json').read_text())['candidates'][0]['location']['y']
south = json.loads((RAW/'south-crossing.json').read_text())['candidates'][0]['location']['y']
parts = []
for line in lines:
    segment = []
    for a,b in zip(line,line[1:]):
        if max(a[1],b[1]) < south or min(a[1],b[1]) > north: continue
        clipped = []
        for point, other in [(a,b),(b,a)]:
            y = max(south,min(north,point[1]))
            t = (y-point[1])/(other[1]-point[1]) if other[1]!=point[1] else 0
            clipped.append([round(point[0]+t*(other[0]-point[0]),6),round(y,6)])
        if not segment: segment.append(clipped[0])
        segment.append(clipped[1])
    if segment: parts.append(segment)
repair = {'type':'Feature','properties':{'name':'Phase 1 project corridor','note':'Approximate locator on the older reference centerline between Avenue 136 and Avenue 64 latitudes; not the rebuilt channel or construction boundary.'},'geometry':{'type':'MultiLineString','coordinates':parts}}
(OUT/'repair-corridor.geojson').write_text(json.dumps(repair,separators=(',',':'))+'\n')
manifest = {'retrieved':'2026-11-13','block_groups':{'item':'https://www.arcgis.com/home/item.html?id=71c73d8379a346c7b8711e50875fb15f','service':json.loads((RAW/'dwr-item.json').read_text())['url'],'selection':'Geometry intersects regional envelope '+str(BOUNDS),'count':len(data['features']),'vintage':'ACS 2019–2023 estimates joined by DWR to 2020 block-group geography','classification':'DAC23 supplied by DWR: Y, N, Data not available; no classification recomputed','simplification':'Douglas–Peucker, 0.00004 degree tolerance; display only','limitations':'No ACS margins of error in this extract. Income designation does not measure canal dependence, water quality, dry wells, individual household income, or project effects.'},'places':{'source':'2020 Census Gazetteer, retained national place file','count':len(places),'selection':'Reference point within the regional envelope','limitations':'Includes cities and CDPs, not all settlements; points are not footprints or water-service areas.'},'repair':{'source':'https://static1.squarespace.com/static/58c2eccc15d5db46200ea426/t/62d6ee396cf9330b42cf7772/1658252859680/FWA_eNews_07-2022.pdf','page':3,'method':'Clip older reference centerline to geocoded Avenue 136 / Road 208 and Avenue 64 / Road 192 latitudes. Crossing responses retained. Broad corridor locator only; no eastward offset or new as-built line fabricated.','bounds_latitudes':[south,north]},'sha256':{p.name:hashlib.sha256(p.read_bytes()).hexdigest() for p in RAW.iterdir()}}
manifest['places']['block_group_join'] = 'Gazetteer reference point containment in original unsimplified DWR polygons, excluding holes. The selected point inherits block-group context, never a whole-town estimate or service assignment.'
(ROOT/'research/EXPLORER_PROVENANCE.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Prepared',len(data['features']),'block groups,',len(places),'places;',len(parts),'repair locator parts')
