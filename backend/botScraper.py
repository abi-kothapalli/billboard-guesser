from selenium import webdriver
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities
from selenium.webdriver.chrome.options import Options
from bs4 import BeautifulSoup
import sys
import time
import json
PATH = "./backend/chromedriver"


def scrape_with_bot():

    caps = DesiredCapabilities.CHROME
    # Make it so that the webdriver does not wait until the page has completed loading in its entirety, since the ads slow the page down
    caps["pageLoadStrategy"] = "eager"

    options = Options()
    # Makes the driver run in the background without actually opening a Chrome window
    options.headless = True

    driver = webdriver.Chrome(PATH, desired_capabilities=caps, options=options)

    driver.get("https://www.billboard.com/charts/hot-100")

    screen_height = driver.execute_script("return window.screen.height;")

    # Loop simulates scrolling down the webpage so that all of the pictures are loaded
    i = 1
    while True:
        driver.execute_script(f"window.scrollTo(0, {screen_height}*{i-0.5});")
        time.sleep(0.2)
        driver.execute_script(f"window.scrollTo(0, {screen_height}*{i});")
        time.sleep(0.2)

        i += 1

        scroll_height = driver.execute_script(
            "return document.body.scrollHeight;")
        if (screen_height * i) > scroll_height:
            break

    # Once the driver has scrolled to the end of the page, break out of loop, get the current page source, and exit out of the driver
    soup = BeautifulSoup(driver.page_source, "lxml")
    driver.quit()

    top_100 = []

    # Var to keep track of whether any images were not retrieved in the page source
    badImages = 0

    # Gets every song entry found on the webpage
    for song_entry in soup.find_all("li", class_="chart-list__element"):

        # Parse each song entry to determine rank, title, artist, and image URL
        button = song_entry.button
        rank = button.find("span", class_="chart-element__rank__number").text
        name = button.find(
            "span", class_="chart-element__information__song").text
        artist = button.find(
            "span", class_="chart-element__information__artist").text
        image = button.find("span", class_="chart-element__image")

        image = image['style']

        # Catches if any images did not load while the driver was scrolling down the page
        if(image[:1] == "d"):
            badImages += 1

        # Extract image URL
        image = image[image.find("\"")+1:]
        image = image[:image.find("\"")]

        # Store data in dictionary
        song_entry = dict()
        song_entry["rank"] = rank
        song_entry["title"] = name
        song_entry["artist"] = artist
        song_entry["picture"] = image

        top_100.append(song_entry)

    # In case some images did not actually load
    if(badImages != 0):
        top_100.append("Some images did not load")

    return(top_100)


# Print the extracted data and flush the standard output so that the data can be retrieved when the Node.js backend runs this script
print(json.dumps(scrape_with_bot()))
sys.stdout.flush()

# If the exit code 0 is not catched by the NodeJS server, that means something went wrong while executing the script
sys.exit(0)
