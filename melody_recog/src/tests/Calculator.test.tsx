import { FrequencyFrames } from "../models/frequencyframes";
import { CalculateFrameNotes } from "../Calculator";
import { FrameNote, Note, Sign, SignedNote } from "../models/notes";

test('EveryFrameNewNoteSimpleScale', () => {
    //C, D, E, F, G, A, H alles vierte Oktave
    let freqFrames = [
        new FrequencyFrames(260, 10),
        new FrequencyFrames(290, 10),
        new FrequencyFrames(330, 10),
        new FrequencyFrames(350, 10),
        new FrequencyFrames(390, 10),
        new FrequencyFrames(438, 10),
        new FrequencyFrames(490, 10)
    ]
    let result = CalculateFrameNotes(freqFrames, 440);
    expect(result).toEqual([
        new FrameNote(4, 10, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(4, 10, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 10, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 10, new SignedNote(Note.F, Sign.NONE)),
        new FrameNote(4, 10, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 10, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 10, new SignedNote(Note.B, Sign.NONE))
    ])
});

test('Breaks included', () => {
    //D,E,F#,G,A,BREAK,A,B,BREAK,B,BREAK,B,BREAK,B,A
    //All my little ducks, intro
    let freqFrames = [
        new FrequencyFrames(290, 10),
        new FrequencyFrames(330, 10),
        new FrequencyFrames(370, 10),
        new FrequencyFrames(390, 10),
        new FrequencyFrames(440, 15),
        new FrequencyFrames(undefined, 5),
        new FrequencyFrames(440, 20),
        new FrequencyFrames(490, 10),
        new FrequencyFrames(undefined, 5),
        new FrequencyFrames(490, 10),
        new FrequencyFrames(undefined, 5),
        new FrequencyFrames(490, 10),
        new FrequencyFrames(undefined, 5),
        new FrequencyFrames(490, 10),
        new FrequencyFrames(440, 20)
    ];
    let result = CalculateFrameNotes(freqFrames, 440);
    expect(result).toEqual([
        new FrameNote(4, 10, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(4, 10, new SignedNote(Note.E, Sign.NONE)),
        new FrameNote(4, 10, new SignedNote(Note.F, Sign.SHARP)),
        new FrameNote(4, 10, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(4, 15, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(0, 5,  new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(4, 20, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(4, 10, new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(0, 5,  new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(4, 10, new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(0, 5,  new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(4, 10, new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(0, 5,  new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(4, 10, new SignedNote(Note.B, Sign.NONE)),
        new FrameNote(4, 20, new SignedNote(Note.A, Sign.NONE))
    ])
});
test('Multiple frames same note, no breaks', () => {
    let freqFrames = [
        new FrequencyFrames(290, 10),
        new FrequencyFrames(295, 10),
        new FrequencyFrames(288, 10),
        new FrequencyFrames(290, 10)
    ];
    let result = CalculateFrameNotes(freqFrames, 440);
    expect(result).toEqual([
        new FrameNote(4, 40, new SignedNote(Note.D, Sign.NONE))
    ]);
});
test('Breaks included, different octaves', () => {
    //2x G1, 1x BREAK, 3x A4, 2x A5, 1x C3, 2x BREAK, 2x D2, 1x G#5, 1x A0
    let freqFrames = [
        new FrequencyFrames(49, 10),
        new FrequencyFrames(48, 10),
        new FrequencyFrames(undefined, 10),
        new FrequencyFrames(438, 10),
        new FrequencyFrames(442, 10),
        new FrequencyFrames(440, 10),
        new FrequencyFrames(870, 10),
        new FrequencyFrames(885, 10),
        new FrequencyFrames(130, 10),
        new FrequencyFrames(undefined, 10),
        new FrequencyFrames(undefined, 10),
        new FrequencyFrames(73, 10),
        new FrequencyFrames(75, 10),
        new FrequencyFrames(830, 10),
        new FrequencyFrames(27, 10)
    ]
    let result = CalculateFrameNotes(freqFrames, 440);
    expect(result).toEqual([
        new FrameNote(1, 20, new SignedNote(Note.G, Sign.NONE)),
        new FrameNote(0, 10, new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(4, 30, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(5, 20, new SignedNote(Note.A, Sign.NONE)),
        new FrameNote(3, 10, new SignedNote(Note.C, Sign.NONE)),
        new FrameNote(0, 20, new SignedNote(Note.BREAK, Sign.NONE)),
        new FrameNote(2, 20, new SignedNote(Note.D, Sign.NONE)),
        new FrameNote(5, 10, new SignedNote(Note.G, Sign.SHARP)),
        new FrameNote(0, 10, new SignedNote(Note.A, Sign.NONE))
    ])
});