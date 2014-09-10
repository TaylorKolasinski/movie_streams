import scrapy
import json
from imdb.items import ImdbItem
from pprint import pprint
from scrapy.http import Request

class AlexaSpider(scrapy.Spider):
  name = 'alexa'
  allowed_domains = ["alexa.com"]
  start_urls = ['https://www.alexa.com/secure/login']


  def parse(self, response):
    return scrapy.FormRequest.from_response(
      response,
      formdata={'email': 'taylorkolasinski@gmail.com', 'password': 'westlinn5'},
      callback=self.after_login
    )


  def after_login(self, response):
    request = Request('http://www.alexa.com/siteinfo/sockshare.com', callback=self.get_info)
    yield request


  def get_info(self, response):
    print response.body







