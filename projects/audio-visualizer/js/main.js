(function(){

    let audio = {
        ctx: null,
        analyser: null,
        source: null
    };
    let domElements = {
        audio: null,
        canvas: null
    };
    /** @type {CanvasRenderingContext2D} */
    let drawCtx;
    let prevTime = 0;
    let isPlaying = false;
    window.onload = init;

    function setupAudioContext() {
        domElements.audio = document.querySelector("audio");
        audio.ctx = new (window.AudioContext || window.webkitAudioContext)();
        audio.analyser = audio.ctx.createAnalyser();
        audio.source = audio.ctx.createMediaElementSource(domElements.audio);
        audio.source.connect(audio.analyser);
        audio.analyser.connect(audio.ctx.destination);
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