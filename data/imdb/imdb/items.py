# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy


class ImdbItem(scrapy.Item):
    movie_name = scrapy.Field()
    year = scrapy.Field()
    rating = scrapy.Field()
    duration = scrapy.Field()
    genre = scrapy.Field()
    imdb_url = scrapy.Field()
    imdb_rating = scrapy.Field()
    pw_url = scrapy.Field()
    stream_info = scrapy.Field()
    total_views = scrapy.Field()
