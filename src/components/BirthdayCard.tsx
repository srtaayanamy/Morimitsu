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
  male: "from-[#8FBCDD] to-[#A5B2BB]",
  female: "from-[#F7AEC5] to-[#C9B2B9]",
} as const;

export default function BirthdayCard({ nome, data, sexo }: BirthdayCardProps) {
  const iconSrc = ICONES[sexo];
  const bgGradient = GRADIENTES[sexo];

  return (
    <div
      className={`flex flex-row gap-3 items-center w-52 h-38 bg-gradient-to-br ${bgGradient} shadow-md rounded-2xl p-4 transition-transform duration-200 hover:scale-105 select-none relative z-10 hover:z-50`}
    >
      <img
        src={iconSrc}
        alt={
          sexo === "male"
            ? "Ícone de aniversário masculino"
            : "Ícone de aniversário feminino"
        }
        className="w-16 h-16 object-contain flex-shrink-0"
      />

      <div className="flex flex-col text-left w-[110px] flex-shrink-0">
        <span className="relative group block">
          <p className="font-bold text-md text-white drop-shadow-sm truncate cursor-default">
            {nome}
          </p>
          <span className="absolute left-0 top-7 opacity-0 group-hover:opacity-100 bg-black/80 text-white text-xs px-2 py-1 rounded-md whitespace-nowrap shadow-lg pointer-events-none transition-opacity z-[9999]">
            {nome}
          </span>
        </span>

        <p className="text-sm font-medium text-white drop-shadow-sm whitespace-nowrap">
          {data}
        </p>
      </div>
    </div>
  );
}
