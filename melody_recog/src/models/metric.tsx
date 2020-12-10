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
    constructor(length: NoteLength, metric: Metric) {
        this.length = length;
        this.metric = metric;
    }
}