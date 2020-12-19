import { isNullishCoalesce } from "typescript";
import { Bar, BarBorders, MetricalBar } from "../models/bars";
import { Beat, getAmountOfBeats, getLengthValueDenominator, getNumerator, getPositionShift } from "../models/beats";
import { ErrorMappingListStandard, ErrorMappingListTriolic, SCALE } from "../models/calculationData";
import { GetFrameTreshold, MAX_DIFF, RING_SIZE } from "../models/config";
import { ErrorMapping } from "../models/errorCorrection";
import { Extension, getLengthValue, Metric, MetricalNote, NoteLength } from "../models/metric";
import { FrameNote, Note, Sign, SignedNote } from "../models/notes";

export function GetBarBorders(input: FrameNote[], beatsPerBar: number, frameSize: number): BarBorders{
    
    const MIN_FRAME_BORDER = frameSize - (frameSize / MAX_DIFF);
    const MAX_FRAME_BORDER = frameSize + (frameSize / MAX_DIFF);
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
                //The input is over, but the last beat not yet filled.
                if (thisFramesSize < MIN_FRAME_BORDER) {
                    let actualFrameSize = frameSizes.length == 0 ? frameSize : frameSizes.reduce((a, b) => a + b) / frameSizes.length;
                    let newNote = new FrameNote(0, Math.round(actualFrameSize*beatsLeft-thisFramesSize), new SignedNote(Note.BREAK, Sign.NONE));
                    notesForBar.push(newNote);
                    beatsLeft = 0;
                } else {
                beatsLeft--;
                frameSizes[frameNum % RING_SIZE] = thisFramesSize;
                    frameNum++;
                }
            } else {
                let actualFrameSize = frameSizes.length == 0 ? frameSize : frameSizes.reduce((a, b) => a + b) / frameSizes.length;
                let beatsFilled = thisFramesSize / actualFrameSize;
                //Accept a little bit of inaccuracy 
                //(less than an 8th of a frame, since every syncope is at least a 6th)
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
                    while (overFrames >= actualFrameSize * beatsPerBar) {
                        //Checks if the frames over are less than the smallest beat and if so just adds them to the last bar.
                        let framesUsed = overFrames - (actualFrameSize * beatsPerBar) < actualFrameSize/MAX_DIFF ? overFrames : actualFrameSize*beatsPerBar;
                        newNote = new FrameNote(oldNote.octave, framesUsed, oldNote.value);
                        overFrames-= framesUsed;
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
    return new BarBorders(bars, ties);
}

export function GetMusicalBar(input: Bar, metric: Beat): MetricalBar{
    //TODO: If frame is lower than frame-treshold, it should be assigned to the most likely neighbor
    let beats = getNumerator(metric);
    let totalLength = input.notes.map(a => a.frames).reduce((a, b) => a + b);
    let notes: MetricalNote[] = [];
    for (let i = 0; i < input.notes.length; i++) {
        //Scaling length up, so that with log2 it starts with 0.
        let newNote = GetMetricalNote(input.notes[i], beats, metric, totalLength);
        if(newNote.length < NoteLength.SIXTEENTH) {
           let dir = AssignmentProbable(input.notes, i, metric, totalLength/getAmountOfBeats(metric));
           input.notes[i+dir].frames += input.notes[i].frames; 
           if(dir < 0) {
            //If before note should have got this added, recalculate before note
             notes[notes.length-1] = GetMetricalNote(input.notes[i+dir], beats, metric, totalLength);   
           }
        } else if (newNote.length == NoteLength.SIXTEENTH && (newNote.extension == Extension.ONEDOT || newNote.extension == Extension.TWODOTS)) {
            //Dotted and double dotted sixteenths themself might be theoretically allowed,
            //though they imply, that a 32th or even 64th needs to exist and lead to invalid bars,
            //because the program is not able to fix that gap
            //Therefore due to styling decisions a double dotted sixteenth can be seen as approximately an eight
            if (newNote.extension == Extension.TWODOTS) {
                newNote.extension = Extension.NODOT;
                newNote.length = NoteLength.EIGHTH;
            } else {
                //One dotted sixteenths will be assumed a triole in this step, 
                //because it is the closest.
                newNote.extension = Extension.NODOT;
                newNote.length = NoteLength.EIGHTH;
                newNote.metric = Metric.TRIOLE;
            }
        } else {
        notes.push(newNote);
        }
    }
    notes = CheckForMusicalValidity(notes, metric);
    let result: MetricalBar = new MetricalBar(notes);
    return result;
}
function GetMetricalNote(note: FrameNote, beats: number, metric: Beat, totalLength: number) : MetricalNote{
    let length = (note.frames * beats * 8) / totalLength;
    let scaledLength = Math.log2(length);
    let assumption = RoundAdapted(scaledLength);
    let shift = getPositionShift(metric);
    return new MetricalNote(assumption[0] + shift, assumption[1], assumption[2], note.value, note.octave);
}
function RoundAdapted(scaledLength: number): [number, Metric, Extension] {
    let lefti = scaledLength % 1;
    //Value is closer to lower length.
    if (lefti < 0.3) {
        return [Math.floor(scaledLength), Metric.STANDARD, Extension.NODOT];
        //Out of experience, 0.3 to 0.5 tends to be a triolic higher one
        //Cause logarithm moves the border a bit
    } else if (lefti < 0.52) {
        return [Math.ceil(scaledLength), Metric.TRIOLE, Extension.NODOT];
        //Dotted lower length is longer than triolic higher length
    } else if (lefti < 0.7) {
        return [Math.floor(scaledLength), Metric.STANDARD, Extension.ONEDOT];
        //Double dotted lower length
    } else if (lefti < 0.9) {
        return [Math.floor(scaledLength), Metric.STANDARD, Extension.TWODOTS];
    } else {
        return [Math.ceil(scaledLength), Metric.STANDARD, Extension.NODOT];
    }
}
function MusicalVariance(input: MetricalNote[], metric: Beat): number {
    let shouldBe = getNumerator(metric) * getLengthValueDenominator(metric);
    let isCurr = input.map(x => getLengthValue(x)).reduce((a, b) => a + b);
    return shouldBe-isCurr;
}
export function CheckForMusicalValidity(input: MetricalNote[], metric: Beat): MetricalNote[] {
    let shouldBe = getNumerator(metric) * getLengthValueDenominator(metric);
    let isCurr = input.map(x => getLengthValue(x)).reduce((a, b) => a + b);
    let amountOfErrors = 1;
    while(Math.abs(shouldBe-isCurr)/amountOfErrors>0.02) {
        let errornousValue = GetProbableError((shouldBe - isCurr)/amountOfErrors);
        for (let n = 0; n < errornousValue.length; n++) {
                let currError = shouldBe > isCurr ? errornousValue[n].lowerValue : errornousValue[n].higherValue;
                let wouldBe = shouldBe > isCurr ? errornousValue[n].higherValue : errornousValue[n].lowerValue;
                let errornous = input.filter(val => val.extension == currError.extension && val.length == currError.length && val.metric == currError.metric);
                let index = 0;
                while (errornous.length>index) {
                    let wrongNote = errornous[0];
                    wrongNote.extension = wouldBe.extension;
                    wrongNote.length = wouldBe.length;
                    wrongNote.metric = wouldBe.metric;
                    isCurr = input.map(x => getLengthValue(x)).reduce((a, b) => a + b);
                    amountOfErrors--;
                    index++;
                    if (amountOfErrors == 0) {
                        break;
                    }
                }
        }
        amountOfErrors++;
    }
    return input;
}
function GetProbableError(diff: number) : ErrorMapping[]{
    let abs = Math.abs(diff);
    let logVal = Math.log2(abs);
    //It is an error with a triolic misassumption
    if (Math.abs(logVal) % 1 > 0.1) {
        abs *= 3;
        logVal = Math.log2(abs);
        logVal = Math.round(logVal);
        let errorMapping: ErrorMapping[] = JSON.parse(JSON.stringify(ErrorMappingListTriolic));
        errorMapping.forEach(val => { val.higherValue.length += logVal; val.lowerValue.length += logVal });
        return errorMapping.filter(value =>
            !(value.higherValue.length < NoteLength.SIXTEENTH
            || value.lowerValue.length < NoteLength.SIXTEENTH
            || value.higherValue.length > NoteLength.FULL 
            || value.lowerValue.length > NoteLength.FULL
            || (value.lowerValue.length == NoteLength.SIXTEENTH && value.lowerValue.extension != Extension.NODOT)
            || (value.higherValue.length == NoteLength.SIXTEENTH && value.higherValue.extension != Extension.NODOT)));
    } else {
        logVal = Math.round(logVal);
        //To align it at 0 for highest value
        logVal++;
        let errorMapping: ErrorMapping[] = JSON.parse(JSON.stringify(ErrorMappingListStandard));
        errorMapping.forEach(val => { val.higherValue.length += logVal; val.lowerValue.length += logVal });
        errorMapping = errorMapping.filter(value =>
            !(value.higherValue.length < NoteLength.SIXTEENTH
                || value.lowerValue.length < NoteLength.SIXTEENTH
                || value.higherValue.length > NoteLength.FULL
                || value.lowerValue.length > NoteLength.FULL
                || (value.lowerValue.length == NoteLength.SIXTEENTH && value.lowerValue.extension != Extension.NODOT)
                || (value.higherValue.length == NoteLength.SIXTEENTH && value.higherValue.extension != Extension.NODOT)));
        if (diff < 0) {
            return errorMapping;
        } else {
            return errorMapping.reverse();;
        }
    }
}
function AssignmentProbable(input : FrameNote[], index: number, metric: Beat, assumedFrameRate: number) : number {
    let moduloDivisor : number = 1;
    switch(metric) {
        case Beat.SixEights: case Beat.NineEights: moduloDivisor = assumedFrameRate/6; break;
        default: moduloDivisor = assumedFrameRate/4;
    }
    if(index > 0 && index<input.length-1) {
    let addToEarlier = input[index].frames + input[index-1].frames;
    let addToLater = input[index].frames + input[index+1].frames;
    addToEarlier %= moduloDivisor;
    addToLater %= moduloDivisor;
    addToEarlier = addToEarlier <= moduloDivisor/2 ? addToEarlier: Math.abs(moduloDivisor-addToEarlier);
    addToLater = addToLater <= moduloDivisor/2 ? addToLater: Math.abs(moduloDivisor-addToLater);
    if(addToEarlier > addToLater) {
        return 1;
    } else {
        return -1;
    }
    //If there exists no note to the right/left of the given index 
    //it should just return the direction, where a note exists
    } else {
        return index <= 0 ? 1 : -1;
    }
}