import * as React from "react";
import * as ReactDOM from "react-dom";
import { ReactMic } from "@cleandersonlobo/react-mic";
import './styles/main.css';

type RecorderState = { recording: boolean };
class Recorder extends React.Component<{}, RecorderState> {
	constructor(props: {}) {
		super(props);
		this.state = {
			recording: false,
        };
    }
    render() : React.ReactNode {
		return (<div className="flex">
					<div className="centered upper-third no-background"><span className="bold big">Bitte singe ein A</span></div>
					<div id="microphone_container">
				<ReactMic record={this.state.recording}
					onStop={this.onStop}/>
					</div>
			<button className="centered btn-dark" id="RecordButton" onClick={this.changeRecordStatus}>{this.state.recording == true ? "STOP RECORDING" : "RECORD"}</button>
			
				</div>)
	}
	onStop(recordedBlob: any) {
		console.log('recordedBlob is: ', recordedBlob);
	}
	changeRecordStatus() {
		this.setState({ recording: !this.state.recording });
    }
}
ReactDOM.render(
    <Recorder />,
    document.getElementById('root')
);


