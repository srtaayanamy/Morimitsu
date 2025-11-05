import Girl from "../assets/presets/birthday-girl.png";
import Boy from "../assets/presets/birthday-boy.png";

interface BirthdayCardProps {
  nome: string;
  data: string;
  sexo: "male" | "female";
}

const ICONES = {
  male: Boy,
  female: Girl,
} as const;

const GRADIENTES = {
  male: "from-[#8FBCDD] to-[#A5B2BB]", // Azul masculino
  female: "from-[#F7AEC5] to-[#C9B2B9]", // Rosa feminino
} as const;

export default function BirthdayCard({ nome, data, sexo }: BirthdayCardProps) {
  const iconSrc = ICONES[sexo];
  const bgGradient = GRADIENTES[sexo];

  return (
    <div
      className={`
        flex flex-row gap-3 items-center justify-center 
        w-52 h-38 
        bg-gradient-to-br ${bgGradient} 
        shadow-md rounded-2xl p-4 
        text-center 
        transition-transform duration-200 hover:scale-105
        select-none
      `}
    >
      <img
        src={iconSrc}
        alt={sexo === "male" ? "Ícone de aniversário masculino" : "Ícone de aniversário feminino"}
        className="w-16 h-16 object-contain"
      />
      <div className="flex flex-col text-left ml-2">
        <p className="font-bold text-lg text-white drop-shadow-sm">{nome}</p>
        <p className="text-sm font-medium text-white drop-shadow-sm">{data}</p>
      </div>
    </div>
  );
}