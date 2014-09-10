import json

json_data = open('imdb_250_complete.json')
data = json.load(json_data)

all_streams = {}
total = 0

for movie in data:
  stream_info = movie['stream_info']
  if len(stream_info) > 0:
    for stream in stream_info:
      if stream not in all_streams:
        all_streams[stream] = stream_info[stream]
      else:
        all_streams[stream] += stream_info[stream]

with open('total_stream.json', 'w') as outfile:
  json.dump(all_streams, outfile)
