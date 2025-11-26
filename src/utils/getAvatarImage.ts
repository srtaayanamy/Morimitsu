import boy from "../assets/presets/boy.png";
import boyKid from "../assets/presets/boy_kid.png";
import girl from "../assets/presets/girl.png";
import girlKid from "../assets/presets/girl_kid.png";
import man from "../assets/presets/man.png";
import woman from "../assets/presets/woman.png";
import martialArts from "../assets/presets/martial-arts.png";

export function getAvatarImage(sexo?: string, idade?: number | null): string {
  if (!sexo) return martialArts;

  const s = sexo.toLowerCase().trim();

  const isMale =
    s === "male" || s === "masculino" || s === "m" || s === "homem";
  const isFemale =
    s === "female" || s === "feminino" || s === "f" || s === "mulher";

  // Define se é criança/adolescente (até 17 anos
  const isKid = idade !== null && idade !== undefined && idade <= 12;
  const isTeen = idade !== null && idade !== undefined && idade <= 18;

  if (isMale) {
    if (isKid) {
      return boyKid;
    }
    if (isTeen) {
      return boy;
    }
    return man;
  }

  if (isFemale) {
    if (isKid) {
      return girlKid;
    }
    if (isTeen) {
      return girl;
    }
    return woman;
  }

  return martialArts;
}
