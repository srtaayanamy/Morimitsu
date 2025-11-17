// components/BeltTag.tsx
import black from "../assets/presets/belts/black.png";
import blue from "../assets/presets/belts/blue.png";
import brown from "../assets/presets/belts/brown.png";
import gray from "../assets/presets/belts/gray.png";
import grayBlack from "../assets/presets/belts/gray-black.png";
import grayWhite from "../assets/presets/belts/gray-white.png";
import green from "../assets/presets/belts/green.png";
import greenBlack from "../assets/presets/belts/green-black.png";
import greenWhite from "../assets/presets/belts/green-white.png";
import orange from "../assets/presets/belts/orange.png";
import orangeBlack from "../assets/presets/belts/orange-black.png";
import orangeWhite from "../assets/presets/belts/orange-white.png";
import purple from "../assets/presets/belts/purple.png";
import red from "../assets/presets/belts/red.png";
import redBlack from "../assets/presets/belts/red-black.png";
import redWhite from "../assets/presets/belts/red-white.png";
import white from "../assets/presets/belts/white.png";
import yellow from "../assets/presets/belts/yellow.png";
import yellowBlack from "../assets/presets/belts/yellow-black.png";
import yellowWhite from "../assets/presets/belts/yellow-white.png";

interface BeltTagProps {
  faixa?: string | null;
  grau?: number;
}

const beltImageMap: Record<string, string> = {
  BRANCA: white,
  CINZA: gray,
  "CINZA/BRANCA": grayWhite,
  "CINZA/PRETA": grayBlack,
  AMARELA: yellow,
  "AMARELA/BRANCA": yellowWhite,
  "AMARELA/PRETA": yellowBlack,
  LARANJA: orange,
  "LARANJA/BRANCA": orangeWhite,
  "LARANJA/PRETA": orangeBlack,
  VERDE: green,
  "VERDE/BRANCA": greenWhite,
  "VERDE/PRETA": greenBlack,
  AZUL: blue,
  ROXA: purple,
  MARROM: brown,
  PRETA: black,
  VERMELHA: red,
  "VERMELHA/BRANCA": redWhite,
  "VERMELHA/PRETA": redBlack,
};

const normalizeBelt = (faixa?: string | null): string => {
  if (!faixa) return "BRANCA"; 
  return faixa
    .toUpperCase()
    .trim()
    .replace(/\s+/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace("Ç", "C");
};

const formatBeltName = (faixa?: string | null): string => {
  const map: Record<string, string> = {
    BRANCA: "Branca",
    CINZA: "Cinza",
    AMARELA: "Amarela",
    LARANJA: "Laranja",
    VERDE: "Verde",
    AZUL: "Azul",
    ROXA: "Roxa",
    MARROM: "Marrom",
    PRETA: "Preta",
    VERMELHA: "Vermelha",
  };

  const base = normalizeBelt(faixa);
  return map[base] || base;
};

export default function BeltTag({ faixa, grau = 0 }: BeltTagProps) {
  const base = normalizeBelt(faixa);
  const imageSrc = beltImageMap[base] || white;

  const displayName = formatBeltName(faixa);
  const grauText = grau > 0 ? ` ${grau}º grau` : "";
  const tooltipText = `${displayName}${grauText}`;

  return (
    <div className="relative group inline-block cursor-help" title={tooltipText}>
      <div className="w-6 h-6 rounded-full border border-gray-400 overflow-hidden flex items-center justify-center bg-white shadow-sm">
        <img src={imageSrc} alt={displayName} className="w-full h-full object-contain" />
      </div>

      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        {tooltipText}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-0 h-0 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
}
