m4l-midular
===========

Max for Live modular MIDI processing modules, aka Midular.

Midular is a (growing) set of MIDI effect modules for Max for Live. The modules can be chained together in a modular fashion to form any number of effect chains. Used in isolation, they can act as quick problem solvers, such as quantizing notes in realtime, or delaying a certain set of notes. However, it is when multiple modules are chained together that the power of the modular aspect becomes apparent. 

## Concept
The main idea behind Midular is to have a set of modules that operate on their input in various well-defined ways, by mutating and/or complementing what is passed in. Each module focuses on one piece of functionality, such as live quantization of notes, repeating incoming notes, sequencing incoming notes, and so on. By chaining several modules together, one can create a vast array of different MIDI processing chains that can do everything from simple tasks such as echoing or quantizing notes, to more complex setups that can support various forms of algorithmically aided composition. As Ableton Live already ships with a selection of useful MIDI effects, the Midular modules are designed to complement and add to this functionality rather than replacing it, thus you are encouraged to mix and match different types of MIDI plugins to achieve your particular goals.

## Support
If you find these modules useful, I would greatly appreciate it if you support me by following my SoundCloud at [**https://soundcloud.com/upland**](https://soundcloud.com/upland). Thanks.

## License
Midular is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International](http://creativecommons.org/licenses/by-nc-sa/4.0/) license.

## Contributing
The midular modules, in addition to the modules built into Live offer a nice starting point for doing lots of fun MIDI processing, but there are lots of possibilities that haven't been explored yet, and there probably are fun ways in which the existing modules could be expanded upon to offer more possibilities. If you're interested in contributing to this collection, please get in [**touch**](http://www.upland.no/contact).

## Download
You can download all current modules in one handy zip from [here](https://github.com/carrierdown/m4l-midular/releases/tag/v1.0).

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

Stores every unique incoming note in a buffer, and plays them back one at a time in a cyclical fashion. 

## Rotator

![Rotator](https://raw.github.com/carrierdown/m4l-midular/master/screenshots/Rotator.png)

Stores incoming notes in a rotating 8 note buffer and plays them back using a 8-step sequencer which is based on an implementation found in a Roland System 100m modular sequencer.

## SuperPitcher

![SuperPitcher](https://raw.github.com/carrierdown/m4l-midular/master/screenshots/SuperPitcher.png)

Unlike the MIDI pitch effect included in Live, SuperPitcher instantly pitches any held notes when the pitch parameter is adjusted. This opens up a lot of new possibilities - such as creating crude arpeggios by holding a note and turning the pitch knob back and forth, or setting a LFO to control this knob. SuperPitcher also includes a step modulator which can be used to modulate the pitch in a tempo-synced fashion.
