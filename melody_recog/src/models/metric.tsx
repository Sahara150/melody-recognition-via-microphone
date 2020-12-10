import { SignedNote } from "./notes";

export enum NoteLength {
    SIXTEENTH,
    EIGHTH,
    QUARTER,
    HALF,
    FULL
}
export enum Metric {
    DUOLE,
    TRIOLE
}
export class MetricalNote {
    length!: NoteLength;
    metric!: Metric;
    note!: SignedNote;
    octave!: number;
    constructor(length: NoteLength, metric: Metric, note: SignedNote, octave: number) {
        this.length = length;
        this.metric = metric;
        this.note = note;
        this.octave = octave;
    }
}