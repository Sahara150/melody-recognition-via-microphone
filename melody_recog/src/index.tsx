import * as ReactDOM from "react-dom";
import * as React from "react";
import { getFrameArray, getRefs } from "./sessionStorageHelper";
import { Recorder } from "./Recorder";
import { BeatSettings } from "./BeatSettings";
import { Beat } from "./beats";
import { TestingAlgorithm } from "./TestingAlgorithm";

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
				<TestingAlgorithm />
			</div>)
		} else {
			return (<div>
				<Recorder parentState={this.state} notifyParent={() => this.updateReferences()} />
				</div>)
		}
	}
}
	ReactDOM.render(
    <Main />,
    document.getElementById('root')
);


