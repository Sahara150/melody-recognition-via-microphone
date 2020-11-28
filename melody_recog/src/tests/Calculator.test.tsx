import { FrequencyFrames } from "../Analyzer";
import { CalculateFrameNotes } from "../Calculator";
import { FrameNote, Note, Sign, SignedNote } from "../notes";

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

});
test('Breaks included, different octaves', () => {

});