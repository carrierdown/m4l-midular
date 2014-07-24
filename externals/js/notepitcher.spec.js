describe("notepitcher tests", function() {

	/*
		Inlets: 
			0: note pitch, note velocity (list)
			1: pitch (int)

		Outlets:
			0: note pitch, note velocity (list)
	*/

	describe("When sending in a note on", function() {
		beforeEach(function() {
			activeNotes = [];
			spyOn(window, 'outlet');

			inlet = 0;
			list(36, 127); // note on
		});

		it("should generate a note on for the initial note", function() {
			expect(window.outlet).toHaveBeenCalledWith(0, 36, 127);
		});

		it("should, upon receiving a new pitch value, generate a note off for the initial note and a note on for the new note (initial note with new pitch added)", function() {
			inlet = 1;
			msg_int(4);
			expect(window.outlet).toHaveBeenCalledWith(0, 36, 0);
			expect(window.outlet).toHaveBeenCalledWith(0, 40, 127);
		});

		it("should, upon receiving a note off (for the initial note), generate a note off for the new note (initial note with new pitch added)", function() {
			inlet = 1;
			msg_int(4);
			inlet = 0;
			list(36, 0); // note off
			expect(window.outlet).toHaveBeenCalledWith(0, 40, 0);
		});

		it("should ignore a second note with the same pitch", function() {
			window.outlet.reset();
			list(36, 120); // note on, different velocity
			expect(window.outlet.calls.length).toEqual(0);
		});
	});

	describe("When sending in a note on and the pitch value is set to something other than 0", function() {
		beforeEach(function() {
			activeNotes = [];
			spyOn(window, 'outlet');

			inlet = 1;
			msg_int(10); // pitch setting
			inlet = 0;
			list(36, 127); // note on
		});

		it("should take into account the current pitch setting when generating the initial note", function() {
			expect(window.outlet).toHaveBeenCalledWith(0, 46, 127);
			expect(window.outlet.calls.length).toEqual(1);
		});

		it("should generate a correct final note off when the pitch value is changed during the notes playtime", function() {
			inlet = 1;
			msg_int(-1); // pitch setting
			expect(window.outlet).toHaveBeenCalledWith(0, 46, 0);
			expect(window.outlet).toHaveBeenCalledWith(0, 35, 127);
			inlet = 0;
			list(36, 0); // note off
			expect(window.outlet).toHaveBeenCalledWith(0, 35, 0);
		});
	});
});
