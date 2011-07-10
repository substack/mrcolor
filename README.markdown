Mr. Color
=========

I just want some colors, you know?

This module gives you some colors which are all different but they get less
different the more colors you load.

The hue is deterministic but the saturation and luminosity vary increasingly
randomly the more colors are generated.

methods
=======

var mr = require('mrcolor');

var next = mr();
----------------

Call `next()` repeatedly to get more colors.

mr.take(n)
----------

Generate `n` colors as an array.

color objects
=============

Color objects have these methods:

* rgb()
* hsl()
* hsv()
* cmyk()
* xyz()

The return values are arrays with each of the color parameters.
See [color-convert](https://github.com/harthur/color-convert) for more info.
