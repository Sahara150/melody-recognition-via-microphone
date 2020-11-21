import * as ReactDOM from "react-dom";
import * as React from "react";
import { getRefs } from "./sessionStorageHelper";
import { Recorder } from "./Recorder";
import { BeatSettings } from "./BeatSettings";
import { Beat } from "./beats";

class Main extends React.Component<{}, { referenceFrequency: number | null, referenceBeat: Beat | null}> {
	constructor(props : any) {
		super(props);
		let references = getRefs();
		this.state = {
			referenceFrequency: references.frequency,
			referenceBeat: references.beat
		};
	}
	updateReferences() {
		console.log("Update parent");
		let references = getRefs();
		this.setState({
			referenceFrequency: references.frequency,
			referenceBeat: references.beat
		});
    }
	render() {
		if (this.state.referenceFrequency == null) {
			return <Recorder parentState={this.state} notifyParent={() => this.updateReferences()} />
		} else if (this.state.referenceBeat == null) {
			return <BeatSettings />
		} else {
			return <Recorder parentState={this.state} notifyParent={() => this.updateReferences()} />
        }
	}
}
ReactDOM.render(
    <Main />,
    document.getElementById('root')
);


