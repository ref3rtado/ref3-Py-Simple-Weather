import eel
import GrabWeather
import logging
import sys

# Set up logging
logging.basicConfig(
    level=logging.INFO, 
    stream=sys.stdout, 
    format='%(asctime)s - %(levelname)s - %(filename)s - %(message)s')
logger = logging.getLogger(__name__)

# This tells eel where to find the front-end files
eel.init("web")

##To use a return value in the javascript, it needs to be set up as an async function. Be sure to use ()()##
@eel.expose
def poke_html():
    #This was just a test to find out how eel passes data
    return "Hi, i'm a snake."

# Get the zipcode from the html/js
@eel.expose
def get_zipcode(zipcode):
    # Call the weather api. Returns json object
    raw_weather_json = GrabWeather.get_weather_json(zipcode)
    
    # TODO: Parse and format the json data for the html
    print("raw_weather_json: ", raw_weather_json)
    eel.getRawJSON(raw_weather_json)

# Initiate the webUI #
if __name__ == "__main__":
    logger.info("Starting SimpleWeather.py")
    eel.start("index.html", mode="firefox", size=(800, 600))