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
        shapeCount: 1,
        invert: false,
        noise: false,
        gradient: true,
        fullscreen: false
    };
    let shapeObjects;
    /** @type {CanvasRenderingContext2D} */
    let drawCtx;
    let prevTime = 0;
    let isPlaying = false;
    let gui;
    let isScrubbing = false;
    let playButton = new PlayButton();
    let shapeGrad;
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
        gui.add(audioOptions, "shapeCount", 1, 16).step(1);
        gui.add(audioOptions, "invert");
        gui.add(audioOptions, "noise");
        gui.add(audioOptions, "gradient");
        let full = gui.add(audioOptions, "fullscreen").listen();
        full.onFinishChange(value => {
            if (value) {
                domElements.canvas.requestFullscreen();
            }            
        });
        document.onfullscreenchange = e => {
            console.log(document.fullscreenElement);
            if (!document.fullscreenElement) {
                audioOptions.fullscreen = false;
            }
        };
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

        let shapeObj = shapeObjects[audioOptions.shape];

        drawCtx.translate(x, y);
        const margin = {x: containerWidth * .2, y: containerHeight * .2};
        let shapeScale = scaleToFit(
            containerWidth - margin.x, containerHeight - margin.y,
            shapeObj.width, shapeObj.height 
        );
        drawCtx.scale(shapeScale, shapeScale);
        audio.analyser.getByteFrequencyData(audio.byteFreqData);

        shapeGrad = drawCtx.createLinearGradient(-shapeObj.width/2, -shapeObj.height/2, shapeObj.width, shapeObj.height);
        shapeGrad.addColorStop(0, "red");
        shapeGrad.addColorStop(0.35, "black");

        let fill = audioOptions.gradient ? shapeGrad : "rbga(0,0,0,0)"
        shapeObjects[audioOptions.shape].render(drawCtx, audio.byteFreqData, "#2e2e30", fill);
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
        drawCtx.strokeStyle = "red";
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

        for (let i = audioOptions.shapeCount-1; i >= 0; --i){
            // Go from half to whole
            let multiplier = 0.5 + (0.5 * ((i+1) / audioOptions.shapeCount));
            drawShape(drawCtx.canvas.width/2, drawCtx.canvas.height/2, drawCtx.canvas.width * multiplier, drawCtx.canvas.height * multiplier);
        }


        // Play pause button
        drawCtx.save();
            let playScale = scaleToFit(drawCtx.canvas.width/4, drawCtx.canvas.height/4, playButton.length, playButton.length);
            drawCtx.translate(drawCtx.canvas.width/2,drawCtx.canvas.height/2);
            drawCtx.scale(playScale, playScale);
            playButton.render(drawCtx, dt);
        drawCtx.restore();

        // Image effects
        let imgData = drawCtx.getImageData(0,0,drawCtx.canvas.width,drawCtx.canvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            if (audioOptions.invert) {
                for (let j = i; j < i + 3; ++j) {
                    imgData.data[j] = 255 - imgData.data[j];
                }
            }
            if (audioOptions.noise) {
                if (Math.random() < .1) {
                    let amt = 50;
                    for (let j = i; j < i + 3; ++j) {
                        imgData.data[j] += amt;
                    }
                }
            }
        }
        drawCtx.putImageData(imgData,0,0);

        prevTime = timestamp;
    }
})();