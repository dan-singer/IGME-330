/**
 * Represents the play/pause button
 */
class PlayButton {
    /**
     * Construct a new play button
     */
    constructor() {
        this.length = 100;
        this.transitionDuration = 0.25;
        this.isTransitioning = false;
        this.isTransitioningBack = true;
        this.t = 0;
    }

    /**
     * Kick off the play animation
     */
    play() {
        this.isTransitioning = true;
        this.isTransitioningBack = false;
    }

    /**
     * Kick off the pause animation
     */
    pause() {
        this.isTransitioning = false;
        this.isTransitioningBack = true;
    }

    /**
     * Render the play button
     * @param {CanvasRenderingContext2D} ctx 
     * @param {Number} dt 
     */
    render(ctx, dt) {

        let y = this.length * Math.tan(Math.PI / 6);
        if (this.isTransitioning) {
            this.t += dt / this.transitionDuration;
            if (this.t > 1){
                this.t = 1;
                return;
            }
            y = y + this.t * -y;
        }
        else if (this.isTransitioningBack) {
            this.t -= dt / this.transitionDuration;
            if (this.t < 0) {
                this.t = 0;
            }
            y = y + this.t * -y;
        }

        ctx.save();
        ctx.strokeStyle = "red";
        ctx.fillStyle = "black";
        ctx.lineWidth = "1";
        ctx.beginPath();
        ctx.moveTo(this.length/2, 0);
        ctx.lineTo(-this.length/2, -y);
        ctx.lineTo(-this.length/2, y);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();
        ctx.restore();
    }
}