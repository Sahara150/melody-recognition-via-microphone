"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var ReactDOM = require("react-dom");
var react_mic_1 = require("@cleandersonlobo/react-mic");
require("./styles/main.css");
var Recorder = /** @class */ (function (_super) {
    __extends(Recorder, _super);
    function Recorder(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            recording: false
        };
        return _this;
    }
    Recorder.prototype.render = function () {
        return (React.createElement("div", { className: "flex" },
            React.createElement("div", { className: "centered upper-third no-background" },
                React.createElement("span", { className: "bold big" }, "Bitte singe ein A")),
            React.createElement("div", { id: "microphone_container" },
                React.createElement(react_mic_1.ReactMic, { record: this.state.recording, onStop: this.onStop })),
            React.createElement("button", { className: "centered btn-dark", id: "RecordButton", onClick: this.changeRecordStatus }, this.state.recording == true ? "STOP RECORDING" : "RECORD")));
    };
    Recorder.prototype.onStop = function (recordedBlob) {
        console.log('recordedBlob is: ', recordedBlob);
    };
    Recorder.prototype.changeRecordStatus = function () {
        this.setState({ recording: !this.state.recording });
    };
    return Recorder;
}(React.Component));
ReactDOM.render(React.createElement(Recorder, null), document.getElementById('root'));
