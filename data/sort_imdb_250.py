import json

json_data = open('imdb_250.json')
data = json.load(json_data)

sortedList = sorted(data, key=lambda k: k['total_views'])[::-1]

with open('sorted_imdb.json', 'w') as outfile:
	json.dump(sortedList, outfile)