// Generates coordinates that can be used together with drawing commands and the max lcd object

/*
	Inlets: 
		0: number of dots to draw (int)

	Outlets:
		0: list of coordinates for dot (list)
		1: the drawing command clear is emitted whenever the number of dots to draw changes (msg)

	Arguments:
		 size of dots (int), max number of dots (int), number of dots per line (int)
*/

// inlets and outlets
inlets = 1;
outlets = 2;

var numberOfDots = 0,
	sizeOfDots = jsarguments.length > 1 ? jsarguments[1] : 10,
	maxNumberOfDots = jsarguments.length > 2 ? jsarguments[2] : 255,
	dotsPerLine = jsarguments.length > 3 ? jsarguments[3] : 10;

function msg_int(value)
{
	var y=0, x=0;
	numberOfDots = ensureRange(value, 0, maxNumberOfDots);
	outlet(1, "clear");
	for (var i=0; i<numberOfDots; i++) {
		x = i % dotsPerLine;
		y = Math.floor(i/dotsPerLine);
		outlet(0, x*sizeOfDots, y*sizeOfDots, (x*sizeOfDots+sizeOfDots-2), (y*sizeOfDots+sizeOfDots-2));
	}
}

function ensureRange(val, min, max)
{
	if (val < min) return min;
	if (val > max) return max;
	return val;
}
