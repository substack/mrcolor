var convert = require('color-convert');

var mr = module.exports = function () {
    var angle = 0;
    var bi = mr.biforcate(0, 60);
    var offset = bi();
    
    return function next () {
        if (angle + 60 >= 360) {
            offset = bi();
            angle = offset;
        }
        
        var a = Math.floor(angle);
        angle += 60;
        
        return mr.fromAngle(a);
    };
};

mr.biforcate = function (m, n) {
    var ranges = [];
    var indexes = [];
    
    function next (min, max) {
        var dx = (max - min) / 2;
        
        var i = min;
        indexes.push(i);
        
        var j = Math.floor(dx + min);
        indexes.push(j);
        
        ranges.push([ i + dx / 2, j ]);
        ranges.push([ j + dx / 2, max ]);
    }
    next(m, n);
    
    return function result () {
        if (indexes.length) {
            return indexes.shift();
        }
        else if (ranges.length) {
            var r = ranges.shift();
            next.apply(null, r);
            return indexes.shift();
        }
        else {
            throw new Error('wtf');
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
