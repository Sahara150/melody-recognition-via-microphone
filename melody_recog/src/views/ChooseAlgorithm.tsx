import React from "react";

export class ChoosingAlgorithm extends React.Component<{ onChange: (chosen: string) => void }, { chosen: string }> {
    constructor(props: any) {
        super(props);
        this.state = {
            chosen: "smoothed"
        }
    }
    render() {
        return (<div className="flex">
            <div className="flex align-horizontal container">
            <input type="radio" name="algorithm" id="smoothed" value="smoothed" checked={this.state.chosen === "smoothed"} onChange={(event) => this.onValueChange(event)} />
            <label htmlFor="smoothed">geglättet</label>
            <input type="radio" name="algorithm" id="unsmoothed" value="unsmoothed" checked={this.state.chosen === "unsmoothed"} onChange={(event) => this.onValueChange(event) }/>
            <label htmlFor="unsmoothed">ungeglättet</label>
            <input type="radio" name="algorithm" id="equalAlloc" value="equalAlloc" checked={this.state.chosen === "equalAlloc"} onChange={(event) => this.onValueChange(event)} />
                <label htmlFor="equalAlloc">gleichverteilt</label>
            </div>
            <button className="btn-dark centered" onClick={() => this.props.onChange(this.state.chosen)}>Festlegen</button>
        </div>)
    }
    onValueChange(event: React.ChangeEvent<HTMLInputElement>) {
        let chosen = event.target.value as string;
        this.setState({
            chosen: chosen
        })
    }
}