import * as React from "react";
import { Key, Mode } from "../models/keys";
import { KeyTranslationMajor, KeyTranslationMinor } from "../models/transpone";
import { SignedNote } from "../models/notes";

export class TransposeComponent extends React.Component<{ keyUsed: Key, notifyParent : (keyUsed: Key) => void }, { keyChosen : Key }> {
    //TODO: Update key chosen, when changed
    keys: string[]
    translation: {  [name: string] : SignedNote}
    constructor(props: any) {
        super(props);
        this.state = {
            keyChosen : this.props.keyUsed
        }
        this.keys = this.props.keyUsed.mode == Mode.MINOR ? Object.keys(KeyTranslationMinor) : Object.keys(KeyTranslationMajor);
        this.translation = this.props.keyUsed.mode == Mode.MINOR ? KeyTranslationMinor : KeyTranslationMajor;
    }
    render() {
        return (<div className="flex">
            <select size={1} defaultValue={this.keys.find(val => this.translation[val].equals(this.state.keyChosen.base_note))}
                onChange={(e) => this.updateChosenKey(e) }>
                {
                    this.keys.map(val => {
                        return <option key={val} value={val}>{val}</option>
                    })
                }
            </select>
            <span>{`- ${this.props.keyUsed.mode}`}</span>
            <button onClick={() => this.transpose()} className="btn btn-dark">Transponieren</button>
            </div>
        );
    }
    updateChosenKey(event : React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            keyChosen: new Key(this.translation[event.target.value], this.props.keyUsed.mode)
        });
    }
    transpose() {
        this.props.notifyParent(this.state.keyChosen);
	}
}