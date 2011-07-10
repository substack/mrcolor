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
        
        return mr.fromHSL(
            angle,
            100 - Math.min(80, 1 / Math.sqrt(1 + Math.floor(num / 12)))
                * Math.random(),
            50 + Math.min(80, (Math.floor(num / 6) * 20))
                * (Math.random() - 0.5)
        );
    };
};

mr.fromHSL = function (h, s, l) {
    if (!s) s = 100;
    if (!l) l = 50;
    var hsl = [ h, s, l ];
    
    return {
        rgb : function () {
            return convert.hsl2rgb(hsl);
        },
        hsl : function () {
            return hsl;
        },
        hsv : function () {
            return convert.hsl2hsv(hsl)
        },
        cmyk : function () {
            return convert.hsl2cmyk(hsl)
        },
        xyz : function () {
            return convert.hsl2xyz(hsl)
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
