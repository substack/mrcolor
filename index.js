var convert = require('color-convert');

var mr = module.exports = function () {
    return (function next (min, max) {
        var i = min;
        var x = mr.fromIndex(i);
        
        x.next = function () {
            var j = Math.floor((max - min) / 2 + min);
            var y = mr.fromIndex(j);
            y.next = function () {
                return next(Math.floor(i + (max - i) / 2 + i), max);
            };
            return y;
        };
        
        return x;
    })(0, 360);
};

mr.take = function (n) {
    var xs = [];
    var c = { next : mr };
    
    for (var i = 0; i < n; i++) {
        c = c.next();
        xs.push(c);
    }
    
    return xs;
};

mr.fromIndex = function (i) {
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
