var convert = require('color-convert');

var mr = module.exports = function () {
    var used = [];
    var num = 0;
    var last = [];
    
    return function next () {
        var angle;
        if (num < 6) {
            angle = 60 * num;
            used.push(angle);
            if (num === 5) used.push(360);
        }
        else {
            var dxs = used.slice(1).map(function (u, i) {
                return (u - used[i]) * last.every(function (x) {
                    return Math.abs(u - x) > 60
                        && Math.abs((u - 360) - x) > 60
                    ;
                });
            });
            var ix = dxs.indexOf(Math.max.apply(null, dxs));
            
            var x = used[ix];
            var y = used[ix+1];
            angle = Math.floor(x + (y - x) / 2);
            used.splice(ix + 1, 0, angle);
        }
        
        num ++;
        last = [angle].concat(last).slice(0,4);
        return mr.fromAngle(angle);
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
