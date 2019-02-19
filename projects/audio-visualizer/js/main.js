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
        shapeCount: 1
    };
    let shapeObjects;
    /** @type {CanvasRenderingContext2D} */
    let drawCtx;
    let prevTime = 0;
    let isPlaying = false;
    let gui;
    const REF_RADIUS = 20;
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
        shapeObjects = {};
        for (let key in shapes) {
            shapeObjects[key] = new shapes[key](0,0,REF_RADIUS);
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

        drawCtx.save();
        drawCtx.translate(drawCtx.canvas.width/2, drawCtx.canvas.height/2);
        // Determine Scale
        const margin = 200;
        let scaleMultiplier;
        if (drawCtx.canvas.width < drawCtx.canvas.height) {
            scaleMultiplier = (drawCtx.canvas.width - margin) / shapeObjects[audioOptions.shape].width;
        } else {
            scaleMultiplier = (drawCtx.canvas.height - margin) / shapeObjects[audioOptions.shape].height;
        }
        drawCtx.scale(scaleMultiplier, scaleMultiplier);
        audio.analyser.getByteFrequencyData(audio.byteFreqData);
        shapeObjects[audioOptions.shape].render(drawCtx, audio.byteFreqData);
        drawCtx.restore();

        prevTime = timestamp;
    }
})();