export class FrameAdaption {
    frameSize!: number;
    beginningBar: number;
    endBar: number;
    constructor(frameSize: number, beginningBar: number, endBar: number) {
        this.frameSize = frameSize;
        this.beginningBar = beginningBar;
        this.endBar = endBar;
    }
}