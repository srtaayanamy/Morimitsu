import BeltTag from "../../components/BeltTag";
import { faixasEGrausMaior16, faixasEGrausMenor16 } from "../../types/Rank";
import { SquarePen } from "lucide-react";

export default function ConfigurarGraduacao() {
  return (
    <div className="p-6 text-gray-700 bg-[#F1F1F1]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-semibold text-2xl">
          Configurar graduação - Configurações existentes:
        </h2>

        <button
          type="button"
          className="flex items-center gap-2 px-3 py-2 rounded-xl transition cursor-pointer"
        >
          <SquarePen className="w-8 h-8 text-[#1E1E1E]" />
        </button>
      </div>

      {/* TABELA */}
      <div className="bg-white rounded-2xl shadow-gray-100 p-4 overflow-x-auto">
        <table className="min-w-full text-sm border-collapse">
          <thead>
            <tr className="border border-[#EADBDC]">
              <th className="py-3 px-4 font-bold text-center text-base">Faixa</th>
              <th className="py-3 px-4 font-bold text-center text-base">
                Frequências Necessárias
              </th>
            </tr>
          </thead>

          <tbody>
            {[...faixasEGrausMaior16, ...faixasEGrausMenor16].map(
              (item, index) => (
                <tr
                  key={index}
                  className="border border-[#EADBDC] hover:bg-gray-50 transition"
                >
                  <td className="py-3 px-4 text-center">
                    <BeltTag faixa={item.faixa} />
                  </td>

                  <td className="py-3 px-4 text-center text-black">
                    0
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
