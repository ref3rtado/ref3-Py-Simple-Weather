console.log("Script loaded");

//If grabbing a value from python function, it needs to be an async function
//If you want to use the value in a variable, you need to use await

async function poke_snake() {
    let response = await eel.poke_html()();
    console.log("Response from Python:", response);
    document.getElementById("test-display").innerHTML = response;
}
// Passes zipcode value to Python after validating
function passZipcode(zipcode) {
    eel.get_zipcode(zipcode);
}

eel.expose(getPythonData);
function getPythonData(data) {
    let locationData = data[0];
    let quickLookData = data[1];
    // TODO: Add detailed weather data in later version
    // let detailedWeatherData = data[2];

    let pushData = (data, parentID, childClass) => {
        console.log("Calling pushData function for", parentID);
        let parentHTML = document.getElementById(parentID);
        let dataIndex = 0;
        for (let child of parentHTML.getElementsByClassName(childClass)) {
            if (child.tagName === "IMG") {
                // If the child is an image, set the src attribute
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
    
function pushLocationData(locationData, pushData) {
    // locationData is a map with arrays as values  
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
    // condition[0] is string, [1] is an image
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

function passZipcode(zipcode) {
    let zip = document.getElementById("zipcode").value;
    zip.trim();
    if (/\d{5}/.test(zip)) { // Regular expression to check for 5 sequential digits
        console.log("Valid zipcode:", zip);
        eel.get_zipcode(zip)();
    }
    else {
        console.log("Invalid zipcode:", zip);
        alert("Please enter a valid 5-digit zipcode.");
    }
}

function validateZipcode(zipcode) {
    // Check if the zipcode is a 5-digit number
    if (/^\d{5}$/.test(zipcode)) {
        console.log("Valid zipcode:", zipcode);
        passZipcode(zipcode);
    }
}
// Event listeners
let zipButton = document.getElementById("get-weather")
zipButton.addEventListener("click", function(event) {
    let zipcodeInput = document.getElementById("zipcode").value;
    event.preventDefault(); // Don't reload the page on button click
    validateZipcode(zipcodeInput);
})
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        let zipcodeInput = document.getElementById("zipcode").value;
        event.preventDefault(); // Don't reload the page on Enter key
        validateZipcode(zipcodeInput);
    }
})