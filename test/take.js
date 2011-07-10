var assert = require('assert');
var mr = require('../');

exports.take = function () {
    var xs = mr.take(6);
    assert.equal(xs.length, 6);
    for (var i = 0; i < xs.length - 1; i++) {
        assert.equal(xs[i+1].hsl()[0] - xs[i].hsl()[0], 60);
    }
};
