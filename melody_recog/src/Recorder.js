import * as React from "react";
import Wad from "web-audio-daw";
import './styles/main.css';
import { saveReferenceFrequency } from "./sessionStorageHelper";

export class Recorder extends React.Component {
	constructor(props /*any*/) {
		super(props);
		window.voice = new Wad({ source: 'mic' }); // At this point, your browser will ask for permission to access your microphone.
		window.tuner = new Wad.Poly();
		window.tuner.setVolume(0); // If you're not using headphones, you can eliminate microphone feedback by muting the output from the tuner.
		window.tuner.add(window.voice);
		/*TODO: Implement methods in beats to
				give back a fitting string for the info text
				give back the amount of beats given and the speed*/
		this.state = {
			recording: false,
			referenceFrequency: props.parentState.referenceFrequency,
			referenceBeat: props.parentState.referenceBeat,
			input: []
		};
	}

	render() {

		return (<div className="flex">
			<div className="centered upper-third no-background"><span className="bold big">
				{this.state.referenceFrequency != null && this.state.referenceBeat != null ? "Bitte singe die Melodie ein. Bevor du singen kannst, wird das Metronom dir ... angeben." : "Bitte singe ein A"}
			</span></div>
			<div id="microphone_container">
				<span>{window.tuner.pitch} Hz</span>
			</div>
			<button className="centered btn-dark" id="RecordButton" onClick={() => this.changeRecordStatus()}>{this.state.recording == true ? "STOP RECORDING" : "RECORD"}</button>
			<button className={this.state.referenceFrequency == null ? "hidden" : "centered btn-dark"} onClick={() => this.deleteOldReferenceFreq()}>Referenzton neu aufnehmen</button>
		</div>)
	}
	deleteOldReferenceFreq() {
		saveReferenceFrequency(null);
		let refState = this.state;
		this.setState({
			recording: refState.recording,
			referenceBeat: refState.referenceBeat,
			referenceFrequency: null,
			//Deletes old pitches, if reset.
			input: []
		})
		this.props.notifyParent();
	}
	changeRecordStatus() {
		//Fetch recording state from component.
		let recording = this.state.recording;
		if (recording) {
			this.stopRecording();
		} else {
			this.startRecording();
		}
	}
	stopRecording() {
		console.log("Stop recording");
		//Cancel reading pitch 60 times a second
		if (window.refreshId != null || undefined) {
			cancelAnimationFrame(window.refreshId);
		}
		window.tuner.stopUpdatingPitch(); // Stop calculating the pitch if you don't need to know it anymore.
		console.log(this.state.input);
		//Stops recording
		let refState = this.state;
		this.setState({
			recording: false,
			referenceBeat: refState.referenceBeat,
			//Checks, if referenceFrequency exists, else uses just sang pitch
			referenceFrequency: refState.referenceFrequency == null || undefined ? window.tuner.pitch : refState.referenceFrequency,
			//If the referenceTone was sung, deletes input, so it is not reused in the melody
			input: refState.referenceFrequency == null || undefined ? [] : refState.input
		});
		//If there was no referenceFrequency before it now is saved in sessionStorage.
		if (refState.referenceFrequency == null) {
			saveReferenceFrequency(window.tuner.pitch);
			this.props.notifyParent();
		}
	}
	startRecording() {
		console.log("Start recording");
		//Starts recording
		let refState = this.state;
		this.setState({
			recording: true,
			referenceBeat: refState.referenceBeat,
			referenceFrequency: refState.referenceFrequency,
			input: refState.input
		});
		//TODO: If there is a reference beat, call method to know how many beats the metronome gives and give them
		window.voice.play(); // You must give your browser permission to access your microphone before calling play().

		window.tuner.updatePitch(); // The tuner is now calculating the pitch and note name of its input 60 times per second. These values are stored in <code>tuner.pitch</code> and <code>tuner.noteName</code>.

		var savePitch = () => {
			let refState = this.state;
			let input = this.state.input;
			input.push(window.tuner.pitch);
			this.setState({
				recording: true,
				referenceFrequency: refState.referenceFrequency,
				referenceBeat: refState.referenceBeat,
				input: input
			});
			window.refreshId = requestAnimationFrame(savePitch);
		};
		savePitch();
		// If you sing into your microphone, your pitch will be saved into an array in real time. */
	}
}