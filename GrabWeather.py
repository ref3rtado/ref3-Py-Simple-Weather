import requests
import json

def test_func(zipcode, request_params, key):
    url = "http://api.weatherapi.com/v1"
    for param in request_params:
        
        url += param
    url += "?key=" + key
    url += "&q=" + zipcode
    print(url)

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
            print("Request successful")
            return response.json()
        else:
            print("Error: ", response.status_code)
            return response.status_code
    except requests.exceptions.RequestException as e:
        print("Request failed: ", e)
        return response.status_code

if __name__ == "__main__":
    # This is just set up to test parsing json data and appending a key to the url. 
    # It's  intended for SimpleWeather.py to call the main() function with user defined values. 
    zipcode = "90210"
    url = "http://api.weatherapi.com/v1/current.json"
    api_key = get_api_key()
    request_params = ["/current.json"]
    test_func(zipcode, request_params, api_key)