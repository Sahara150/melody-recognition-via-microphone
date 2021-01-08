import { ENHARMONIC_AMBIGUITY_AFTER, ENHARMONIC_AMBIGUITY_BEFORE } from "../models/keys";
import { FrameNote, Note, Sign } from "../models/notes";

export function ConvertSharpsToFlats(input: FrameNote[], signs: Note[]) {
    for (let i = 0; i < signs.length; i++) {
        let ambiguity = ENHARMONIC_AMBIGUITY_BEFORE[i];
        let resolved = ENHARMONIC_AMBIGUITY_AFTER[i];
        let ambiguos = input.filter(val => val.value.value == ambiguity.value && val.value.sign == ambiguity.sign);
        ambiguos.forEach(val => {
            val.value = resolved;
            //When a B is actually a C flat it needs to be an octave higher, 
            //even though musically it is almost the same.
            if(ambiguity.value < Note.C && resolved.value >= Note.C) {
                val.octave++;
            }
        });
    }
}
export function ConvertFlatsToSharps(input: FrameNote[]) {
    input.forEach(val => {
        if (val.value.sign == Sign.FLAT) {
            let index = ENHARMONIC_AMBIGUITY_AFTER.findIndex(note => note.equals(val.value));
            let shouldBe = ENHARMONIC_AMBIGUITY_BEFORE[index];
            val.value = shouldBe;
        }
    });
}