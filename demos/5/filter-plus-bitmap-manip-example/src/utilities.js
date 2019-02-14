var app = app || {};
app.utilities = (function () {
    function getRandomUnitVector() {
        let x = getRandom(-1, 1);
        let y = getRandom(-1, 1);
        let length = Math.sqrt(x * x + y * y);
        if (length == 0) { // very unlikely
            x = 1; // point right
            y = 0;
            length = 1;
        } else {
            x /= length;
            y /= length;
        }

        return { x: x, y: y };
    }

    function getRandom(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getRandomColor() {
        const getByte = _ => 35 + Math.round(Math.random() * 220);
        return `rgba(${getByte()},${getByte()},${getByte()},1)`;
    }

    function getLinearGradient(ctx, startX, startY, endX, endY, colorStops) {
        let lg = ctx.createLinearGradient(startX, startY, endX, endY);
        for (let stop of colorStops) {
            lg.addColorStop(stop.percent, stop.color);
        }
        return lg;
    }

    return {
        getRandomUnitVector,
        getRandom,
        getRandomColor,
        getLinearGradient
    };

})();
