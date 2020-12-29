import { GetKeyAndModifyNotes } from "../algorithms/KeyRecognizer"
import { MetricalBar } from "../models/bars"
import { Key, Mode } from "../models/keys"
import { Extension, Metric, MetricalNote, NoteLength } from "../models/metric";
import { SignedNote, Note, Sign } from "../models/notes"

test('a minor', () => {
    let input = [
        new MetricalBar([
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
    let result = GetKeyAndModifyNotes(input);
    expect(result.fifths).toBe(0);
    expect(result.key).toEqual(new Key(new SignedNote(Note.A, Sign.NONE), Mode.MINOR));
});