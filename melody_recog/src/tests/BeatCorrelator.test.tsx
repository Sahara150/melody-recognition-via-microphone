import { GetBarBorders } from "../algorithms/BeatCorrelator";
import { Bar } from "../models/bars";
import { FrameNote, Note, Sign, SignedNote } from "../models/notes";

test('ThreeHalfsCorrectFraming', () => {
    debugger;
    let notes: FrameNote[] = [
        //Bar 1
        new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.F, Sign.NONE)),
        //Bar 2
        new FrameNote(4, 60, new SignedNote(Note.G, Sign.NONE)),
        //Check, that beatCorrelator doesn�t care for musical value
        new FrameNote(4, 30, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.B, Sign.NONE)),
        //Bar 3
        new FrameNote(4, 30, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
        //Bar 4
        new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 120, new SignedNote(Note.F, Sign.NONE)),
        //Bar 5 started in mid of last note
        new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE))
    ];
    let result = GetBarBorders(notes, 3, 60);
    expect(result.bars).toEqual([
        new Bar([
            new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.F, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 60, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.B, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 30, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.F, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 60, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE))
        ])
    ]);
    //Tie between bar 4 and 5 is 3, since index starts with 0
    expect(result.ties).toEqual([3]);
});

test('ThreeHalfsTooShortFraming', () => {
    debugger;
    let notes: FrameNote[] = [
        //Bar 1
        new FrameNote(4, 53, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 55, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 53, new SignedNote(Note.F, Sign.NONE)),
        //Bar 2
        new FrameNote(4, 55, new SignedNote(Note.G, Sign.NONE)),
        //Check, that beatCorrelator doesn�t care for musical value
        new FrameNote(4, 26, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 26, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 57, new SignedNote(Note.B, Sign.NONE)),
        //Bar 3
        new FrameNote(4, 27, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 56, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 28, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(4, 54, new SignedNote(Note.E, Sign.NONE)),
        //Bar 4
        new FrameNote(4, 54, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 55, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 112, new SignedNote(Note.F, Sign.NONE)),
        //Bar 5 started in mid of last note
        new FrameNote(4, 54, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 56, new SignedNote(Note.D, Sign.NONE))
    ];
    let result = GetBarBorders(notes, 3, 60);
    expect(result.bars).toEqual([
        new Bar([
            new FrameNote(4, 53, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 55, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 53, new SignedNote(Note.F, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 55, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 26, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 26, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 57, new SignedNote(Note.B, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 27, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 56, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 28, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(4, 54, new SignedNote(Note.E, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 54, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 55, new SignedNote(Note.E, Sign.NONE)),
            //It just takes the results frames, because it doesn´t really matter, 
            //if it splits the note up exactly half/half of 57/55, ...
            new FrameNote(4, result.bars[3].notes[2].frames, new SignedNote(Note.F, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, result.bars[4].notes[0].frames, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(4, 54, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 56, new SignedNote(Note.D, Sign.NONE))
        ])
    ]);
    //Tie between bar 4 and 5 is 3, since index starts with 0
    expect(result.ties).toEqual([3]);
});
test('ThreeHalfsTooLongFraming', () => {
    debugger;
    let notes: FrameNote[] = [
        //Bar 1
        new FrameNote(4, 65, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 64, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 66, new SignedNote(Note.F, Sign.NONE)),
        //Bar 2
        new FrameNote(4, 68, new SignedNote(Note.G, Sign.NONE)),
        //Check, that beatCorrelator doesn�t care for musical value
        new FrameNote(4, 32, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 32, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 66, new SignedNote(Note.B, Sign.NONE)),
        //Bar 3
        new FrameNote(4, 31, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 64, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 32, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(4, 66, new SignedNote(Note.E, Sign.NONE)),
        //Bar 4
        new FrameNote(4, 64, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 66, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 130, new SignedNote(Note.F, Sign.NONE)),
        //Bar 5 started in mid of last note
        new FrameNote(4, 65, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 63, new SignedNote(Note.D, Sign.NONE))
    ];
    let result = GetBarBorders(notes, 3, 60);
    expect(result.bars).toEqual([
        new Bar([
            new FrameNote(4, 65, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 64, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 66, new SignedNote(Note.F, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 68, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 32, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 32, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 66, new SignedNote(Note.B, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 31, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 64, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 32, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(4, 66, new SignedNote(Note.E, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 64, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 66, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 65, new SignedNote(Note.F, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 65, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(4, 65, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 63, new SignedNote(Note.D, Sign.NONE))
        ])
    ]);
    //Tie between bar 4 and 5 is 3, since index starts with 0
    expect(result.ties).toEqual([3]);
});