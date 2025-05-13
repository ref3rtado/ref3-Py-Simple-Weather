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
/*
let testButton = document.getElementById("test-button")
    .addEventListener("click", poke_snake);
*/

eel.expose(getRawJSON);
function getRawJSON(data) {
    console.log("Raw JSON data:", data);
}

let zipButton = document.getElementById("get-weather")
    .addEventListener("click", function() {
        let zip = document.getElementById("zipcode").value;
        passZipcode(zip);
    });  
