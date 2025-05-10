console.log("Script loaded");

//TODO: See if I can set up a Promise decorator function

async function poke_snake() {
    let response = await eel.poke_html()();
    console.log("Response from Python:", response);
    document.getElementById("test-display").innerHTML = response;
}

let testButton = document.getElementById("test-button")
    .addEventListener("click", poke_snake);


