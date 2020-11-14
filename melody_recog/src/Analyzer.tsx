import { FFT } from "dsp.js";
export function analyzeRefFrequence(data: Float32Array): number {
    let fft = new FFT(8192, 44100);
    fft.forward(data.slice(0,8192));
    let frequencyDomain = fft.spectrum;
    console.log("Frequency domain");
    console.log(frequencyDomain);
    let max = frequencyDomain.reduce((a, b) => Math.max(a, b));
    let index = frequencyDomain.findIndex(x => x == max);
    console.log(`${max},frequency:${index}`);
     return 0;
}