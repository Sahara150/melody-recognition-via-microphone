import { analyzeMelody, equalAllocAlgorithm, smoothSmallGaps, smoothUndefinedGaps } from "./algorithms/Analyzer";
import { getBarBorders, getMusicalBar } from "./algorithms/BeatCorrelator";
import { calculateFrameNotes } from "./algorithms/Calculator";
import { getKeyAndModifyNotes } from "./algorithms/KeyRecognizer";
import { writeToXML } from "./algorithms/XMLWriter";
import { BarBorders, MetricalBar } from "./models/bars";
import { Beat, getAmountOfBeats } from "./models/beats";
import { FrequencyFrames } from "./models/frequencyframes";
import { FrameNote } from "./models/notes";
import { getFrameArray, getRefs, saveFileURL, saveFrameArray } from "./helper/sessionStorageHelper";
import { Key } from "./models/keys";
import { transposeFundamentalNote, transposeMode } from "./algorithms/Transposer";
import { STANDARD_FREQ } from "./models/config";

export function startPipeline(input: number[], refFrequency: number) {
	let summedFrequencies: FrequencyFrames[] = analyzeMelody(input);
	//Execute all three algorithms
	let smoothed: FrequencyFrames[] = smoothSmallGaps(summedFrequencies);
	let unsmoothed: FrequencyFrames[] = smoothUndefinedGaps(summedFrequencies);
	let equalAlloc: FrequencyFrames[] = equalAllocAlgorithm(summedFrequencies);
	let calculatedSmoothed = calculateFrameNotes(smoothed, refFrequency ?? STANDARD_FREQ);
	let calculateUnsmoothed = calculateFrameNotes(unsmoothed, refFrequency ?? STANDARD_FREQ);
	let calculateEqualAlloc = calculateFrameNotes(equalAlloc, refFrequency ?? STANDARD_FREQ);
	//And saving them in sessionStorage.
	saveFrameArray(calculatedSmoothed, "smoothed");
	saveFrameArray(calculateUnsmoothed, "unsmoothed");
	saveFrameArray(calculateEqualAlloc, "equalAlloc");
	//Pausing and waiting for user to choose his best algorithm or restart.
}
export function continuePipeline(chosen: string, callbackFunction: (url: string, key: Key) => void, frameSize: number) {
	let chosenAlg: FrameNote[] = getFrameArray(chosen);
	let key = getKeyAndModifyNotes(chosenAlg);
	let xml = convertFrameNotesToXML(chosenAlg, frameSize, key);
	let url = createBlobOfXML(xml);
	callbackFunction(url, key.key);
}
export function transpose(chosenAlg : string, chosenKey: Key, beforeKey: Key, frameSize: number, callbackFunction: (url: string, key: Key) => void) {
	let chosenAlgo: FrameNote[] = getFrameArray(chosenAlg);
	let key = transposeFundamentalNote(chosenAlgo, beforeKey.base_note, chosenKey.base_note, beforeKey.mode);
	key = transposeMode(chosenAlgo, beforeKey.mode, chosenKey.mode, chosenKey.base_note);
	//Saves the transposed version, so when a rhythm adaption is made afterwards, it doesn�t jump back to the original.
	saveFrameArray(chosenAlgo, chosenAlg);
	let xml = convertFrameNotesToXML(chosenAlgo, frameSize, key)
	let url = createBlobOfXML(xml);
	callbackFunction(url, key.key);
}
function convertFrameNotesToXML(input: FrameNote[], frameSize: number, key: {fifths: number, key: Key}) : string {
	let metric = getRefs().beat ?? Beat.FourFourths;
	let chosenBeat = getAmountOfBeats(metric);
	let seperatedBars: BarBorders = getBarBorders(input, chosenBeat, frameSize);
	let metricalBars: MetricalBar[] = [];
	seperatedBars.bars.forEach(element => {
		metricalBars.push(getMusicalBar(element, metric))
	});
	let xml = writeToXML(metricalBars, seperatedBars.ties, metric, key.fifths);
	return xml;
}
function createBlobOfXML(input: string) : string{
    let file = new File([input], "musicTest.xml");
	let url = URL.createObjectURL(file);
	saveFileURL(url);
	return url;
}