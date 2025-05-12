import os
import eel
import GrabWeather

eel.init("web")

##To use a return value in the javascript, it needs to be set up as an async function. Be sure to use ()()##
@eel.expose
def poke_html():
    #This was just a test to find out how eel passes data
    return "Hi, i'm a snake."

@eel.expose
def get_zipcode(zipcode):
    # Get the zipcode from the html/js
    print(zipcode)

def get_weather_json(zipcode):
    pass

if __name__ == "__main__":
    eel.start("index.html", mode="firefox", size=(800, 600))