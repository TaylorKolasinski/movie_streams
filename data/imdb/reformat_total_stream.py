import json

json_data = open('total_stream.json')
data = json.load(json_data)

total_stream = []

for (i, stream) in enumerate(data):
	total_stream.append({'name': stream,
										 'count': data[stream]
										})
with open('total_stream_final.json', 'w') as outfile:
	json.dump(total_stream, outfile)