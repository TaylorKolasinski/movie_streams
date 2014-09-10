import webbrowser
import json

# Had trouble scraping behind a log in, semi-manual work around
json_data = open('total_stream.json')
data = json.load(json_data)
geo_streams = {}

for stream in data:
  url = 'view-source:http://www.alexa.com/siteinfo/' + stream
  webbrowser.open(url, new=1)
  geo_streams[stream] = {}


with open('geo_streams.json', 'w') as outfile:
  json.dump(geo_streams, outfile)