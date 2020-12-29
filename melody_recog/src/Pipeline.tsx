import { analyzeMelody, equalAllocAlgorithm, smoothSmallGaps, smoothUndefinedGaps } from "./algorithms/Analyzer";
import { GetBarBorders, GetMusicalBar } from "./algorithms/BeatCorrelator";
import { CalculateFrameNotes } from "./algorithms/Calculator";
import { GetKeyAndModifyNotes } from "./algorithms/KeyRecognizer";
import { WriteToXML } from "./algorithms/XMLWriter";
import { BarBorders, MetricalBar } from "./models/bars";
import { Beat, getAmountOfBeats } from "./models/beats";
import { STANDARD_FRAME_SIZE } from "./models/config";
import { FrequencyFrames } from "./models/frequencyframes";
import { FrameNote } from "./models/notes";
import { getFrameArray, getRefs, saveFileURL, saveFrameArray } from "./sessionStorageHelper";

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
export function continuePipeline(chosen: string, callbackFunction: (url: string) => void, frameSize: number) {
    let chosenAlg: FrameNote[] = getFrameArray(chosen);
    console.log("Testinput: " + JSON.stringify(chosenAlg));
	let metric = getRefs().beat ?? Beat.FourFourths;
	let chosenBeat = getAmountOfBeats(metric);
	let seperatedBars: BarBorders = GetBarBorders(chosenAlg, chosenBeat, frameSize);
	let metricalBars: MetricalBar[] = [];
	seperatedBars.bars.forEach(element => {
		metricalBars.push(GetMusicalBar(element, metric))		
	});
	let key = GetKeyAndModifyNotes(metricalBars.flatMap(val => val.notes));
    let xml = WriteToXML(metricalBars, seperatedBars.ties, metric, key.fifths);
	let url = createBlobOfXML(xml);
	callbackFunction(url);
}
function createBlobOfXML(input: string) : string{
    let file = new File([input], "musicTest.xml");
	let url = URL.createObjectURL(file);
	saveFileURL(url);
	return url;
}