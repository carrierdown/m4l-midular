describe("buffer tests", function() {

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

	describe("When sending in a set of note values, followed by several trigger (next) messages", function() {
		beforeEach(function() {
			var notes = [36, 38, 40];
			spyOn(window, 'outlet');

			inlet = 0;
			for (var i = 0; i < notes.length; i++) {
				msg_int(notes[i]);
			}
		});

		afterEach(function() {
			inlet = 0;
			clear();
		});

		it("should output an updated length each time a value is stored", function() {
			expect(window.outlet).toHaveBeenCalledWith(2, 1);
			expect(window.outlet).toHaveBeenCalledWith(2, 2);
			expect(window.outlet).toHaveBeenCalledWith(2, 3);
		});

		it("should not store duplicates of the same note value", function() {
			// set play mode to up (0)
			inlet = 1;
			msg_int(0);

			window.outlet.reset();
			inlet = 0;
			msg_int(40);
			expect(window.outlet).not.toHaveBeenCalledWith(1, 4);
		});

		it("should play back the notes as received when playmode is set to -UP-", function() {
			// set play mode to up (0)
			inlet = 1;
			msg_int(0);

			window.outlet.reset();
			inlet = 0;
			next();
			expect(window.outlet).toHaveBeenCalledWith(0, 36);
			window.outlet.reset();
			next();
			expect(window.outlet).toHaveBeenCalledWith(0, 38);
			window.outlet.reset();
			next();
			expect(window.outlet).toHaveBeenCalledWith(0, 40);
			window.outlet.reset();
			next();
			expect(window.outlet).toHaveBeenCalledWith(0, 36);
		});

		it("should play back the notes in reverse order when playmode is set to -DOWN-", function() {
			// set play mode to down (1)
			inlet = 1;
			msg_int(1);

			window.outlet.reset();
			inlet = 0;
			next();
			expect(window.outlet).toHaveBeenCalledWith(0, 36);
			window.outlet.reset();
			next();
			expect(window.outlet).toHaveBeenCalledWith(0, 40);
			window.outlet.reset();
			next();
			expect(window.outlet).toHaveBeenCalledWith(0, 38);
			window.outlet.reset();
			next();
			expect(window.outlet).toHaveBeenCalledWith(0, 36);
		});

		it("should play back the notes in normal order and then reversed when playmode is set to -UP/DOWN-", function() {
			// set play mode to up/down (2)
			inlet = 1;
			msg_int(2);

			window.outlet.reset();
			inlet = 0;
			next();
			expect(window.outlet).toHaveBeenCalledWith(0, 36);
			window.outlet.reset();
			next();
			expect(window.outlet).toHaveBeenCalledWith(0, 38);
			window.outlet.reset();
			next();
			expect(window.outlet).toHaveBeenCalledWith(0, 40);
			window.outlet.reset();
			next();
			expect(window.outlet).toHaveBeenCalledWith(0, 38);
			window.outlet.reset();
			next();
			expect(window.outlet).toHaveBeenCalledWith(0, 36);
			window.outlet.reset();
			next();
			expect(window.outlet).toHaveBeenCalledWith(0, 38);
		});

		it("should play back notes when playmode is set to -RANDOM-", function() {
			// set play mode to random (3)
			inlet = 1;
			msg_int(3);

			window.outlet.reset();
			inlet = 0;
			next();
			expect(window.outlet).toHaveBeenCalled();
			window.outlet.reset();
			next();
			expect(window.outlet).toHaveBeenCalled();
			window.outlet.reset();
			next();
			expect(window.outlet).toHaveBeenCalled();
			window.outlet.reset();
			next();
			expect(window.outlet).toHaveBeenCalled();
			window.outlet.reset();
			next();
			expect(window.outlet).toHaveBeenCalled();
		});
	});

	describe("When sending in over 100 note values", function() {
		beforeEach(function() {
			spyOn(window, 'outlet');

			inlet = 0;
			for (var i = 0; i < 120; i++) {
				msg_int(i);
			}
		});

		it("the buffer will stop storing notes at length 100", function() {
			expect(window.outlet).not.toHaveBeenCalledWith(2, 101);
			expect(window.outlet).toHaveBeenCalledWith(2, 100);
		});
	});
});
