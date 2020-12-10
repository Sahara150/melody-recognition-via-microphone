import { MetricalNote } from "./metric";
import { FrameNote } from "./notes";

export class Bar {
    notes!: FrameNote[]
    constructor(notes: FrameNote[]) {
        this.notes = notes;
    }
}
/*Saves list of bars with info about ties to next bar*/
export class BarBorders {
    bars!: Bar[]
    //Tells which index in bars is tied to next bar
    ties!: number[]
    constructor(bars: Bar[], ties: number[]) {
        this.bars = bars;
        this.ties = ties;
    }
}
export class MetricalBar {
    notes!: MetricalNote[]
    constructor(notes: MetricalNote[]) {
        this.notes = notes;
    }
}