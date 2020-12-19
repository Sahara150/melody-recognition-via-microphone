import React from "react";
import { FrameAdaption } from "../models/frameAdaption";

export class FrameRateAdaption extends React.Component<{ onChange: (update: FrameAdaption[]) => void, framesAdapted: FrameAdaption[] }, { framesAdapted: FrameAdaption[] }> {
    constructor(props: any) {
        super(props);
        this.state = {
            framesAdapted: props.framesAdapted
        };
    }
    render() {
        return (<><ul>
            {this.state.framesAdapted.map(function(adaption, index) {
                return <li key={index}>
                    <label htmlFor={index + "frames"}>Anzahl an Frames: </label>
                    <input type="number" id={index + "frames"} value={adaption.frameSize} />
                    <label htmlFor={index + "tempo"}>Entspricht Geschwindigkeit(bpm) </label>
                    <input type="number" id={index + "tempo"} value={3600 / adaption.frameSize} />
                    <label htmlFor={index + "beginningBar"}>Starttakt:</label>
                    <input type="number" id={index + "beginningBar"} value={adaption.beginningBar} />
                    <label htmlFor={index + "endBar"}>Endtakt (inklusiv):</label>
                    <input type="number" id={index + "endBar"} value={adaption.endBar} />
                </li>;
            })}
        </ul>
            <button className="btn btn-dark" onClick={() => this.addItem()}>Neue Anpassung hinzufügen.</button></>
        )
    }
    onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        /*let chosen = event.target.value as string;
        this.setState({
            chosen: chosen
        })*/
    }
    addItem() {
        console.log("Got called.");
        let list = this.state.framesAdapted;
        list.push(new FrameAdaption(60, 0, 0));
        this.setState({
            framesAdapted: list
        });
        this.props.onChange(list);
        this.forceUpdate();
    }
}