import json

json_data = open('geo_streams.json')
data = json.load(json_data)
geo_streams = {}

for site in data:
  # check number of countries is > 0; if 0, no data was available on alexa.com
  geo_streams[site] = {}
  for country in data[site]:
    country_lst = country['title'].split(':')
    country = country_lst[0]
    percent = country_lst[1][:-1]
    prop = float(percent)/100
    val = {country: round(prop, 5)}
    geo_streams[site].update(val)

with open('geo_streams_complete.json', 'w') as outfile:
  json.dump(geo_streams, outfile)
