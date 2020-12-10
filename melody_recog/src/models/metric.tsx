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