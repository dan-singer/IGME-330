var app = app || {};
app.sprites = (function () {
    function createSprites(num = 20, canvasWidth = 640, canvasHeight = 480) {
        // create array to hold all of our sprites
        let sprites = [];
        for (let i = 0; i < num; i++) {
            // create Object literal
            let s = {};

            // add properties
            s.radius = 10 + Math.random() * 15;;
            s.color = app.utilities.getRandomColor();
            s.x = Math.random() * (canvasWidth - 100) + 50;
            s.y = Math.random() * (canvasHeight - 100) + 50;
            s.fwd = app.utilities.getRandomUnitVector();
            s.speed = Math.random() + 2;

            //add methods
            s.draw = function (ctx) {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                ctx.arc(this.x, this.y, this.radius / 2, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.fillStyle = this.color;
                ctx.fill();
                ctx.restore();
            };

            s.move = function () {
                this.x += this.fwd.x * this.speed;
                this.y += this.fwd.y * this.speed;
            };

            s.reflectX = function () {
                this.fwd.x *= -1;
            }

            s.reflectY = function () {
                this.fwd.y *= -1;
            }

            // add to array
            sprites.push(s);
        } // end for

        // return  array
        return sprites;
    }
    return {
        createSprites
    };
})();