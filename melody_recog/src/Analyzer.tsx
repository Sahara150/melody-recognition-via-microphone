import { getRefs } from "./sessionStorageHelper";

const FRAME_TRESHOLD = 15;
const FREQUENCY = getRefs().frequency ?? 0;
const FREQUENCY_TRESHOLD = FREQUENCY / 40.0;

export function analyzeMelody(input: number[]) {
	let firstDefined = getFirstDefined(input);
	let lastDefined = getLastDefined(input);
	if (firstDefined == lastDefined) {
		console.log("Nichts eingesungen.");
		return;
	} else if (lastDefined > firstDefined) {
		input = input.slice(firstDefined, lastDefined + 1);
		let sumMinorFluctuations: FrequencyFrames[] = sumMinorMovements(input);
		console.log(sumMinorFluctuations);
		let smoothed : FrequencyFrames[] = smoothSmallGaps(sumMinorFluctuations);
		console.log("The smoothed result: ");
		console.log(smoothed);
    }
}

function getFirstDefined(input: number[]) : number {
	for (let i = 0; i < input.length; i++) {
		if (input[i] != undefined) {
			return i;
        }
	}
	return input.length-1;
}
function getLastDefined(input: number[]) : number {
	for (let i = input.length - 1; i >= 0; i--) {
		if (input[i] != undefined) {
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
		while (currentIndex < input.length - 1 && ((averageNum == undefined && input[currentIndex + 1] == undefined) || Math.abs(input[currentIndex + 1] - averageNum!) < (referenceFrequency / 100.0))) {
			currentIndex++;
			amountOfFrames++;
			if (input[currentIndex] != undefined) {
				sumOfNums += input[currentIndex];
			}
			averageNum = sumOfNums == undefined ? undefined : sumOfNums / amountOfFrames;
		}
		let frequencyFrame = new FrequencyFrames(averageNum, amountOfFrames);
		result.push(frequencyFrame);
    }
	return result;
}
function smoothSmallGaps(frames : FrequencyFrames[]) : FrequencyFrames[] {
	let result : FrequencyFrames[] = [];
	for (let i = 0; i < frames.length; i++) {
		if (frames[i].amountOfFrames < FRAME_TRESHOLD) {
			//If last saved as relevant note exists
			if (result.length > 0) {
				//And this frame is some minor undefinement
				if (frames[i].frequency == undefined
					//or if this frames frequency is kinda cool with the last relevant ones
					|| (result[result.length - 1].frequency != undefined && Math.abs(result[result.length - 1].frequency! - frames[i].frequency!) < FREQUENCY_TRESHOLD)) {
					//just add it to the last frame
					result[result.length - 1].amountOfFrames += frames[i].amountOfFrames;
					continue;
				} 
			}
			//If this is reached, above case decided not to add it to the last frame.
			if (i < frames.length - 1) {
				//If the frame is some minor undefinement and the next frame is relevant anyway
				if ((frames[i].frequency == undefined && frames[i + 1].amountOfFrames > FRAME_TRESHOLD)
					//or if the next frame is relevant and kinda fits the frequency level
					|| (frames[i + 1].amountOfFrames > FRAME_TRESHOLD && frames[i+1]!=undefined && Math.abs(frames[i+1].frequency!-frames[i].frequency!)<FREQUENCY_TRESHOLD)) {
					//add this frames amount to the next one
					frames[i + 1].amountOfFrames += frames[i].amountOfFrames;
					continue;
					//If the next frame is not getting any more relevant, even if I add this one
				} else if (frames[i + 1].amountOfFrames + frames[i].amountOfFrames < FRAME_TRESHOLD && frames[i+1].frequency!=undefined) {
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
		//If this is reached, it is relevant
		result.push(frames[i]);
	}
	return result;
}
export class FrequencyFrames {
	frequency: number | undefined;
	amountOfFrames!: number;
	constructor(frequency: number | undefined, amountOfFrames: number) {
		this.frequency = frequency;
		this.amountOfFrames = amountOfFrames;
    }
}