import { ConvertFlatsToSharps, ConvertSharpsToFlats } from "../helper/enharmonicAmbiguity";
import { SCALE } from "../models/calculationData";
import { CIRCLE_OF_FIFTHS, CIRCLE_SIZE, FLATS, Key, MAJOR_KEY_SHIFT, MINOR_KEY_SHIFT, Mode, SHARPS } from "../models/keys";
import { FrameNote, Note, Sign, SignedNote } from "../models/notes";

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
        let signArray = key < 0 ? FLATS.slice(0, Math.abs(key)) : SHARPS.slice(0, key);
        ConvertSharpsToFlats(input, signArray);
    }
    return { fifths: key, key: new Key(newBase, mode) };
}
export function TransposeMode(input: FrameNote[]) {

}
export function MoveOctave(input: FrameNote[], octaves: number) {
    input.forEach(val => val.octave += octaves);
}