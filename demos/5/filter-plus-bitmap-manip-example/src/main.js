var app = app || {};
app.main = (function () {
    "use strict";
    let ctx;
    let canvasWidth;
    let canvasHeight;
    let sprites = []; // an array to hold all of our sprites
    let gradient;
    let image;
    let showTrails, showBlending, showNoise, showTint, showImage = false;


    function init() {
        ctx = document.querySelector("canvas").getContext("2d");
        canvasWidth = mycanvas.width;
        canvasHeight = mycanvas.height;
        gradient = app.utilities.getLinearGradient(ctx, 0, 0, 0, canvasHeight, [{ percent: 0, color: "blue" }, { percent: .25, color: "green" }, { percent: .5, color: "yellow" }, { percent: .75, color: "red" }, { percent: 1, color: "magenta" }])
        let image = new Image();
        image.src = "Yoshi_Happy.png";
        sprites = app.sprites.createSprites(20, canvasWidth, canvasHeight);
        setupUI();
        loop();
    }

    function setupUI() {
        document.querySelector('#trailsCB').checked = showTrails;
        document.querySelector('#blendingCB').checked = showBlending;
        document.querySelector('#noiseCB').checked = showNoise;
        document.querySelector('#tintCB').checked = showTint;
        document.querySelector('#showImageCB').checked = showImage;

        document.querySelector('#trailsCB').onchange = e => showTrails = e.target.checked;
        document.querySelector('#blendingCB').onchange = e => showBlending = e.target.checked;
        document.querySelector('#noiseCB').onchange = e => showNoise = e.target.checked;
        document.querySelector('#tintCB').onchange = e => showTint = e.target.checked;
        document.querySelector('#showImageCB').onchange = e => showImage = e.target.checked;
    }

    function loop() {
        // schedule a call to loop() in 1/60th of a second
        requestAnimationFrame(loop);

        // draw background
        ctx.save();
        ctx.fillStyle = gradient;
        // #1 Show Trails
        if (showTrails) ctx.globalAlpha = 0.05;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);
        ctx.restore();

        // #5 Show Image
        if (showImage) {
            ctx.save();
            ctx.scale(.5, .5);
            ctx.globalAlpha = 25 / 255;
            ctx.drawImage(image, -80, -65);
            ctx.restore();
        }


        // loop through sprites
        ctx.save();
        let counter = 0;
        for (let s of sprites) {
            // move sprites
            s.move();

            // check sides and bounce
            if (s.x <= s.radius || s.x >= canvasWidth - s.radius) {
                s.reflectX();
                s.move();
            }
            if (s.y <= s.radius || s.y >= canvasHeight - s.radius) {
                s.reflectY();
                s.move();
            }

            // draw sprites
            ctx.save();
            counter++;

            // #2 - show blending
            if (showBlending) {
                //counter % 2  ? ctx.globalCompositeOperation ="color-dodge" : ctx.globalCompositeOperation ="exclusion";
                ctx.globalCompositeOperation = counter % 2 ? "color-dodge" : "exclusion";
            }
            s.draw(ctx);
            ctx.restore();

        } // end for
        ctx.restore();


        // Bitmap Manipulation
        let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        let data = imageData.data;
        let length = data.length;
        let width = imageData.width; // not using here
        // Iterate through each pixel
        for (let i = 0; i < length; i += 4) {
            // #3 - Show noise
            // red noise
            if (showNoise && Math.random() < .07) {
                data[i] = data[i + 1] = data[i + 2] = 0;
                data[i] = 255;
            }

            // #4 - Show tint
            // magenta tint
            if (showTint) {
                data[i] += 50;  		// set red value
                //data[i+1] += 50; 		// set green value
                data[i + 2] += 50;		// set blue value
                //data[i+3] -= 128;		// set alpha value
            }


        }	// end for

        // copy data back to canvas
        ctx.putImageData(imageData, 0, 0);


    } // end loop()
    return {
        init: init
    };
})();
