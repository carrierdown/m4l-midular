m4l-midular
===========

Max for Live modular MIDI processing modules, aka Midular.

Midular is a (growing) set of MIDI effect modules for Max for Live. The modules can be chained together in a modular fashion to form any number of effect chains. Used in isolation, they can act as quick problem solvers, such as quantizing notes in realtime, or delaying a certain set of notes. However, it is when multiple modules are chained together that the power of the modular aspect becomes apparent. To see some examples of the modules in action, check out these two videos: [Midular example 1](https://www.youtube.com/watch?v=vW2kJZrd2Mc&list=UUQ-sL5VFlVHYjup_iILRnug) | [Midular example 2](https://www.youtube.com/watch?v=JtNl9c_ixow&index=2&list=UUQ-sL5VFlVHYjup_iILRnug)

## Update August 7th: Version 1.1 is released
Go *[here](https://github.com/carrierdown/m4l-midular/releases/tag/v1.1)* for details about the latest version of Midular!

## Concept
The main idea behind Midular is to have a set of modules that operate on their input in various well-defined ways, by mutating and/or complementing what is passed in. Each module focuses on one piece of functionality, such as live quantization of notes, repeating incoming notes, sequencing incoming notes, and so on. By chaining several modules together, one can create a vast array of different MIDI processing chains that can do everything from simple tasks such as echoing or quantizing notes, to more complex setups that can support various forms of algorithmically aided composition. As Ableton Live already ships with a selection of useful MIDI effects, the Midular modules are designed to complement and add to this functionality rather than replacing it, thus you are encouraged to mix and match different types of MIDI plugins to achieve your particular goals.

## Support
If you find these modules useful, I would greatly appreciate it if you support me by following my SoundCloud at [**https://soundcloud.com/upland**](https://soundcloud.com/upland). Thanks!

## Contributing
The midular modules, in addition to the modules built into Live offer a nice starting point for doing lots of fun MIDI processing, but there are lots of possibilities that haven't been explored yet, and there probably are fun ways in which the existing modules could be expanded upon to offer more possibilities. If you're interested in contributing to this collection, please get in [**touch**](http://www.upland.no/contact).

## License
Midular is licensed under the [GPL license](http://www.gnu.org/copyleft/gpl.html).

The modules
===========

Here's a brief overview of the available modules so far:

## LiveQuantizer

![LiveQuantizer](https://raw.github.com/carrierdown/m4l-midular/master/screenshots/LiveQuantizer.png)

Quantizes incoming notes to the next subdivision. This works similarly to how quantizing of triggered clips is handled in Live, but applies to individual MIDI notes rather than clips.

## Repeater

![Repeater](https://raw.github.com/carrierdown/m4l-midular/master/screenshots/Repeater.png)

Acts like a selective MIDI echo, repeating a given note (e.g. the note C in any octave) a given number of times.

## Buffer

![Buffer](https://raw.github.com/carrierdown/m4l-midular/master/screenshots/Buffer.png)

Stores every unique incoming note in a buffer, and plays them back one at a time. Playback is triggered every time a note is received, and it will also be stored in the buffer if it hasn't already. Playback cycles through the stored notes in one of several ways, including up, down, up/down, and random.

## Rotator

![Rotator](https://raw.github.com/carrierdown/m4l-midular/master/screenshots/Rotator.png)

Stores incoming notes in a rotating 8 note buffer and plays them back using a 8-step sequencer which is based on an implementation found in a Roland System 100m modular sequencer.

## SuperPitcher

![SuperPitcher](https://raw.github.com/carrierdown/m4l-midular/master/screenshots/SuperPitcher.png)

Unlike the MIDI pitch effect included in Live, SuperPitcher instantly pitches any held notes when the pitch parameter is adjusted. This opens up a lot of new possibilities - such as creating crude arpeggios by holding a note and turning the pitch knob back and forth, or setting a LFO to control this knob. SuperPitcher also includes a step modulator which can be used to modulate the pitch in a tempo-synced fashion.

## VelocityFilter

![VelocityFilter](https://raw.github.com/carrierdown/m4l-midular/master/screenshots/VelocityFilter.png)

Filters incoming notes based on velocity, such that notes with a velocity _greater than_ or _less than_ the given velocity value are passed through. The former can be seen as a high pass filter while the latter can be seen as a low pass filter. One example usage is filtering out ghost (low velocity) drum hits on complex percussion sequences as a way of breaking down the beat without needing extra clips for variation.

## OneNote

![OneNote](https://aw.github.com/carrierdown/m4l-midular/master/screenshots/OneNote.png)

A very simple utility module which simply transforms any note it receives into the specified note. It can be quite useful when combined with other modules, and remember that the output note can be changed on the fly (or automated).

## Timer

![Timer](https://aw.github.com/carrierdown/m4l-midular/master/screenshots/Timer.png)

Measures the elapsed time (in milliseconds) between incoming notes, and outputs a note (either a fixed note or the note received) if the elapsed time is either greater than or less than the specified treshold. It can be seen as a sort of context sensitive note filter, and can be very handy for creating several midi patterns based on the same stream of midi notes.

___

Copyright © 2014 Knut Andreas Ruud
    
    Midular is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    Midular is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    
    You should have received a copy of the GNU General Public License
    along with Midular.  If not, see <http://www.gnu.org/licenses/>.
