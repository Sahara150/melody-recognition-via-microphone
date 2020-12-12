import {Beat} from "./models/beats"
import { FrameNote } from "./models/notes";
var frequencyKey = "frequencyRef";
var beatKey = "beatRef";
var xmlKey = "sheet";
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
    if (beatStr != undefined || null) {
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