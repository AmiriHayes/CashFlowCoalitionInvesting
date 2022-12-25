"""

Created Nov 21, 22 ; 4:52:22
@author: amirihayes1@gmail.com

"""

"""
import bs4
import requests
from bs4 import BeautifulSoup

def parsePrice():
	r=requests.get('https://finance.yahoo.com/quote/AAPL?p=AAPL')
	soup = bs4.BeautifulSoup(r.text, "xml")
	price = soup.find_all('div',{'class':'Fw(b) Fz(36px) Mb(-4px) D(ib)'})[0].text
	return parsePrice

while True:
	print('the current price: '+ str(parsePrice()))

with open('index.html', 'r') as html_file:
	content = html_file.read()

	soup = BeautifulSoup(content, 'lxml')
	courses_html_tags = soup.find_all('h3')
	for course in courses_html_tags:
		print (course.text)
"""