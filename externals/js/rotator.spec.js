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
*/

describe("rotator tests", function() {
	describe("Testing playmodes:", function() {

		beforeEach(function() {
			spyOn(window, 'outlet');
			inlet = 0;
			note(60);
			note(61);
			note(62);
			note(63);
			// inlet = 1;
			// delay(2);
			inlet = 2;
			delay(3);
			inlet = 3;
			delay(4);
			inlet = 4;
			delay(5);
			inlet = 0;
		});

		it("Default play mode (single) should output note at the start of each step followed by note off on the next step", function() {
			reset();
			window.outlet.reset();

			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 60, 127);
			window.outlet.reset();

			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 60, 0);
			expect(window.outlet).toHaveBeenCalledWith(0, 61, 127);
			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 61, 0);
			window.outlet.reset();
			bang();
			expect(window.outlet.calls.length).toEqual(0);

			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 62, 127);
			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 62, 0);
			window.outlet.reset();
			bang();
			bang();
			expect(window.outlet.calls.length).toEqual(0);

			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 63, 127);
			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 63, 0);
			window.outlet.reset();
			bang();
			bang();
			bang();
			expect(window.outlet.calls.length).toEqual(0);

			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 60, 127);
		});

		it("Play mode hold should output held notes throughout the duration of each step", function() {
			reset();
			inlet = 1;
			mode(2);
			inlet = 2;
			mode(2);
			inlet = 0;
			window.outlet.reset();

			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 60, 127);
			expect(window.outlet.calls.length).toEqual(1);
			window.outlet.reset();

			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 60, 0);
			expect(window.outlet).toHaveBeenCalledWith(0, 61, 127);
			expect(window.outlet.calls.length).toEqual(2);
			window.outlet.reset();
			bang();
			bang();
			expect(window.outlet.calls.length).toEqual(0);
			// expect(window.outlet).toHaveBeenCalledWith(0, 61, 127);

			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 61, 0);
			expect(window.outlet).toHaveBeenCalledWith(0, 62, 127);
			expect(window.outlet.calls.length).toEqual(2);
			// window.outlet.reset();
		});

		it("Play mode repeat should output notes for each step", function() {
			reset();
			inlet = 1;
			mode(Mode.Repeat);
			inlet = 2;
			mode(Mode.Repeat);
			inlet = 0;
			window.outlet.reset();

			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 60, 127);
			expect(window.outlet.calls.length).toEqual(1);
			window.outlet.reset();

			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 60, 0);
			expect(window.outlet).toHaveBeenCalledWith(0, 61, 127);
			expect(window.outlet.calls.length).toEqual(2);
			window.outlet.reset();
			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 61, 0);
			expect(window.outlet).toHaveBeenCalledWith(0, 61, 127);
			expect(window.outlet.calls.length).toEqual(2);
			window.outlet.reset();
			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 61, 0);
			expect(window.outlet).toHaveBeenCalledWith(0, 61, 127);
			expect(window.outlet.calls.length).toEqual(2);
			window.outlet.reset();
			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 61, 0);
			expect(window.outlet).toHaveBeenCalledWith(0, 62, 127);
			expect(window.outlet.calls.length).toEqual(2);
			window.outlet.reset();
		});

		it("Play mode mute should not output notes, only note off at start if needed ", function() {
			reset();
			inlet = 1;
			mode(Mode.Single);
			inlet = 2;
			mode(Mode.Mute);
			inlet = 0;
			window.outlet.reset();

			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 60, 127);
			expect(window.outlet.calls.length).toEqual(1);
			window.outlet.reset();

			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 60, 0);
			expect(window.outlet.calls.length).toEqual(1);
			window.outlet.reset();
			bang();
			bang();

			bang();
			expect(window.outlet).toHaveBeenCalledWith(0, 62, 127);
			expect(window.outlet.calls.length).toEqual(1);
			window.outlet.reset();
		});
	});

	describe("Testing live record mode", function() {
		it("Outlet 1 should output correct info when using live record mode", function() {
			settings.length = 0;
			settings.recordPosition = 0;
			spyOn(window, 'outlet');
			inlet = 0;
			note(48);
			expect(window.outlet).toHaveBeenCalledWith(OutletIndex.InfoOut, 'note', 1, 48);
			expect(window.outlet).toHaveBeenCalledWith(OutletIndex.LengthOut, 'length', 1);
			window.outlet.reset();
			note(49);
			expect(window.outlet).toHaveBeenCalledWith(OutletIndex.LengthOut, 'length', 2);
			expect(window.outlet).toHaveBeenCalledWith(OutletIndex.InfoOut, 'note', 2, 49);
			window.outlet.reset();
			note(50);
			expect(window.outlet).toHaveBeenCalledWith(OutletIndex.LengthOut, 'length', 3);
			expect(window.outlet).toHaveBeenCalledWith(OutletIndex.InfoOut, 'note', 3, 50);
			window.outlet.reset();
			note(51);
			expect(window.outlet).toHaveBeenCalledWith(OutletIndex.LengthOut, 'length', 4);
			expect(window.outlet).toHaveBeenCalledWith(OutletIndex.InfoOut, 'note', 4, 51);
			window.outlet.reset();
		});
	});
});
