class PlayButton {
    constructor() {
        this.length = 100;
        this.transitionDuration = 0.25;
        this.isTransitioning = false;
        this.isTransitioningBack = true;
        this.t = 0;
    }

    play() {
        this.isTransitioning = true;
        this.isTransitioningBack = false;
        this.t = 0;
    }

    pause() {
        this.isTransitioning = false;
        this.isTransitioningBack = true;
        this.t = 1;
    }

    render(ctx, dt) {

        let y = this.length * Math.tan(Math.PI / 6);
        if (this.isTransitioning) {
            if (this.t < 1)
                this.t += dt / this.transitionDuration;
            y = y + this.t * -y;
        }
        else if (this.isTransitioningBack) {
            if (this.t > 0) 
                this.t -= dt / this.transitionDuration;
            y = y + this.t * -y;
        }

        ctx.save();
        ctx.strokeStyle = "red";
        ctx.lineWidth = "1";
        ctx.beginPath();
        ctx.moveTo(this.length/2, 0);
        ctx.lineTo(-this.length/2, -y);
        ctx.lineTo(-this.length/2, y);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
}