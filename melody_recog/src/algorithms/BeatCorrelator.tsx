import { Bar, BarBorders } from "../models/bars";
import { FrameNote, Note, Sign, SignedNote } from "../models/notes";

const RING_SIZE = 5;
export function GetBarBorders(input: FrameNote[], beatsPerBar: number, frameSize: number): BarBorders{
    const MIN_FRAME_BORDER = frameSize - (frameSize / 8);
    const MAX_FRAME_BORDER = frameSize + (frameSize / 8);
    let frameSizes: number[] = [];
    let beatsLeft = beatsPerBar;
    let bars: Bar[] = [];
    let ties: number[] = [];
    let frameNum: number = 0;
    let fillerForNextBar: FrameNote[] = [];
    let beatsForNextBar: number = beatsPerBar;
    let filledFramesForNextBeat = 0;
    let i = 0;
    let fillerBars : Bar[] = [];
    while (i < input.length) {
        let notesForBar: FrameNote[] = fillerForNextBar;
        fillerForNextBar = [];
        beatsLeft = beatsForNextBar;
        beatsForNextBar = beatsPerBar;
        while (beatsLeft > 0) { 
            let thisFramesSize: number = filledFramesForNextBeat;
            filledFramesForNextBeat = 0;
            while (thisFramesSize < MIN_FRAME_BORDER && i < input.length) {
                notesForBar.push(input[i]);
                thisFramesSize += input[i].frames;
                i++;
            }
            if (thisFramesSize < MAX_FRAME_BORDER) {
                beatsLeft--;
                frameSizes[frameNum % RING_SIZE] = thisFramesSize;
                frameNum++;
            } else {
                let actualFrameSize = frameSizes.length == 0 ? frameSize : frameSizes.reduce((a, b) => a + b) / frameSizes.length;
                let beatsFilled = thisFramesSize / actualFrameSize;
                //Accept a little bit of inaccuracy 
                //(less than an 8th of a frame, since every syncope is at least a 10th)
                if (beatsFilled - beatsLeft <= 0.125) {
                    beatsFilled = Math.floor(beatsFilled);
                    for (let o = 0; o < beatsFilled; o++) {
                        frameSizes[frameNum % RING_SIZE] = actualFrameSize;
                        frameNum++;
                    }
                    filledFramesForNextBeat = thisFramesSize - beatsFilled * actualFrameSize;
                    beatsLeft -= beatsFilled;
                } else {
                    let partOfNewBar = (beatsFilled - beatsLeft) / beatsFilled;
                    let overFrames = Math.round(notesForBar[notesForBar.length - 1].frames * partOfNewBar);
                    let initialoverFrames = overFrames;
                    let oldNote = notesForBar[notesForBar.length - 1];
                    oldNote.frames -= overFrames;
                    let newNote : FrameNote;
                    actualFrameSize = Math.floor(actualFrameSize);
                    let tieCount = bars.length;
                    //Implement successful recognition of notes that go beyond two bars.
                    while(overFrames >= actualFrameSize*beatsPerBar) {
                    newNote = new FrameNote(oldNote.octave, actualFrameSize*beatsPerBar, oldNote.value);
                    overFrames-= actualFrameSize*beatsPerBar;
                    let bar = new Bar([newNote]);
                    ties.push(tieCount);
                    fillerBars.push(bar); 
                    tieCount++;
                    }
                    if(overFrames>0) {
                    newNote = new FrameNote(oldNote.octave, overFrames, oldNote.value);
                    fillerForNextBar.push(newNote);
                    ties.push(tieCount);
                    }
                    let fullBeatsPartOfNewBar = Math.floor(overFrames/actualFrameSize);
                    beatsForNextBar = beatsPerBar - fullBeatsPartOfNewBar;
                    filledFramesForNextBeat = thisFramesSize - oldNote.frames - Math.round(fullBeatsPartOfNewBar*actualFrameSize) - (initialoverFrames - overFrames);
                    beatsLeft = 0;
                }
            }
        }
        bars.push(new Bar(notesForBar));
        bars = bars.concat(fillerBars);
        fillerBars = [];
    }
    if(fillerForNextBar.length!=0) {
        let bar = new Bar(fillerForNextBar);
        bars.push(bar);
    }
    for (let i = 0; i < bars.length; i++) {
        console.log(`Bar ${i + 1}: ${JSON.stringify(bars[i].notes)}`);
    }
    console.log(ties);
    return new BarBorders(bars, ties);
}