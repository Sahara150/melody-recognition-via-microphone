import { analyzeMelody, equalAllocAlgorithm, smoothSmallGaps, smoothUndefinedGaps } from "./algorithms/Analyzer";
import { GetBarBorders, GetMusicalBar } from "./algorithms/BeatCorrelator";
import { CalculateFrameNotes } from "./algorithms/Calculator";
import { GetKeyAndModifyNotes } from "./algorithms/KeyRecognizer";
import { WriteToXML } from "./algorithms/XMLWriter";
import { BarBorders, MetricalBar } from "./models/bars";
import { Beat, getAmountOfBeats } from "./models/beats";
import { FrequencyFrames } from "./models/frequencyframes";
import { FrameNote } from "./models/notes";
import { getFrameArray, getRefs, saveFileURL, saveFrameArray } from "./helper/sessionStorageHelper";
import { Key } from "./models/keys";
import { TransposeFundamentalNote } from "./algorithms/Transposer";

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
export function continuePipeline(chosen: string, callbackFunction: (url: string, key: Key) => void, frameSize: number) {
	let chosenAlg: FrameNote[] = getFrameArray(chosen);
	let key = GetKeyAndModifyNotes(chosenAlg);
	let xml = ConvertFrameNotesToXML(chosenAlg, frameSize, key);
	let url = createBlobOfXML(xml);
	callbackFunction(url, key.key);
}
export function transposeFundamental(chosenAlg : string, chosenKey: Key, beforeKey: Key, frameSize: number, callbackFunction: (url: string, key: Key) => void) {
	let chosenAlgo: FrameNote[] = getFrameArray(chosenAlg);
	let key = TransposeFundamentalNote(chosenAlgo, beforeKey.base_note, chosenKey.base_note, chosenKey.mode);
	//Saves the transposed version, so when a rhythm adaption is made afterwards, it doesn�t jump back to the original.
	saveFrameArray(chosenAlgo, chosenAlg);
	let xml = ConvertFrameNotesToXML(chosenAlgo, frameSize, key)
	let url = createBlobOfXML(xml);
	callbackFunction(url, key.key);
}
function ConvertFrameNotesToXML(input: FrameNote[], frameSize: number, key: {fifths: number, key: Key}) : string {
	let metric = getRefs().beat ?? Beat.FourFourths;
	let chosenBeat = getAmountOfBeats(metric);
	let seperatedBars: BarBorders = GetBarBorders(input, chosenBeat, frameSize);
	let metricalBars: MetricalBar[] = [];
	seperatedBars.bars.forEach(element => {
		metricalBars.push(GetMusicalBar(element, metric))
	});
	let xml = WriteToXML(metricalBars, seperatedBars.ties, metric, key.fifths);
	return xml;
}
function createBlobOfXML(input: string) : string{
    let file = new File([input], "musicTest.xml");
	let url = URL.createObjectURL(file);
	saveFileURL(url);
	return url;
}