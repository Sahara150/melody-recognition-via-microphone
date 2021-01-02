import { GetKeyAndModifyNotes } from "../algorithms/KeyRecognizer"
import { MetricalBar } from "../models/bars"
import { Key, Mode } from "../models/keys"
import { Extension, Metric, MetricalNote, NoteLength } from "../models/metric";
import { SignedNote, Note, Sign } from "../models/notes"

test('a minor', () => {
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
    let result = GetKeyAndModifyNotes(input);
    expect(result.fifths).toBe(0);
    expect(result.key).toEqual(new Key(new SignedNote(Note.A, Sign.NONE), Mode.MINOR));
});
test('d minor', () => {
    debugger;
    let input = [
        new MetricalBar([
            new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.D, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.E, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.F, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.NONE), 4)
        ]),
        new MetricalBar([
            new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.A, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.D, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.A, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.NONE), 4)
        ]),
        new MetricalBar([
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.NONE),4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.F, Sign.NONE), 4),
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.E, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.C, Sign.NONE), 4)
        ]),
        //Some bars and notes were skipped, since the key recognizer doesn´t care for beat stuff anyway.
        new MetricalBar([
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.A, Sign.SHARP), 4),
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.A, Sign.NONE), 4)
        ]),
        new MetricalBar([
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.D, Sign.NONE), 4),
        new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.BREAK, Sign.NONE), 0)
        ])
    ];
    let result = GetKeyAndModifyNotes(input);
    expect(result.fifths).toBe(-1);
    expect(result.key).toEqual(new Key(new SignedNote(Note.D, Sign.NONE), Mode.MINOR));
    //A sharp should get converted to B flat.
    expect(input).toEqual([
        new MetricalBar([
            new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.D, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.E, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.F, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.NONE), 4)
        ]),
        new MetricalBar([
            new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.A, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.D, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.A, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.NONE), 4)
        ]),
        new MetricalBar([
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.NONE),4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.F, Sign.NONE), 4),
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.E, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.C, Sign.NONE), 4)
        ]),
        //Some bars and notes were skipped, since the key recognizer doesn´t care for beat stuff anyway.
        new MetricalBar([
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.B, Sign.FLAT), 4),
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.A, Sign.NONE), 4)
        ]),
        new MetricalBar([
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.D, Sign.NONE), 4),
        new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.BREAK, Sign.NONE), 0)
        ])
    ]);
});
test('c minor', () => {
    debugger;
    let input = [
        new MetricalBar([
            new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.C, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.D, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.D, Sign.SHARP), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.F, Sign.NONE), 4)
        ]),
        new MetricalBar([
            new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.C, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.F, Sign.NONE), 4)
        ]),
        new MetricalBar([
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.F, Sign.NONE),4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.D, Sign.SHARP), 4),
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.D, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.A, Sign.SHARP), 3)
        ]),
        //Some bars and notes were skipped, since the key recognizer doesn´t care for beat stuff anyway.
        new MetricalBar([
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.SHARP), 4),
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.NONE), 4)
        ]),
        new MetricalBar([
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.C, Sign.NONE), 4),
        new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.BREAK, Sign.NONE), 0)
        ])
    ];
    let result = GetKeyAndModifyNotes(input);
    expect(result.fifths).toBe(-3);
    expect(result.key).toEqual(new Key(new SignedNote(Note.C, Sign.NONE), Mode.MINOR));
    //A sharp should get converted to B flat. D sharp should become E flat. G sharp A flat.
    expect(input).toEqual([
        new MetricalBar([
            new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.C, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.D, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.E, Sign.FLAT), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.F, Sign.NONE), 4)
        ]),
        new MetricalBar([
            new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.C, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.F, Sign.NONE), 4)
        ]),
        new MetricalBar([
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.F, Sign.NONE),4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.E, Sign.FLAT), 4),
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.D, Sign.NONE), 4),
            new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.B, Sign.FLAT), 3)
        ]),
        //Some bars and notes were skipped, since the key recognizer doesn´t care for beat stuff anyway.
        new MetricalBar([
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.A, Sign.FLAT), 4),
            new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.NONE), 4)
        ]),
        new MetricalBar([
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.C, Sign.NONE), 4),
        new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.BREAK, Sign.NONE), 0)
        ])
    ]);
});