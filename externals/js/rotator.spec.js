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
		1: length of sequence when updated
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
			dump(settings.delays);
		});

		it("Default play mode (single) should output note at the start of each step followed by note off on the next step", function() {
			expect(window.outlet).toHaveBeenCalledWith(1, 1);
			expect(window.outlet).toHaveBeenCalledWith(1, 2);
			expect(window.outlet).toHaveBeenCalledWith(1, 3);
			expect(window.outlet).toHaveBeenCalledWith(1, 4);
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
	});
});
