import { Bar, MetricalBar } from "../models/bars";
import { Beat, getDenominator, getNumerator } from "../models/beats";
import { LOG_2 } from "../models/calculationData";
import { NOTELENGTHSTRINGS } from "../models/config";
import { Extension, getLengthValue, Metric, MetricalNote } from "../models/metric";
import { Note } from "../models/notes";

export function ParseToXML(bars: MetricalBar[], ties: number[], beat: Beat): string {
    let result = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>"
                    + "<score-partwise version=\"2.0\">"
                           + "<part-list>";
    //TODO: When new parts can be added, add a score-part for every part.
    //For now add the first one static.
    result += "<score-part id=\"P1\">"
                + "<part-name>Part 1</part-name>"
            + "</score-part>";
    result += "</part-list>"
    //TODO: When multiple parts exist, this needs to be moved into a for-loop
    //iterating over all parts
    result += "<part id=\"P1\">";
    for (let i = 0; i < bars.length; i++) {
        result += `<measure number=\"${i + 1}\">`
        //First measure needs to contain key information
        if (i == 0) {
            result += "<attributes>"
                //We tell the duration in sixteenths.
                        + "<divisions>4</divisions>"
                            + "<key>"
                //Here the correct number for the key would be entered,
                //when key recognition is implemented
                                + "<fifths>0</fifths>"
                            + "</key>"
                            + "<time>"
                                + `<beats>${getNumerator(beat)}</beats>`
                                + `<beat-type>${getDenominator(beat)}</beat-type>`
                            + "</time>"
                //Well known as violin key
                            + "<clef>"
                                + "<sign>G</sign>"
                                + "<line>2</line"
                            + "</clef>"
                        + "</attributes>";
        }
        let barNotes = bars[i].notes;
        for (let o = 0; o < barNotes.length; o++) {
            let note = barNotes[o];
            result += "<note>";
            if (note.note.value == Note.BREAK) {
                result += `<rest measure="${barNotes.length == 1? "yes": "no"}"/>`;
            } else {
                result += "<pitch>"
                            + `<step>${note.note.value}</step>`
                            + `<alter>${note.note.sign}</alter>`
                            + `<octave>${note.octave}</octave>`
                        + "</pitch>";
            }
            result += `<duration>${Math.round(getLengthValue(note) * 4)}</duration>`;
            let notationNeeded = false;
            if (GetTieEnd(ties, i, o, barNotes)) {
                result += "<tie type=\"stop\"/>";
                notationNeeded = true;
            } else if (GetTieStart(ties, i, o, barNotes)) {
                result += "<tie type=\"start\"/>";
                notationNeeded = true;
            }
            result += `<type>${NOTELENGTHSTRINGS[note.length]}</type>`;
            switch (note.extension) {
                case Extension.TWODOTS: result += "<dot/>"
                                                + "<dot/>";
                                                break;
                case Extension.ONEDOT: result += "<dot/>"; break;
                default: break;
            }
            if (note.metric == Metric.TRIOLE) {
                result += "<time-modification>"
                            + "<actual-notes>3</actual-notes>"
                            + "<normal-notes>2</normal-notes>"
                        + "</time-modification>";
                notationNeeded = true;
            }
            if (notationNeeded) {
                result += "<notations>";
                if (GetTieStart(ties, i, o, barNotes)) {
                    result += "<tied type=\"start\"/>";
                } else if (GetTieEnd(ties, i, o, barNotes)) {
                    result += "<tied type=\"stop\"/>";
                }
                //TODO: This solution has some severe graphical problems, you´ll need to find out the groups of trioles beforehand
                if (note.metric == Metric.TRIOLE && (o == 0 || barNotes[o-1].metric != Metric.TRIOLE || o == barNotes.length-1 || barNotes[o+1].metric != Metric.TRIOLE)) {
                    result += `tuplet placement="above" type="${(o == 0 ||barNotes[o-1].metric != Metric.TRIOLE ? "start": "stop")}" />`
                }
                result += "</notations>";
            }
            result += "</note>";
        }
        result += "</measure>";
    }
    result += "</part>";
    result += "</score-partwise>";
    return result;
}
function GetTieStart(ties: number[], barIndex: number, noteIndex: number, notes: MetricalNote[]): boolean {
    return noteIndex == notes.length - 1 && ties.contains(barIndex) && (!ties.contains(barIndex - 1) || notes.length > 1);
}
function GetTieEnd(ties: number[], barIndex: number, noteIndex: number, notes: MetricalNote[]): boolean {
    return noteIndex == 0 && ties.contains(barIndex - 1) && (!ties.contains(barIndex) || notes.length > 1);
}