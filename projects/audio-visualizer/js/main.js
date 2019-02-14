(function(){

    function distSqr(vec) {
        return (Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
    }
    function magnitude(vec) {
        return Math.sqrt(distSqr(vec));
    }

    function subVectors(A, B) {
        return {x: A.x - B.x, y: A.y - B.y};
    }

    function normalize(vec) {
        let len = magnitude(vec);
        return {x: vec.x / len, y: vec.y / len};
    }

    function lerp(A, B, t) {
        let AtoB = subVectors(B, A);
        return {x: A.x + t * AtoB.x, y: A.y + t * AtoB.y };
    }

    class Shape 
    {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.verts = [];
        }
        render(ctx) { }
    }

    class Square extends Shape 
    {
        constructor(x, y, length) 
        {
            super(x, y);
            this.verts = [
                {x:this.x - length/2, y:this.y - length/2}, {x:this.x + length/2, y:this.y - length/2},
                {x:this.x + length/2, y:this.y + length/2}, {x:this.x - length/2, y:this.y + length/2}
            ];
            // calculate the distance of the entire shape
            this.distanceSqr = Math.pow(length * 4, 2);
        }
        /**
         * Render the square using webaudio data
         * @param {CanvasRenderingContext2D} ctx 
         * @param {Uint8Array} freqData 
         */
        render(ctx, freqData) {
            ctx.strokeStyle = "white";
            ctx.fillStyle = "white";
            ctx.lineWidth = 10;
            ctx.beginPath();
            ctx.moveTo(this.verts[0].x, this.verts[0].y);
            // store a counter representing the current percentage completed
            let curPercentage = 0;
            // for each line in the path
            for (let i = 0; i < this.verts.length; ++i) {
                // determine it's length
                let second = i + 1 == this.verts.length ? 0 : i + 1;
                let line = subVectors(this.verts[second], this.verts[i]);
                console.log(line);
                console.log(normalize(line));
                let lineLengthSqr = distSqr(line);
                // determine the percentage of it relative to the entire shape
                let linePerc = lineLengthSqr / this.distanceSqr;
                let samples = linePerc * freqData.length;
                for (let j = 0; j < samples; ++j) {
                    // draw curPercentage to curPercentage + newPercentage of the curve along this line
                    let index = (curPercentage * freqData.length) + j;
                    let t = j / samples;
                    let pointOnLine = lerp(this.verts[i], this.verts[second], t);
                    let perp = {x: line.y, y:-line.x};
                    let perpNorm = normalize(perp);
                    let multiplier = (freqData[index] / 255) * 20 * ctx.lineWidth;
                    ctx.lineTo(pointOnLine.x + perpNorm.x * multiplier, pointOnLine.y + perpNorm.y * multiplier);
                }
                curPercentage += linePerc;
            }
            ctx.closePath();
            ctx.stroke();

        }
    }


    let audio = {
        ctx: null,
        /** @type {AnalyserNode} */
        analyser: null,
        source: null,
        byteFreqData: null
    };
    let domElements = {
        audio: null,
        canvas: null
    };
    let audioOptions = {
        shape: "square"
    };
    /** @type {CanvasRenderingContext2D} */
    let drawCtx;
    let prevTime = 0;
    let isPlaying = false;
    let square = null;
    window.onload = init;




    function setupAudioContext() {
        domElements.audio = document.querySelector("audio");
        audio.ctx = new (window.AudioContext || window.webkitAudioContext)();
        audio.analyser = audio.ctx.createAnalyser();

        audio.source = audio.ctx.createMediaElementSource(domElements.audio);
        audio.source.connect(audio.analyser);
        audio.analyser.connect(audio.ctx.destination);
        audio.byteFreqData = new Uint8Array(audio.analyser.frequencyBinCount);
    }

    function setupCanvas() {
        domElements.canvas = document.querySelector("canvas");
        window.onresize = e => {
            domElements.canvas.width = window.innerWidth;
            domElements.canvas.height = window.innerHeight;
        }
        window.dispatchEvent(new FocusEvent("resize"));
        drawCtx = domElements.canvas.getContext("2d");
        domElements.canvas.onclick = togglePlay;
    }

    function init() {
        setupAudioContext();
        setupCanvas();
        square = new Square(drawCtx.canvas.width/2, drawCtx.canvas.height/2, 500);
        requestAnimationFrame(update);
    }

    function togglePlay(){
        isPlaying = !isPlaying;
        if (isPlaying) {
            domElements.audio.play();
        } else {
            domElements.audio.pause();
        }
    }

    function playLoop(dt) {
        drawCtx.fillStyle = "black";
        drawCtx.fillRect(0,0,drawCtx.canvas.width, drawCtx.canvas.height);
        audio.analyser.getByteFrequencyData(audio.byteFreqData);
        square.render(drawCtx, audio.byteFreqData);
    }

    function pausedLoop(dt) {
        drawCtx.fillStyle = "black";
        drawCtx.fillRect(0,0,drawCtx.canvas.width, drawCtx.canvas.height);
        drawCtx.font = "36px Montserrat";
        drawCtx.fillStyle = "white";
        const pauseText = "Click to start";
        let wid = drawCtx.measureText(pauseText).width;
        drawCtx.fillText(pauseText, drawCtx.canvas.width/2 - wid/2, drawCtx.canvas.height/2 - 18);
    }

    function update(timestamp) {
        requestAnimationFrame(update);
        let dt = (timestamp - prevTime) / 1000;
        if (isPlaying) 
            playLoop(dt);
        else 
            pausedLoop(dt);
        prevTime = timestamp;
    }
})();