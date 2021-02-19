import { getKeyAndModifyNotes } from "../algorithms/KeyRecognizer"
import { Key, Mode } from "../models/keys"
import { Extension, Metric, NoteLength } from "../models/metric";
import { SignedNote, Note, Sign, FrameNote } from "../models/notes"

test('a minor', () => {
    let input = [
        new FrameNote(0, 120, new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(4, 30,  new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 30,  new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(4, 30,  new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(0, 120, new SignedNote(Note.BREAK, Sign.NONE))
    ];
    let result = getKeyAndModifyNotes(input);
    expect(result.fifths).toBe(0);
    expect(result.key).toEqual(new Key(new SignedNote(Note.A, Sign.NONE), Mode.MINOR));
});
test('d minor', () => {
    let input = [
            new FrameNote(0, 120, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 120, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(0, 30, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(0, 30, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.C, Sign.NONE)),
            //Some bars and notes were skipped, since the key recognizer doesn´t care for beat stuff anyway.
            new FrameNote(4, 60, new SignedNote(Note.A, Sign.SHARP)),
            new FrameNote(4, 60, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(0, 120,new SignedNote(Note.BREAK, Sign.NONE))
    ];
    let result = getKeyAndModifyNotes(input);
    expect(result.fifths).toBe(-1);
    expect(result.key).toEqual(new Key(new SignedNote(Note.D, Sign.NONE), Mode.MINOR));
    //A sharp should get converted to B flat.
    expect(input).toEqual([
            new FrameNote(0, 120, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(4, 30,  new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 30,  new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 30,  new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(4, 30,  new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 120, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(0, 30, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(0, 30, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.C, Sign.NONE)),
            //Some bars and notes were skipped, since the key recognizer doesn´t care for beat stuff anyway.
            new FrameNote(4, 60, new SignedNote(Note.B, Sign.FLAT)),
            new FrameNote(4, 60, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(0, 120, new SignedNote(Note.BREAK, Sign.NONE))
    ]);
});
test('c minor', () => {
    let input = [
            new FrameNote(0, 120, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.C, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.D, Sign.SHARP)),
            new FrameNote(4, 30, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(4, 120,new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(0, 30, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.C, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.D, Sign.SHARP)),
            new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(0, 30, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(3, 60, new SignedNote(Note.A, Sign.SHARP)),
        //Some bars and notes were skipped, since the key recognizer doesn´t care for beat stuff anyway.
            new FrameNote(4, 60, new SignedNote(Note.G, Sign.SHARP)),
            new FrameNote(4, 60, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.C, Sign.NONE)),
            new FrameNote(0, 120, new SignedNote(Note.BREAK, Sign.NONE))
    ];
    let result = getKeyAndModifyNotes(input);
    expect(result.fifths).toBe(-3);
    expect(result.key).toEqual(new Key(new SignedNote(Note.C, Sign.NONE), Mode.MINOR));
    //A sharp should get converted to B flat. D sharp should become E flat. G sharp A flat.
    expect(input).toEqual([
        new FrameNote(0, 120, new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.E, Sign.FLAT)),
        new FrameNote(4, 30, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(4, 120, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(0, 30, new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.E, Sign.FLAT)),
        new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(0, 30, new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(3, 60, new SignedNote(Note.B, Sign.FLAT)),
        //Some bars and notes were skipped, since the key recognizer doesn´t care for beat stuff anyway.
        new FrameNote(4, 60, new SignedNote(Note.A, Sign.FLAT)),
        new FrameNote(4, 60, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(0, 120, new SignedNote(Note.BREAK, Sign.NONE))
        ]);
});
test('e major', () => {
    let input = [
            new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.F, Sign.SHARP)),
            new FrameNote(4, 60, new SignedNote(Note.G, Sign.SHARP)),
            new FrameNote(4, 60, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.B, Sign.NONE)),
            new FrameNote(5, 60, new SignedNote(Note.C, Sign.SHARP)),
            new FrameNote(5, 60, new SignedNote(Note.D, Sign.SHARP)),
            new FrameNote(5, 60, new SignedNote(Note.E, Sign.NONE))
    ];
    let result = getKeyAndModifyNotes(input);
    expect(result.fifths).toEqual(4);
    expect(result.key).toEqual(new Key(new SignedNote(Note.E, Sign.NONE), Mode.MAJOR));
});
test('b major', () => {
    debugger;
    let input = [
        new FrameNote(4, 60, new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.C, Sign.SHARP)),
        new FrameNote(4, 60, new SignedNote(Note.D, Sign.SHARP)),
        new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.F, Sign.SHARP)),
        new FrameNote(5, 60, new SignedNote(Note.G, Sign.SHARP)),
        new FrameNote(5, 60, new SignedNote(Note.A, Sign.SHARP)),
        new FrameNote(5, 60, new SignedNote(Note.B, Sign.NONE))
    ];
    let result = getKeyAndModifyNotes(input);
    expect(result.fifths).toEqual(5);
    expect(result.key).toEqual(new Key(new SignedNote(Note.B, Sign.NONE), Mode.MAJOR));
});
test('f# major', () => {
    debugger;
    let input = [
        new FrameNote(4, 60, new SignedNote(Note.F, Sign.SHARP)),
        new FrameNote(4, 60, new SignedNote(Note.G, Sign.SHARP)),
        new FrameNote(4, 60, new SignedNote(Note.A, Sign.SHARP)),
        new FrameNote(4, 60, new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.C, Sign.SHARP)),
        new FrameNote(5, 60, new SignedNote(Note.D, Sign.SHARP)),
        new FrameNote(5, 60, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(5, 60, new SignedNote(Note.F, Sign.SHARP))
    ];
let result = getKeyAndModifyNotes(input);
expect(result.fifths).toEqual(-6);
expect(result.key).toEqual(new Key(new SignedNote(Note.F, Sign.SHARP), Mode.MAJOR));
});