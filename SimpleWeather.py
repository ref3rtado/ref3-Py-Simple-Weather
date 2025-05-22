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
    parse_json(raw_weather_json)

#TODO: JavaScript should tell python what data it wants to display, pass it as an argument, which will return paired down map of relevant data
    #The JavaScript should translate the html select-options to the keys in the json object, and pass values(keys) to this funciton
def parse_json(raw_json):
    location_info = {}
    quick_look_weather = {}
    detailed_weather = {}
    location_info['location'] = [
        raw_json['location']['name'], 
        raw_json['location']['region'], 
        raw_json['location']['country']
        ]
    location_info['local_time'] = [
        raw_json['location']['localtime_epoch'],
        raw_json['location']['tz_id']
        ]
    quick_look_weather['temperature'] = [
        raw_json['current']['temp_c'],
        raw_json['current']['feelslike_c'], 
        raw_json['current']['temp_f'],
        raw_json['current']['feelslike_f']
        ]
    quick_look_weather['overall_condition'] = [
        raw_json['current']['condition']['text'], 
        raw_json['current']['condition']['icon']
        ]
    quick_look_weather['wind'] = [
        raw_json['current']['wind_mph'],
        raw_json['current']['wind_dir']
        ]
    detailed_weather['humidity'] = [
        raw_json['current']['humidity'], 
        ]
    detailed_weather['precipitation'] = [
        raw_json['current']['precip_mm'], 
        raw_json['current']['precip_in']
        ]
    detailed_weather['pressure'] = [
        raw_json['current']['pressure_mb'], 
        raw_json['current']['pressure_in']
        ]
    detailed_weather['uv_index'] = [
        raw_json['current']['uv'], 
        ]
    detailed_weather['visibility'] = [
        raw_json['current']['vis_km'], 
        raw_json['current']['vis_miles']
        ]
    #Put in the payload and send it to the front-end
    payload = [location_info, quick_look_weather, detailed_weather] 
    eel.getPythonData(payload)

# Initiate the webUI #
if __name__ == "__main__":
    logger.info("Starting SimpleWeather.py")
    eel.start("index.html", mode="firefox", size=(800, 600))