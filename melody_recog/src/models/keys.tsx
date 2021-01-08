import { Note, Sign, SignedNote } from "./notes";

export enum Mode {
    MINOR = "Moll",
    MAJOR = "Dur"
}
export class Key {
    base_note: SignedNote;
    mode: Mode;
    constructor(baseNote: SignedNote, mode: Mode) {
        this.base_note = baseNote;
        this.mode = mode;
    }
}
export const CIRCLE_OF_FIFTHS = [
    //6 flats minor / 3 flats major
    new SignedNote(Note.D, Sign.SHARP),
    //5 flats minor / 2 flats major
    new SignedNote(Note.A, Sign.SHARP),
    //4 flats minor / 1 flat major
    new SignedNote(Note.F, Sign.NONE),
    //3 flats minor / 0 major
    new SignedNote(Note.C, Sign.NONE),
    //2 flats minor / 1 sharp major
    new SignedNote(Note.G, Sign.NONE),
    //1 flat minor / 2 sharps major
    new SignedNote(Note.D, Sign.NONE),
    //0 minor / 3 sharps major
    new SignedNote(Note.A, Sign.NONE),
    //1 sharp minor / 4 sharps major
    new SignedNote(Note.E, Sign.NONE),
    //2 sharps minor / 5 sharps major
    new SignedNote(Note.B, Sign.NONE),
    //3 sharps minor / 6 flats major
    new SignedNote(Note.F, Sign.SHARP),
    //4 sharps minor / 5 flats major
    new SignedNote(Note.C, Sign.SHARP),
    //5 sharps minor / 4 flats major
    new SignedNote(Note.G, Sign.SHARP),
];
export const MINOR_KEY_SHIFT = 6;
export const MAJOR_KEY_SHIFT = 3;
export const CIRCLE_SIZE = 9;
export const FLATS = [
    Note.B,
    Note.E,
    Note.A,
    Note.D,
    Note.G,
    Note.C
];
export const ENHARMONIC_AMBIGUITY_BEFORE = [
    new SignedNote(Note.A, Sign.SHARP),
    new SignedNote(Note.D, Sign.SHARP),
    new SignedNote(Note.G, Sign.SHARP),
    new SignedNote(Note.C, Sign.SHARP),
    new SignedNote(Note.F, Sign.SHARP),
    new SignedNote(Note.B, Sign.NONE)
];
export const ENHARMONIC_AMBIGUITY_AFTER = [
    new SignedNote(Note.B, Sign.FLAT),
    new SignedNote(Note.E, Sign.FLAT),
    new SignedNote(Note.A, Sign.FLAT),
    new SignedNote(Note.D, Sign.FLAT),
    new SignedNote(Note.G, Sign.FLAT),
    new SignedNote(Note.C, Sign.FLAT)
];
export const SHARPS = [
    Note.F,
    Note.C,
    Note.G,
    Note.D,
    Note.A
];