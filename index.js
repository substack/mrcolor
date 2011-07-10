var convert = require('color-convert');

var mr = module.exports = function () {
    var ranges = [];
    var colors = [];
    
    function nextTwo (min, max) {
        var dx = (max - min) / 2;
        
        var i = min;
        var j = Math.floor(dx + min);
        
        colors.push(mr.fromIndex(i));
        colors.push(mr.fromIndex(j));
        
        ranges.push([ i + dx / 2, j ]);
        ranges.push([ j + dx / 2, max ]);
    }
    
    return (function next () {
        if (colors.length) {
            var c = colors.shift();
            c.next = next;
            return c;
        }
        else if (ranges.length) {
            var r = ranges.shift();
            nextTwo.apply(null, r);
            return next();
        }
        else {
            nextTwo(0, 360);
            return next();
        }
    })();
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
