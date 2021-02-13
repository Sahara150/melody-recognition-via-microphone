import React from "react";

export class FrameRateComponent extends React.Component<{ onChange: (update: number) => void, frameSize: number}, { frameSize: number }> {
    constructor(props: any) {
        super(props);
        this.state = {
            frameSize: props.frameSize
        };
    }
    render() {
        return (<div className={"flex float-left"}>
            <label htmlFor={"frames"}>Anzahl an Frames/Sekunde: </label>
            <input type="number" id={"frames"} value={this.state.frameSize} onChange={(e) => this.onValueChange(e)} />
            <label htmlFor={"tempo"}>Entspricht Geschwindigkeit(bpm) </label>
            <input type="number" id={"tempo"} value={3600 / this.state.frameSize} onChange={(e) => this.onValueChange(e)} />
            </div>
        )
    }
    onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        let frameSize: number;
        if (event.target.id === "frames") {
            frameSize = event.target.value as unknown as number;
        } else {
            frameSize = 3600 / (event.target.value as unknown as number);
        }
        this.setState({
            frameSize: frameSize
        });
        this.props.onChange(frameSize);
    }

}