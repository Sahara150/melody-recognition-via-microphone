import React from "react";
import { getContinuosMetronome, getFrameSize, getNoiceCancelling, setContinuosMetronome, setFrameSize, setNoiceCancelling } from "../helper/sessionStorageHelper";
import { FrameRateComponent } from "./FrameRateComponent";

export class SettingsPage extends React.Component<{informParent: () => void}, { continousMetronome: boolean, frameSize: number, noiceCancelling: number}> {
    constructor(props: any) {
        super(props);
        this.state = {
            continousMetronome: getContinuosMetronome(),
            frameSize: getFrameSize(),
            noiceCancelling: getNoiceCancelling()
        };
    }
    render() {
        return (
            <fieldset className="settingsPage">
                <legend className="bright bold big">Einstellungen</legend>
                <div className="flex">
                    <span> Soll das Metronom die ganze Zeit laufen?</span>
                    <div>
                        <label htmlFor="metronomeYes">Ja</label>
                        <input onChange={(event) => this.onMetronomeChanged(event) } type="radio" value="1" name="metronome" id="metronomeYes" checked={this.state.continousMetronome === true } />
                        <label htmlFor="metronomeNo">Nein</label>
                        <input onChange={(event) => this.onMetronomeChanged(event)} type="radio" value="0" name="metronome" id="metronomeNo" checked={ this.state.continousMetronome === false} />
                    </div>
                </div>
                <div className="flex">
                    <span> Passe die Geschwindigkeit an, mit der das Metronom ausgegeben wird.</span>
                    <FrameRateComponent onChange={(frameSize) => this.onFrameRateChanged(frameSize)} frameSize={this.state.frameSize}/>
                </div>
                <div className="flex">
                    <span> Bearbeite die Frequenz, ab der Input ignoriert wird. (Noice-Cancelling)</span>
                    <input type="number" onChange={(change) => this.onNoiceCancellingChanged(change) } value={this.state.noiceCancelling}/>
                </div>
                <div className="flex flex-row">
                    <button className="btn btn-dark" onClick={() => this.saveInfoAndInformParent() }>SPEICHERN</button>
                    <button className="btn btn-dark" onClick={() => this.cancelAndInformParent() }>ABBRECHEN</button>
                </div>
            </fieldset>
            )
    }
    onFrameRateChanged(frameSize: number) {
        var state = this.state;
        this.setState({
            continousMetronome: state.continousMetronome,
            frameSize: frameSize,
            noiceCancelling: state.noiceCancelling
        });
    }
    onNoiceCancellingChanged(event: React.ChangeEvent<HTMLInputElement>) {
        let cancelFrequency = event.target.value as unknown as number;
        let state = this.state;
        this.setState({
            continousMetronome: state.continousMetronome,
            frameSize: state.frameSize,
            noiceCancelling: cancelFrequency
        });
    }
    onMetronomeChanged(event: React.ChangeEvent<HTMLInputElement>) {
        let continuousMetronome: boolean;
        if (event.target.value === "0") {
            continuousMetronome = false;
        } else {
            continuousMetronome = true;
        }
        let state = this.state; 
        this.setState({
            continousMetronome: continuousMetronome,
            frameSize: state.frameSize,
            noiceCancelling: state.noiceCancelling
        });
    }
    saveInfoAndInformParent() {
        setFrameSize(this.state.frameSize);
        setContinuosMetronome(this.state.continousMetronome);
        setNoiceCancelling(this.state.noiceCancelling);
        this.props.informParent();
    }
    cancelAndInformParent() {
        this.props.informParent();
    }
}