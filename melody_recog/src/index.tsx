import * as ReactDOM from "react-dom";
import * as React from "react";
import { getRefs } from "./sessionStorageHelper";
import { Recorder } from "./Recorder";

class Main extends React.Component {
	constructor(props : any) {
		super(props);
		let references = getRefs();
		this.state = {
			referenceFrequency: references.frequency,
			referenceBeat: references.beat,
		};
	}
	render() {
		return (<Recorder />)
	}
}
ReactDOM.render(
    <Main />,
    document.getElementById('root')
);


