import boy from "../assets/presets/boy.png";
import boyKid from "../assets/presets/boy_kid.png";
import girl from "../assets/presets/girl.png";
import girlKid from "../assets/presets/girl_kid.png";
import man from "../assets/presets/man.png";
import woman from "../assets/presets/woman.png";
import martialArts from "../assets/presets/martial-arts.png";

export function getAvatarImage(sexo?: string, dataNascimento?: string) {
  if (!sexo || !dataNascimento) return martialArts;

  const anoNascimento = new Date(dataNascimento).getFullYear();
  const idade = new Date().getFullYear() - anoNascimento;

  if (sexo.toLowerCase() === "masculino") {
    if (idade <= 12) return boyKid;
    if (idade <= 17) return boy;
    return man;
  }

  if (sexo.toLowerCase() === "feminino") {
    if (idade <= 12) return girlKid;
    if (idade <= 17) return girl;
    return woman;
  }

  return martialArts;
}
