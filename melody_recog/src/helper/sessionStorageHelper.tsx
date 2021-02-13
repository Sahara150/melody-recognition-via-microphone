import {Beat} from "../models/beats"
import { CONTINUOUS_METRONOME, NOICE_CANCELLING, STANDARD_FRAME_SIZE } from "../models/config";
import { Key, Mode } from "../models/keys";
import { FrameNote, Note, Sign, SignedNote } from "../models/notes";
const frequencyKey = "frequencyRef";
const beatKey = "beatRef";
const xmlKey = "sheet";
const frameSizeKey = "frameSize";
const chosenAlgKey = "chosenAlg";
const keyKey = "key";
const metronomeKey = "metronome";
const noiceKey = "noice_treshold";
export function saveReferenceFrequency(frequency: number) {
    let myStorage = window.sessionStorage;
    myStorage.setItem(frequencyKey, `${frequency}`);
}
export function saveReferenceBeat(beat: Beat) {
    let myStorage = window.sessionStorage;
    myStorage.setItem(beatKey, beat);
}
export function getRefs(): { frequency: number | null, beat: Beat | null} {
    let myStorage = window.sessionStorage;
    let freqStr = myStorage.getItem(frequencyKey);
    let frequency: number | null = freqStr as unknown as number;
    let beatStr = myStorage.getItem(beatKey);
    let beat: Beat | null = null;
    if (beatStr !== (undefined || null)) {
        beat = beatStr as Beat;
    }
    return {frequency, beat};
}
export function saveFrameArray(notes: FrameNote[], key: string) {
    let myStorage = window.sessionStorage;
    myStorage.setItem(key, JSON.stringify(notes));
}
export function getFrameArray(key: string): FrameNote[] {
    let myStorage = window.sessionStorage;
    let strNotes = myStorage.getItem(key) ?? "[]";
    return JSON.parse(strNotes);
}
export function saveFileURL(url: string) {
    let myStorage = window.sessionStorage;
    myStorage.setItem(xmlKey, url);
}
export function getFileURL(): string | null {
    let myStorage = window.sessionStorage;
    let result = myStorage.getItem(xmlKey);
    return result;
}
export function getFrameSize(): number {
    let myStorage = window.sessionStorage;
    let result = myStorage.getItem(frameSizeKey);
    if (result) {
        return result as unknown as number;
    } else {
        return STANDARD_FRAME_SIZE; 
    }
}
export function setFrameSize(size: number) {
    let myStorage = window.sessionStorage;
    myStorage.setItem(frameSizeKey, size.toString());
}
export function getContinuosMetronome() : boolean {
    let myStorage = window.sessionStorage;
    let result = myStorage.getItem(metronomeKey);
    if (result) {
        return result === "true";
    } else {
        return CONTINUOUS_METRONOME;
    }
}
export function setContinuosMetronome(continuos: boolean) {
    let myStorage = window.sessionStorage;
    myStorage.setItem(metronomeKey, `${continuos}`);
}
export function getNoiceCancelling() : number {
    let myStorage = window.sessionStorage;
    let result = myStorage.getItem(noiceKey);
    if (result) {
        return result as unknown as number;
    } else {
        return NOICE_CANCELLING;
    }
}
export function setNoiceCancelling(frequency: number) {
    let myStorage = window.sessionStorage;
    myStorage.setItem(noiceKey, frequency.toString());
}
export function getChosenAlg(): string | null {
    let myStorage = window.sessionStorage;
    return myStorage.getItem(chosenAlgKey);
}
export function setChosenAlg(chosen: string) {
    let myStorage = window.sessionStorage;
    myStorage.setItem(chosenAlgKey, chosen);
}
export function setKey(key: Key) {
    let myStorage = window.sessionStorage;
    myStorage.setItem(keyKey, JSON.stringify(key));
}
export function getKey(): Key {
    let myStorage = window.sessionStorage;
    let key = myStorage.getItem(keyKey);
    if (key) {
        return JSON.parse(key) as Key;
    }
    return new Key(new SignedNote(Note.C, Sign.NONE), Mode.MAJOR);
}
export function clearStorage() {
    let myStorage = window.sessionStorage;
    myStorage.clear();
}