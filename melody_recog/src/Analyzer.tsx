import { FFT } from "dsp.js";
export function analyzeRefFrequence(data: Float32Array): number {
    var fft = new FFT(8192, 44100);
    fft.forward(data.slice(0,8192));
    var frequencyDomain = fft.spectrum;
    console.log("Frequency domain");
    console.log(frequencyDomain);
    var max = frequencyDomain.reduce((a, b) => Math.max(a, b));
    var index = frequencyDomain.findIndex(x => x == max);
    console.log(`${max},frequency:${index}`);
     return 0;
}