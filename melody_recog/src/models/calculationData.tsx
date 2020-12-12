import { ErrorMapping } from "./errorCorrection";
import { Extension, Metric, MetricalNote, NoteLength } from "./metric";
import { Note, Sign, SignedNote } from "./notes";

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
    new SignedNote(Note.G, Sign.SHARP)];
export const ErrorMappingListStandard = 
    //Possible errors, when missing value is 1/8
    [
        new ErrorMapping(
            new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.TWODOTS, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.BREAK, Sign.NONE), 0)
        ),
        new ErrorMapping(
            new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.BREAK, Sign.NONE), 0)
        ),
        new ErrorMapping(
            new MetricalNote(NoteLength.FULL, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.TWODOTS, new SignedNote(Note.BREAK, Sign.NONE), 0)
        )
    ];
export const ErrorMappingListTriolic =
    //Possible errors, when missing value is 1/3
    [
        new ErrorMapping(
            new MetricalNote(NoteLength.HALF, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0)
        ),
        new ErrorMapping(
            new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.FULL, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0)
        )
    ]