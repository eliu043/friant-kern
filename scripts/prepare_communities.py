"""Join official Census city estimates to Gazetteer reference points; no network."""
from pathlib import Path
import csv,io,json,zipfile,hashlib
R=Path(__file__).resolve().parents[1]; raw=R/'research/raw/census'
with zipfile.ZipFile(raw/'2020_Gaz_place_national.zip') as z:
 gaz=csv.DictReader(io.StringIO(z.read(z.namelist()[0]).decode('utf-8-sig')),delimiter='\t')
 gaz.fieldnames=[n.strip() for n in gaz.fieldnames]
 points={r['GEOID']:(float(r['INTPTLONG']),float(r['INTPTLAT'])) for r in gaz if r['USPS']=='CA'}
features=[]
with (raw/'sub-est2025_6.csv').open(encoding='latin-1') as f:
 for r in csv.DictReader(f):
  if r['SUMLEV']!='162':continue
  geoid=r['STATE']+r['PLACE']
  if geoid not in points:continue
  x,y=points[geoid]
  if not (-120.1<=x<=-118.6 and 35.2<=y<=37.15):continue
  features.append({'type':'Feature','properties':{'geoid':geoid,'name':r['NAME'].removesuffix(' city'),'population':int(r['POPESTIMATE2025']),'date':'2025-07-01'},'geometry':{'type':'Point','coordinates':[x,y]}})
features.sort(key=lambda f:f['properties']['name'])
(R/'public/data/communities.geojson').write_text(json.dumps({'type':'FeatureCollection','features':features},indent=2)+'\n')
manifest={'population_source':'https://www2.census.gov/programs-surveys/popest/datasets/2020-2025/cities/totals/sub-est2025_6.csv','position_source':'https://www2.census.gov/geo/docs/maps-data/data/gazetteer/2020_Gazetteer/2020_Gaz_place_national.zip','retrieved':'2026-11-13','population_field':'POPESTIMATE2025','date':'2025-07-01','selection':'SUMLEV 162 incorporated places with 2020 Gazetteer reference point inside [-120.1,35.2,-118.6,37.15]; GEOID join','feature_count':len(features),'limitations':'2025 city population estimates positioned at 2020 reference points; no city boundaries, CDPs, rural households, water-service membership, or exposed-population totals implied. Not co-temporal with 2015–Jan2024 displacement.','files':[]}
for p in [raw/'sub-est2025_6.csv',raw/'2020_Gaz_place_national.zip']:
 manifest['files'].append({'file':p.name,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
(R/'research/CENSUS_PROVENANCE.json').write_text(json.dumps(manifest,indent=2)+'\n')
print('Prepared',len(features),'cities')
for f in features:
 if f['properties']['name'] in ['Lindsay','Delano','Porterville']:print(f['properties'])
