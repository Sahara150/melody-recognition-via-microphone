import { analyzeMelody, equalAllocAlgorithm, smoothSmallGaps, smoothUndefinedGaps } from "./Analyzer";
import { CalculateFrameNotes } from "./Calculator";
import { FrequencyFrames } from "./models/frequencyframes";
import { FrameNote } from "./models/notes";
import { getFrameArray, saveFrameArray } from "./sessionStorageHelper";

export function startPipeline(input: number[], refFrequency: number) {
	let summedFrequencies: FrequencyFrames[] = analyzeMelody(input);
	//Execute all three algorithms
	let smoothed: FrequencyFrames[] = smoothSmallGaps(summedFrequencies);
	let unsmoothed: FrequencyFrames[] = smoothUndefinedGaps(summedFrequencies);
	let equalAlloc: FrequencyFrames[] = equalAllocAlgorithm(summedFrequencies);
	let calculatedSmoothed = CalculateFrameNotes(smoothed, refFrequency);
	let calculateUnsmoothed = CalculateFrameNotes(unsmoothed, refFrequency);
	let calculateEqualAlloc = CalculateFrameNotes(equalAlloc, refFrequency);
	//And saving them in sessionStorage.
	saveFrameArray(calculatedSmoothed, "smoothed");
	saveFrameArray(calculateUnsmoothed, "unsmoothed");
	saveFrameArray(calculateEqualAlloc, "equalAlloc");
	//Pausing and waiting for user to choose his best algorithm or restart.
}
export function continuePipeline(chosen: string) {
	let chosenAlg: FrameNote[] = getFrameArray(chosen);
	//Enter into beatCorrelator or produce MIDI
}