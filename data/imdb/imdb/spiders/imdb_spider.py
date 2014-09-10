import scrapy
from scrapy.http import Request
from imdb.items import ImdbItem

class ImdbSpider(scrapy.Spider):
  name = 'imdb'
  allowed_domains = ["imdb.com", "primewire.ag", "merdb.cn"]
  start_urls = ['http://www.imdb.com/chart/top']


  def parse(self, response):
    top_table = response.xpath("//table[@class='chart']")
    rows = top_table.xpath('//tr')
    base_url = "http://www.imdb.com"

    # Loop through each movie item in top 250
    for row in top_table.xpath('tbody/tr'):
      item = ImdbItem()
      item['movie_name']  = row.xpath("td[@class='titleColumn']/a/text()").extract()[0].encode("utf-8")
      item['year']        = row.xpath("td[@class='titleColumn']/span[@name='rd']/text()").extract()[0].encode("utf-8")[1:5]
      item['imdb_url']    = "http://www.imdb.com" + row.xpath("td[@class='titleColumn']/a/@href").extract()[0].encode("utf-8")
      item['imdb_rating'] = row.xpath("td[@class='ratingColumn']/strong/text()").extract()[0].encode("utf-8")

      # Make request to get additional information from movie page
      request = Request(item['imdb_url'], callback=self.imdb_info)
      request.meta['item'] = item
      yield request


  def imdb_info(self, response):
    item = response.meta['item']
    info_table = response.xpath("//table[@id='title-overview-widget-layout']")

    if len(info_table.xpath("tbody/tr/td[@id='overview-top']/div[@class='infobar']/span[1]/@title")) > 0:
      item['rating'] = info_table.xpath("tbody/tr/td[@id='overview-top']/div[@class='infobar']/span[1]/@title").extract()[0].encode("utf-8")
    else:
      item['rating'] = 'CHECK THIS - Rating'

    item['duration'] = info_table.xpath("tbody/tr/td[@id='overview-top']/div[@class='infobar']/time/@datetime").extract()[0].encode("utf-8")[2:][:-1]
    item['genre'] = info_table.xpath("tbody/tr/td[@id='overview-top']/div[@class='infobar']/a/span[@itemprop='genre']/text()").extract()[0].encode("utf-8")

    # Create search query to get move page url for primewire
    # merdb.cn has exact sitemap as primewire, but it's not as popular so view counts are lower
    pw_search_url = 'http://www.merdb.cn/?search=' + item['movie_name'].replace("'", "")
    request = Request(pw_search_url, callback=self.pw_info)
    request.meta['item'] = item

    yield request


  def pw_info(self, response):
    item = response.meta['item']
    movies = response.xpath("//div[@class='main_list_box']")

    if len(movies) > 1:
      for mov in movies:
        cur_title = item['movie_name'] + ' (' + item['year'] + ')'

        if mov.xpath("div[@class='list_box_title']/a/text()").extract()[0].encode("utf-8") == cur_title:
          item['pw_url'] = mov.xpath("div[@class='list_box_title']/a/@href").extract()[0].encode("utf-8")
        else:
          item['pw_url'] = 'Check this - alot'

    else:
      if len(movies.xpath("a/@href")) > 0:
        item['pw_url'] = movies.xpath("a/@href").extract()[0].encode("utf-8")
      else:
        item['pw_url'] = 'check this - none'

    yield item


