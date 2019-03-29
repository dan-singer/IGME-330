// 1
window.onload = (e) => { 
    limit = document.querySelector("#limit");
    document.querySelector("#search").onclick = () => { 
        searchButtonClicked(true);
    };
    document.querySelector("#find-more").onclick = () => {
        offset += parseInt(limit.value);
        searchButtonClicked(false);
    };
};

// 2
let displayTerm = "";
let offset = 0;
let limit;

// 3
function searchButtonClicked(resetOffset) {
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

    if (resetOffset) 
        offset = 0;
    url += "&offset=" + offset;

    document.querySelector("#find-more").disabled = false;

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

    let end = parseInt(limit.value) + offset - 1;
    let results = obj.data;
    let bigString = `<p><i>Here are ${results.length} results for '${displayTerm}' - (start=${offset},end=${end})</i></p>`;
    for (let i = 0; i < results.length; ++i) {
        let result = results[i];
        console.log(result);

        let smallURL = result.images.original.url;
        if (!smallURL) smallURL = "images/no-image-found.png";
        let url = result.url;
        let line = `<div class='result'><img src='${smallURL}' title='${result.id}' />`;
        line += `<span><a target='_blank' href='${url}'>View on Giphy</a></span>`;
        line += `<p>Rating: ${result.rating.toUpperCase()}</p></div>`;
        bigString += line;
    }
    document.querySelector("#content").innerHTML = bigString;
}

function dataError(e) {
    console.log("An error occured");
}