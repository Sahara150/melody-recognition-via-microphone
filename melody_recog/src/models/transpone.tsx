import { Note, Sign, SignedNote } from "./notes";

export const KeyTranslationMajor = {
    "Fis/Ges": new SignedNote(Note.F, Sign.SHARP),
    "Des": new SignedNote(Note.C, Sign.SHARP),
    "As": new SignedNote(Note.G, Sign.SHARP),
    "Es": new SignedNote(Note.D, Sign.SHARP),
    "B": new SignedNote(Note.A, Sign.SHARP),
    "F": new SignedNote(Note.F, Sign.NONE),
    "C": new SignedNote(Note.C, Sign.NONE),
    "G": new SignedNote(Note.G, Sign.NONE),
    "D": new SignedNote(Note.D, Sign.NONE),
    "A": new SignedNote(Note.A, Sign.NONE),
    "E": new SignedNote(Note.E, Sign.NONE),
    "H": new SignedNote(Note.B, Sign.NONE)
};
export const KeyTranslationMinor = {
    "es": new SignedNote(Note.D, Sign.SHARP),
    "b": new SignedNote(Note.A, Sign.SHARP),
    "f": new SignedNote(Note.F, Sign.NONE),
    "c": new SignedNote(Note.C, Sign.NONE),
    "g": new SignedNote(Note.G, Sign.NONE),
    "d": new SignedNote(Note.D, Sign.NONE),
    "a": new SignedNote(Note.A, Sign.NONE),
    "e": new SignedNote(Note.E, Sign.NONE),
    "h": new SignedNote(Note.B, Sign.NONE),
    "fis": new SignedNote(Note.F, Sign.SHARP),
    "cis": new SignedNote(Note.C, Sign.SHARP),
    "gis": new SignedNote(Note.G, Sign.SHARP)
};
// es	b	f	c	g	d	a	e	h	fis	cis	gis