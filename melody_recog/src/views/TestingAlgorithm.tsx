import * as React from "react";
import { LOG_2, SCALE } from "../models/calculationData";
import { FrameNote, Note } from "../models/notes";
import { getFrameArray, getRefs } from "../sessionStorageHelper";

export class TestingAlgorithm extends React.Component<{}, { playing: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = {
            playing: false
        }
    }
    render() {
        return (<div className="flex align-horizontal">
            <button onClick={() => this.playOrStopPreSmoothed()} className="btn-dark centered">Spiele/Stoppe vorgeglättete Version</button>
            <button onClick={() => this.playOrStopNonSmoothed()} className="btn-dark centered">Spiele/Stoppe ungeglättete Version</button>
            <button onClick={() => this.playOrStopEqualAlloc()} className="btn-dark centered">Spiele/Stoppe gleichverteilte Version</button>
            </div>)
    }
    playOrStopPreSmoothed() { 
        let preSmoothed = getFrameArray("smoothed");
        this.playOrStop(preSmoothed);
    }
    playOrStopNonSmoothed() {
        let unSmoothed = getFrameArray("unsmoothed");
        this.playOrStop(unSmoothed);
    }
    playOrStopEqualAlloc() {
        let equalAlloc = getFrameArray("equalAlloc")
        this.playOrStop(equalAlloc);
    }
    playOrStop(frameNotes : FrameNote[]) {
        if (this.state.playing) {
            this.setState({ playing: false });
        } else {
            this.setState({
                playing: true
            }, () => this.play(frameNotes));
        }
    }
    play(frameNotes: FrameNote[]) {
            let audioContext = new (window.AudioContext)();
            let i = 0;
            let refFreq = getRefs().frequency ?? 0;
            const playNote = () => {
                let actualNote = frameNotes[i];
                if (actualNote.value.value != Note.BREAK) {
                    let osc = audioContext.createOscillator();
                    let halfTones = SCALE.findIndex(val => val.equals(actualNote.value));
                    let octaves = actualNote.octave
                    if (actualNote.value.value > Note.C) {
                        octaves--;
                    }
                    halfTones += (octaves - 4) * 12
                    let diff = Math.pow(Math.E, LOG_2 * halfTones / 12);
                    osc.frequency.value = refFreq * diff;
                    osc.connect(audioContext.destination);
                    osc.start(audioContext.currentTime);
                    osc.stop(audioContext.currentTime + actualNote.frames / 60);
                }
                i++;
                if (i < frameNotes.length && this.state.playing) {
                    setTimeout(playNote, actualNote.frames * 1000 / 60);
                } else {
                    this.setState({ playing: false });
                }
            }
            playNote();
    }
}