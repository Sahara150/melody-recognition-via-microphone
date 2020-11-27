import { FrequencyFrames } from "../src/Analyzer";
import { CalculateFrameNotes } from "../src/Calculator";

test('EveryFrameNewNoteSimpleScale', () => {
    //C, D, E, F, G, alles vierte Oktave
    let freqFrames = [
        new FrequencyFrames(260, 10),
        new FrequencyFrames(290, 10),
        new FrequencyFrames(330, 10),
        new FrequencyFrames(350, 10),
        new FrequencyFrames(390, 10)
    ]
});

test('Breaks included', () => {

});
test('Multiple frames same note, no breaks', () => {

});
test('Breaks included, different octaves', () => {

});