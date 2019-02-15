var veclib = (function(){
    function distSqr(vec) {
        return (Math.pow(vec.x, 2) + Math.pow(vec.y, 2));
    }
    function magnitude(vec) {
        return Math.sqrt(distSqr(vec));
    }
    
    function subVectors(A, B) {
        return {x: A.x - B.x, y: A.y - B.y};
    }
    
    function normalize(vec) {
        let len = magnitude(vec);
        return {x: vec.x / len, y: vec.y / len};
    }
    
    function lerp(A, B, t) {
        let AtoB = subVectors(B, A);
        return {x: A.x + t * AtoB.x, y: A.y + t * AtoB.y };
    }
    return {distSqr, magnitude, subVectors, normalize, lerp};
})();
