import * as React from "react";
import { unstable_batchedUpdates } from "react-dom";
import { LOG_2, SCALE } from "./Calculator";
import { FrameNote } from "./notes";
import { getFrameArray, getRefs } from "./sessionStorageHelper";

export class TestingAlgorithm extends React.Component {
    render() {
        return (<div>
            <button onClick={() => this.playPreSmoothed()} className="btn-dark centered">Spiele vorgeglättete Version</button>
            <button onClick={() => this.playNonSmoothed()} className="btn-dark centered">Spiele ungeglättete Version</button>
            </div>)
    }
    playPreSmoothed() {
        let preSmoothed = getFrameArray("smoothed");
        this.play(preSmoothed);
    }
    playNonSmoothed() {
        let unSmoothed = getFrameArray("unsmoothed");
        this.play(unSmoothed);
    }
    play(frameNotes : FrameNote[]) {
        let audioContext = new (window.AudioContext)();
        let i = 0;
        function playNote() {
            let actualNote = frameNotes[i];
            let osc = audioContext.createOscillator();
            let halfTones = SCALE.findIndex(val => val.equals(actualNote.value));
            halfTones += (actualNote.octave - 4) * 12
            console.log("halfTones are " + halfTones);
            let refFreq = getRefs().frequency ?? 0;
            let diff = LOG_2 * Math.pow(Math.E, halfTones) / 12;
            osc.frequency.value = refFreq * diff;
            osc.connect(audioContext.destination);
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + actualNote.frames / 1000 * 60);
            i++;
            if (i < frameNotes.length) {
                setTimeout(playNote, actualNote.frames * 1000 / 60);
            }
        }
        playNote();
    }
}