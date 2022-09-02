from bs4 import BeautifulSoup

with open('index.html', 'r') as html_file:
	content = html_file.read()

	soup = BeautifulSoup(content, 'lxml')
	courses_html_tags = soup.find_all('h3')
	for course in courses_html_tags:
		print (course.text)
