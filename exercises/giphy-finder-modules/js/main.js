import {GiphyResult} from "./classes.js";


// 2
let displayTerm = "";

// 3
function searchButtonClicked() {
    console.log("searchButtonClicked() called");
    const GIPHY_URL = "https://api.giphy.com/v1/gifs/search?";
    const GIPHY_KEY = "uDpyONWjKSjddGwm8XHg9IqPami9iCL4";

    let url = GIPHY_URL;
    url += "api_key=" + GIPHY_KEY;

    let term = document.querySelector("#searchterm").value;
    displayTerm = term;

    term = term.trim();
    term = encodeURIComponent(term); // encode spaces and special characters

    if (term.length < 1) return;

    url += "&q=" + term;

    let limit = document.querySelector("#limit").value;
    url += "&limit=" + limit;

    // document.querySelector("#status").innerHTML = "<b>Searching for '" + displayTerm + "'</b>";
    getData(url);
}

function getData(url) {
    let xhr = new XMLHttpRequest();
    xhr.onload = dataLoaded;
    xhr.onerror = dataError;
    xhr.open("GET", url);
    xhr.send();
}

function dataLoaded(e) {
    let xhr = e.target;
    console.log(xhr.responseText);

    let obj = JSON.parse(xhr.responseText);

    if (!obj.data || obj.data.length == 0) {
        document.querySelector("#status").innerHTML = `<b>No results found for '${displayTerm}'</b>`;
        return;
    }

    let results = obj.data;
    let bigString = `<p><i>Here are ${results.length} results for '${displayTerm}'</i></p>`;
    for (let i = 0; i < results.length; ++i) {
        let result = results[i];
        let giphy = new GiphyResult(result);
        bigString += giphy.line;
    }
    document.querySelector("#content").innerHTML = bigString;
}

function dataError(e) {
    console.log("An error occured");
}

export {searchButtonClicked};