# -*- coding: utf-8 -*-

BOT_NAME = 'imdb'

SPIDER_MODULES = ['imdb.spiders']
NEWSPIDER_MODULE = 'imdb.spiders'

# Set to 10 only for the primewire scrapping to avoid bot detection - may be excessively high
DOWNLOAD_DELAY = 10.0

