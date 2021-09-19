from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
PATH = "./chromedriver"

driver = webdriver.Chrome(PATH)


driver.get("https://www.billboard.com/charts/hot-100")

search = driver.find_elements_by_class_name("chart-list__element")

print(search)

driver.quit()
