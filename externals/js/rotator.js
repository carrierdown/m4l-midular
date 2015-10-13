/*
	Rotator
	Sequencer heavily inspired by Intellijel Metropolis eurorack module

	Inlets:
		0: bang ticks sequence one step forward,
			 'length' <int> sets length of sequence,
			 'note' <int> sets note for current record position and updates record position and length params accordingly,
			 'purge' sends note off for currently sounding note (if any). Used when stopping playback.
		1-9: 'note' <int> sets note for the given index,
				 'delay' <int> sets the delay length for the given index,
				 'mode' <int> sets the playmode for the given index

	Outlets:
		0: note pitch and velocity,
		1: length <sequence length> when updated,
			 note <position> <pitch> when updated via record mode

	 Considering adding:
		 Live transpose (sequence is pitched according to incoming note)
		 Playback modes forward, reverse, forward/reverse, back and forth intertwined, etc...
*/

inlets = 9;
outlets = 2;

var currentlyPlayingNote = -1,
		transport = {
			position: 0,
			delayIndex: 0
		},
		Mode = {
			Single: 1,
			Hold: 2,
			Repeat: 3,
			Mute: 4
		},
		Index = {
			Min: 0,
			Max: 7
		},
		OutletIndex = {
			NoteOut: 0,
			LengthOut: 1,
			InfoOut: 1
		};

function initSettings() {
	return {
		length: 0,
		recordPosition: 0,
		notes: [60,60,60,60,60,60,60,60],
		delays: [1,1,1,1,1,1,1,1],
		modes: [Mode.Single, Mode.Single, Mode.Single, Mode.Single, Mode.Single, Mode.Single, Mode.Single, Mode.Single]
	};
}

var settings = initSettings();

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

function getvalueof() {
	return JSON.stringify(settings);
}

function setvalueof(state) {
	if (state == 0 || state == '' || state === undefined || state === null) {
		settings = initSettings();
		return;
	} else {
		buffer = JSON.parse(state);
	}
	outlet(OutletIndex.LengthOut, 'length', settings.length);
}

function bang() {
	if (inlet !== 0) return;
	tick();
}

function tick()
{
	if (settings.length === 0) {
		return;
	}
	switch (settings.modes[transport.position]) {
		case Mode.Single:
			_noteOff();
			if (transport.delayIndex === 0) {
				_noteOn();
			} else if (transport.delayIndex === 1) {
				_noteOff();
			}
			break;
		case Mode.Hold:
			if (transport.delayIndex === 0) {
				_noteOff();
				_noteOn();
			}
			break;
		case Mode.Repeat:
		// console.log('off');
			_noteOff();
		// console.log('on');
			_noteOn();
			// emit note
			break;
		case Mode.Mute:
			_noteOff();
			break;
	}
	_advanceTransport();
}

function note(pitch) {
	if (inlet === 0) {
		settings.notes[settings.recordPosition] = pitch;
		outlet(OutletIndex.InfoOut, 'note', settings.recordPosition + 1, pitch);
		if (settings.length < 8) {
			settings.length++;
		}
		outlet(OutletIndex.LengthOut, 'length', settings.length);
		settings.recordPosition = (settings.recordPosition + 1) % 8;
		notifyclients();
	}
	else if (inlet >= 1 && inlet <= 9) {
		settings.notes[inlet - 1] = pitch;
		notifyclients();
	}
}

function delay(delayValue) {
	if (inlet >= 1 && inlet <= 9) {
		settings.delays[inlet - 1] = ensureRange(delayValue,1,8);
		notifyclients();
	}
}

function mode(modeValue) {
	if (inlet >= 1 && inlet <= 9) {
		settings.modes[inlet - 1] = ensureRange(modeValue,1,4);
		notifyclients();
	}
}

function length(value) {
	if (inlet !== 0) return;
	settings.length = value;
	outlet(OutletIndex.LengthOut, 'length', settings.length);
}

function reset() {
	transport.position = 0;
	transport.delayIndex = 0;
	_noteOff();
}

function clear() {
	var i;
	settings = initSettings();
	for (i=1; i<=8; i++) {
		outlet(OutletIndex.InfoOut, 'note', i, settings.notes[i-1]);
		outlet(OutletIndex.LengthOut, 'length', settings.length);
		outlet(OutletIndex.InfoOut, 'delay', i, settings.delays[i-1]);
		outlet(OutletIndex.InfoOut, 'mode', i, settings.modes[i-1]);
	}
	reset();
}

function purge() {
	if (inlet !== 0) return;
	_noteOff();
}

function _advanceTransport() {
	transport.delayIndex++;
	if (transport.delayIndex >= settings.delays[transport.position]) {
		transport.delayIndex = 0;
		transport.position = (transport.position + 1) % settings.length;
	}
}

function _noteOff() {
	if (currentlyPlayingNote >= 0) {
		outlet(OutletIndex.NoteOut, currentlyPlayingNote, 0);
		currentlyPlayingNote = -1;
	}
}

function _noteOn() {
	currentlyPlayingNote = settings.notes[transport.position];
	outlet(OutletIndex.NoteOut, currentlyPlayingNote, 127);
}
