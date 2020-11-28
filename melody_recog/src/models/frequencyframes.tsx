export class FrequencyFrames {
	frequency: number | undefined;
	amountOfFrames!: number;
	constructor(frequency: number | undefined, amountOfFrames: number) {
		this.frequency = frequency;
		this.amountOfFrames = amountOfFrames;
	}
}