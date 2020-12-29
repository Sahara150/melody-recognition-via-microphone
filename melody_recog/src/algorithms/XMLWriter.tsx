import { MetricalBar } from "../models/bars";
import { Beat, getDenominator, getNumerator } from "../models/beats";
import { NOTELENGTHSTRINGS } from "../models/config";
import { Key } from "../models/keys";
import { Extension, getLengthValue, Metric, MetricalNote, Triole } from "../models/metric";
import { Note } from "../models/notes";

export function WriteToXML(bars: MetricalBar[], ties: number[], beat: Beat, key: number): string {
    for (let i = 0; i < bars.length; i++) {
        console.log(`Bar ${i + 1}: ${JSON.stringify(bars[i].notes)}`);
    }
    console.log("Ties: " + ties);
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
        result += `<measure number="${i + 1}">`
        //First measure needs to contain key information
        if (i == 0) {
            result += "<attributes>"
                //We tell the duration in sixteenths.
                        + "<divisions>4</divisions>"
                            + "<key>"
                //Here the correct number for the key would be entered,
                //when key recognition is implemented
                                + `<fifths>${key}</fifths>`
                            + "</key>"
                            + "<time>"
                                + `<beats>${getNumerator(beat)}</beats>`
                                + `<beat-type>${getDenominator(beat)}</beat-type>`
                            + "</time>"
                //Well known as violin key
                            + "<clef>"
                                + "<sign>G</sign>"
                                + "<line>2</line>"
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
            result += `<duration>${getLengthValue(note) * 4}</duration>`;
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
            if (note.metric == Metric.TRIOLE && note instanceof Triole) {
                let trioleNote = note as Triole;
                result += "<time-modification>"
                            + "<actual-notes>3</actual-notes>"
                            + "<normal-notes>2</normal-notes>"
                            + `<normal-type>${NOTELENGTHSTRINGS[trioleNote.trioleType]}</normal-type>`
                        + "</time-modification>";
                notationNeeded = trioleNote.isStart ||trioleNote.isEnd ? true : notationNeeded;
            }
            if (notationNeeded) {
                result += "<notations>";
                if (GetTieStart(ties, i, o, barNotes)) {
                    result += "<tied type=\"start\" />";
                } else if (GetTieEnd(ties, i, o, barNotes)) {
                    result += "<tied type=\"stop\" />";
                }
                if (note.metric == Metric.TRIOLE && note instanceof Triole && (note as Triole).isStart || (note as Triole).isEnd) {
                    result += `<tuplet placement="above" type="${((note as Triole).isStart ? "start": "stop")}" />`
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
    return noteIndex == notes.length - 1 && ties.contains(barIndex) && (!ties.contains(barIndex - 1) || notes.length > 1) && notes[noteIndex].note.value != Note.BREAK;
}
function GetTieEnd(ties: number[], barIndex: number, noteIndex: number, notes: MetricalNote[]): boolean {
    return noteIndex == 0 && ties.contains(barIndex - 1) && (!ties.contains(barIndex) || notes.length > 1) && notes[noteIndex].note.value != Note.BREAK;
}