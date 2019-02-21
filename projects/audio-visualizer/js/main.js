(function(){
    
    let audio = {
        /** @type {AudioContext} */
        ctx: null,
        /** @type {AnalyserNode} */
        analyser: null,
        source: null,
        byteFreqData: null,
        waveformData: null
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
        domElements.audioControls.onmousedown = e => {
            wasPaused = domElements.audioControls.paused;
            pause();
        }
        domElements.audioControls.oninput = e => {
            isScrubbing = true;
            let newTime = e.target.value * domElements.audio.duration;
            domElements.audio.currentTime = newTime;
        };
        domElements.audioControls.onchange = e=> { 
            isScrubbing = false;
            if (!wasPaused) {
                play();
            }
        };

        audio.ctx = new (window.AudioContext || window.webkitAudioContext)();
        audio.analyser = audio.ctx.createAnalyser();

        audio.source = audio.ctx.createMediaElementSource(domElements.audio);
        audio.source.connect(audio.analyser);
        audio.analyser.connect(audio.ctx.destination);
        audio.byteFreqData = new Uint8Array(audio.analyser.frequencyBinCount);
        audio.waveformData = new Uint8Array(audio.analyser.frequencyBinCount);
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
    
    function play() {
        domElements.audio.play();
        playButton.play();
    }
    function pause() {
        domElements.audio.pause();
        playButton.pause();
    }

    function init() {
        setupAudioContext();
        setupCanvas();
        setupShapes();
        setupGUI();
        requestAnimationFrame(update);
    }

    function togglePlay(){
        audio.ctx.resume();
        if (domElements.audio.paused) {
            play();
        } else {
            pause();
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

    function drawShape(x, y, containerWidth, containerHeight) {
        drawCtx.save();
        drawCtx.translate(drawCtx.canvas.width/2, drawCtx.canvas.height/2);
        drawCtx.translate(0, -audio.waveformData[audio.waveformData.length/2] * .1);
        const margin = {x: drawCtx.canvas.width * .2, y: drawCtx.canvas.height * .2};
        let shapeScale = scaleToFit(
            drawCtx.canvas.width - margin.x, drawCtx.canvas.height - margin.y,
            shapeObjects[audioOptions.shape].width, shapeObjects[audioOptions.shape].height 
        );
        drawCtx.scale(shapeScale, shapeScale);
        audio.analyser.getByteFrequencyData(audio.byteFreqData);
        shapeObjects[audioOptions.shape].render(drawCtx, audio.byteFreqData);
        drawCtx.restore();
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

        // Waveform
        audio.analyser.getByteTimeDomainData(audio.waveformData);
        let height = 50;
        let width = drawCtx.canvas.width;
        let centerY = drawCtx.canvas.height / 2;
        drawCtx.strokeStyle = "white";
        drawCtx.beginPath();
        for (let i = 0; i < audio.waveformData.length; ++i) {
            let x = (i / audio.waveformData.length) * width;
            let y = (centerY - height/2) + (audio.waveformData[i] / 255) * height;
            if (i == 0)
                drawCtx.moveTo(x,y);
            else
                drawCtx.lineTo(x,y);
        }
        drawCtx.stroke();
        // Shapes


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