import { TransposeMode } from "../algorithms/Transposer";
import { Key, Mode } from "../models/keys";
import { FrameNote, Note, Sign, SignedNote } from "../models/notes";

test('Transpose A natural minor to A major', () => {
    let input = [
        new FrameNote(3, 60, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(3, 60, new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.A, Sign.NONE))
    ];
    let key = TransposeMode(input, Mode.MINOR, Mode.MAJOR, new SignedNote(Note.A, Sign.NONE));
    expect(key.fifths).toBe(3);
    expect(key.key).toEqual(new Key(new SignedNote(Note.A, Sign.NONE), Mode.MAJOR));
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
test('Transpose A melodic minor to A major', () => {
    let input = [
        new FrameNote(3, 60, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(3, 60, new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.F, Sign.SHARP)),
        new FrameNote(4, 60, new SignedNote(Note.G, Sign.SHARP)),
        new FrameNote(4, 60, new SignedNote(Note.A, Sign.NONE))
    ];
    let key = TransposeMode(input, Mode.MINOR, Mode.MAJOR, new SignedNote(Note.A, Sign.NONE));
    expect(key.fifths).toBe(3);
    expect(key.key).toEqual(new Key(new SignedNote(Note.A, Sign.NONE), Mode.MAJOR));
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
test('Transpose A harmonic minor to A major', () => {
    let input = [
        new FrameNote(3, 60, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(3, 60, new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.G, Sign.SHARP)),
        new FrameNote(4, 60, new SignedNote(Note.A, Sign.NONE))
    ];
    let key = TransposeMode(input, Mode.MINOR, Mode.MAJOR, new SignedNote(Note.A, Sign.NONE));
    expect(key.fifths).toBe(3);
    expect(key.key).toEqual(new Key(new SignedNote(Note.A, Sign.NONE), Mode.MAJOR));
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
test('Douze petite duettes No. 5, F major to minor', () => {
    debugger;
    let input = [
        new FrameNote(4, 45, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 15, new SignedNote(Note.B, Sign.FLAT)),
        new FrameNote(5, 60, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(5, 30, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(5, 30, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(5, 60, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(5, 60, new SignedNote(Note.F, Sign.SHARP)),
        new FrameNote(5, 30, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(5, 30, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(5, 90, new SignedNote(Note.B, Sign.FLAT)),
        new FrameNote(5, 30, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(5, 30, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(5, 30, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(5, 30, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(5, 30, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(5, 30, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(5, 30, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(5, 30, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.B, Sign.FLAT)),
        new FrameNote(4, 30, new SignedNote(Note.B, Sign.FLAT)),
        new FrameNote(4, 30, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(5, 30, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(5, 30, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(5, 60, new SignedNote(Note.C, Sign.NONE))
    ];
    let key = TransposeMode(input, Mode.MAJOR, Mode.MINOR, new SignedNote(Note.F, Sign.NONE));
    expect(key.fifths).toBe(-4);
    expect(key.key).toEqual(new Key(new SignedNote(Note.F, Sign.NONE), Mode.MINOR));
    expect(input).toEqual([
        new FrameNote(4, 45, new SignedNote(Note.A, Sign.FLAT)),
        new FrameNote(4, 15, new SignedNote(Note.B, Sign.FLAT)),
        new FrameNote(5, 60, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(5, 30, new SignedNote(Note.D, Sign.FLAT)),
        new FrameNote(5, 30, new SignedNote(Note.E, Sign.FLAT)),
        new FrameNote(5, 60, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(5, 60, new SignedNote(Note.F, Sign.SHARP)),
        new FrameNote(5, 30, new SignedNote(Note.A, Sign.FLAT)),
        new FrameNote(5, 30, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(5, 90, new SignedNote(Note.B, Sign.FLAT)),
        new FrameNote(5, 30, new SignedNote(Note.A, Sign.FLAT)),
        new FrameNote(5, 30, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(5, 30, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(5, 30, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(5, 30, new SignedNote(Note.E, Sign.FLAT)),
        new FrameNote(5, 30, new SignedNote(Note.E, Sign.FLAT)),
        new FrameNote(5, 30, new SignedNote(Note.D, Sign.FLAT)),
        new FrameNote(5, 30, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.B, Sign.FLAT)),
        new FrameNote(4, 30, new SignedNote(Note.B, Sign.FLAT)),
        new FrameNote(4, 30, new SignedNote(Note.A, Sign.FLAT)),
        new FrameNote(5, 30, new SignedNote(Note.D, Sign.FLAT)),
        new FrameNote(5, 30, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(5, 60, new SignedNote(Note.C, Sign.NONE))
    ]);
});