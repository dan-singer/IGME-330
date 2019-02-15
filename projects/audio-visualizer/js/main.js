(function(){
    
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
        domElements.audio.src = "media/beat saber.mp3";
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
        square = new shapes.Circle(drawCtx.canvas.width/2, drawCtx.canvas.height/2, 250);
        
        requestAnimationFrame(update);
    }

    function togglePlay(){
        isPlaying = !isPlaying;
        audio.ctx.resume();

        if (isPlaying) {
            domElements.audio.play();
        } else {
            domElements.audio.pause();
        }
    }

    function playLoop(dt) {

    }

    function pausedLoop(dt) {

    }

    function update(timestamp) {
        requestAnimationFrame(update);
        let dt = (timestamp - prevTime) / 1000;

        drawCtx.fillStyle = "black";
        drawCtx.fillRect(0,0,drawCtx.canvas.width, drawCtx.canvas.height);
        audio.analyser.getByteFrequencyData(audio.byteFreqData);
        square.render(drawCtx, audio.byteFreqData);

        if (!isPlaying) {
            drawCtx.fillStyle = "black";
            drawCtx.font = "36px Montserrat";
            drawCtx.fillStyle = "white";
            const pauseText = "Click to play";
            let wid = drawCtx.measureText(pauseText).width;
            drawCtx.fillText(pauseText, drawCtx.canvas.width/2 - wid/2, drawCtx.canvas.height/2 - 18);
        }

        prevTime = timestamp;
    }
})();