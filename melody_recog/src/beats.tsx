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
        case Beat.SixEights: case Beat.NineEights: string += " Schläge (1 Schlag = 3 Achtel)";
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