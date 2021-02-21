export enum Beat {
    ThreeHalfs = "ThreeHalfs",
    TwoFourths = "TwoFourths",
    ThreeFourths = "ThreeFourths",
    FourFourths = "FourFourths",
    FiveFourths = "FiveFourths",
    SixEights = "SixEights",
    NineEights = "NineEights"
}

export function returnStringForSingingInfo(beat: Beat): String {
    let string: String = `${getAmountOfBeats(beat)}`;
    switch (beat) {
        case Beat.ThreeHalfs: string += " Halbe"; break;
        case Beat.TwoFourths: case Beat.ThreeFourths: case Beat.FourFourths: case Beat.FiveFourths: string += " Viertel"; break;
        case Beat.SixEights: case Beat.NineEights: string += " Schlaege (1 Schlag = 3 Achtel)";
    }
    return string;
}
export function getAmountOfBeats(beat: Beat): number {
    let result: number;
    switch (beat) {
        case Beat.ThreeHalfs: case Beat.ThreeFourths: case Beat.NineEights: result = 3; break;
        case Beat.TwoFourths: case Beat.SixEights: result = 2; break;
        case Beat.FourFourths: result = 4; break;
        case Beat.FiveFourths: result = 5; break;
    }
    return result;
}
export function getNumerator(beat: Beat): number {
    switch (beat) {
        case Beat.ThreeHalfs: case Beat.ThreeFourths: return 3;
        case Beat.TwoFourths: return 2;
        case Beat.FourFourths: return 4;
        case Beat.FiveFourths: return 5;
        case Beat.SixEights: return 6; 
        case Beat.NineEights: return 9;
    }
}
export function getLengthValueDenominator(beat: Beat) : number {
    switch (beat) {
        case Beat.ThreeHalfs: return 2;
        case Beat.TwoFourths: case Beat.ThreeFourths: case Beat.FourFourths: case Beat.FiveFourths: return 1;
        case Beat.SixEights: case Beat.NineEights: return 0.5;
    }
}
export function getDenominator(beat: Beat): number {
    switch (beat) {
        case Beat.ThreeHalfs: return 2;
        case Beat.TwoFourths: case Beat.ThreeFourths: case Beat.FourFourths: case Beat.FiveFourths: return 4;
        case Beat.SixEights: case Beat.NineEights: return 8;
    }
}
export function getPositionShift(beat: Beat): number {
    switch (beat) {
        case Beat.ThreeHalfs: return 0;
        case Beat.TwoFourths: case Beat.ThreeFourths: case Beat.FourFourths: case Beat.FiveFourths: return -1;
        case Beat.SixEights: case Beat.NineEights: return -2;
    }
}