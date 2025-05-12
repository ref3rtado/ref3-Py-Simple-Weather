import requests
import json

def main(zipcode, request_params, key):
    url = "http://api.weatherapi.com/v1"
    for param in request_params:
        # I plan on using "checked" html option to pass the data the user is requesting from the api.
        # There may be multiple options checked, so it's going to pass an array of strings. 
        url += param
    url += "?key=" + key
    url += "&q=" + zipcode
    print(url)

def get_api_key():
    with open("keys.json", "r") as file:
        key_file = json.load(file)
        return key_file["free-weather-api"]

if __name__ == "__main__":
    # This is just set up to test parsing json data and appending a key to the url. 
    # It's  intended for SimpleWeather.py to call the main() function with user defined values. 
    zipcode = "90210"
    url = "http://api.weatherapi.com/v1/current.json"
    api_key = get_api_key()
    request_params = ["/current.json"]
    main(zipcode, request_params, api_key)