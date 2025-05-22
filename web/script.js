console.log("Script loaded");

//If grabbing a value from python function, it needs to be an async function
//If you want to use the value in a variable, you need to use await

async function poke_snake() {
    let response = await eel.poke_html()();
    console.log("Response from Python:", response);
    document.getElementById("test-display").innerHTML = response;
}
//TODO: Add some form of input validation
function passZipcode(zipcode) {
    eel.get_zipcode(zipcode);
}

//Currently just passing location data for testing purposes
eel.expose(getPythonData);
function getPythonData(data) {
    let locationData = data[0];
    let quickLookData = data[1];
    let detailedWeatherData = data[2];

    pushLocationData(locationData);
}

//TODO: Research logging equivalent in JS
function pushLocationData(locationData) {
    //locationData is a map with arrays as values:
        //locationData.location ==> geographic location | [0] = city, [1] = state, [2] = country
        //locationData.local_time ==> [0] = epoch time of when data was pulled, [1] = timezone
    console.log(
        "Location data:", locationData, '\n',
        "City name:", locationData.location[0], '\n',
        "State name:", locationData.location[1], '\n',
        "Country name:", locationData.location[2], '\n',
    );
    //Set up the location string to send to the HTML
    let locationHTML = document.getElementById("location-string");
    let cityName = locationData.location[0];
    let stateName = locationData.location[1];
    let countryName = locationData.location[2];
    let locationString = `${cityName}, ${stateName}, ${countryName}`;   
    
    //TODO: Create time information container in HTML
    //TODO: Parse time data and pass to the relevant HTML element

    //Pass data to the HTML element
    locationHTML.innerHTML = locationString;
}

let zipButton = document.getElementById("get-weather")
    .addEventListener("click", function() {
        let zip = document.getElementById("zipcode").value;
        passZipcode(zip);
    });  
