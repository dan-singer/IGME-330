/**
 * Vector library
 */
var veclib = (function(){
    /**
     * Return the magnitude squared of the vector
     */
    function distSqr(vec) {
        return (Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
    }
    /**
     * Returns the distance between two vectors
     */
    function dist(A, B) {
        return magnitude(subVectors(A, B));
    }

    /**
     * Returns the magnitude of a vector
     */
    function magnitude(vec) {
        return Math.sqrt(distSqr(vec));
    }
    
    /**
     * Returns a vector representing the difference betweeen A and B
     */
    function subVectors(A, B) {
        return {x: A.x - B.x, y: A.y - B.y};
    }
    
    /**
     * Returns a normalized version of vec
     */
    function normalize(vec) {
        let len = magnitude(vec);
        return {x: vec.x / len, y: vec.y / len};
    }
    
    /**
     * Linearly interpolate from A to B by t
     * @returns the interpolated vector
     */
    function lerp(A, B, t) {
        let AtoB = subVectors(B, A);
        return {x: A.x + t * AtoB.x, y: A.y + t * AtoB.y };
    }
    return {distSqr, magnitude, subVectors, normalize, lerp, dist};
})();
