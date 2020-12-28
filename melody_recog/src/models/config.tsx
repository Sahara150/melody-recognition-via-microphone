import {Beat} from "./beats";
export const SMOOTHING_TRESHOLD = 7;
//Size of the ring used in beatCorrelator to calculate average frame size
export const RING_SIZE = 5;
export const STANDARD_FRAME_SIZE = 60;
//Part of STANDARD_FRAME_SIZE that is allowed to differ.
export const MAX_DIFF = 8;
//frequencies above this will be ignored as noice (should be configurable later on)
export const NOICE_CANCELLING = 3200;
//Aligns a sixteenth to 0
export const QUANTISIZE = 8;
export function GetFrameTreshold(beat: Beat) {
    switch(beat) {
        case Beat.SixEights: case Beat.NineEights: return 10;
        default: return 15;
    }
}
export const NOTELENGTHSTRINGS = [
    "16th",
    "eighth",
    "quarter",
    "half",
    "whole"
];