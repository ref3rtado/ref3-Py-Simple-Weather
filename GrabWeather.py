import requests
import json
import logging
import sys

# Set up logging
logging.basicConfig(
    level=logging.INFO, 
    stream=sys.stdout, 
    format='%(asctime)s - %(levelname)s - %(filename)s - %(message)s')
logger = logging.getLogger(__name__)

def get_api_key():
    with open("keys.json", "r") as file:
        key_file = json.load(file)
        return key_file["free-weather-api"]

def get_weather_json(zipcode, request_params=["/current.json"]):
    # First we set up the GET request url
    api_key = get_api_key()
    url = "http://api.weatherapi.com/v1/current.json"
    for option in request_params:
        url += option
    url += "?key=" + api_key
    url += "&q=" + zipcode
    print("get_weather_json: ", url)
    # Now we make the GET request and get the json object
    raw_json = make_request(url)
    return raw_json

def make_request(url):
    # This function makes the GET request to the weather api and returns the json data
    try:
        response = requests.get(url)
        if response.status_code == 200:
            logger.info("Request successful")
            return response.json()
        else:
            logger.critical("Error: ", response.status_code)
            return response.status_code
    except requests.exceptions.RequestException as e:
        logger.critical("Request failed: ", e)
        return response.status_code

if __name__ == "__main__":
    # This is just set up to test parsing json data and appending a key to the url. 
    # It's  intended for SimpleWeather.py to call the main() function with user defined values. 
    logger.info("Sending test values")
    zipcode = "90210"
    request_params = ["/current.json"]
    get_weather_json(zipcode, request_params)