export class FrameNote {
    value: Note;
    octave: number;
    frames: number;
    chromaticSign : Sign
    constructor(value: Note, octave: number, frames: number, chromaticSign: Sign) {
        this.value = value;
        this.octave = octave;
        this.frames = frames;
        this.chromaticSign = chromaticSign;
    }
}
export enum Note {
    A,
    B,
    C,
    D,
    E,
    F,
    G
}
export enum Sign {
    SHARP,
    FLAT,
    NONE
}