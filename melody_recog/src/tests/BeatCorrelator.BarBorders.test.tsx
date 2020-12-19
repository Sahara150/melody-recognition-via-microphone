import { GetBarBorders } from "../algorithms/BeatCorrelator";
import { Bar } from "../models/bars";
import { FrameNote, Note, Sign, SignedNote } from "../models/notes";

test('ThreeHalfsCorrectFraming', () => {
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
test('NoteOverMultipleBarsCorrectFramingEasy', () => {
    debugger;
    let notes = [
        //Bar 1
        new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
        //Bar 2 to 4
        new FrameNote(4, 360, new SignedNote(Note.F, Sign.NONE))
    ];
    let result = GetBarBorders(notes, 2, 60);
    expect(result.bars).toEqual([
        new Bar([
            new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
        ]),
        new Bar([
            new FrameNote(4, 120, new SignedNote(Note.F, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 120, new SignedNote(Note.F, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 120, new SignedNote(Note.F, Sign.NONE))
        ])
    ]);
    expect(result.ties).toEqual([1,2]);
});
test('NoteOverMultipleBarsTooShortFramingEasy', () => {
    debugger;
    let notes = [
        //Bar 1
        new FrameNote(4, 55, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 53, new SignedNote(Note.E, Sign.NONE)),
        //Bar 2 to 4
        new FrameNote(4, 330, new SignedNote(Note.F, Sign.NONE))
    ];
    let result = GetBarBorders(notes, 2, 60);
    expect(result.bars).toEqual([
        new Bar([
            new FrameNote(4, 55, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 53, new SignedNote(Note.E, Sign.NONE)),
        ]),
        new Bar([
            //Exact splitting doesn´t really matter and depends on the average of before values
            new FrameNote(4, result.bars[1].notes[0].frames, new SignedNote(Note.F, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, result.bars[2].notes[0].frames, new SignedNote(Note.F, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, result.bars[3].notes[0].frames, new SignedNote(Note.F, Sign.NONE))
        ])
    ]);
    expect(result.ties).toEqual([1, 2]);
});

test('NoteOverMultipleBarsTooShortFramingEasy', () => {
    debugger;
    let notes = [
        //Bar 1
        new FrameNote(4, 64, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 66, new SignedNote(Note.E, Sign.NONE)),
        //Bar 2 to 4
        new FrameNote(4, 378, new SignedNote(Note.F, Sign.NONE))
    ];
    let result = GetBarBorders(notes, 2, 60);
    expect(result.bars).toEqual([
        new Bar([
            new FrameNote(4, 64, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 66, new SignedNote(Note.E, Sign.NONE)),
        ]),
        new Bar([
            //Exact splitting doesn´t really matter and depends on the average of before values
            new FrameNote(4, result.bars[1].notes[0].frames, new SignedNote(Note.F, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, result.bars[2].notes[0].frames, new SignedNote(Note.F, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, result.bars[3].notes[0].frames, new SignedNote(Note.F, Sign.NONE))
        ])
    ]);
    expect(result.ties).toEqual([1, 2]);
});

test('FourFourthsCorrectFramingLastBarNotFilled', () => {
    let notes = [
        //Bar 1
        new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 90, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE)),
        //Bar 2
        new FrameNote(4, 15, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 15, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 15, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 15, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 15, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 15, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 15, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 15, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(0, 60, new SignedNote(Note.BREAK, Sign.NONE)),
        //Bar 3
        new FrameNote(4, 15, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 15, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 15, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 15, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 15, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 15, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 15, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 15, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.B, Sign.NONE)),
        //Bar 4
        new FrameNote(4, 45, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 15, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 90, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
        //Bar 5
        new FrameNote(4, 120, new SignedNote(Note.E, Sign.NONE))
    ];
    let result = GetBarBorders(notes, 4, 60);
    expect(result.bars).toEqual([
        new Bar([
            new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 90, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.E, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 15, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 15, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 15, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 15, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 15, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 15, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 15, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 15, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(0, 60, new SignedNote(Note.BREAK, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 15, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 15, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 15, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 15, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 15, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 15, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 15, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 15, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.B, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.B, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 45, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 15, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 90, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(4, 30, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 60, new SignedNote(Note.D, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 120, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(0, 120, new SignedNote(Note.BREAK, Sign.NONE))
        ])
    ]);
});
test('FourFourthsTooShortFramingLastBarNotFilled', () => {
    debugger;
    let notes = [
        //Bar 1
        new FrameNote(4, 56, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 85, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 26, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(4, 53, new SignedNote(Note.E, Sign.NONE)),
        //Bar 2
        new FrameNote(4, 14, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 14, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 14, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 14, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 14, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 13, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 13, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 14, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 52, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(0, 58, new SignedNote(Note.BREAK, Sign.NONE)),
        //Bar 3
        new FrameNote(4, 14, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 13, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 14, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 14, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 14, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 13, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 13, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 13, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 28, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 29, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 25, new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(4, 29, new SignedNote(Note.B, Sign.NONE)),
        //Bar 4
        new FrameNote(4, 39, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 13, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 82, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(4, 27, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 56, new SignedNote(Note.D, Sign.NONE)),
        //Bar 5
        new FrameNote(4, 110, new SignedNote(Note.E, Sign.NONE))
    ];
    let result = GetBarBorders(notes, 4, 60);
    expect(result.bars).toEqual([
        new Bar([
            new FrameNote(4, 56, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 85, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 26, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(4, 53, new SignedNote(Note.E, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 14, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 14, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 14, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 14, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(4, 14, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 13, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 13, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 14, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 52, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(0, 58, new SignedNote(Note.BREAK, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 14, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 13, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 14, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 14, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 14, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 13, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 13, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 13, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 28, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 29, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 25, new SignedNote(Note.B, Sign.NONE)),
            new FrameNote(4, 29, new SignedNote(Note.B, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 39, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 13, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(4, 82, new SignedNote(Note.F, Sign.NONE)),
            new FrameNote(4, 27, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(4, 56, new SignedNote(Note.D, Sign.NONE))
        ]),
        new Bar([
            new FrameNote(4, 110, new SignedNote(Note.E, Sign.NONE)),
            new FrameNote(0, result.bars[4].notes[1].frames, new SignedNote(Note.BREAK, Sign.NONE))
        ])
    ]);
    expect(result.bars[4].notes[1].frames).toBeLessThanOrEqual(115);
    expect(result.bars[4].notes[1].frames).toBeGreaterThanOrEqual(105);
});
test('All my little ducks real input', () => {
    debugger;
    let notes = [
        //Bar 1
        new FrameNote(4, 36, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(0, 16.5, new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(4, 21, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 28.5, new SignedNote(Note.F, Sign.SHARP)),
        new FrameNote(4, 36.5, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 72, new SignedNote(Note.A, Sign.NONE)),
        //Bar 2
        new FrameNote(0, 35.5, new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(4, 35, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 178, new SignedNote(Note.B, Sign.NONE)),
        //Bar 3
        new FrameNote(0, 153.5, new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(7, 15, new SignedNote(Note.F, Sign.SHARP)),
        //Bar 4
        new FrameNote(4, 153.5, new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(0, 221, new SignedNote(Note.BREAK, Sign.NONE)),
        //Bar 5
        new FrameNote(4, 94, new SignedNote(Note.G, Sign.NONE)),
        //Bar 6
        new FrameNote(0, 28.5, new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(7, 77, new SignedNote(Note.F, Sign.SHARP)),
        new FrameNote(4, 222, new SignedNote(Note.A, Sign.NONE)),
        //Bar 7
        new FrameNote(4, 25, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(0, 30, new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(4, 24, new SignedNote(Note.D, Sign.NONE))];
    let result = GetBarBorders(notes, 4, 60);
    expect(result.bars).toEqual([
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
            //Should be around 136 
            new FrameNote(4, result.bars[1].notes[2].frames, new SignedNote(Note.B, Sign.NONE))
        ]),
        new Bar([
            //Should be around 42, together with above it should be exactly 178
            new FrameNote(4, result.bars[2].notes[0].frames, new SignedNote(Note.B, Sign.NONE)),
            new FrameNote(0, 153.5, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(7, 15, new SignedNote(Note.F, Sign.SHARP))
        ]),
        new Bar([
            new FrameNote(4, 153.5, new SignedNote(Note.B, Sign.NONE)),
            //Should be around 52
            new FrameNote(0, result.bars[3].notes[1].frames, new SignedNote(Note.BREAK, Sign.NONE))
        ]),
        new Bar([
            //Should be around 169, with above it has to be exactly 221
            new FrameNote(0, result.bars[4].notes[0].frames, new SignedNote(Note.BREAK, Sign.NONE)),
            //Should be around 40
            new FrameNote(4, result.bars[4].notes[1].frames, new SignedNote(Note.G, Sign.NONE)),
        ]),
        new Bar([
            //Should be around 54
            new FrameNote(4, result.bars[5].notes[0].frames, new SignedNote(Note.G, Sign.NONE)),
            new FrameNote(0, 28.5, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(7, 77, new SignedNote(Note.F, Sign.SHARP)),
            //Should be around 104
            new FrameNote(4, result.bars[5].notes[3].frames, new SignedNote(Note.A, Sign.NONE))
            ]),
        new Bar([
            //Should be around 118, with above should be exactly 222
            new FrameNote(4, result.bars[6].notes[0].frames, new SignedNote(Note.A, Sign.NONE)),
            new FrameNote(4, 25, new SignedNote(Note.D, Sign.NONE)),
            new FrameNote(0, 30, new SignedNote(Note.BREAK, Sign.NONE)),
            new FrameNote(4, 24, new SignedNote(Note.D, Sign.NONE)),
            //TODO: Fix error in beatcorrelator.
            //Should be around 30
            new FrameNote(0, result.bars[6].notes[4].frames, new SignedNote(Note.BREAK, Sign.NONE))
            ])
    ]);
    expect(result.ties).toEqual([
        1, 3, 4, 5
    ])
});