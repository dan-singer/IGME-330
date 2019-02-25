/**
 * Collection of shapes used by shape.viz
 */
var shapes = (function() {

    /**
     * Parent shape class
     */
    class Shape {
        /**
         * Construct a shape at a location with radius r
         */
        constructor(x, y, radius) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.width = 0;
            this.height = 0;
            this.shapeLength = 0;
            this.fills = true;
            this.verts = [];
            this.rotation = 0;
            this.rotationVel = Math.PI / 64;
        }
        /**
         * Render the shape using webaudio data
         * @param {CanvasRenderingContext2D} ctx
         * @param {Uint8Array} freqData
         */
        render(ctx, freqData, strokeStyle="white", fillStyle="black") {
            ctx.save();
            ctx.strokeStyle = strokeStyle;
            ctx.fillStyle = fillStyle;
            ctx.lineWidth = .5;
            ctx.lineCap = "round";
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.beginPath();
            // store a counter representing the current percentage completed
            let curPercentage = 0;
            // for each line in the path
            for (let i = 0; i < this.verts.length; ++i) {
                // determine it's length
                let second = i + 1 == this.verts.length ? 0 : i + 1;
                let line = veclib.subVectors(this.verts[second], this.verts[i]);
                let lineLength = veclib.magnitude(line);
                // determine the percentage of it relative to the entire shape
                let linePerc = lineLength / this.shapeLength;
                let samples = linePerc * freqData.length;

                for (let j = 0; j < samples; ++j) {
                    // draw curPercentage to curPercentage + newPercentage of the curve along this line
                    let index = parseInt(curPercentage * freqData.length) + j;
                    let t = j / samples;
                    let pointOnLine = veclib.lerp(
                        this.verts[i],
                        this.verts[second],
                        t
                    );
                    let perp = { x: line.y, y: -line.x };
                    let perpNorm = veclib.normalize(perp);
                    let data = freqData[index] > 20 ? freqData[index] : Math.random() * 10;
                    let multiplier = (data / 255) * 5;
                    if (isNaN(multiplier)){
                        multiplier = 0;
                    }
                    ctx.lineTo(
                        pointOnLine.x + perpNorm.x * multiplier,
                        pointOnLine.y + perpNorm.y * multiplier
                    );
                }
                curPercentage += linePerc;
            }
            ctx.closePath();
            ctx.stroke();
            if (this.fills)
                ctx.fill();
            ctx.restore();
        }

        /**
         * Rotate the shape based on its rotationVel property
         */
        rotate(dt) {
            this.rotation += this.rotationVel * dt;
        }
    }

    /**
     * Square shape
     */
    class Square extends Shape {
        /**
         * Construct a square at x,y with radius
         */
        constructor(x, y, radius) {
            super(x, y, radius);
            this.verts = [
                { x: -radius, y: -radius },
                { x: radius, y: -radius },
                { x: radius, y: radius },
                { x: -radius, y: radius }
            ];
            // calculate the distance of the entire shape
            this.shapeLength = radius * 8;
            this.width = radius * 2;
            this.height = this.width;
        }

    }

    /**
     * Circle shape
     */
    class Circle extends Shape {
        /**
         * Construct a circle
         * @param {Number} subdivisions number of subdivisions used to generate the circle 
         */
        constructor(x, y, radius, subdivisions = 60) {
            super(x, y, radius); 
            for (let i = 0; i < subdivisions; ++i) {
                let angle = (i/subdivisions) * (Math.PI * 2);
                let vert = {x: Math.cos(angle) * radius, y: Math.sin(angle) * radius};
                this.verts.push(vert);
            }
            this.shapeLength = 2 * Math.PI * radius;
            this.width = radius * 2;
            this.height = this.width;
        }
    }
    /**
     * Infinity Loop curve
     * @see https://en.wikipedia.org/wiki/Lemniscate_of_Bernoulli
     */
    class InfinityLoop extends Shape {
        /**
         * Construct an infinity loop
         */
        constructor(x, y, a) {
            super(x, y, a);
            let angleStep = Math.PI / 32;
            const sqrt2 = Math.sqrt(2);
            for (let i = 0; i <= Math.PI * 2; i += angleStep) {
                let vertX = (a*sqrt2*Math.cos(i)) / (Math.pow(Math.sin(i), 2) + 1);
                let vertY = (a*sqrt2*Math.cos(i)*Math.sin(i)) / (Math.pow(Math.sin(i), 2) + 1);
                this.verts.push({x:vertX,y:vertY});
            }
            this.shapeLength = 7.416*a;
            this.width = a * 2.5;
            this.height = a * 2.5;
        }
    }

    /**
     * Hypotrochoid curve
     * @see http://www.archimy.com/examples/2d-hypotrochoid.html
     */
    class Hypotrochoid extends Shape {
        /**
         * Construct an Hypotrochoid curve
         */
        constructor(x, y, r) {
            super(x, y, r);
            let R = r * 3;
            let d = R / 2;
            let angleStep = Math.PI / 32;
            for (let i = 0, c = 0; i <= Math.PI * 6; i += angleStep, ++c) {
                let vx = (R - r) * Math.cos(i) + d * Math.cos(((R - r)/r)*i);
                let vy = (R - r) * Math.sin(i) - d * Math.sin(((R - r)/r)*i);
                this.verts.push({x:vx, y:vy});
                if (c > 0) {
                    this.shapeLength += veclib.dist(this.verts[c - 1], this.verts[c]);
                }
            }
            this.width = R;
            this.height = R*2; 
            this.fills = false;
        }
    }
    /**
     * Lisajous Curve
     * @see http://jwilson.coe.uga.edu/EMAT6680Su07/Francisco/Assignment10/parametric.html
     */
    class LisajousCurve extends Shape {
        /**
         * Construct a Lisajous Curve
         */
        constructor(x, y, r) {
            super(x, y, r);
            let a = 12;
            let b = 13;
            let angleStep = Math.PI / 32;
            for (let i = 0, c = 0; i <= 200; i += angleStep, ++c) {
                let vx = r * Math.sin((a/b)*i);
                let vy = r * Math.sin(i);
                this.verts.push({x:vx, y:vy});
                if (c > 0) {
                    this.shapeLength += veclib.dist(this.verts[c - 1], this.verts[c]);
                }
            }
            this.verts.push({x:this.verts[0].x, y:this.verts[0].y});
            this.width = r * 2;
            this.height = r * 2; 
            this.fills = false;
        }
    }
    return {Square, Circle, InfinityLoop, Hypotrochoid, LisajousCurve};
})();
