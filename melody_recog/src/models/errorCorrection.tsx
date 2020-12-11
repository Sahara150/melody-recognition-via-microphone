import { MetricalNote } from "./metric";

export class ErrorMapping {
    higherValue!: MetricalNote;
    lowerValue!: MetricalNote;
    constructor(higherValue: MetricalNote, lowerValue: MetricalNote) {
        this.higherValue = higherValue;
        this.lowerValue = lowerValue;
    }
}