import { CheckForMusicalValidity, GetMusicalBar } from "../algorithms/BeatCorrelator";
import { Bar, MetricalBar } from "../models/bars";
import { Beat } from "../models/beats";
import { Extension, Metric, MetricalNote, NoteLength, Triole } from "../models/metric";
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
    console.log(result);
    expect(result).toEqual(new MetricalBar([
        new Triole(new MetricalNote(NoteLength.EIGHTH, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.D, Sign.NONE), 4), NoteLength.EIGHTH, true),
        new Triole(new MetricalNote(NoteLength.EIGHTH, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.E, Sign.NONE), 4), NoteLength.EIGHTH),
        new Triole(new MetricalNote(NoteLength.EIGHTH, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.F, Sign.SHARP), 4), NoteLength.EIGHTH, false, true),
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

test('All my little ducks real time data', () => {
    new Bar([
        new FrameNote(4, 36, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(0, 16.5, new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(4, 21, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 28.5, new SignedNote(Note.F, Sign.SHARP)),
        new FrameNote(4, 36.5, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 72, new SignedNote(Note.A, Sign.NONE))
    ]),
        new Bar([
            new FrameNote(0, 35.5, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(4, 35, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 178, new SignedNote(Note.B, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(0, 153.5, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(7, 15, new SignedNote(Note.F, Sign.SHARP)),
            //Should be around 70
            new FrameNote(4, 70, new SignedNote(Note.B, Sign.NONE))
        ]),
        new Bar([
            //Should be around 83.5. This + above should be exactly 153.5
            new FrameNote(4, 83.5, new SignedNote(Note.B, Sign.NONE)),
            //Should be around 156.5
            new FrameNote(0, 156.5, new SignedNote(Note.BREAK, Sign.NONE))
        ]),
        new Bar([
            //Should be around 64.5, with above it has to be exactly 221
            new FrameNote(0, 64.5, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(4, 94, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(0, 28.5, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(7, 77, new SignedNote(Note.F, Sign.SHARP)),
            //Should be around 40
            new FrameNote(4, 40, new SignedNote(Note.A, Sign.NONE))
        ]),
        new Bar([
            //Should be around 182, with above should be exactly 222
            new FrameNote(4, 182, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 25, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(0, 30, new SignedNote(Note.BREAK, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 24, new SignedNote(Note.D, Sign.NONE)),
            //Should be around 30
            new FrameNote(4, 30, new SignedNote(Note.BREAK, Sign.NONE)),
            //Should all be around actual framesize
            new FrameNote(4, 55, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(4, 55, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(4, 55, new SignedNote(Note.BREAK, Sign.NONE))
        ])
});