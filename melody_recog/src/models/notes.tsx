export class FrameNote {
    value: SignedNote;
    octave: number;
    frames: number;
    constructor(octave: number, frames: number, signedNote: SignedNote) {
        this.value = signedNote;
        this.octave = octave;
        this.frames = frames;
    }
}
export enum Note {
    A = "A",
    B = "B",
    C = "C",
    D = "D",
    E = "E",
    F = "F",
    G = "G",
    BREAK = "BREAK"
}
export class SignedNote {
    value: Note;
    sign: Sign;
    constructor(value: Note, sign: Sign) {
        this.value = value;
        this.sign = sign;
    }
    equals(other: SignedNote) : boolean {
        return this.value === other.value && this.sign === other.sign;
    }
}
export enum Sign {
    SHARP = 1,
    FLAT = -1,
    NONE = 0
}