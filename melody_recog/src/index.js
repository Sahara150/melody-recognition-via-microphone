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
var Analyzer = require("./Analyzer");
require("./styles/main.css");
var Recorder = /** @class */ (function (_super) {
    __extends(Recorder, _super);
    function Recorder(props) {
        var _this = _super.call(this, props) || this;
        /*TODO: Check, if there is a reference note.
         If it is, change span to "Singe die Melodie ein"
         and extend the changeRecordStatus method to check for it
         and call metronome method in case there is a reference Note.*/
        _this.state = {
            recording: false,
            referenceFrequency: null,
            referenceBeat: null
        };
        return _this;
    }
    Recorder.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "flex" },
            React.createElement("div", { className: "centered upper-third no-background" },
                React.createElement("span", { className: "bold big" }, "Bitte singe ein A")),
            React.createElement("div", { id: "microphone_container" },
                React.createElement(react_mic_1.ReactMic, { record: this.state.recording, onStop: function (recordedBlob) { return _this.onStop(recordedBlob); } })),
            React.createElement("button", { className: "centered btn-dark", id: "RecordButton", onClick: function () { return _this.changeRecordStatus(); } }, this.state.recording == true ? "STOP RECORDING" : "RECORD")));
    };
    Recorder.prototype.onStop = function (recordedBlob) {
        var _this = this;
        //Fetching data from Blob and decoding it.
        console.log('recordedBlob is: ', recordedBlob);
        var reader = new FileReader();
        var audioContext = new AudioContext();
        reader.addEventListener('loadend', function () {
            // reader.result contains the contents of blob as a typed array
            console.log("Typed array before decode");
            console.log(reader.result);
            audioContext.decodeAudioData(reader.result).then(function (audiobuffer) {
                console.log("AudioData got decoded");
                _this.successfulDecode(audiobuffer);
            });
        });
        reader.readAsArrayBuffer(recordedBlob.blob);
    };
    Recorder.prototype.successfulDecode = function (decoded) {
        //Putting decoded buffer into an array.
        var resultingData = new Float32Array(decoded.length);
        resultingData = decoded.getChannelData(0);
        //Cutting of leading and trailing zeros, cause they are "quiet" samples.
        var firstNonZero = this.getFirstNonZero(resultingData);
        var lastNonZero = this.getLastNonZero(resultingData);
        if (lastNonZero > firstNonZero) {
            resultingData = resultingData.slice(firstNonZero, lastNonZero + 1);
        }
        console.log(resultingData);
        if (this.state.referenceFrequency != null && this.state.referenceBeat != null) {
        }
        else {
            var refFreq = Analyzer.analyzeRefFrequence(resultingData);
            var refState = this.state;
            this.setState({
                recording: refState.recording,
                referenceFrequency: refFreq,
                referenceBeat: refState.referenceBeat
            });
        }
        /*TODO: Call analyze method from Analyzer script
                Important! Give it Recorder as reference, so it can enter the frequency.
                Here you�ll check later on, if there is a reference note or not and call the corresponding method.
                */
    };
    Recorder.prototype.getFirstNonZero = function (data) {
        for (var i = 0; i < data.length; i++) {
            if (data[i] != 0.0) {
                return i;
            }
        }
        return 0;
    };
    Recorder.prototype.getLastNonZero = function (data) {
        for (var i = data.length - 1; i > 0; i++) {
            if (data[i] != 0.0) {
                return i;
            }
        }
        return data.length - 1;
    };
    Recorder.prototype.changeRecordStatus = function () {
        var recording = this.state.recording;
        var refState = this.state;
        this.setState({
            recording: !recording,
            referenceFrequency: refState.referenceFrequency,
            referenceBeat: refState.referenceBeat
        });
    };
    return Recorder;
}(React.Component));
ReactDOM.render(React.createElement(Recorder, null), document.getElementById('root'));
