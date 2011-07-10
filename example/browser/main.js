var mr = require('mrcolor');
var $ = require('jquery-browserify');

$(window).ready(function () {
    var next = mr();
    
    $('#clicky').click(function () {
        var color = next();
        var rgb = 'rgb(' + color.rgb().join(',') + ')';
        
        $('<div>')
            .css({
                'background-color' : rgb,
                color : 'white',
                width : 500,
                height : 30
            })
            .text(rgb)
            .appendTo($('#colors'))
        ;
    });
});
