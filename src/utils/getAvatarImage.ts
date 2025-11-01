import boy from "../assets/presets/boy.png";
import boyKid from "../assets/presets/boy_kid.png";
import girl from "../assets/presets/girl.png";
import girlKid from "../assets/presets/girl_kid.png";
import man from "../assets/presets/man.png";
import woman from "../assets/presets/woman.png";
import martialArts from "../assets/presets/martial-arts.png";
import { calcularIdade } from "./CalcularIdade";

export function getAvatarImage(sexo?: string, dataNascimento?: string) {
  if (!sexo || !dataNascimento) return martialArts;

  const idade = calcularIdade(dataNascimento);
  const s = sexo.toLowerCase();

  const isMale = s === "male" || s === "masculino" || s === "m";
  const isFemale = s === "female" || s === "feminino" || s === "f";

  if (isMale) {
    if (idade <= 12) return boyKid;
    if (idade <= 17) return boy;
    return man;
  }

  if (isFemale) {
    if (idade <= 12) return girlKid;
    if (idade <= 17) return girl;
    return woman;
  }

  return martialArts;
}
