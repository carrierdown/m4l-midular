/*
	Inlets: 
		0: ints (0-127) are stored, 
			the string 'next' triggers a new note, 
			the string 'length' outputs current buffer length in second outlet, 
			the string 'clear' clears the current buffer
		1: mode (0 - up, 1 - down, 2 - up/down, 3 - random)

	Outlets:
		0: note pitch (int)
		1: the current length of the buffer (int)
*/

inlets = 2;
outlets = 2;

var buffer = [],
	mode = 0,
	playHead = 0,
	currentDirection = 1,
	MAX_BUFFER_SIZE = 100; // up

function ensureRange(val, min, max) {
	if (val < min) return min;
	if (val > max) return max;
	return val;
}

function wrapRange(val, min, max) {
	if (val < min) return max;
	if (val > max) return min;
	return val;
}

function containRange(val, min, max) {
	var val2 = wrapRange(val, min, max);
	if (val > val2) {

	}
}

function bufferContainsNote(note) {
	for (var i = 0; i < buffer.length; i++) {
		if (buffer[i] === note) {
			return true;
		}
	}
	return false;
}

function msg_int(value) {
	switch (inlet) {
		case 0:
			// store note
			if (buffer.length < MAX_BUFFER_SIZE && !bufferContainsNote(value)) {
				buffer[buffer.length] = ensureRange(value, 0, 127);
			}
			outlet(1, buffer.length);
			break;
		case 1:
			// set mode
			mode = ensureRange(value, 0, 3);
			break;
	}
}

function clear() {
	if (inlet != 0) return;
	buffer = [];
	playHead = 0;
}

function length() {
	if (inlet != 0) return;
	outlet(1, buffer.length);
}

function next() {
	if (inlet == 0 && buffer.length > 0) {
		outlet(0, buffer[playHead]);
		tickPlayHead();
	}
}

function tickPlayHead() {
	switch (mode) {
		case 0:
			playHead = wrapRange(playHead + 1, 0, buffer.length - 1);
			break;
		case 1:
			playHead = wrapRange(playHead - 1, 0, buffer.length - 1);
			break;
		case 2:
			if (playHead <= 0) {
				currentDirection = 1;
			} else if (playHead >= buffer.length - 1) {
				currentDirection = -1;
			}
			playHead = playHead + currentDirection;
			break;
		case 3:
			playHead = _getRandomInt(0, buffer.length -1);
			break;
	}
}

function _getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

