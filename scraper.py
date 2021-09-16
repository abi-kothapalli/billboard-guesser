from bs4 import BeautifulSoup
import requests

source = requests.get('https://www.billboard.com/charts/hot-100').text
soup = BeautifulSoup(source, 'lxml')


def scrape_charts():

    top_100 = dict()

    for song_entry in soup.find_all('li', class_="chart-list__element"):
        button = song_entry.button
        rank = button.find('span', class_="chart-element__rank__number").text
        name = button.find('span', class_="chart-element__information__song").text
        artist = button.find('span', class_="chart-element__information__artist").text
        
        top_100[rank] = dict()
        top_100[rank]["rank"] = rank
        top_100[rank]["name"] = name
        top_100[rank]["artist"] = artist


        print(f"{rank}: {name} by {artist}", end="\n\n")

    return top_100
