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
    //let detailedWeatherData = data[2];

    let pushData = (data, parentID, childClass) => {
        console.log("Calling pushData function for", parentID);
        let parentHTML = document.getElementById(parentID);
        let dataIndex = 0;
        for (let child of parentHTML.getElementsByClassName(childClass)) {
            if (child.tagName === "IMG") {
                //If the child is an image, set the src attribute
                img_url = data[dataIndex];
                img_url = img_url.replace("//", "https://"); 
                child.src = img_url;
                dataIndex++;
            }
            child.innerHTML = data[dataIndex];
            dataIndex++;
            }
        }
    pushLocationData(locationData, pushData);
    pushQuickWeatherData(quickLookData, pushData);
}
    



//TODO: Research logging equivalent in JS
function pushLocationData(locationData, pushData) {
    //locationData is a map with arrays as values  
    let cityName = locationData.location[0];
    let stateName = locationData.location[1];
    let countryName = locationData.location[2];
    let locationString = `${cityName}, ${stateName}, ${countryName}`;
    let date_time = new Date(locationData.time_checked[0] * 1000);
    let payload = [locationString, date_time]
    
    console.log(
        "Location data:", locationData, '\n',
        "City name:", cityName, '\n',
        "State name:", stateName, '\n',
        "Country name:", countryName, '\n',
        `Time checked: ${date_time}\n`,
    );
    pushData(payload, "user-location", "location-data")
}

function pushQuickWeatherData(quickLookData, pushData) {
    //condition[0] is string, [1] is an image
    let condition = quickLookData.overall_condition;
    let temperatureData = [
        quickLookData.temperature[2], 
        quickLookData.temperature[3],
        quickLookData.temperature[0],
        quickLookData.temperature[1],
    ];
    let humidity = quickLookData.humidity;
    console.log(
        "Quick weather data:", quickLookData, '\n',
        "Condition:", condition, '\n',
        "Temperature (F):", temperatureData[0], '\n',
        "Temperature (C):", temperatureData[2], '\n',
        "Humidity:", humidity, '\n',
    );
    pushData(condition, "weather-condition", "condition")
    pushData(temperatureData, "temperature", "temp");
    pushData(humidity, "humidity", "humidity-data");
}

let zipButton = document.getElementById("get-weather")
    .addEventListener("click", function() {
        let zip = document.getElementById("zipcode").value;
        passZipcode(zip);
    });  
