import BeltTag from "../../components/BeltTag";
import { faixasEGrausMaior16, faixasEGrausMenor16 } from "../../types/Rank";
import { SquarePen } from "lucide-react";
import { useState } from "react";

const categoriasLabels = {
  kids: "Kids",
  juvenil: "Juvenil",
} as const;

type CategoriaMenor = keyof typeof categoriasLabels;

const categoriasMenores: Record<CategoriaMenor, { faixa: string }[]> = {
  kids: faixasEGrausMenor16,
  juvenil: faixasEGrausMenor16,
};

export default function ConfigurarGraduacao() {
  const [filtro, setFiltro] = useState<"maiores" | "menores">("menores");
  const [isEditing, setIsEditing] = useState(false);

  // ESTADOS DOS VALORES EDITÁVEIS
  const [frequenciasMenores, setFrequenciasMenores] = useState({
    kids: 0,
    juvenil: 0,
  });

  const [frequenciasMaiores, setFrequenciasMaiores] = useState(
    faixasEGrausMaior16.map(() => 0)
  );

  const toggleEditing = () => setIsEditing(!isEditing);

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
          onClick={toggleEditing}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition cursor-pointer
    ${isEditing ? "bg-[#7F1A17] text-white" : "bg-transparent"}
  `}
        >
          {!isEditing && <SquarePen className="w-8 h-8 text-[#1E1E1E]" />}

          {isEditing && "Salvar alterações"}
        </button>
      </div>

      {/* Tabs Menores / Maiores */}
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
            ({faixasEGrausMaior16.length})
          </span>
        </button>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-4">{titulo}</h3>

      {/* MENOR DE 16 */}
      {filtro === "menores" && (
        <div className="space-y-6">
          {(Object.keys(categoriasMenores) as CategoriaMenor[]).map(
            (categoria) => (
              <div
                key={categoria}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="px-6 py-4 bg-gray-100 border-b">
                  <h3 className="text-lg font-semibold">
                    {categoriasLabels[categoria]}
                  </h3>
                </div>

                <table className="min-w-full text-sm border-collapse">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="py-4 px-6 font-bold text-base text-center">
                        Faixas da categoria
                      </th>
                      <th className="py-4 px-6 font-bold text-base text-center">
                        Frequência Necessária (única)
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="py-4 px-6 text-center">
                        <div className="flex flex-wrap justify-center gap-2">
                          {categoriasMenores[categoria].map((item, i) => (
                            <BeltTag key={i} faixa={item.faixa} />
                          ))}
                        </div>
                      </td>

                      <td className="py-4 px-6 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            value={frequenciasMenores[categoria]}
                            onChange={(e) =>
                              setFrequenciasMenores((prev) => ({
                                ...prev,
                                [categoria]: Number(e.target.value),
                              }))
                            }
                            className="w-20 border rounded-lg px-2 py-1 text-center"
                          />
                        ) : (
                          <p>{frequenciasMenores[categoria]}</p>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )
          )}
        </div>
      )}

      {/* MAIOR DE 16 */}
      {filtro === "maiores" && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 font-bold text-base text-center">
                    Faixa
                  </th>
                  <th className="py-4 px-6 font-bold text-base text-center">
                    Frequências Necessárias
                  </th>
                </tr>
              </thead>

              <tbody>
                {faixasEGrausMaior16.map((item, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 px-6 text-center">
                      <BeltTag faixa={item.faixa} />
                    </td>

                    <td className="py-4 px-6 text-center">
                      {isEditing ? (
                        <input
                          type="number"
                          value={frequenciasMaiores[index]}
                          onChange={(e) =>
                            setFrequenciasMaiores((prev) => {
                              const clone = [...prev];
                              clone[index] = Number(e.target.value);
                              return clone;
                            })
                          }
                          className="w-20 border rounded-lg px-2 py-1 text-center"
                        />
                      ) : (
                        <p>{frequenciasMaiores[index]}</p>
                      )}
                    </td>
                  </tr>
                ))}

                {faixasEGrausMaior16.length === 0 && (
                  <tr>
                    <td colSpan={2} className="py-12 text-center text-gray-500">
                      Nenhuma faixa configurada para maiores de 16 anos.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
