const bgColor = "black";
const font = "sans-serif";
const wordCount = 50;
const minFontSize = 8;
const maxFontSize = 100;
const colors = ["#EAD2AC", "#DF928E", "#C58882", "#D1DEDE"];
const stopwords = ["a", "about", "above", "after", "again", "against", "all", "am", "an", "and", "any","are","aren't","as","at","be","because","been","before","being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down","during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here","here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its","itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours","ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's","the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through","to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where","where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours","yourself","yourselves"];
let occurences = {};

let displayingCloud = false;


window.onload = init;

function resizeCanvas(canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    paint(canvas.getContext("2d"));
}

function drawText(ctx, text, x, y, fillStyle, centered = false) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = fillStyle;
    if (centered) {
        let wid = ctx.measureText(text).width;
        ctx.translate(-wid/2, 0); 
    }
    ctx.fillText(text, 0, 0);
    ctx.restore();
}

/**
 * Returns an object mapping words to the number of times they occur
 * @param {String} fileText 
 */
function getOccurences(fileText) {
    let words = fileText.toLowerCase().split(/\W+/g);
    let occurences = {};
    for (let word of words) {
        if (word.length < 2) 
            continue;
        if (/\d+/g.test(word))
            continue;
        if (stopwords.includes(word)) 
            continue;
        if (word in occurences) {
            occurences[word]++;
        } 
        else {
            occurences[word] = 1;    
        }
    }
    return occurences;
}

function init() {
    let canvas = document.querySelector("canvas");
    let stats = document.querySelector("#stats");
    let ctx = canvas.getContext("2d");
    window.onresize = e => resizeCanvas(canvas);
    resizeCanvas(canvas);

    canvas.ondragenter = e => {
        canvas.classList.add("hover");
    };
    canvas.ondragover = e => {
        e.preventDefault();
    }
    canvas.ondragleave = e => {
        canvas.classList.remove("hover");
    }
    canvas.ondrop = e => {
        e.preventDefault();
        canvas.classList.remove("hover");
        let file = e.dataTransfer.files[0];
        if (file) {
            let fr = new FileReader();
            fr.onload = e => {
                occurences = getOccurences(e.target.result);
                displayingCloud = true;
                while (stats.childElementCount > 0) {
                    stats.removeChild(stats.children[0]);
                }
                for (let key in occurences) {
                    let stat = document.createElement("p");
                    stat.textContent = `${key}: ${occurences[key]} `;
                    stats.appendChild(stat);
                }
                paint(ctx);
            }
            fr.readAsText(file);
        }
    }

    paint(ctx);
}

function paint(ctx) {
    ctx.fillStyle = bgColor;
    ctx.textBaseline = "middle";
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (!displayingCloud) {
        ctx.font = "36px sans-serif";
        drawText(ctx, "Drop a .txt file here", ctx.canvas.width/2, ctx.canvas.height/2, "white", true);
    } else {
        // Draw the word cloud
        // Sort the keys from highest to lowest
        let keys = Object.keys(occurences);
        keys.sort((a, b) => {
            return occurences[b] - occurences[a];
        });
        let maxOccurence = occurences[keys[0]];
        let clampedWordCount = keys.length > wordCount ? wordCount : keys.length;
        for (let i = 0; i < clampedWordCount; ++i) {
            // map word i's occurence count from min font size -> max font size
            let fontSize = minFontSize + (occurences[keys[i]] / maxOccurence) * (maxFontSize - minFontSize);
            // pick a random color
            let fill = colors[parseInt(Math.random() * colors.length)];
            // determine if rotated or not
            let rotate = Math.random() < 0.5 ? true : false;
            // draw text on screen
            ctx.font = `${fontSize}px ${font}`;
            let width = ctx.measureText(keys[i]).width;
            let xRange = {min: 0, max: ctx.canvas.width - width };
            let yRange = {min: fontSize/2, max: ctx.canvas.height - fontSize/2};
            let x = xRange.min + Math.random() * (xRange.max - xRange.min);
            let y = yRange.min + Math.random() * (yRange.max - yRange.min);
            drawText(ctx, keys[i], x, y, fill, false); 
        }

    }
}