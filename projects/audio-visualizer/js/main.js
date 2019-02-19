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
        shape: "Square",

    };
    let shapeObjects;
    /** @type {CanvasRenderingContext2D} */
    let drawCtx;
    let prevTime = 0;
    let isPlaying = false;
    let gui;
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
    function setupShapes() {
        shapeObjects = {
            Square: new shapes.Square(drawCtx.canvas.width/2, drawCtx.canvas.height/2, drawCtx.canvas.width/8),
            Circle: new shapes.Circle(drawCtx.canvas.width/2, drawCtx.canvas.height/2, drawCtx.canvas.width/8),
            InfinityLoop: new shapes.InfinityLoop(drawCtx.canvas.width/2, drawCtx.canvas.height/2, drawCtx.canvas.width/8),

        }
    }

    function setupGUI() {
        gui = new dat.GUI();
        gui.add(audioOptions, "shape", Object.keys(shapes));
        gui.add(domElements.audio, "volume", 0, 1);
    }

    function init() {
        setupAudioContext();
        setupCanvas();
        setupShapes();
        setupGUI();
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


    function update(timestamp) {
        requestAnimationFrame(update);
        let dt = (timestamp - prevTime) / 1000;

        drawCtx.fillStyle = "black";
        drawCtx.fillRect(0,0,drawCtx.canvas.width, drawCtx.canvas.height);

        audio.analyser.getByteFrequencyData(audio.byteFreqData);
        shapeObjects[audioOptions.shape].render(drawCtx, audio.byteFreqData);

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