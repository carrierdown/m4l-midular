m4l-midular
===========

Max for Live modular MIDI processing modules, aka Midular.


The modules
===========

Here's a brief overview of the available modules so far:

## LiveQuantizer

![LiveQuantizer](https://raw.github.com/carrierdown/m4l-midular/master/screenshots/LiveQuantizer.png)

Quantizes incoming notes to the next subdivision. This works similarly to how quantizing of triggered clips is handled in Live, but applies to individual midi notes rather than clips.

## Repeater

Acts like a selective midi echo, repeating a given note (e.g. the note C in any octave) a given number of times.

## Buffer

Stores every unique incoming note in a buffer, and plays them back one at a time in a cyclical fashion.

## Stack

Stores every incoming note (including identical ones) in a buffer, and plays them back using a 8-step sequencer, in such a way that the first note to be inserted is the first one that gets played. The note is subsequently removed. This module can thus be seen as a mixture between a live sampler and a step sequencer, and requires a constant stream of notes to play a regular sequence.

## Rotator

Stores incoming notes in a rotating 8 note buffer and plays them back using a 8-step sequencer similar to the one in NoteStack.

## SuperPitcher

Unlike the midi pitch effect included in Live, SuperPitcher instantly pitches any held notes when the pitch parameter is adjusted. This opens up a lot of new possibilities - such as creating crude arpeggios by holding a note and turning the pitch knob back and forth, or setting a lfo to control this knob. SuperPitcher also includes a step modulator which can be used to modulate the pitch in a tempo-synced fashion.


