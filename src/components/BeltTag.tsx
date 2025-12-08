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

// Mapa com TODOS os formatos possíveis (incluindo os que chegam do backend da turma)
const beltImageMap: Record<string, string> = {
  // Faixas simples
  BRANCA: white,
  CINZA: gray,
  AMARELA: yellow,
  LARANJA: orange,
  VERDE: green,
  AZUL: blue,
  ROXA: purple,
  MARROM: brown,
  PRETA: black,
  VERMELHA: red,

  // Faixas duplas - formatos oficiais
  "CINZA/BRANCA": grayWhite,
  "CINZA/PRETA": grayBlack,
  "AMARELA/BRANCA": yellowWhite,
  "AMARELA/PRETA": yellowBlack,
  "LARANJA/BRANCA": orangeWhite,
  "LARANJA/PRETA": orangeBlack,
  "VERDE/BRANCA": greenWhite,
  "VERDE/PRETA": greenBlack,
  "VERMELHA/BRANCA": redWhite,
  "VERMELHA/PRETA": redBlack,

  // === ALIASES (o que resolve o seu problema) ===
  // underscore
  BRANCA_CINZA: grayWhite,
  CINZA_BRANCA: grayWhite,
  CINZA_PRETA: grayBlack,
  PRETA_CINZA: grayBlack,
  AMARELA_BRANCA: yellowWhite,
  BRANCA_AMARELA: yellowWhite,
  AMARELA_PRETA: yellowBlack,
  PRETA_AMARELA: yellowBlack,
  VERMELHA_BRANCA: redWhite,
  BRANCA_VERMELHA: redWhite,
  VERMELHA_PRETA: redBlack,
  PRETA_VERMELHA: redBlack,

  // hífen
  "CINZA-BRANCA": grayWhite,
  "BRANCA-CINZA": grayWhite,
  "CINZA-PRETA": grayBlack,
  "AMARELA-BRANCA": yellowWhite,
  "AMARELA-PRETA": yellowBlack,
  "VERMELHA-BRANCA": redWhite,
  "VERMELHA-PRETA": redBlack,

  // espaço ou barra invertida (caso venha ao contrário)
  "BRANCA/CINZA": grayWhite,
  "BRANCA CINZA": grayWhite,
  "CINZA BRANCA": grayWhite,
  "AMARELA BRANCA": yellowWhite,
  "BRANCA AMARELA": yellowWhite,
};

const normalizeBelt = (faixa?: string | null): string => {
  if (!faixa) return "BRANCA";

  let normalized = faixa
    .toUpperCase()
    .trim()
    // Remove acentos e cedilha
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace("Ç", "C");

  // Converte todos os separadores possíveis para "/"
  normalized = normalized.replace(/[_\/\s-]+/g, "/");

  // Correções manuais de casos muito comuns que ainda podem dar errado
  const fixes: Record<string, string> = {
    BRANCACINZA: "CINZA/BRANCA",
    CINZABRANCA: "CINZA/BRANCA",
    AMARELABRANCA: "AMARELA/BRANCA",
    BRANCAAMARELA: "AMARELA/BRANCA",
    AMARELAPRETA: "AMARELA/PRETA",
    VERMELHABRANCA: "VERMELHA/BRANCA",
    VERMELHAPRETA: "VERMELHA/PRETA",
  };

  return fixes[normalized] || normalized;
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

  const base = normalizeBelt(faixa).split("/")[0]; // pega só a primeira cor para exibir
  return map[base] || base;
};

export default function BeltTag({ faixa, grau = 0 }: BeltTagProps) {
  const normalizedKey = normalizeBelt(faixa);
  const imageSrc = beltImageMap[normalizedKey] || white;

  const displayName = formatBeltName(faixa);
  const grauText = grau > 0 ? ` ${grau}º grau` : "";
  const tooltipText = `${displayName}${grauText}`;

  return (
    <div
      className="relative group inline-block cursor-help"
      title={tooltipText}
    >
      <div className="w-6 h-6 rounded-full border border-gray-400 overflow-hidden flex items-center justify-center bg-white shadow-sm">
        <img
          src={imageSrc}
          alt={displayName}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 bg-gray-900 text-white text-xs font-medium rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
        {tooltipText}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-0 h-0 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
}