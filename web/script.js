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
eel.expose(getRelevantData);
function getRelevantData(data) {
    let location = data.location;
    let temperature = data.temperature;
    let condition = data.overall_condition;

    showLocationData(location);
}

//locationData is an array. It should always be [0]==City Name, [1]==State, [2]==Country
//TODO: Research logging equivalent in JS
function showLocationData(locationData) {
    let locationName = document.getElementById("location-string");
    let locationString = `${locationData[0]}, ${locationData[1]}, ${locationData[2]}`;
    
    console.log("Location data:", locationData);
    console.log("City name:", locationData[0]);
    console.log("State name:", locationData[1]);
    console.log("Country name:", locationData[2]);
    
    locationName.innerHTML = locationString;
}

let zipButton = document.getElementById("get-weather")
    .addEventListener("click", function() {
        let zip = document.getElementById("zipcode").value;
        passZipcode(zip);
    });  
