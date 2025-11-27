import BeltTag from "../../components/BeltTag";
import { faixasEGrausMaior16, faixasEGrausMenor16 } from "../../types/Rank";
import { SquarePen } from "lucide-react";
import { useState } from "react";

// Removendo a faixa branca duplicada da lista de maiores de 16 anos
// (assumindo que "faixa" é uma string como "Branca", "Cinza", etc.)
const faixasMaior16SemBranca = faixasEGrausMaior16.filter(
  (item) => item.faixa.toLowerCase() !== "branca"
);

export default function ConfigurarGraduacao() {
  // Agora abre por padrão nos menores de 16 anos
  const [filtro, setFiltro] = useState<"maiores" | "menores">("menores");

  const listaAtual =
    filtro === "maiores" ? faixasMaior16SemBranca : faixasEGrausMenor16;

  const titulo =
    filtro === "maiores" ? "Maiores de 16 anos" : "Menores de 16 anos";

  return (
    <div className="p-6 text-gray-700 bg-[#F1F1F1] min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-2xl">
          Configurar graduação - Configurações existentes
        </h2>

        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-xl transition cursor-pointer"
        >
          <SquarePen className="w-6 h-6 text-[#1E1E1E]" />
        </button>
      </div>

      {/* Abas na ordem correta: Menores primeiro */}
      <div className="flex gap-8 mb-8 border-b border-gray-200">
        <button
          onClick={() => setFiltro("menores")}
          className={`pb-3 px-1 font-medium text-lg border-b-4 transition-all ${
            filtro === "menores"
              ? "border-[#1E1E1E] text-[#1E1E1E]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Menores de 16 anos
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({faixasEGrausMenor16.length})
          </span>
        </button>

        <button
          onClick={() => setFiltro("maiores")}
          className={`pb-3 px-1 font-medium text-lg border-b-4 transition-all ${
            filtro === "maiores"
              ? "border-[#1E1E1E] text-[#1E1E1E]"
              : "border-transparent text-gray-500 hover:text-gray-700"
          }`}
        >
          Maiores de 16 anos
          <span className="ml-2 text-sm font-normal text-gray-500">
            ({faixasMaior16SemBranca.length})
          </span>
        </button>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-4">{titulo}</h3>

      {/* Tabela */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-4 px-6 font-bold text-base text-center">
                  Faixa
                </th>
                <th className="py-4 px-6 font-bold text-center text-base">
                  Frequências Necessárias
                </th>
              </tr>
            </thead>

            <tbody>
              {listaAtual.length > 0 ? (
                listaAtual.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-6 text-center">
                      <BeltTag faixa={item.faixa} />
                    </td>
                    <td className="py-4 px-6 text-gray-900 font-medium text-center">0</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="py-12 text-center text-gray-500">
                    Nenhuma faixa configurada para{" "}
                    {filtro === "menores" ? "menores" : "maiores"} de 16 anos.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
