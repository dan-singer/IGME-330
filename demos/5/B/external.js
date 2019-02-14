console.log("-----external.js-----");
let able = 100;
const baker = 200;
var charlie = 300;

function doStuff(){
	console.log("external.js -> doStuff!");
}

function doStuff4(){
	console.log("external.js -> doStuff4!");
}

console.log(`able=${able}`);
console.log(`baker=${baker}`);
console.log(`charlie=${charlie}`);