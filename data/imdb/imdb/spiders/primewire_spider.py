import scrapy
import json
from imdb.items import ImdbItem
from pprint import pprint
from scrapy.http import Request

class PrimeWireSpider(scrapy.Spider):
  name = 'primewire'
  allowed_domains = ["primewire.ag"]
  start_urls = ['http://www.primewire.ag']


  def parse(self, response):
    json_data = open('imdb_250.json')
    data = json.load(json_data)
    base_url = 'http://www.primewire.ag'

    for movie in data:
      # Define movie url
      pw_url = movie['pw_url'].encode("utf-8")
      url = 'http://www.primewire.ag' + pw_url

      # Need to create new movie item for outout
      item = ImdbItem()
      item['movie_name']  = movie['movie_name']
      item['year']        = movie['year']
      item['imdb_url']    = movie['imdb_url']
      item['imdb_rating'] = movie['imdb_rating']
      item['rating']      = movie['rating']
      item['genre']       = movie['genre']
      item['duration']    = movie['duration']
      item['pw_url']      = movie['pw_url']

      # Make move page request
      request = Request(url, callback=self.parse_movie)
      request.meta['item'] = item
      yield request


  def parse_movie(self, response):
    item = response.meta['item']
    link_tables = response.xpath("//div[@class='actual_tab']/table")
    movie_dict = {}
    total_views = 0

    # Loops through each table containing the external stream links
    for i in range(0, len(link_tables)-1):

      # Check to see if the column contains a link
      if len(link_tables[i].xpath("tbody/tr/td")) > 0:
        col_content = link_tables[i].xpath("tbody/tr/td")[2].extract().encode("utf-8")
        col_string = col_content[col_content.find("(")+1:col_content.find(")")][1:-1]

        # Check to make sure it isn't an ad
        if col_string == 'Watch HD':
          continue
        else:
          view_content = link_tables[i].xpath("tbody/tr/td")[3].extract().encode("utf-8")
          views = ''.join(x for x in view_content if x.isdigit())

          # Add stream link and views to dict
          if col_string not in movie_dict:
            movie_dict[col_string] = int(views[2:])
          else:
            movie_dict[col_string] += int(views[2:])

          total_views += int(views[2:])
      else:
        continue

    item['total_views'] = total_views
    item['stream_info'] = movie_dict

    yield item





