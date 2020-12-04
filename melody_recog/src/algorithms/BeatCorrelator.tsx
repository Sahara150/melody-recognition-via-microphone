import { Bar, BarBorders } from "../models/bars";
import { FrameNote, Note, Sign, SignedNote } from "../models/notes";

export function GetBarBorders(input: FrameNote[], beatsPerBar: number, frameSize: number): BarBorders{
    return new BarBorders([], []);
}