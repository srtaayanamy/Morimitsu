import BeltTag from "../../components/BeltTag";
import { configGraduantionsList } from "../../hooks/configurationsList";
import { editConfigGraduation } from "../../HTTP/Graduation/editConfigGraduation";
import { faixasEGrausMaior16, faixasEGrausMenor16 } from "../../types/Rank";
import { SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import type { Graduation } from "../../types/Graduation";

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
  const [configurations, setConfigurations] = useState<Graduation[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [edicoes, setEdicoes] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  async function fetchConfigurations() {
    const result = await configGraduantionsList();

    if (typeof result === "string") {
      alert(result);
      return;
    }

    setConfigurations(result);

    const mapaEdicoes: Record<string, number> = {};
    result.forEach((item) => {
      mapaEdicoes[item.id] = item.needed_frequency;
    });

    setEdicoes(mapaEdicoes);
  }

  useEffect(() => {
    fetchConfigurations();
  }, []);

  async function toggleEditing() {
    if (!isEditing) {
      setIsEditing(true);
      return;
    }

    try {
      setLoading(true);

      for (const id in edicoes) {
        await editConfigGraduation(id, edicoes[id]);
      }

      const novasConfigs = configurations.map((item) => ({
        ...item,
        needed_frequency: edicoes[item.id],
      }));

      setConfigurations(novasConfigs);

      setIsEditing(false);
      alert("Configurações salvas com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar as configurações.");
    } finally {
      setLoading(false);
    }
  }

  const titulo =
    filtro === "maiores" ? "Maiores de 16 anos" : "Menores de 16 anos";

  return (
    <div className="p-6 text-gray-700 bg-[#F1F1F1] min-h-screen max-sm:p-3">
      <div className="flex items-center justify-between mb-6 max-sm:flex-col max-sm:gap-4 max-sm:text-center">
        <h2 className="font-semibold text-2xl max-sm:text-lg">
          Configurar graduação - Configurações existentes
        </h2>

        <button
          type="button"
          onClick={toggleEditing}
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition cursor-pointer max-sm:w-full max-sm:justify-center
    ${isEditing ? "bg-[#7F1A17] text-white" : "bg-transparent"}
    ${loading && "opacity-70 cursor-not-allowed"}
  `}
        >
          {!isEditing && !loading && (
            <SquarePen className="w-8 h-8 text-[#1E1E1E]" />
          )}

          {loading && (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          )}

          {isEditing && !loading && "Salvar alterações"}
        </button>
      </div>

      <div
        className="
          flex gap-8 mb-8 border-b border-gray-200
          max-sm:gap-3 max-sm:text-sm max-sm:justify-center
          max-sm:flex-nowrap max-sm:overflow-x-auto max-sm:pb-1
        "
      >
        <button
          onClick={() => setFiltro("menores")}
          className={`
            pb-3 px-1 font-medium text-lg border-b-4 transition-all
            max-sm:text-sm max-sm:pb-2 max-sm:px-0
            ${
              filtro === "menores"
                ? "border-[#1E1E1E] text-[#1E1E1E]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }
          `}
        >
          Menores de 16 anos
        </button>

        <button
          onClick={() => setFiltro("maiores")}
          className={`
            pb-3 px-1 font-medium text-lg border-b-4 transition-all
            max-sm:text-sm max-sm:pb-2 max-sm:px-0
            ${
              filtro === "maiores"
                ? "border-[#1E1E1E] text-[#1E1E1E]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }
          `}
        >
          Maiores de 16 anos
          <span className="ml-2 text-sm font-normal text-gray-500 max-sm:hidden">
            ({faixasEGrausMaior16.length})
          </span>
        </button>
      </div>

      <h3 className="text-lg font-semibold text-gray-800 mb-4 max-sm:text-base">
        {titulo}
      </h3>

      {/* ------------------ MENORES ------------------ */}
      {filtro === "menores" && (
        <div className="space-y-6">
          {(Object.keys(categoriasMenores) as CategoriaMenor[]).map(
            (categoria) => {
              const apiRank = categoria === "kids" ? "KIDS" : "JUVENIL";

              const config = configurations.find((c) => c.rank === apiRank);

              return (
                <div
                  key={categoria}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden max-sm:text-sm"
                >
                  <div className="px-6 py-4 bg-gray-100 border-b max-sm:px-4">
                    <h3 className="text-lg font-semibold max-sm:text-base">
                      {categoriasLabels[categoria]}
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border-collapse">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="py-4 px-6 font-bold text-base text-center max-sm:px-3 max-sm:text-sm">
                            Faixas da categoria
                          </th>
                          <th className="py-4 px-6 font-bold text-base text-center max-sm:px-3 max-sm:text-sm">
                            Frequência Necessária (única)
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr className="border-t border-gray-200">
                          <td className="py-4 px-6 text-center max-sm:px-3">
                            <div className="flex flex-wrap justify-center gap-2 max-sm:gap-1">
                              {categoriasMenores[categoria].map((item, i) => (
                                <BeltTag key={i} faixa={item.faixa} />
                              ))}
                            </div>
                          </td>

                          <td className="py-4 px-6 text-center max-sm:px-3">
                            {isEditing ? (
                              <input
                                type="number"
                                value={edicoes[config?.id || ""] ?? 0}
                                onChange={(e) => {
                                  if (!config?.id) return;
                                  setEdicoes((prev) => ({
                                    ...prev,
                                    [config.id]: Number(e.target.value),
                                  }));
                                }}
                                className="w-20 border rounded-lg px-2 py-1 text-center max-sm:w-16"
                              />
                            ) : (
                              <p>{config?.needed_frequency ?? 0}</p>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              );
            }
          )}
        </div>
      )}

      {/* ------------------ MAIORES ------------------ */}
      {filtro === "maiores" && (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden max-sm:text-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border-collapse">
              <thead className="bg-gray-50">
                <tr>
                  <th className="py-4 px-6 font-bold text-base text-center max-sm:px-3 max-sm:text-sm">
                    Faixa
                  </th>
                  <th className="py-4 px-6 font-bold text-base text-center max-sm:px-3 max-sm:text-sm">
                    Frequências Necessárias
                  </th>
                </tr>
              </thead>

              <tbody>
                {faixasEGrausMaior16.map((item, index) => {
                  const config = configurations.find(
                    (c) => c.rank === item.faixa.toUpperCase()
                  );

                  return (
                    <tr
                      key={index}
                      className="border-t border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="py-4 px-6 text-center max-sm:px-3">
                        <BeltTag faixa={item.faixa} />
                      </td>

                      <td className="py-4 px-6 text-center max-sm:px-3">
                        {isEditing ? (
                          <input
                            type="number"
                            value={edicoes[config?.id || ""] ?? 0}
                            onChange={(e) => {
                              if (!config?.id) return;
                              setEdicoes((prev) => ({
                                ...prev,
                                [config.id]: Number(e.target.value),
                              }));
                            }}
                            className="w-20 border rounded-lg px-2 py-1 text-center max-sm:w-16"
                          />
                        ) : (
                          <p>{config?.needed_frequency ?? 0}</p>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
