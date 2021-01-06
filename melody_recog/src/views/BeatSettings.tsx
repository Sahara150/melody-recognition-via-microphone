import * as React from "react";
import { Beat } from "../models/beats";
import { saveReferenceBeat } from "../helper/sessionStorageHelper";

export class BeatSettings extends React.Component<{ notifyParent: Function }, { beatChosen: Beat } > {
    constructor(props: any) {
        super(props);
        this.state = {
            beatChosen: Beat.FourFourths
        }
    }
    render() {
        return (<div className="flex">
            <span className="centered bold big">Bitte wähle die Taktart, die dein Stück haben soll.</span>
            <div className="align-horizontal container flex">
                <input type="radio" id="ThreeHalfs" name="beat" value={Beat.ThreeHalfs} checked={this.state.beatChosen === Beat.ThreeHalfs} onChange={(event)=>this.onValueChange(event) }/>
                <label htmlFor="ThreeHalfs">3/2</label>
                <input type="radio" id="TwoFourths" name="beat" value={Beat.TwoFourths} checked={this.state.beatChosen === Beat.TwoFourths} onChange={(event) => this.onValueChange(event)}/>
                <label htmlFor="TwoFourths">2/4</label>
                <input type="radio" id="ThreeFourths" name="beat" value={Beat.ThreeFourths} checked={this.state.beatChosen === Beat.ThreeFourths} onChange={(event) => this.onValueChange(event)} />
                <label htmlFor="ThreeFourths">3/4</label>
                <input type="radio" id="FourFourths" name="beat" value={Beat.FourFourths} checked={this.state.beatChosen === Beat.FourFourths} onChange={(event) => this.onValueChange(event)} />
                <label htmlFor="FourFourths">4/4</label>
                <input type="radio" id="FiveFourths" name="beat" value={Beat.FiveFourths} checked={this.state.beatChosen === Beat.FiveFourths} onChange={(event) => this.onValueChange(event)} />
                <label htmlFor="FiveFourths">5/4</label>
                <input type="radio" id="SixEights" name="beat" value={Beat.SixEights} checked={this.state.beatChosen === Beat.SixEights} onChange={(event) => this.onValueChange(event)} />
                <label htmlFor="SixEights">6/8</label>
                <input type="radio" id="NineEights" name="beat" value={Beat.NineEights} checked={this.state.beatChosen === Beat.NineEights} onChange={(event) => this.onValueChange(event)} />
                <label htmlFor="NineEights">9/8</label>
            </div>
            <button className="btn-dark centered" onClick={()=> this.saveReference() }>SUBMIT</button>
            </div>);
    }
    onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        let beat = event.target.value as Beat
        this.setState({
            beatChosen: beat
        });
    }
    saveReference() {
        saveReferenceBeat(this.state.beatChosen);
        this.props.notifyParent();
    }
}