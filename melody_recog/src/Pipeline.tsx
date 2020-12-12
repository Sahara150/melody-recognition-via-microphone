import { analyzeMelody, equalAllocAlgorithm, smoothSmallGaps, smoothUndefinedGaps } from "./algorithms/Analyzer";
import { GetBarBorders, GetMusicalBar } from "./algorithms/BeatCorrelator";
import { CalculateFrameNotes } from "./algorithms/Calculator";
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
export function continuePipeline(chosen: string, callbackFunction: (url: string) => void) {
	let chosenAlg: FrameNote[] = getFrameArray(chosen);
	let metric = getRefs().beat ?? Beat.FourFourths;
	let chosenBeat = getAmountOfBeats(metric);
	let seperatedBars: BarBorders = GetBarBorders(chosenAlg, chosenBeat, STANDARD_FRAME_SIZE);
	let metricalBars: MetricalBar[] = [];
	seperatedBars.bars.forEach(element => {
		metricalBars.push(GetMusicalBar(element, metric))		
	});
	let url = createBlobOfSample();
	callbackFunction(url);
}
function createBlobOfSample() : string{
    let file = new File(["<?xml version=\"1.0\" standalone=\"no\"?>" +  
        "<score-partwise>" +
            "<part-list>" +
                "<score-part id=\"P1\">" +
                    "<part-name>Voice</part-name>" +
                "</score-part>" +
            "</part-list>" +
            "<part id=\"P1\">" +
                "<measure number=\"0\" implicit=\"yes\">" +
                    "<attributes>" +
                        "<divisions>4</divisions> " +
                        "<key> " +
                            "<fifths>-3</fifths>" +
                            "<mode>major</mode>" +
                        "</key>" +
                        "<time>" +
                            "<beats>2</beats>" +
                            "<beat-type>4</beat-type>" +
                        "</time>" +
                        "<clef>" + 
                            "<sign>G</sign>" +
                            "<line>2</line>" +
                        "</clef>" +
                    "</attributes>" +
                    "<note>" +
                        "<pitch><step>G</step><octave>4</octave></pitch><duration>2</duration><type>eighth</type><stem>up</stem><notations><dynamics><p /></dynamics></notations><lyric><syllabic>single</syllabic><text>W&auml;rst</text></lyric></note>" +
                "</measure>" +
              "</part>" +
        "</score-partwise>"], "musicTest.xml");
	let url = URL.createObjectURL(file);
	saveFileURL(url);
	return url;
}