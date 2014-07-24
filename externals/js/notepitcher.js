// Unlike a traditional midi note pitcher, this external keeps track of received notes 
// and generates new ones relative to the received note whenever the pitch parameter changes.

/*
	Inlets: 
		0: note pitch, note velocity (list)
		1: pitch (int)

	Outlets:
		0: note pitch, note velocity (list)
*/

inlets = 2;
outlets = 1;

var activeNotes = [],
	relativePitch = 0;

function list(pitch, velocity)
{
	if (pitch === undefined || velocity === undefined || inlet !== 0) return;

	// new note
	var noteIndex = getActiveNoteIndexByPitch(pitch);
	if (noteIndex < 0) {
		activeNotes[activeNotes.length] = {
			note: pitch,
			velocity: velocity,
			relativePitch: relativePitch
		};
		outlet(0, pitch + relativePitch, velocity);
	}
	// existing note
	else {
		if (velocity === 0) {
			// note off - kill the note and remove it from the list
			outlet(0, activeNotes[noteIndex].note + activeNotes[noteIndex].relativePitch, 0);
			activeNotes.splice(noteIndex, 1);
		}
	}
}

function msg_int(pitch) {
	if (inlet !== 1 || pitch < -12 || pitch > 12) return;
	relativePitch = pitch;
	rePitchAllElements();
}

function getActiveNoteIndexByPitch(pitch) {
	for (var i = 0; i < activeNotes.length; i++) {
		if (activeNotes[i].note === pitch) {
			return i;
		}
	}
	return -1;
}

function rePitchAllElements() {
	for (var i = 0; i < activeNotes.length; i++) {
		if (activeNotes[i].relativePitch !== relativePitch) {
			// end current note
			outlet(0, activeNotes[i].note + activeNotes[i].relativePitch, 0);
			// update
			activeNotes[i].relativePitch = relativePitch;
			// start new note
			outlet(0, activeNotes[i].note + activeNotes[i].relativePitch, activeNotes[i].velocity);
		}
	}
}
