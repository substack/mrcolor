var convert = require('color-convert');

var mr = module.exports = function () {
    var angle = 0;
    var step = 60;
    
    var used = {};
    
    return function next () {
        if (angle + step > 360) {
            step /= 2;
            angle = step;
        }
        
        var a = Math.floor(angle);
        angle += step;
        
        if (used[a]) {
            return next();
        }
        else {
            used[a] = true;
            return mr.fromAngle(a);
        }
    };
};

mr.fromAngle = function (i) {
    return {
        index : i,
        rgb : function () {
            return convert.hsl2rgb([ i, 100, 50 ])
        },
        hsl : function () {
            return [ i, 100, 50 ];
        },
        hsv : function () {
            return convert.hsl2hsv([ i, 100, 50 ])
        },
        cmyk : function () {
            return convert.hsl2cmyk([ i, 100, 50 ])
        },
        xyz : function () {
            return convert.hsl2xyz([ i, 100, 50 ])
        }
    };
};

mr.take = function (n) {
    if (n <= 0) return [];
    
    var res = [];
    var next = mr();
    
    for (var i = 0; i < n; i++) {
        res.push(next());
    }
    
    return res;
};
