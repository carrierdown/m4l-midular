describe("noteclock tests", function() {

	it("reset should reset time-related variables", function() {
		reset();
		expect(currentSlider).toBe(0);
		expect(currentSliderPosition).toBe(0);
	});

	describe("When sending in bang(s) from a reset state", function() {

		beforeEach(function() {
			spyOn(window, 'outlet');
			inlet = 0;
			delays = [1,1,1,1,1,1,1,1];
			sequenceLength = delays.length;
			reset();
		});

		it("should advance the slider forward one step, and sound a note", function() {
			bang();
			expect(window.outlet).toHaveBeenCalledWith(1, 1);
			expect(window.outlet).toHaveBeenCalledWith(0, "bang");			
			expect(window.outlet.calls.length).toEqual(2);
			expect(currentSlider).toEqual(1);
			expect(currentSliderPosition).toEqual(0);
		});

		it("should wrap to zero after eight bangs", function() {
			bang();
			bang();
			bang();
			bang();
			bang();
			bang();
			bang();
			expect(currentSlider).toEqual(7);
			bang();
			expect(currentSlider).toEqual(0);
		});

		it("should emit a note, then wait 4 ticks before emitting the next note when length of the first step is set to 4", function() {
			delays[0] = 4;
			bang();
			expect(window.outlet).toHaveBeenCalledWith(1, 1);
			expect(window.outlet).toHaveBeenCalledWith(0, "bang");		
			bang();
			bang();
			bang();
			bang();
			expect(window.outlet).toHaveBeenCalledWith(1, 2);
			expect(window.outlet).toHaveBeenCalledWith(0, "bang");
			expect(window.outlet.calls.length).toEqual(4);
		});

		it("should emit a note on each tick when delay of first step is set to 1, sequence length is set to 1, and the rest of the delays are set larger than 1", function() {
			delays = [1,8,8,8,8,8,8,8];
			sequenceLength = 1;
			for (var i = 0; i < 8; i++) {
				bang();
				expect(window.outlet).toHaveBeenCalledWith(0, "bang");
			}
		});
	});
});
