import React from "react";

export class SettingsButton extends React.Component<{ onClick: () => void }, {}> {
    render() {
        return (<button className="upperRight" onClick={() => this.props.onClick() }><span className="iconify settings bright" data-icon="carbon:settings" data-inline="false"></span></button>)
    }
}