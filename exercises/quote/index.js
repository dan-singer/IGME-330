#!/usr/bin/env node

// #1 - import the request module, which is used to download data over http
const request = require('request');

// #2 - set our URL
let url = 'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=';
let numResults = process.argv[2] || 1;
url += numResults;

// #3 - make the request
// the second parameter below is a callback function (an ES6 arrow function in this case)
// which is called when the data is downloaded
request(url, (err, response, body) => {
    // if there's no error, and if the server's status code is 200 (i.e. "Ok")
    if(!err && response.statusCode == 200){
        let results = JSON.parse(body);
        console.log(`----------- ${results.length} QUOTE${results.length > 1 ? "S" : ""} -----------`);
        for (let result of results) {
            let text = result.content;
            let decodedText = decodeHTMLChars(stripTags(text)).trim();
            console.log(`"${decodedText}" -- ${result.title}\n`);
        }

    }
});


function stripTags(str) {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
}

function decodeHTMLChars(str) {
    return str.replace(/&#8217;/g, "'").replace(/&#8211;/g, "–")
    .replace(/&#8220;/g, "“").replace(/&#8221;/g, "”")
    .replace(/&#038;/g, "&").replace(/\n/g, "");
}
