//In most music the key is mainly defined by the last note/chord of a piece.
//Therefore the key recognizer assumes, the last note fits the key and checks,
//if the notes correlate more with minor or major key.

import { CIRCLE_OF_FIFTHS, CIRCLE_SIZE, ENHARMONIC_AMBIGUITY_AFTER, ENHARMONIC_AMBIGUITY_BEFORE, FLATS, Key, MAJOR_KEY_SHIFT, MINOR_KEY_SHIFT, Mode, SHARPS } from "../models/keys";
import { MetricalNote } from "../models/metric";
import { Note, Sign } from "../models/notes";

//TODO: Find a solution for the Single-Responsibility-Problem here.
export function GetKeyAndModifyNotes(input: MetricalNote[]): { fifths: number, key: Key } {
    let breaksExcluded = input.filter(val => val.note.value != Note.BREAK);
    let baseNote = breaksExcluded[breaksExcluded.length - 1];
    let index = CIRCLE_OF_FIFTHS.findIndex(val => val.equals(baseNote.note));
    let minorKey = index - MINOR_KEY_SHIFT;
    let majorKey = index % CIRCLE_SIZE - MAJOR_KEY_SHIFT;
    let minorArray = minorKey < 0 ? FLATS.slice(0, Math.abs(minorKey)) : SHARPS.slice(0, minorKey);
    let majorArray = majorKey < 0 ? FLATS.slice(0, Math.abs(majorKey)) : SHARPS.slice(0, majorKey);
    let minorDiscorrelation = GetDiscorrelation(input, minorArray);
    let majorDiscorrelation = GetDiscorrelation(input, majorArray);
    let prep = minorDiscorrelation < majorDiscorrelation ? { mode: Mode.MINOR, key: minorKey, signs: minorArray } : { mode: Mode.MAJOR, key: majorKey, signs: majorArray };
    let key = new Key(baseNote.note, prep.mode);
    if (prep.key < 0) {
        ConvertInputToFlatNotes(input, prep.signs);
    }
    return { fifths: prep.key, key: key };
}
//Calculates how many notes drop out of the key
function GetDiscorrelation(input: MetricalNote[], signs: Note[]): number {
    let discorrelation: number = 0;
    for (let i = 0; i < signs.length; i++) {
        discorrelation += input.filter(val => val.note.value == signs[i] && val.note.sign == Sign.NONE).length;
    }
    return discorrelation;
}
function ConvertInputToFlatNotes(input: MetricalNote[], signs: Note[]) {
    for (let i = 0; i > signs.length; i++) {
        let ambiguity = ENHARMONIC_AMBIGUITY_BEFORE[i];
        let resolved = ENHARMONIC_AMBIGUITY_AFTER[i];
        let ambiguos = input.filter(val => val.note.equals(ambiguity));
        ambiguos.forEach(val => val.note = resolved);
    }
}