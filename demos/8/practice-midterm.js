/* Practice Midterm */
/** 
 * 1.) OK
 * 2.) The dom did not finish loading yet so myH1 is pointing to null
 * 3.) TODO lookup "use strict"
*/
//4
function multiply(a, b) {
    return a * b;
}
let multiply = (a, b) => a * b;

function five() {
    document.querySelector("#button1").onclick = e => console.log("I was clicked");
}

function six() {
    document.querySelector("#dropdown1").onchange = e => console.log(e.target.value);
}

/**
 * 7.) C
 * 8.) A
 * 9.) C
 * 10.) TODO lookup Object.seal
 * 11.) TODO lookup Object.freeze
 * 12.) anything js primitive type or object
 * 13.) unsigned 8 bit integers
 * 14.) undefined
 * 15.) 10
 * 16.) 6
 */
function seventeen() {
    let obj; //...
    obj.moveBack = function() {
        this.x--;
        this.y--;
    }
}
/**
 * 18.) Error
 * 19.) A function which is invoked immediately. It keeps stuff out of script or global scope for better encapsulation.
 */
(function(){
    console.log("TWENTY!");
})();

// 21.) It allows scripts to serve as modules, and only reveal data that they want to and hide implementation details.
//22
class Mover {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    move() {
        this.x++;
        this.y++;
    }
    moveBack() {
        this.x--;
        this.y--;
    }
}
//23
class RoadRunner extends Mover {
    constructor(x, y, speed) {
        super(x, y);
        this.speed = speed;
    }
    beepBeep() {
        console.log("Beep Beep!");
    }
}
//24
let car = {
    color: "red",
    speed: 0,
    drive() {
        this.speed = 55;
    }
};

// 25.) In order to prevent having to redraw the entire screen and save some state of the canvas
/** @type {CanvasRenderingContext2D} */
let ctx;

function twentySix() {
    ctx.fillStyle = "green";
}
function twentySeven() {
    ctx.strokeStyle = "red";
}
function twentyEight() {
    ctx.beginPath();
    ctx.rect(100, 150, 200, 200);
    ctx.closePath();
    ctx.fill();
}
function twentyNine() {
    ctx.beginPath();
    ctx.arc(100, 150, 50, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.stroke();
}
function thirty() {
    
}




/* Interview Questions */
// 39
let  odds  = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
let  evens = [ ];
function transferEvens() {
    for (let i = 0; i < odds.length; ++i) {
        if (odds[i] % 2 == 0) {
            evens.push(odds[i]);            
            odds.splice(i, 1);
        }
    }
    console.log(odds, evens);
}
transferEvens();

//40
let buckets  = [ 3, 4, 2, 5, 1 ];
function solveBuckets() {
    let validBuckets = [];
    for (let i = 1; i < buckets.length - 1; ++i) {
        let prevDiff = Math.abs(buckets[i] - buckets[i - 1]);
        let nextDiff = Math.abs(buckets[i] - buckets[i + 1]);
        if (prevDiff >= 2 && nextDiff >= 2) {
            validBuckets.push(buckets[i]);
        }
    }
    console.log(validBuckets);
}
solveBuckets();