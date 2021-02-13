import * as ReactDOM from "react-dom";
import * as React from "react";
import './styles/main.css';
import { getFileURL, getFrameSize, getFrameArray, getRefs, setFrameSize, setChosenAlg, getChosenAlg, getKey, setKey, clearStorage } from "./helper/sessionStorageHelper";
import { Recorder } from "./views/Recorder";
import { BeatSettings } from "./views/BeatSettings";
//See below
import { MusicSheetDisplay } from "./views/MusicSheetDisplay";
import { Beat } from "./models/beats";
import { TestingAlgorithm } from "./views/TestingAlgorithm";
import { ChoosingAlgorithm } from "./views/ChooseAlgorithm";
import { continuePipeline, transpose } from "./Pipeline";
import { FrameRateAdaption } from "./views/FrameRateAdaption";
import { Key } from "./models/keys";
import { TransposeComponent } from "./views/TransposeComponent";
import { STANDARD_FRAME_SIZE } from "./models/config";
import { SettingsButton } from "./views/SettingsButton";
import { SettingsPage } from "./views/SettingsPage";

class Main extends React.Component<{}, { referenceFrequency: number | null, referenceBeat: Beat | null, pipelineIsThrough: boolean, file: string |null, frameSize: number, key : Key, onSettingsPage: boolean }> {
	constructor(props: any) {
		//TODO: Save key beforehand and fetch key here
		super(props);
		let references = getRefs();
		let pipelineIsThrough = getFrameArray("smoothed").length !== 0;
		let file = getFileURL();
		let frameAdaptions = getFrameSize();
		let key = getKey();
		this.state = {
			referenceFrequency: references.frequency,
			referenceBeat: references.beat,
			pipelineIsThrough: pipelineIsThrough,
			file: file,
			frameSize: frameAdaptions,
			key: key,
			onSettingsPage: false
		};
	}
	updateReferences() {
		console.log("Update parent");
		let references = getRefs();
		let pipelineIsThrough = getFrameArray("smoothed").length !== 0;
		this.setState({
			referenceFrequency: references.frequency,
			referenceBeat: references.beat,
			pipelineIsThrough: pipelineIsThrough
		});
    }
	render() {
		if (this.state.onSettingsPage) {
			return <SettingsPage informParent={() => this.showSettings() } />
        } else if (this.state.referenceFrequency == null) {
			return <><Recorder parentState={this.state} notifyParent={() => this.updateReferences()} />
                <SettingsButton onClick={() => this.showSettings()} /></>
		} else if (this.state.referenceBeat == null) {
			return <><BeatSettings notifyParent={() => this.updateReferences()} />
                <SettingsButton onClick={() => this.showSettings()} /></>
		} else if (this.state.file != null) {
            return (<div>
				<MusicSheetDisplay file={this.state.file} autoResize={true} drawTitle={false} />
				<div className="flex flex-row">
				<FrameRateAdaption onChange={(size) => this.updateChosenFrameSize(size)} frameSize={this.state.frameSize} onSubmit={() => this.startBeatCorrelationNew()} />
				<TransposeComponent keyUsed={this.state.key} notifyParent={(keyChosen) => this.transpose(keyChosen)}/> 
					<a href={this.state.file} className="download btn btn-dark" download="music.xml">Download</a>
					<button className="btn btn-dark" onClick={() => this.resetProgram()}>Singe/Spiele neue Melodie</button>
				</div>
                   </div>)
		} else if (this.state.pipelineIsThrough) {
			return (<div>
				<Recorder parentState={this.state} notifyParent={() => this.updateReferences()} />
				<span className="centered bright">Du kannst dir die verschiedenen Ergebnisse anhören und dann wählen, welches du verwenden willst oder neu aufnehmen.</span>
				<TestingAlgorithm />
				<ChoosingAlgorithm onChange={(chosen) => this.getChosenAlgorithm(chosen)} />
				<SettingsButton onClick={() => this.showSettings()} />
			</div>)
		} else {
			return (<div>
				<Recorder parentState={this.state} notifyParent={() => this.updateReferences()} />
				<SettingsButton onClick={() => this.showSettings()} />
				</div>)
		}
	}
	resetProgram() {
		clearStorage();
		this.setState({
			referenceFrequency: null,
			referenceBeat: null,
			pipelineIsThrough: false,
			file: null,
			frameSize: STANDARD_FRAME_SIZE,
			key: getKey()
		});
    }
	getChosenAlgorithm(chosen: string) {
		setChosenAlg(chosen);
		continuePipeline(chosen, (url, key) => this.fetchFile(url, key), this.state.frameSize);
	}
	fetchFile(url: string, key: Key) {
		let state = this.state;
		this.setState({
			referenceFrequency: state.referenceFrequency,
			referenceBeat: state.referenceBeat,
			pipelineIsThrough: state.pipelineIsThrough,
			file: url,
			frameSize: state.frameSize, 
			key : key
		});
		setKey(key);
	}
	updateChosenFrameSize(frameAdaption: number) {
		let state = this.state;
		this.setState({
			referenceFrequency: state.referenceFrequency,
			referenceBeat: state.referenceBeat,
			pipelineIsThrough: state.pipelineIsThrough,
			file: state.file,
			frameSize: frameAdaption,
			key : state.key
		});
	}
	startBeatCorrelationNew() {
		setFrameSize(this.state.frameSize);
		continuePipeline(getChosenAlg() ?? "smoothed", (url, key) => this.fetchFile(url, key), this.state.frameSize);
	}

	transpose(key: Key) {
		transpose(getChosenAlg() ?? "smoothed", key, this.state.key ?? key, this.state.frameSize, (url, key) => this.fetchFile(url, key))
	}
	showSettings() {
		let currState = this.state;
		this.setState({
			referenceFrequency: currState.referenceFrequency,
			referenceBeat: currState.referenceBeat,
			pipelineIsThrough: currState.pipelineIsThrough,
			file: currState.file,
			frameSize: currState.onSettingsPage? getFrameSize() : currState.frameSize,
			key: currState.key,
			onSettingsPage: !currState.onSettingsPage
		});
    }
}
	ReactDOM.render(
    <Main />,
    document.getElementById('root')
);


/*Copyright 2019 PhonicScore

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/