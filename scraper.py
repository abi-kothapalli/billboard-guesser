from bs4 import BeautifulSoup
import sys, requests, random, json

def scrape_charts():

    source = requests.get("https://www.billboard.com/charts/hot-100").text
    soup = BeautifulSoup(source, "lxml")

    top_100 = dict()

    for song_entry in soup.find_all("li", class_="chart-list__element"):
        button = song_entry.button
        rank = button.find("span", class_="chart-element__rank__number").text
        name = button.find("span", class_="chart-element__information__song").text
        artist = button.find("span", class_="chart-element__information__artist").text
        
        top_100[rank] = dict()
        top_100[rank]["rank"] = rank
        top_100[rank]["name"] = name
        top_100[rank]["artist"] = artist

    return top_100

def choose_rand_songs(numSongs = 100):

    top_100 = scrape_charts()

    selected_songs = []
    song_idx = random.sample(range(1, 101), numSongs)

    for idx in song_idx:
        selected_songs.append(top_100[str(idx)])

    return selected_songs

if __name__ == "__main__":
    print(json.dumps(choose_rand_songs(int(sys.argv[1]))))
    sys.stdout.flush()
    sys.exit(0)