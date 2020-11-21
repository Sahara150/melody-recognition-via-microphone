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
    let string: String;
    switch (beat) {
        case Beat.ThreeHalfs: case Beat.ThreeFourths: case Beat.NineEights: string = "3"; break;
        case Beat.TwoFourths: case Beat.SixEights: string = "2"; break;
        case Beat.FourFourths: string = "4"; break;
        case Beat.FiveFourths: string = "5"; break;
    }
    switch (beat) {
        case Beat.ThreeHalfs: string += " Halbe"; break;
        case Beat.TwoFourths: case Beat.ThreeFourths: case Beat.FourFourths: case Beat.FiveFourths: string += " Viertel"; break;
        case Beat.SixEights: case Beat.NineEights: string += " Schläge (1 Schlag = 3 Achtel)";
    }
    return string;
}