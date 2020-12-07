import { analyzeMelody, equalAllocAlgorithm, smoothSmallGaps, smoothUndefinedGaps } from "./algorithms/Analyzer";
import { GetBarBorders } from "./algorithms/BeatCorrelator";
import { CalculateFrameNotes } from "./algorithms/Calculator";
import { BarBorders } from "./models/bars";
import { Beat, getAmountOfBeats } from "./models/beats";
import { STANDARD_FRAME_SIZE } from "./models/config";
import { FrequencyFrames } from "./models/frequencyframes";
import { FrameNote } from "./models/notes";
import { getFrameArray, getRefs, saveFrameArray } from "./sessionStorageHelper";

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
	let chosenBeat = getAmountOfBeats(getRefs().beat ?? Beat.FourFourths);
	let seperatedBars: BarBorders = GetBarBorders(chosenAlg, chosenBeat, STANDARD_FRAME_SIZE);
	console.log("Seperated bars: " + JSON.stringify(seperatedBars));
}