import { CheckForMusicalValidity, GetMusicalBar } from "../algorithms/BeatCorrelator";
import { Bar, MetricalBar } from "../models/bars";
import { Beat } from "../models/beats";
import { Extension, Metric, MetricalNote, NoteLength } from "../models/metric";
import { FrameNote, Note, Sign, SignedNote } from "../models/notes";

test('ThreeHalfNotes', () => {
    let bar = new Bar([
        new FrameNote(4, 65, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 64, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 66, new SignedNote(Note.F, Sign.SHARP))
    ]);
    let result = GetMusicalBar(bar, Beat.ThreeHalfs);
    expect(result).toEqual(new MetricalBar([
        new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.D, Sign.NONE), 4),
        new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.E, Sign.NONE), 4),
        new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.F, Sign.SHARP), 4)
    ]));
});

test('TrioleEightsDottedEigthSixteenth', () => {
    debugger;
    let bar = new Bar([
        new FrameNote(4, 18, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 19, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 18, new SignedNote(Note.F, Sign.SHARP)),
        new FrameNote(4, 39, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 13, new SignedNote(Note.F, Sign.SHARP))
    ]);
    let result = GetMusicalBar(bar, Beat.TwoFourths);
    expect(result).toEqual(new MetricalBar([
        new MetricalNote(NoteLength.EIGHTH, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.D, Sign.NONE), 4),
        new MetricalNote(NoteLength.EIGHTH, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.E, Sign.NONE), 4),
        new MetricalNote(NoteLength.EIGHTH, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.F, Sign.SHARP), 4),
        new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.G, Sign.NONE), 4),
        new MetricalNote(NoteLength.SIXTEENTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.F, Sign.SHARP), 4)
    ]));
});
test('Triole accidently got dotted lower', () => {
    let bar = new MetricalBar([
        new MetricalNote(NoteLength.QUARTER, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.D, Sign.NONE), 4),
        new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.E, Sign.NONE), 4),
        new MetricalNote(NoteLength.QUARTER, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.F, Sign.NONE), 4),
        new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.NONE), 4)
    ]);
    let result = CheckForMusicalValidity(bar.notes, Beat.FourFourths);
    expect(result).toEqual([
        new MetricalNote(NoteLength.QUARTER, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.D, Sign.NONE), 4),
        new MetricalNote(NoteLength.QUARTER, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.E, Sign.NONE), 4),
        new MetricalNote(NoteLength.QUARTER, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.F, Sign.NONE), 4),
        new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.NONE), 4)]);
});
test('One dotted got to two dotted', () => {
    debugger;
    let bar = new MetricalBar([
        new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.TWODOTS, new SignedNote(Note.D, Sign.NONE), 4),
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.E, Sign.NONE), 4),
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.E, Sign.NONE), 4)
    ]);
    let result = CheckForMusicalValidity(bar.notes, Beat.FiveFourths);
    expect(result).toEqual([
        new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.D, Sign.NONE), 4),
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.E, Sign.NONE), 4),
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.E, Sign.NONE), 4)
    ]);
});
test('Two times one dotted quarter got double dotted', () => {
    debugger;
    let bar = new MetricalBar([
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.TWODOTS, new SignedNote(Note.D, Sign.NONE), 4),
        new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.E, Sign.NONE), 4),
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.TWODOTS, new SignedNote(Note.F, Sign.SHARP),4),
        new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.NONE),4)
    ]);
    let result = CheckForMusicalValidity(bar.notes, Beat.FourFourths);
    expect(result).toEqual([
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.D, Sign.NONE), 4),
        new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.E, Sign.NONE), 4),
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.F, Sign.SHARP),4),
        new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.G, Sign.NONE),4)
    ]);
});