import { ENHARMONIC_AMBIGUITY_AFTER, ENHARMONIC_AMBIGUITY_BEFORE } from "../models/keys";
import { MetricalNote } from "../models/metric";
import { Note, Sign } from "../models/notes";

export function ConvertSharpsToFlats(input: MetricalNote[], signs: Note[]) {
    for (let i = 0; i < signs.length; i++) {
        let ambiguity = ENHARMONIC_AMBIGUITY_BEFORE[i];
        let resolved = ENHARMONIC_AMBIGUITY_AFTER[i];
        let ambiguos = input.filter(val => val.note.value == ambiguity.value && val.note.sign == ambiguity.sign);
        ambiguos.forEach(val => val.note = resolved);
    }
}
export function ConvertFlatsToSharps(input: MetricalNote[]) {
    input.forEach(val => {
        if (val.note.sign == Sign.FLAT) {
            let index = ENHARMONIC_AMBIGUITY_AFTER.findIndex(note => note.equals(val.note));
            let shouldBe = ENHARMONIC_AMBIGUITY_BEFORE[index];
            val.note = shouldBe;
        }
    });
}