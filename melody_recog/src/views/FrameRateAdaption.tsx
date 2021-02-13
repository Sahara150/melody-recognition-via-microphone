import React from "react";
import { FrameRateComponent } from "./FrameRateComponent";

export class FrameRateAdaption extends React.Component<{ onChange: (update: number) => void, frameSize: number, onSubmit: () => void }, { frameSize: number }> {
    constructor(props: any) {
        super(props);
        this.state = {
            frameSize : props.frameSize
        };
    }
    render() {
        return (<div className={"flex float-left"}>
            <FrameRateComponent onChange={(frameSize) => this.onValueChange(frameSize)} frameSize={this.props.frameSize}/>
            <button className={"btn btn-dark"} onClick={() => this.onSubmit() }>Rhythmus neu berechnen</button>
                </div>
        )
    }
    onValueChange(frameSize: number) {
        this.setState({
            frameSize: frameSize
        });
        this.props.onChange(frameSize);
    }
    onSubmit() {
        this.props.onSubmit();
    }
}