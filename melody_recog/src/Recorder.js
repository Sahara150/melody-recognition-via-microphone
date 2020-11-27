import * as React from "react";
import Wad from "web-audio-daw";
import './styles/main.css';
import { saveReferenceFrequency } from "./sessionStorageHelper";
import { getAmountOfBeats, returnStringForSingingInfo } from "./beats";
import { startPipeline } from "./Pipeline";

export class Recorder extends React.Component {
	//frequencies above this will be ignored as noice (should be configurable later on)
	NOICE_CANCELLING = 3200;
	constructor(props /*any*/) {
		super(props);
		window.voice = new Wad({ source: 'mic' }); // At this point, your browser will ask for permission to access your microphone.
		window.tuner = new Wad.Poly();
		window.tuner.setVolume(0); // If you're not using headphones, you can eliminate microphone feedback by muting the output from the tuner.
		window.tuner.add(window.voice);
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
				{this.state.referenceFrequency != null && this.state.referenceBeat != null ? `Bitte singe die Melodie ein. Das Metronom wird dir ${returnStringForSingingInfo(this.state.referenceBeat)} angeben.` : "Bitte singe ein A"}
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
		console.log(this.state);
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
		} else {
			startPipeline(this.state.input, this.state.referenceFrequency);
			let refState = this.state;
			//Clearing the input array in case recording is redone.
			this.setState({
				recording: refState.recording,
				referenceFrequency: refState.referenceFrequency,
				referenceBeat: refState.referenceBeat,
				input : []
            })
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
		if (this.state.referenceBeat != null && this.state.referenceFrequency != null) {
			window.tuner.pitch = undefined;
			window.ticksLeft = getAmountOfBeats(this.state.referenceBeat);
			window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
			window.metronomeID = setInterval(this.outputTick, 1000);
        }
		window.voice.play(); // You must give your browser permission to access your microphone before calling play().

		window.tuner.updatePitch(); // The tuner is now calculating the pitch and note name of its input 60 times per second. These values are stored in <code>tuner.pitch</code> and <code>tuner.noteName</code>.

		var savePitch = () => {
			let refState = this.state;
			let input = this.state.input;
			input.push(window.tuner.pitch > this.NOICE_CANCELLING? undefined: window.tuner.pitch);
			//Setting pitch for melody on undefined again, so breaks are seen as undefined, instead of repeating the last frequency
			if (refState.referenceFrequency != null) {
				window.tuner.pitch = undefined;
			}
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
	outputTick() {
		if (window.ticksLeft == 0) {
			clearInterval(window.metronomeID);
		} else {
			let ticker = window.audioContext.createOscillator();
			ticker.frequency.value = 800;
			ticker.connect(window.audioContext.destination);
			ticker.start(window.audioContext.currentTime);
			ticker.stop(window.audioContext.currentTime + 0.03);
			window.ticksLeft--;
        }
    }
}