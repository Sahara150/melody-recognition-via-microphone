import { ConvertFlatsToSharps, ConvertSharpsToFlats } from "../helper/enharmonicAmbiguity";
import { SCALE } from "../models/calculationData";
import { CIRCLE_OF_FIFTHS, CIRCLE_SIZE, FLATS, Key, MAJOR_KEY_SHIFT, MINOR_KEY_SHIFT, Mode, SHARPS } from "../models/keys";
import { FrameNote, Note, Sign, SignedNote } from "../models/notes";

const THIRD_HALF_STEPS = 3;
const SIXTH_HALF_STEPS = 8;
const SEPT_HALF_STEPS = 10;

export function TransposeFundamentalNote(input: FrameNote[], prevBase: SignedNote, newBase: SignedNote, mode: Mode): { fifths: number, key: Key }{
    let halfSteps = SCALE.findIndex(val => val.equals(newBase)) - SCALE.findIndex(val => val.equals(prevBase));
    if (input.some(note => note.value.sign == Sign.FLAT)) {
        ConvertFlatsToSharps(input);
    }
    input
    .filter(val => val.value.value != Note.BREAK)
    .forEach(val => {
        let wasLowerThanC = val.value.value < Note.C;
        let newIndex = SCALE.findIndex(note => note.equals(val.value)) + halfSteps
        val.value = SCALE[(newIndex + SCALE.length)%SCALE.length]
        let isHigherThanC = val.value.value >= Note.C;
        //if it passed the octave border of C, octave has to be increased
        if(wasLowerThanC && isHigherThanC && halfSteps > 0) {
            val.octave++;
        //if the melody got transposed to a lower melody and the note passed the octave border
        //octave has to be decreased
        } else if(!wasLowerThanC && !isHigherThanC && halfSteps < 0) {
            val.octave--;
        //if the melody got transposed to a higher and it was above C before,
        //but passed it again cause it got shifted that far
        //or if it was below C before, but got below again, cause it 
        //got shifted that far, the octave also needs to be increased
        } else if((wasLowerThanC != isHigherThanC) && newIndex >= SCALE.length) {
            val.octave++;
        //if the melody got transposed to a lower and it was above C before,
        //but passed it again cause it got shifted that far, the octave also needs to be decreased
        } else if(!wasLowerThanC && isHigherThanC && newIndex < 0) {
            val.octave--;
        }
    });
    let index = CIRCLE_OF_FIFTHS.findIndex(val => val.equals(newBase));
    let key = mode == Mode.MINOR ? (index - MINOR_KEY_SHIFT) : ((index < CIRCLE_SIZE ? index - MAJOR_KEY_SHIFT : index - CIRCLE_OF_FIFTHS.length - MAJOR_KEY_SHIFT));
    if (key < 0) {
        let signArray = FLATS.slice(0, Math.abs(key));
        ConvertSharpsToFlats(input, signArray);
    }
    return { fifths: key, key: new Key(newBase, mode) };
}
export function TransposeMode(input: FrameNote[], prevMode: Mode, currMode: Mode, baseNote: SignedNote): { fifths: number, key: Key } {
    if (prevMode == currMode) {
        let key = new Key(baseNote, currMode);
        let index = CIRCLE_OF_FIFTHS.findIndex(val => val.equals(baseNote));
        let fifths = currMode == Mode.MINOR ? (index - MINOR_KEY_SHIFT) : ((index < CIRCLE_SIZE ? index - MAJOR_KEY_SHIFT : index - CIRCLE_OF_FIFTHS.length - MAJOR_KEY_SHIFT));
        return { fifths: fifths, key: key };
    } else {
        let index = SCALE.findIndex(val => val.equals(baseNote));
        if (input.some(note => note.value.sign == Sign.FLAT)) {
            ConvertFlatsToSharps(input);
        }
        let addOn = currMode == Mode.MAJOR? 0 : 1
        let third = SCALE[(index + THIRD_HALF_STEPS + addOn) % SCALE.length];
        let sixth = SCALE[(index + SIXTH_HALF_STEPS + addOn) % SCALE.length];
        let sept = SCALE[(index + SEPT_HALF_STEPS + addOn) % SCALE.length];
        input.filter(val => val.value.value != Note.BREAK)
            .forEach(val => {
                if (val.value.equals(third) || val.value.equals(sixth) || val.value.equals(sept)) {
                    //Knowing that we are increasing the notes by a halfsteps,
                    //this note and only this will change into a higher octave
                    if (val.value.value == Note.B && currMode == Mode.MAJOR) {
                        val.octave++;
                    //Knowing that we are decreasing the notes by a halfsteps,
                    //this note and only this will change into a lower octave
                    } else if (val.value.value == Note.C && currMode == Mode.MINOR) {
                        val.octave--;
                    }
                    let currIndex = SCALE.findIndex(note => note.equals(val.value));
                    let change = currMode == Mode.MAJOR ? 1 : -1;
                    val.value = SCALE[(currIndex + change) % SCALE.length];
                }
            });
        let circleIndex = CIRCLE_OF_FIFTHS.findIndex(val => val.equals(baseNote));
        let fifths = currMode == Mode.MINOR ? (circleIndex - MINOR_KEY_SHIFT) : ((circleIndex < CIRCLE_SIZE ? circleIndex - MAJOR_KEY_SHIFT : circleIndex - CIRCLE_OF_FIFTHS.length - MAJOR_KEY_SHIFT));
        if (fifths < 0) {
            let signArray = FLATS.slice(0, Math.abs(fifths))
            ConvertSharpsToFlats(input, signArray);
        }
        return { fifths: fifths, key: new Key(baseNote, currMode) };
    }
}
export function MoveOctave(input: FrameNote[], octaves: number) {
    input.forEach(val => val.octave += octaves);
}