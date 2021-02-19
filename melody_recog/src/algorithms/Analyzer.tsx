import { Beat } from "../models/beats";
import { getFrameTreshold, SMOOTHING_TRESHOLD } from "../models/config";
import { FrequencyFrames } from "../models/frequencyframes";
import { getRefs } from "../helper/sessionStorageHelper";


//TODO: Check, if it really is a nice thing to create that dependency
const FREQUENCY = getRefs().frequency ?? 0;
const FREQUENCY_TRESHOLD = FREQUENCY / 40.0;
const BEAT = getRefs().beat ?? Beat.FourFourths;
const FRAME_TRESHOLD = getFrameTreshold(BEAT);

export function analyzeMelody(input: number[]) : FrequencyFrames[]{
	let firstDefined = getFirstDefined(input);
	let lastDefined = getLastDefined(input);
	if (firstDefined === lastDefined) {
		console.log("Nichts eingesungen.");
		return [];
	} else if (lastDefined > firstDefined) {
		input = input.slice(firstDefined, lastDefined + 1);
		let sumMinorFluctuations: FrequencyFrames[] = sumMinorMovements(input);
		console.log(sumMinorFluctuations);
		return sumMinorFluctuations;
	} 
	return [];
}

function getFirstDefined(input: number[]) : number {
	for (let i = 0; i < input.length; i++) {
		if (input[i] !== undefined) {
			return i;
        }
	}
	return input.length-1;
}
function getLastDefined(input: number[]) : number {
	for (let i = input.length - 1; i >= 0; i--) {
		if (input[i] !== undefined) {
			return i;
        }
	}
	return input.length - 1;
}
function sumMinorMovements(input: number[]): FrequencyFrames[]{
	let currentIndex = 0;
	let referenceFrequency = getRefs().frequency ?? 0;
	let result : FrequencyFrames[] = [];
	for (currentIndex; currentIndex < input.length; currentIndex++) {
		let firstNum = input[currentIndex];
		let sumOfNums = input[currentIndex];
		let amountOfFrames = 1;
		let averageNum : number | undefined = firstNum;
		while (currentIndex < input.length - 1 && ((averageNum === undefined && input[currentIndex + 1] === undefined) || Math.abs(input[currentIndex + 1] - averageNum!) < (referenceFrequency / 100.0))) {
			currentIndex++;
			amountOfFrames++;
			if (input[currentIndex] !== undefined) {
				sumOfNums += input[currentIndex];
			}
			averageNum = sumOfNums === undefined ? undefined : sumOfNums / amountOfFrames;
		}
		let frequencyFrame = new FrequencyFrames(averageNum, amountOfFrames);
		result.push(frequencyFrame);
    }
	return result;
}
export function smoothSmallGaps(frames : FrequencyFrames[]) : FrequencyFrames[] {
	let result : FrequencyFrames[] = [];
	for (let i = 0; i < frames.length; i++) {
		if (noteTooSmallForRelevance(frames[i].amountOfFrames, frames[i].frequency)) {
			//If last saved as relevant note exists
			if (result.length > 0) {
				if (couldAddToLastOne(frames[i].frequency, result[result.length - 1].frequency))
				{
					//just add it to the last frame
					result[result.length - 1].amountOfFrames += frames[i].amountOfFrames;
					continue;
				} 
			}
			//If this is reached, above case decided not to add it to the last frame.
			if (i < frames.length - 1) {
				if (couldAddToNextOne(frames[i].frequency, frames[i+1].amountOfFrames, frames[i+1].frequency)) {
					//add this frames amount to the next one
					frames[i + 1].amountOfFrames += frames[i].amountOfFrames;
					continue;
					//If the next frame is not getting any more relevant, even if I add this one
				} else if (doesntChangeRelevanceOfNextOne(frames[i].amountOfFrames, frames[i+1].amountOfFrames, frames[i+1].frequency)) {
					let firstFreq = frames[i].frequency!;
					let nextFreq = frames[i + 1].frequency!;
					while (firstFreq / nextFreq > 2.0) {
						firstFreq /= 2;
					}
					frames[i+1].frequency = (nextFreq + firstFreq)/2.0
					continue;
                }
			}
			if (result.length > 0) {
				result[result.length - 1].amountOfFrames += frames[i].amountOfFrames;
				continue;
            }
		}
		//If this is reached, it is big enough to not be smoothed
		result.push(frames[i]);
	}
	return result;
}

export function smoothUndefinedGaps(frames: FrequencyFrames[]): FrequencyFrames[] {
	let result: FrequencyFrames[] = [];
	for (let i = 0; i < frames.length; i++) {
		if (frames[i].amountOfFrames < FRAME_TRESHOLD && frames[i].frequency === undefined) {
			//If last saved as relevant note exists
			if (result.length > 0) {
				//just add it to the last frame
				result[result.length - 1].amountOfFrames += frames[i].amountOfFrames;
			} else {
				//add this frames amount to the next one
				frames[i + 1].amountOfFrames += frames[i].amountOfFrames;
			}
		} else {
			result.push(frames[i]);
        }
	}
	return result;
}
export function equalAllocAlgorithm(frames: FrequencyFrames[]): FrequencyFrames[] {
	frames = smoothUndefinedGaps(frames);
	let relevantFrames: FrequencyFrames[] = [];
	let amountOfFrames = 0;
	for (let i = 0; i < frames.length; i++) {
		if (frames[i].amountOfFrames > FRAME_TRESHOLD) {
			let frame = frames[i];
			if (relevantFrames.length === 0) {
				frame.amountOfFrames += amountOfFrames;
				amountOfFrames = 0;
				relevantFrames.push(frame);
			} else {
				frame.amountOfFrames += amountOfFrames / 2;
				relevantFrames[relevantFrames.length - 1].amountOfFrames += amountOfFrames / 2;
				amountOfFrames = 0;
				relevantFrames.push(frame);
			}
		} else {
			amountOfFrames += frames[i].amountOfFrames;
        }
    }
	return relevantFrames;
}
function noteTooSmallForRelevance(amountOfFrames: number, frequency: number | undefined): boolean {
	return amountOfFrames < SMOOTHING_TRESHOLD || (frequency === undefined && amountOfFrames < FRAME_TRESHOLD)
}
function couldAddToLastOne(currFrequency: number | undefined, lastFrequency: number | undefined): boolean {
	//If this frame is some minor undefinement
	return currFrequency === undefined
	//or if this frames frequency is kinda cool with the last relevant ones
	|| (lastFrequency !== undefined && Math.abs(lastFrequency! - currFrequency!) < FREQUENCY_TRESHOLD);
}
function couldAddToNextOne(currFrequency: number | undefined, nextAmountOfFrames: number, nextFrequency: number | undefined): boolean {
	//If the frame is some minor undefinement and the next frame is not a loner anyway
	return (currFrequency === undefined && nextAmountOfFrames > SMOOTHING_TRESHOLD)
		//or if the next frame is relevant
		|| (nextAmountOfFrames > SMOOTHING_TRESHOLD && nextFrequency !== undefined);
}
function doesntChangeRelevanceOfNextOne(currAmountOfFrames: number, nextAmountOfFrames: number, nextFrequency: number | undefined): boolean {
	return (nextAmountOfFrames + currAmountOfFrames < FRAME_TRESHOLD && nextFrequency !== undefined)
}