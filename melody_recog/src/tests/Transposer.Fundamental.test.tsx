import { TransposeFundamentalNote } from "../algorithms/Transposer";
import { Mode } from "../models/keys";
import { FrameNote, Note, Sign, SignedNote } from "../models/notes";

test('Transpose A major to G major', () => {
    debugger;
    let input = [
        new FrameNote(4, 60, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(5, 60, new SignedNote(Note.C, Sign.SHARP)),
        new FrameNote(5, 60, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(5, 60, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(5, 60, new SignedNote(Note.F, Sign.SHARP)),
        new FrameNote(5, 60, new SignedNote(Note.G, Sign.SHARP)),
        new FrameNote(5, 60, new SignedNote(Note.A, Sign.NONE))
    ];
    TransposeFundamentalNote(input, new SignedNote(Note.A, Sign.NONE), new SignedNote(Note.G, Sign.NONE), Mode.MAJOR);
    expect(input).toEqual([
        new FrameNote(5, 60, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(5, 60, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(5, 60, new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(6, 60, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(6, 60, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(6, 60, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(6, 60, new SignedNote(Note.F, Sign.SHARP)),
        new FrameNote(6, 60, new SignedNote(Note.G, Sign.NONE))
    ]);
});
test('Transpose A major to G-flat/F# major', () => {
    debugger;
    let input = [
        new FrameNote(4, 60, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(5, 60, new SignedNote(Note.C, Sign.SHARP)),
        new FrameNote(5, 60, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(5, 60, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(5, 60, new SignedNote(Note.F, Sign.SHARP)),
        new FrameNote(5, 60, new SignedNote(Note.G, Sign.SHARP)),
        new FrameNote(5, 60, new SignedNote(Note.A, Sign.NONE))
    ];
    TransposeFundamentalNote(input, new SignedNote(Note.A, Sign.NONE), new SignedNote(Note.F, Sign.SHARP), Mode.MAJOR);
    expect(input).toEqual([
        new FrameNote(5, 60, new SignedNote(Note.G, Sign.FLAT)),
        new FrameNote(5, 60, new SignedNote(Note.A, Sign.FLAT)),
        new FrameNote(5, 60, new SignedNote(Note.B, Sign.FLAT)),
        new FrameNote(6, 60, new SignedNote(Note.C, Sign.FLAT)),
        new FrameNote(6, 60, new SignedNote(Note.D, Sign.FLAT)),
        new FrameNote(6, 60, new SignedNote(Note.E, Sign.FLAT)),
        new FrameNote(6, 60, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(6, 60, new SignedNote(Note.G, Sign.FLAT))
    ]);
});
test('Transpose F minor to C minor', () => {
    let input = [
        new FrameNote(0, 120, new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.A, Sign.FLAT)),
        new FrameNote(5, 30, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(0, 120, new SignedNote(Note.BREAK, Sign.NONE))
    ];
    TransposeFundamentalNote(input, new SignedNote(Note.F, Sign.NONE), new SignedNote(Note.C, Sign.NONE), Mode.MINOR);
    expect(input).toEqual([
        new FrameNote(0, 120, new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.E, Sign.FLAT)),
        new FrameNote(4, 30, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(0, 120, new SignedNote(Note.BREAK, Sign.NONE))
    ]);
});
test('Transpose A minor to F minor', () => {
    debugger;
    let input = [
            new FrameNote(0, 120, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(3, 30, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(3, 30, new SignedNote(Note.B, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.C, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(3, 60, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(0, 120,new SignedNote(Note.BREAK, Sign.NONE)),
    ];
    TransposeFundamentalNote(input, new SignedNote(Note.A, Sign.NONE), new SignedNote(Note.F, Sign.NONE), Mode.MINOR);
    expect(input).toEqual(
        [
                new FrameNote(0, 120, new SignedNote(Note.BREAK, Sign.NONE)),
                new FrameNote(4, 30,  new SignedNote(Note.F, Sign.NONE)),
                new FrameNote(4, 30, new SignedNote(Note.G, Sign.NONE)),
                new FrameNote(4, 30, new SignedNote(Note.A, Sign.FLAT)),
                new FrameNote(5, 30, new SignedNote(Note.C, Sign.NONE)),
                new FrameNote(4, 60, new SignedNote(Note.F, Sign.NONE)),
                new FrameNote(0, 120, new SignedNote(Note.BREAK, Sign.NONE))
        ]
    );
});
test('Transpose D major to A major', () => {
    debugger;
    let input = [
        new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.F, Sign.SHARP)),
        new FrameNote(4, 60, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(5, 60, new SignedNote(Note.C, Sign.SHARP)),
        new FrameNote(5, 60, new SignedNote(Note.D, Sign.NONE))
    ];
    TransposeFundamentalNote(input, new SignedNote(Note.D, Sign.NONE), new SignedNote(Note.A, Sign.NONE), Mode.MAJOR);
    expect(input).toEqual([
        new FrameNote(3, 60, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(3, 60, new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.C, Sign.SHARP)),
        new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.F, Sign.SHARP)),
        new FrameNote(4, 60, new SignedNote(Note.G, Sign.SHARP)),
        new FrameNote(4, 60, new SignedNote(Note.A, Sign.NONE))
    ]);
});
