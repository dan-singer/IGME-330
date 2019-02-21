(function(){
    
    let audio = {
        /** @type {AudioContext} */
        ctx: null,
        /** @type {AnalyserNode} */
        analyser: null,
        source: null,
        byteFreqData: null
    };
    let domElements = {
        audio: null,
        canvas: null,
        audioControls: null
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
    let isScrubbing = false;
    let playButton = new PlayButton();
    const REF_RADIUS = 20;
    window.onload = init;

    function setupAudioContext() {
        domElements.audio = document.querySelector("audio");
        domElements.audio.src = "media/beat saber.mp3";
        domElements.audioControls = document.querySelector(".audio-controls");

        let wasPaused = false;
        domElements.audioControls.onclick = e => {
            wasPaused = domElements.audioControls.paused;
        }
        domElements.audioControls.oninput = e => {
            isScrubbing = true;
            let newTime = e.target.value * domElements.audio.duration;
            domElements.audio.currentTime = newTime;
            domElements.audio.pause();
        };
        domElements.audioControls.onchange = e=> { 
            isScrubbing = false;
            if (!wasPaused) {
                domElements.audio.play();
            }
        };

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
            playButton.play();
        } else {
            domElements.audio.pause();
            playButton.pause();
        }
    }

    function scaleToFit(containerWidth, containerHeight, objectWidth, objectHeight) {
        let scaleMultiplier;
        if (containerWidth < containerHeight) {
            scaleMultiplier = containerWidth / objectWidth;
        } else {
            scaleMultiplier = containerHeight / objectHeight;
        }
        return scaleMultiplier;
    }


    function update(timestamp) {
        requestAnimationFrame(update);
        let dt = (timestamp - prevTime) / 1000;

        drawCtx.fillStyle = "black";
        drawCtx.fillRect(0,0,drawCtx.canvas.width, drawCtx.canvas.height);

        // Update audio controls
        if (!isScrubbing) {
            domElements.audioControls.value = domElements.audio.currentTime / domElements.audio.duration;
        }

        drawCtx.save();
            drawCtx.translate(drawCtx.canvas.width/2, drawCtx.canvas.height/2);
            const shapeMargin = 100;
            let shapeScale = scaleToFit(
                drawCtx.canvas.width, drawCtx.canvas.height,
                shapeObjects[audioOptions.shape].width - shapeMargin, shapeObjects[audioOptions.shape].height - shapeMargin 
            );
            drawCtx.scale(shapeScale, shapeScale);
            audio.analyser.getByteFrequencyData(audio.byteFreqData);
            shapeObjects[audioOptions.shape].render(drawCtx, audio.byteFreqData);
        drawCtx.restore();

        // Play pause button
        drawCtx.save();
            let playScale = scaleToFit(drawCtx.canvas.width/4, drawCtx.canvas.height/4, playButton.length, playButton.length);
            drawCtx.translate(drawCtx.canvas.width/2,drawCtx.canvas.height/2);
            drawCtx.scale(playScale, playScale);
            playButton.render(drawCtx, dt);
        drawCtx.restore();


        prevTime = timestamp;
    }
})();