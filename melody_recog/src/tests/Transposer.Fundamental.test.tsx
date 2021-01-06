import { TransposeFundamentalNote } from "../algorithms/Transposer";
import { MetricalBar } from "../models/bars";
import { Mode } from "../models/keys";
import { Extension, Metric, MetricalNote, NoteLength } from "../models/metric";
import { Note, Sign, SignedNote } from "../models/notes";

test('Transpose A major to G major', () => {
});
test('Transpose A major to F# major', () => {

});
test('Transpose F minor to C minor', () => {
});
test('Transpose A minor to F minor', () => {
    debugger;
    let input = [
        new MetricalBar([
            new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.A, Sign.NONE), 3),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.B, Sign.NONE), 3),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.C, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.E, Sign.NONE), 4)
        ]),
        new MetricalBar([
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.A, Sign.NONE), 3),
            new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.BREAK, Sign.NONE), 0)
        ])
    ];
    TransposeFundamentalNote(input.flatMap(val => val.notes), new SignedNote(Note.A, Sign.NONE), new SignedNote(Note.F, Sign.NONE), Mode.MINOR);
    expect(input).toEqual(
        [
            new MetricalBar([
                new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
                new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.F, Sign.NONE), 4),
                new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.NONE), 4),
                new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.A, Sign.FLAT), 4),
                new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.C, Sign.NONE), 5)
            ]),
            new MetricalBar([
                new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.F, Sign.NONE), 4),
                new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.BREAK, Sign.NONE), 0)
            ])
        ]
    );
});