"use strict";
exports.__esModule = true;
exports.analyzeRefFrequence = void 0;
var dsp_js_1 = require("dsp.js");
function analyzeRefFrequence(data) {
    var fft = new dsp_js_1.FFT(8192, 44100);
    fft.forward(data.slice(0, 8192));
    var frequencyDomain = fft.spectrum;
    console.log("Frequency domain");
    console.log(frequencyDomain);
    var max = frequencyDomain.reduce(function (a, b) { return Math.max(a, b); });
    var index = frequencyDomain.findIndex(function (x) { return x == max; });
    console.log(max + ",frequency:" + index);
    return 0;
}
exports.analyzeRefFrequence = analyzeRefFrequence;
