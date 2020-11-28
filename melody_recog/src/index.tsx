import * as ReactDOM from "react-dom";
import * as React from "react";
import './styles/main.css';
import { getFrameArray, getRefs } from "./sessionStorageHelper";
import { Recorder } from "./views/Recorder";
import { BeatSettings } from "./views/BeatSettings";
import { Beat } from "./models/beats";
import { TestingAlgorithm } from "./views/TestingAlgorithm";
import { ChoosingAlgorithm } from "./views/ChooseAlgorithm";

class Main extends React.Component<{}, { referenceFrequency: number | null, referenceBeat: Beat | null, pipelineIsThrough: boolean}> {
	constructor(props : any) {
		super(props);
		let references = getRefs();
		let pipelineIsThrough = getFrameArray("smoothed").length != 0;
		this.state = {
			referenceFrequency: references.frequency,
			referenceBeat: references.beat,
			pipelineIsThrough: pipelineIsThrough
		};
	}
	updateReferences() {
		console.log("Update parent");
		let references = getRefs();
		let pipelineIsThrough = getFrameArray("smoothed").length != 0;
		this.setState({
			referenceFrequency: references.frequency,
			referenceBeat: references.beat,
			pipelineIsThrough: pipelineIsThrough
		});
    }
	render() {
		if (this.state.referenceFrequency == null) {
			return <Recorder parentState={this.state} notifyParent={() => this.updateReferences()} />
		} else if (this.state.referenceBeat == null) {
			return <BeatSettings notifyParent={() => this.updateReferences()} />
		} else if (this.state.pipelineIsThrough) {
			return (<div>
				<Recorder parentState={this.state} notifyParent={() => this.updateReferences()} />
				<span className="centered">Du kannst dir die verschiedenen Ergebnisse anh�ren und dann w�hlen, welches du verwenden willst oder neu aufnehmen.</span>
				<TestingAlgorithm />
				<ChoosingAlgorithm onChange={(chosen)=>this.getChosenAlgorithm(chosen)}/>
			</div>)
		} else {
			return (<div>
				<Recorder parentState={this.state} notifyParent={() => this.updateReferences()} />
				</div>)
		}
	}
	getChosenAlgorithm(chosen: string) {
		console.log("I just received " + chosen);
    }
}
	ReactDOM.render(
    <Main />,
    document.getElementById('root')
);


