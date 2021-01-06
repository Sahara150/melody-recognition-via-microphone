import { CheckForMusicalValidity, GetBarBorders, GetMusicalBar } from "../algorithms/BeatCorrelator";
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
    let bar = new Bar([
        new FrameNote(4, 18, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 19, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 18, new SignedNote(Note.F, Sign.SHARP)),
        new FrameNote(4, 39, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 13, new SignedNote(Note.F, Sign.SHARP))
    ]);
    let result = GetMusicalBar(bar, Beat.TwoFourths);
    expect(result).toEqual(new MetricalBar([
        new Triole(new MetricalNote(NoteLength.EIGHTH, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.D, Sign.NONE), 4), NoteLength.EIGHTH, true),
        new Triole(new MetricalNote(NoteLength.EIGHTH, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.E, Sign.NONE), 4), NoteLength.EIGHTH),
        new Triole(new MetricalNote(NoteLength.EIGHTH, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.F, Sign.SHARP), 4), NoteLength.EIGHTH, false, true),
        new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.G, Sign.NONE), 4),
        new MetricalNote(NoteLength.SIXTEENTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.F, Sign.SHARP), 4)
    ]));
});
test('One dotted got to two dotted', () => {
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
test('Real data test', () => {
    debugger;
    let allBars = [
        {"notes":
            [
                {"value":{"value":"D","sign":0},"octave":4,"frames":63},
                {"value":{"value":"F","sign":1},"octave":4,"frames":13},
                {"value":{"value":"G","sign":0},"octave":4,"frames":103.5},
                {"value":{"value":"F","sign":1},"octave":4,"frames":60}
            ]
        },
        {"notes":
            [
                {"value":{"value":"F","sign":1},"octave":4,"frames":17},
                {"value":{"value":"E","sign":0},"octave":4,"frames":39},
                {"value":{"value":"BREAK","sign":0},"octave":0,"frames":32},
                {"value":{"value":"D","sign":0},"octave":4,"frames":45},
                {"value":{"value":"G","sign":0},"octave":4,"frames":100}
            ]
        },
        {"notes":
            [
                {"value":{"value":"A","sign":0},"octave":4,"frames":106},
                {"value":{"value":"BREAK","sign":0},"octave":0,"frames":58},
                {"value":{"value":"B","sign":0},"octave":4,"frames":60.5},
                {"value":{"value":"A","sign":0},"octave":4,"frames":22}
            ]
        },
        {"notes":
            [
                {"value":{"value":"A","sign":0},"octave":4,"frames":9},
                {"value":{"value":"G","sign":0},"octave":4,"frames":65.5},
                {"value":{"value":"A","sign":0},"octave":4,"frames":99.5},
                {"value":{"value":"F","sign":1},"octave":4,"frames":10},
                {"value":{"value":"BREAK","sign":0},"octave":0,"frames":34.5}
            ]
        },
        {"notes":
            [
                {"value":{"value":"BREAK","sign":0},"octave":0,"frames":31},
                {"value":{"value":"E","sign":0},"octave":4,"frames":45.5},
                {"value":{"value":"D","sign":1},"octave":4,"frames":15},
                {"value":{"value":"E","sign":0},"octave":4,"frames":70.5},
                {"value":{"value":"F","sign":1},"octave":4,"frames":9},
                {"value":{"value":"G","sign":0},"octave":4,"frames":10},
                {"value":{"value":"F","sign":1},"octave":4,"frames":12}
            ]
        },
        {"notes":
            [
                {"value":{"value":"E","sign":0},"octave":4,"frames":13},
                {"value":{"value":"D","sign":0},"octave":4,"frames":72.5},
                {"value":{"value":"BREAK","sign":0},"octave":0,"frames":157}
            ]
        }
    ];
    let bars = allBars as Bar[];
    let result : MetricalBar[] = [];
    bars.forEach(val => {
        result.push(GetMusicalBar(val, Beat.FourFourths));
    });
    expect(result[0].notes).toEqual([
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.D, Sign.NONE), 4),
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.G, Sign.NONE), 4),
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.F, Sign.SHARP), 4)
    ]);
    expect(result[1].notes).toEqual([
        new MetricalNote(NoteLength.SIXTEENTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.F, Sign.SHARP), 4),
        new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.E, Sign.NONE), 4),
        new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE),0),
        new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.D, Sign.NONE), 4),
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.TWODOTS, new SignedNote(Note.G, Sign.NONE),4)
    ]);
    expect(result[2].notes).toEqual([
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.TWODOTS, new SignedNote(Note.A, Sign.NONE), 4),
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0),
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.B, Sign.NONE), 4),
        new MetricalNote(NoteLength.SIXTEENTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.A, Sign.NONE), 4)     
    ]);
    expect(result[3].notes).toEqual([
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.G, Sign.NONE), 4),
        new MetricalNote(NoteLength.HALF, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.A, Sign.NONE),4),
        new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE), 0)
    ]);
    expect(result[4].notes).toEqual([
        new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.BREAK, Sign.NONE),0),
        new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.E, Sign.NONE), 4),
        new MetricalNote(NoteLength.SIXTEENTH, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.D, Sign.SHARP), 4),         
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.E, Sign.NONE),4),
        new MetricalNote(NoteLength.EIGHTH, Metric.STANDARD, Extension.ONEDOT, new SignedNote(Note.F, Sign.SHARP),4)
    ]);
    expect(result[5].notes).toEqual([
       new Triole(new MetricalNote(NoteLength.HALF, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.D, Sign.NONE),4), NoteLength.HALF, true),
       new Triole(new MetricalNote(NoteLength.FULL, Metric.TRIOLE, Extension.NODOT, new SignedNote(Note.BREAK, Sign.NONE),0), NoteLength.HALF, false, true)
    ]);
});
//A full five/fourths bar note should be split in a full and a quarter, that can easily be connected in post edit.
test('Note bigger than a full note, but too small for dotted', () => {
    debugger;
    let input = new Bar([new FrameNote(4, 300, new SignedNote(Note.D, Sign.NONE))]);
    let result = GetMusicalBar(input, Beat.FiveFourths);
    expect(result.notes).toEqual([
        new MetricalNote(NoteLength.FULL, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.D, Sign.NONE), 4),
        new MetricalNote(NoteLength.QUARTER, Metric.STANDARD, Extension.NODOT, new SignedNote(Note.D, Sign.NONE), 4)
    ]);
});