import {Beat} from "./beats"
var frequencyKey = "frequencyRef";
var beatKey = "beatRef";
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