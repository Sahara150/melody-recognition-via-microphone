import * as React from "react";
import { unstable_batchedUpdates } from "react-dom";
import { LOG_2, SCALE } from "./Calculator";
import { FrameNote, Note } from "./notes";
import { getFrameArray, getRefs } from "./sessionStorageHelper";

export class TestingAlgorithm extends React.Component {
    render() {
        return (<div className="flex align-horizontal">
            <button onClick={() => this.playPreSmoothed()} className="btn-dark centered">Spiele vorgeglättete Version</button>
            <button onClick={() => this.playNonSmoothed()} className="btn-dark centered">Spiele ungeglättete Version</button>
            <button onClick={() => this.playEqualAlloc()} className="btn-dark centered">Spiele gleichverteilte Version</button>
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
    playEqualAlloc() {
        let equalAlloc = getFrameArray("equalAlloc")
        this.play(equalAlloc);
    }
    play(frameNotes : FrameNote[]) {
        let audioContext = new (window.AudioContext)();
        let i = 0;
        let refFreq = getRefs().frequency ?? 0;
        function playNote() {
            let actualNote = frameNotes[i];
            let osc = audioContext.createOscillator();
            let halfTones = SCALE.findIndex(val => val.equals(actualNote.value));
            let octaves = actualNote.octave
            if (actualNote.value.value > Note.C) {
                octaves--;
            }
            halfTones += (octaves - 4) * 12
            console.log("halfTones are " + halfTones);
            let diff = Math.pow(Math.E, LOG_2*halfTones/12);
            osc.frequency.value = refFreq * diff;
            osc.connect(audioContext.destination);
            osc.start(audioContext.currentTime);
            osc.stop(audioContext.currentTime + actualNote.frames / 60);
            i++;
            if (i < frameNotes.length) {
                setTimeout(playNote, actualNote.frames * 1000 / 60);
            }
        }
        playNote();
    }
}