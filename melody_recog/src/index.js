import * as React from "react";
import * as ReactDOM from "react-dom";
import Wad from "web-audio-daw";
import './styles/main.css';

class Recorder extends React.Component {
	constructor(props /*any*/) {
		super(props);
		window.voice = new Wad({ source: 'mic' }); // At this point, your browser will ask for permission to access your microphone.
		window.tuner = new Wad.Poly();
		window.tuner.setVolume(0); // If you're not using headphones, you can eliminate microphone feedback by muting the output from the tuner.
		window.tuner.add(window.voice);
		/*TODO: Check, if there is a reference note.
		 If it is, change span to "Singe die Melodie ein" 
		 and extend the changeRecordStatus method to check for it 
		 and call metronome method in case there is a reference Note.*/
		this.state = {
			recording: false,
			referenceFrequency: null,
			referenceBeat: null,
			input: []
		};
	}
	
	render() {
		
		return (<div className="flex">
					<div className="centered upper-third no-background"><span className="bold big">Bitte singe ein A</span></div>
					<div id="microphone_container">
				<span>{window.tuner.pitch}</span>
					</div>
			<button className="centered btn-dark" id="RecordButton" onClick={()=>this.changeRecordStatus()}>{this.state.recording == true ? "STOP RECORDING" : "RECORD"}</button>
			
				</div>)
	}
	changeRecordStatus() {
		let recording = !this.state.recording;
		let refState = this.state;
		this.setState({
			recording: recording,
			referenceFrequency: refState.referenceFrequency,
			referenceBeat: refState.referenceBeat,
			input: refState.input
		});
		if (recording) {
			window.tuner.stopUpdatingPitch(); // Stop calculating the pitch if you don't need to know it anymore.
			console.log(this.state.input);
		} else {
			window.voice.play(); // You must give your browser permission to access your microphone before calling play().

			window.tuner.updatePitch(); // The tuner is now calculating the pitch and note name of its input 60 times per second. These values are stored in <code>tuner.pitch</code> and <code>tuner.noteName</code>.

			var savePitch = () => {
				let refState = this.state;
				let input = this.state.input;
				input.push(window.tuner.pitch);
				this.setState({
					recording: refState.recording,
					referenceFrequency: refState.referenceFrequency,
					referenceBeat: refState.referenceBeat,
					input : input
				});
				if (refState.recording) {
					requestAnimationFrame(savePitch);
					}
			};
			savePitch();
			// If you sing into your microphone, your pitch will be saved into an arry in real time.
        }
    }
}
ReactDOM.render(
    <Recorder />,
    document.getElementById('root')
);


