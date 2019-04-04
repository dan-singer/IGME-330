// #1 - import the request module, which is used to download data over http
const request = require('request');

// #2 - set our URL
let url = "http://igm.rit.edu/~acjvks/courses/2018-fall/330/php/get-a-joke.php";

// #3 - make the request
// the second parameter below is a callback function (an ES6 arrow function in this case)
// which is called when the data is downloaded
request(url, (err, response, body) => {
    // if there's no error, and if the server's status code is 200 (i.e. "Ok")
    if(!err && response.statusCode == 200){
    	// A - convert the downloaded text to a JavaScript Object
        let obj = JSON.parse(body); 
        let text = `${obj.q}\n\n${obj.a}`;
        // B - log it out
        console.log(`***The joke is:***\n ${text}`);
    }else{
    	console.log(`err=${err}`);
    }
});