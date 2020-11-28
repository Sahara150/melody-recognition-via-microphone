import { FrequencyFrames } from "./Analyzer";
import { FrameNote, Note, Sign, SignedNote } from "./notes";

export const LOG_2 = Math.log(2);
export const SCALE = [
    new SignedNote(Note.A, Sign.NONE),
    new SignedNote(Note.A, Sign.SHARP),
    new SignedNote(Note.B, Sign.NONE),
    new SignedNote(Note.C, Sign.NONE),
    new SignedNote(Note.C, Sign.SHARP),
    new SignedNote(Note.D, Sign.NONE),
    new SignedNote(Note.D, Sign.SHARP),
    new SignedNote(Note.E, Sign.NONE),
    new SignedNote(Note.F, Sign.NONE),
    new SignedNote(Note.F, Sign.SHARP),
    new SignedNote(Note.G, Sign.NONE),
    new SignedNote(Note.G, Sign.SHARP)]
export function CalculateFrameNotes(input: FrequencyFrames[], refFreq: number) : FrameNote[] {
    let frameNotes: FrameNote[] = [];
    for (let i = 0; i < input.length; i++) {
        if (input[i].frequency == undefined) {
            if (frameNotes.length > 0 && frameNotes[frameNotes.length - 1].value.value == Note.BREAK) {
                frameNotes[frameNotes.length - 1].frames += input[i].amountOfFrames;
            } else {
                let note = new FrameNote(0, input[i].amountOfFrames, new SignedNote(Note.BREAK, Sign.NONE));
                frameNotes.push(note);
            }
        } else {
            let diff = input[i].frequency! / refFreq;
            let halfTones = 12 * Math.log(diff) / LOG_2;
            let octaves: number;
            let value: SignedNote;
            let noOctaves = mathematicallyCorrectModulo(halfTones, 12); //Always positive number, due to mathematically correct modulo in negative range works suitable.
            octaves = ((halfTones - noOctaves) / 12) + 4; // Because A already is in the fourth octave
            value = getMusicalValue(noOctaves);
            //This happens, because the octave doesn´t start with A, but with C, so in above case the amount of octaves said is one too low for all notes above C.
            if (value.value >= Note.C) {
                octaves++;
            }
            //Checks if before frameNote has same value, and if so, adds itself to it
            if (frameNotes.length > 0 && frameNotes[frameNotes.length - 1].octave == octaves && frameNotes[frameNotes.length - 1].value.equals(value)) {
                frameNotes[frameNotes.length - 1].frames += input[i].amountOfFrames;
            } else {
                let note = new FrameNote(octaves, input[i].amountOfFrames, value);
                frameNotes.push(note);
            }
        }
    }
    return frameNotes;
}
//First all notes are described with none or sharp. Flats are used, when the calculator identifies a corresponding key.
//Therefore also the signs exist instead of adding enharmonic ambiguity notes in the noteEnum.
function getMusicalValue(halfTones: number): SignedNote {
    return SCALE[Math.round(halfTones)%12]
}
function mathematicallyCorrectModulo(dividend: number, divisor: number) {
    if (dividend >= 0) {
        return dividend % divisor;
    } else {
        let a = Math.floor(-dividend / divisor) + 1;
        return (a * divisor) + dividend;
    }
}