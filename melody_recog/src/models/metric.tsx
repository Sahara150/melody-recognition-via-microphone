import { LOG_2 } from "./calculationData";
import { SignedNote } from "./notes";

export enum NoteLength {
    SIXTEENTH,
    EIGHTH,
    QUARTER,
    HALF,
    FULL
}
export enum Extension {
    NODOT,
    ONEDOT,
    TWODOTS
}
export enum Metric {
    STANDARD,
    TRIOLE
}
export class MetricalNote {
    length!: NoteLength;
    metric!: Metric;
    extension!: Extension;
    note!: SignedNote;
    octave!: number;
    constructor(length: NoteLength, metric: Metric, extension: Extension, note: SignedNote, octave: number) {
        this.length = length;
        this.metric = metric;
        this.extension = extension;
        this.note = note;
        this.octave = octave;
    }
}
export class Triole extends MetricalNote {
    trioleType!: NoteLength;
    isStart!: boolean;
    isEnd!: boolean;
    constructor(note: MetricalNote, trioleType: NoteLength, isStart: boolean = false, isEnd: boolean = false) {
        super(note.length, note.metric, note.extension, note.note, note.octave);
        this.trioleType = trioleType;
        this.isStart = isStart;
        this.isEnd = isEnd;
    }
}
//Value is always given in multiple of fourths
export function getLengthValue(note : MetricalNote) : number {
    let base = Math.exp(note.length*LOG_2)/4;
    if (note.metric == Metric.TRIOLE) {
        base *= 2 / 3;
    }
    switch (note.extension) {
        case Extension.ONEDOT: base *= 3 / 2; break;
        case Extension.TWODOTS: base *= 7 / 4; break;
    }
    base = Math.round(base*100)/100;
    return base;
}