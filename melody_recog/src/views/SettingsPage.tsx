import React from "react";
import { getFrameSize } from "../helper/sessionStorageHelper";
import { NOICE_CANCELLING } from "../models/config";
import { FrameRateComponent } from "./FrameRateComponent";

export class SettingsPage extends React.Component {
    render() {
        return (
            //Settings for noice cancellor, tempo and metronome
            //TODO: Fetch noice_cancelling and metronome settings from sessionStorageHelper and react on value changes
            <div className="settingsPage">
                <div className="flex">
                    <span> Soll das Metronom die ganze Zeit laufen?</span>
                    <div>
                        <label htmlFor="metronomeYes">Ja</label>
                        <input type="radio" value={1} name="metronome" id="metronomeYes" />
                        <label htmlFor="metronomeNo">Nein</label>
                        <input type="radio" value={0} name="metronome" id="metronomeNo" />
                    </div>
                </div>
                <div className="flex">
                    <span> Passe die Geschwindigkeit an, mit der das Metronom ausgegeben wird.</span>
                    <FrameRateComponent onChange={(frameSize) => this.onFrameRateChanged(frameSize)} frameSize={getFrameSize()}/>
                </div>
                <div className="flex">
                    <span> Bearbeite die Frequenz, ab der Input ignoriert wird. (Noice-Cancelling)</span>
                    <input type="number" readOnly value={NOICE_CANCELLING}/>
                </div>
                <div className="flex flex-row">
                    <button className="btn btn-dark">SPEICHERN</button>
                    <button className="btn btn-dark">ABBRECHEN</button>
                </div>
            </div>
            )
    }
    onFrameRateChanged(frameSize: number) {

    }
}