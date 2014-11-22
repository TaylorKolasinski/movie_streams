import json

json_data = open('imdb_250.json')
data = json.load(json_data)
ranking = {}
rating_index = []
rating = []
movies = []

# Get all rankings
for movie in data:
	if movie["rating"] not in rating_index:
		rating_index.append(movie["rating"])
print len(rating_index)

for i, movie in enumerate(data):
	r = movie['rating']
	temp_ar = []
	for j, ra in enumerate(rating_index):
		if ra == r:
			stats = { 'x': rating_index.index(r),
								'y': movie['total_views'],
								'movie': movie['movie_name']
							}
		else:
			stats = { 'x': j,
								'y': 0,
								'movie': movie['movie_name']
							}
		# print stats
		temp_ar.append(stats)
	rating.append(temp_ar)
# print rating

stacked = {'ratings': rating_index,
					 'stats': rating
					}


with open('stacked_data_rating.json', 'w') as outfile:
  json.dump(stacked, outfile)


# genres = []
# for movie in data:
# 	if movie['genre'] not in genres:
# 		genres.append(movie['genre'])

# for movie in data:
# 	for i, g in enumerate(genres):
# 		print g




# example parsing
# rating: [
		# # { 'x': rating,
		# 		'y': views,
		# 		'movie': movie,
		# # }
# ]



# for movie in data:
# 	if movie['genre'] not in genre:
# 		genre[movie['genre']] = [movie]
# 	else:
# 		genre[movie['genre']].append(movie)

# 	# if movie['rating'] not in rating:
# 	# 	rating[movie['rating']] = [movie]
# 	# else:
# 	# 	rating[movie['rating']].append(movie)

# 	# if movie['imdb_rating'] not in ranking:
# 	# 	ranking[movie['imdb_rating']] = [movie]
# 	# else:
# 	# 	ranking[movie['imdb_rating']].append(movie)
 

# stacked = {'genre': genre, 'rating': rating, 'ranking': ranking}
# with open('stacked_data.json', 'w') as outfile:
#   json.dump(stacked, outfile)