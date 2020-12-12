import * as React from "react";
import { OpenSheetMusicDisplay as OSMD } from 'opensheetmusicdisplay';
//Copied from https://github.com/opensheetmusicdisplay/react-opensheetmusicdisplay/blob/master/src/lib/OpenSheetMusicDisplay.jsx
//and converted to typed version
export class MusicSheetDisplay extends React.Component<{ autoResize: boolean | undefined, drawTitle: boolean | undefined, file: string}, {dataReady: boolean}> {
    osmd: OSMD | null= null;
    divRef: React.RefObject<HTMLDivElement> = React.createRef<HTMLDivElement>();
    constructor(props: any) {
        super(props);
        this.state = {
            dataReady: false
        };
    }

    setupOsmd() {
        const options = {
            autoResize: this.props.autoResize !== undefined ? this.props.autoResize : true,
            drawTitle: this.props.drawTitle !== undefined ? this.props.drawTitle : true,
        }
        if (this.divRef.current != null) {
            this.osmd = new OSMD(this.divRef.current!, options);
            this.osmd.load(this.props.file).then(() => this.osmd?.render());
        }
    }

    resize() {
        this.forceUpdate();
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resize)
    }

    componentDidUpdate(prevProps : any) {
        if (this.props.drawTitle !== prevProps.drawTitle) {
            this.setupOsmd();
        } else {
            this.osmd?.load(this.props.file).then(() => this.osmd?.render());
        }
        window.addEventListener('resize', this.resize)
    }

    // Called after render
    componentDidMount() {
        this.setupOsmd();
    }

    render() {
        return (<div className="sheet" ref={this.divRef} />);
    }
}