import { getRefs } from "./sessionStorageHelper";

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
		let firstIndex = currentIndex;
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
export class FrequencyFrames {
	frequency: number | undefined;
	amountOfFrames!: number;
	constructor(frequency: number | undefined, amountOfFrames: number) {
		this.frequency = frequency;
		this.amountOfFrames = amountOfFrames;
    }
}