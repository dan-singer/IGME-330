(function(){

    let audio = {};
    let domElements = {};
    /** @type {CanvasRenderingContext2D} */
    let drawCtx;
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
    }

    function init() {
        setupAudioContext();
        setupCanvas();
        drawCtx.fillStyle = "black";
        drawCtx.fillRect(0, 0, domElements.canvas.width, domElements.canvas.height);
    }
})();