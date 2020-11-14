import * as React from "react";
import * as ReactDOM from "react-dom";
import { ReactMic } from "@cleandersonlobo/react-mic";
import * as Analyzer from "./Analyzer";
import './styles/main.css';

type RecorderState = { recording: boolean, referenceFrequency: number | null, referenceBeat: number |null };
class Recorder extends React.Component<{}, RecorderState> {
	constructor(props: {}) {
		super(props);
		/*TODO: Check, if there is a reference note.
		 If it is, change span to "Singe die Melodie ein" 
		 and extend the changeRecordStatus method to check for it 
		 and call metronome method in case there is a reference Note.*/
		this.state = {
			recording: false,
			referenceFrequency: null,
			referenceBeat: null
		};
	}
	
	render(): React.ReactNode {
		
		return (<div className="flex">
					<div className="centered upper-third no-background"><span className="bold big">Bitte singe ein A</span></div>
					<div id="microphone_container">
				<ReactMic record={this.state.recording}
					onStop={(recordedBlob)=>this.onStop(recordedBlob)}/>
					</div>
			<button className="centered btn-dark" id="RecordButton" onClick={()=>this.changeRecordStatus()}>{this.state.recording == true ? "STOP RECORDING" : "RECORD"}</button>
			
				</div>)
	}
	onStop(recordedBlob: any) {
		//Fetching data from Blob and decoding it.
		console.log('recordedBlob is: ', recordedBlob);
		const reader = new FileReader();
		const audioContext = new AudioContext();
		reader.addEventListener('loadend', () => {
			// reader.result contains the contents of blob as a typed array
			console.log("Typed array before decode");
			console.log(reader.result);
			audioContext.decodeAudioData(reader.result as ArrayBuffer).then((audiobuffer: AudioBuffer) => {
				console.log("AudioData got decoded");
				this.successfulDecode(audiobuffer);
			}
				);
		});
		reader.readAsArrayBuffer(recordedBlob.blob);
	}
	successfulDecode(decoded: AudioBuffer) {
		//Putting decoded buffer into an array.
		var resultingData = new Float32Array(decoded.length);
		resultingData = decoded.getChannelData(0);
		//Cutting of leading and trailing zeros, cause they are "quiet" samples.
		let firstNonZero = this.getFirstNonZero(resultingData);
		let lastNonZero = this.getLastNonZero(resultingData);
		if (lastNonZero > firstNonZero) {
			resultingData = resultingData.slice(firstNonZero, lastNonZero + 1);
        }
		console.log(resultingData);
		if (this.state.referenceFrequency != null && this.state.referenceBeat != null) {

		} else {
			var refFreq = Analyzer.analyzeRefFrequence(resultingData);
			var refState = this.state;
			this.setState({
				recording: refState.recording,
				referenceFrequency: refFreq,
				referenceBeat: refState.referenceBeat
			});
        }
		/*TODO: Call analyze method from Analyzer script 
		        Important! Give it Recorder as reference, so it can enter the frequency. 
				Here you´ll check later on, if there is a reference note or not and call the corresponding method.
				*/
	}
	getFirstNonZero(data: Float32Array) : number {
		for (let i = 0; i < data.length; i++) {
			if (data[i] != 0.0) {
				return i;
            }
		}
		return 0;
	}
	getLastNonZero(data: Float32Array): number {
		for (let i = data.length - 1; i > 0; i++) {
			if (data[i] != 0.0) {
				return i;
            }
		}
		return data.length-1;
    }
	changeRecordStatus() {
		var recording = this.state.recording;
		var refState = this.state;
		this.setState({
			recording: !recording,
			referenceFrequency: refState.referenceFrequency,
			referenceBeat: refState.referenceBeat
		});
    }
}
ReactDOM.render(
    <Recorder />,
    document.getElementById('root')
);


