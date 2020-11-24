import { analyzeMelody } from "./Analyzer";
import { CalculateFrameNotes } from "./Calculator";

export function startPipeline(input: number[]) {
    let summedFrequencies = analyzeMelody(input);
    let frameNotes = CalculateFrameNotes(summedFrequencies);
}