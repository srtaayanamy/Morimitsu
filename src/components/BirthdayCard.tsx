import Girl from "../assets/presets/birthday-girl.png";
import Boy from "../assets/presets/birthday-boy.png";

interface BirthdayCardProps {
  nome: string;
  data: string;
  sexo: "M" | "F";
}

// Caminhos fixos para as imagens (altere para os caminhos corretos no seu projeto)
const ICONES = {
  M: Boy,
  F: Girl,
};

export default function BirthdayCard({ nome, data, sexo }: BirthdayCardProps) {
  const iconSrc = ICONES[sexo];

  // Gradiente de fundo baseado no sexo
  const bgGradient =
    sexo === "M" ? "from-[#8FBCDD] to-[#A5B2BB]" : "from-[#F7AEC5] to-[#C9B2B9]";

  return (
    <div
      className={`flex flex-row gap-1.5 items-center justify-center w-52 h-38 bg-gradient-to-br ${bgGradient} shadow-md rounded-2xl p-4 text-center transition-transform hover:scale-105`}
    >
      <img
        src={iconSrc}
        alt={sexo === "M" ? "Homem" : "Mulher"}
        className="w-18 h-18"
      />
      <div className="flex flex-col">
        <p className="font-semibold text-[18px] text-white">{nome}</p>
        <p className="text-sm font-semibold text-white">{data}</p>
      </div>
    </div>
  );
}
