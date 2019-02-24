(function(){
    
    let audio = {
        /** @type {AudioContext} */
        ctx: null,
        /** @type {AnalyserNode} */
        analyser: null,
        source: null,
        biquad: null,
        byteFreqData: null,
        waveformData: null
    };
    let domElements = {
        audio: null,
        canvas: null,
        audioControls: null
    };
    let audioOptions = {
        track: "Finite Platform Shooter.mp3",
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
    let gui;
    let isScrubbing = false;
    let playButton = new PlayButton();
    let shapeGrad;
    const trackNames = ["Beat Saber.mp3", "Fake Estate.wav", "Finite Platform Shooter.mp3", "Jungle Jam.mp3"]
    const REF_RADIUS = 20;
    window.onload = init;

    function setupAudioContext() {
        domElements.audio = document.querySelector("audio");
        domElements.audio.src = `media/${audioOptions.track}`;
        domElements.audioControls = document.querySelector(".audio-controls");

        let wasPaused = false;
        domElements.audioControls.onmousedown = e => {
            wasPaused = domElements.audio.paused;
            pause();
        }
        domElements.audioControls.oninput = e => {
            isScrubbing = true;
            let newTime = e.target.value * domElements.audio.duration;
            domElements.audio.currentTime = newTime;
        };
        domElements.audioControls.onchange = e => { 
            isScrubbing = false;
            if (!wasPaused) {
                play();
            }
        };

        audio.ctx = new (window.AudioContext || window.webkitAudioContext)();
        audio.analyser = audio.ctx.createAnalyser();
        audio.source = audio.ctx.createMediaElementSource(domElements.audio);
        audio.biquad = audio.ctx.createBiquadFilter();
        audio.biquad.type = "lowpass";
        audio.biquad.frequency.value = 24000;
        
        audio.source.connect(audio.biquad);
        audio.biquad.connect(audio.analyser);
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
        domElements.canvas.onclick = e => {
            if (!isScrubbing)
                togglePlay();
        };

    }

    function setupShapes() {
        shapeObjects = {};
        for (let key in shapes) {
            shapeObjects[key] = new shapes[key](0,0,REF_RADIUS);
        }
    }

    function setupGUI() {
        gui = new dat.GUI();
        let track = gui.add(audioOptions, "track", trackNames);
        track.onFinishChange(value => {
            domElements.audio.src = `media/${value}`;
            pause();
        });
        gui.add(audioOptions, "shape", Object.keys(shapes));
        gui.add(domElements.audio, "volume", 0, 1);
        gui.add(audioOptions, "shapeCount", 1, 16).step(1);
        gui.add(audio.biquad.frequency, "value", 200, 24000).step(100).name("lowpass")
        gui.add(audioOptions, "invert");
        gui.add(audioOptions, "noise");
        gui.add(audioOptions, "gradient");
        let full = gui.add(audioOptions, "fullscreen").listen();
        full.onFinishChange(value => {
            if (value) {
                document.body.requestFullscreen();
            } else {
                document.exitFullscreen();
            }           
        });
        document.onfullscreenchange = e => {
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

    /**
     * Draws the selected shape centered at (x,y) inside the container size specified
     */
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

        let fill = audioOptions.gradient ? shapeGrad : "black"
        shapeObjects[audioOptions.shape].render(drawCtx, audio.byteFreqData, "#2e2e30", fill);
        drawCtx.restore();
    }

    function drawWaveformData()
    {
        // Waveform
        audio.analyser.getByteTimeDomainData(audio.waveformData);
        drawCtx.save();
        drawCtx.strokeStyle = "red";
        drawCtx.beginPath(); 
        let cpDisp = 50;
        let points = 100;
        let prevX, prevY;
        let centerY = drawCtx.canvas.height/2;
        let width = drawCtx.canvas.width;
        let height = drawCtx.canvas.height/8;
        for (let i = 0; i <= points; ++i) {
            let x = (i / points) * width;
            let y = i % 2 == 0 ? centerY - height/2 : centerY + height/2;
            let freqIndex = parseInt((i / points) * (audio.waveformData.length - 1));
            let yOffset = audio.waveformData[freqIndex];
            if (isNaN(yOffset))
                yOffset = 0;
            yOffset -= 128;
            if (i == 0){
                drawCtx.moveTo(x, y + yOffset);
            } else {
                drawCtx.bezierCurveTo(prevX + cpDisp, prevY, x - cpDisp, y, x, y + yOffset);
            }
            prevX = x;
            prevY = y;
        }
        drawCtx.stroke();
        drawCtx.restore();
    }

    function applyImageEffects()
    {
        let imgData = drawCtx.getImageData(0,0,drawCtx.canvas.width,drawCtx.canvas.height);
        for (let i = 0; i < imgData.data.length; i += 4) {
            if (audioOptions.noise) {
                if (Math.random() < .1) {
                    let amt = 50;
                    for (let j = i; j < i + 3; ++j) {
                        imgData.data[j] += amt;
                    }
                }
            }
            if (audioOptions.invert) {
                for (let j = i; j < i + 3; ++j) {
                    imgData.data[j] = 255 - imgData.data[j];
                }
            }

        }
        drawCtx.putImageData(imgData,0,0);
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

        drawWaveformData();

        // Draw shapes
        for (let i = audioOptions.shapeCount-1; i >= 0; --i){
            // Go from half to whole
            let multiplier = 0.5 + (0.5 * ((i+1) / audioOptions.shapeCount));
            drawShape(drawCtx.canvas.width/2, drawCtx.canvas.height/2, drawCtx.canvas.width * multiplier, drawCtx.canvas.height * multiplier);
        }

        // Play/pause button
        drawCtx.save();
            let playScale = scaleToFit(drawCtx.canvas.width/4, drawCtx.canvas.height/4, playButton.length, playButton.length);
            drawCtx.translate(drawCtx.canvas.width/2,drawCtx.canvas.height/2);
            drawCtx.scale(playScale, playScale);
            playButton.render(drawCtx, dt);
        drawCtx.restore();

        applyImageEffects();
        prevTime = timestamp;
    }
})();