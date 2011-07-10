var mr = require('mrcolor');
var $ = require('jquery-browserify');

$(window).ready(function () {
    var color = mr();
    
    $('#clicky').click(function () {
        var rgb = 'rgb(' + color.rgb().join(',') + ')';
        color = color.next();
        
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
