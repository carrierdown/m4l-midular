/*
	Inlets:
		0: note on pitches are stored,
			the string 'next' triggers a new note,
			the string 'length' outputs current buffer length in second outlet,
			the string 'clear' clears the current buffer,
			bang sends a note off for the currently playing note (if any)
		1: mode (0 - up, 1 - down, 2 - up/down, 3 - random)

	Outlets:
		0: note pitch for note on (int)
		1: note pitch for note off (int)
		2: the current length of the buffer (int)
*/

inlets = 2;
outlets = 3;

var buffer = [],
	mode = 0, // up
	playHead = 0,
	currentDirection = 1,
	MAX_BUFFER_SIZE = 100,
	currentNotePlaying = -1;

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

function bufferContainsNote(note) {
	for (var i = 0; i < buffer.length; i++) {
		if (buffer[i] === note) {
			return true;
		}
	}
	return false;
}

function getvalueof() {
	return JSON.stringify(buffer);
}

function setvalueof(a) {
	if (a == 0) {
		buffer = [];
		return;
	} else {
		buffer = JSON.parse(a);
	}
	outlet(2, buffer.length);
}

function msg_int(value) {
	switch (inlet) {
		case 0:
			// store note
			if (buffer.length < MAX_BUFFER_SIZE && !bufferContainsNote(value)) {
				buffer[buffer.length] = ensureRange(value, 0, 127);
			}
			notifyclients();
			outlet(2, buffer.length);
			break;
		case 1:
			// set mode
			mode = ensureRange(value, 0, 3);
			break;
	}
}

function bang(value) {
	if (inlet != 0) return;
	playNoteOff();
}

function playNoteOff() {
	if (currentNotePlaying >= 0) {
		outlet(1, currentNotePlaying);
		currentNotePlaying = -1;
	}
}

function playNoteOn() {
		outlet(0, buffer[playHead]);
		currentNotePlaying = buffer[playHead];
}

function clear() {
	if (inlet != 0) return;
	buffer = [];
	playHead = 0;
	notifyclients();
}

function length() {
	if (inlet != 0) return;
	outlet(2, buffer.length);
}

function next() {
	if (inlet == 0 && buffer.length > 0) {
		playNoteOff();
		playNoteOn();
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

