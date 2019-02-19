var shapes = (function() {
    class Shape {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.shapeLength = 0;
            this.verts = [];
        }
        /**
         * Render the shape using webaudio data
         * @param {CanvasRenderingContext2D} ctx
         * @param {Uint8Array} freqData
         */
        render(ctx, freqData) {
            ctx.strokeStyle = "white";
            ctx.fillStyle = "white";
            ctx.lineWidth = 5;
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
                    let multiplier =
                        (freqData[index] / 255) * 20 * ctx.lineWidth;
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
            //debugger;
        }
    }

    class Square extends Shape {
        constructor(x, y, radius) {
            super(x, y);
            this.verts = [
                { x: this.x - radius, y: this.y - radius },
                { x: this.x + radius, y: this.y - radius },
                { x: this.x + radius, y: this.y + radius },
                { x: this.x - radius, y: this.y + radius }
            ];
            // calculate the distance of the entire shape
            this.shapeLength = radius * 8;
        }

    }

    class Circle extends Shape {
        constructor(x, y, radius, subdivisions = 16) {
            super(x, y); 
            for (let i = 0; i < subdivisions; ++i) {
                let angle = (i/subdivisions) * (Math.PI * 2);
                let vert = {x: x + Math.cos(angle) * radius, y: y + Math.sin(angle) * radius};
                this.verts.push(vert);
            }
            this.shapeLength = 2 * Math.PI * radius;
        }
    }
    /**
     * @see https://en.wikipedia.org/wiki/Lemniscate_of_Bernoulli
     */
    class InfinityLoop extends Shape {
        constructor(x, y, a) {
            super(x, y);
            let angleStep = Math.PI / 32;
            const sqrt2 = Math.sqrt(2);
            for (let i = 0; i <= Math.PI * 2; i += angleStep) {
                let vertX = x + (a*sqrt2*Math.cos(i)) / (Math.pow(Math.sin(i), 2) + 1);
                let vertY = y + (a*sqrt2*Math.cos(i)*Math.sin(i)) / (Math.pow(Math.sin(i), 2) + 1);
                this.verts.push({x:vertX,y:vertY});
            }
            this.shapeLength = 7.416*a;
            console.log(this.verts);
        }
    }

    return {Square, Circle, InfinityLoop};
})();