// Simplified model of a Roland System 100m sequencer clock
// which is operated by eight sliders.

inlets = 9;
outlets = 2;

var delays = [1,1,1,1,1,1,1,1],
	sequenceLength = delays.length,
	currentSlider = 0,
	currentSliderPosition = 0;

function msg_int(val)
{
	if (arguments.length === 0) return;
	
	if (inlet > 0) {
		delays[inlet - 1] = val;
	} else if (inlet === 0) {
		sequenceLength = ensureRange(val, 1, 8);
	}
}

function bang()
{
	if (inlet !== 0) return;
	
	tick();
}

function ensureRange(val, min, max)
{
	if (val < min) return min;
	if (val > max) return max;
	return val;
}

function reset()
{
	currentSlider = 0;
	resetSliderPosition();
}

function resetSliderPosition()
{
	currentSliderPosition = 0;
}

function tick()
{
	if (currentSliderPosition === 0) {
		outlet(1, currentSlider + 1);
		outlet(0, "bang");
	}
	currentSliderPosition++;
	if (currentSliderPosition >= delays[currentSlider]) {
		tickSlider();
	}
}

function tickSlider()
{
	currentSlider = currentSlider + 1 >= sequenceLength ? 0 : currentSlider + 1;
	resetSliderPosition();
}
