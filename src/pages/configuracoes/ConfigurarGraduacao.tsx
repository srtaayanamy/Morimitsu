import { useState } from "react";
import { faixasEGrausMenor16, faixasEGrausMaior16 } from "../../types/Rank";

export default function ConfigurarGraduacao() {
  const [age, setAge] = useState<number>(0); // aqui você pode trocar pelo valor real da idade do aluno
  const [faixaInicial, setFaixaInicial] = useState<string>("");
  const [grauInicial, setGrauInicial] = useState<number | null>(null);
  const [faixaFinal, setFaixaFinal] = useState<string>("");
  const [grauFinal, setGrauFinal] = useState<number | null>(null);

  const inputBase =
    "w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-gray-300";

  return (
    <div className="p-6 text-gray-700">
      <h2 className="font-semibold text-2xl mb-6">Configurar graduação</h2>

      {/* Seção: Formulário de configuração */}
      <div className="bg-gray-50 rounded-2xl shadow p-6 mb-10">
        <h3 className="font-semibold text-xl mb-4">Configurar graduação</h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Tipo de configuração */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Tipo de configuração:
            </label>
            <select className={inputBase}>
              <option value="">Selecione</option>
              <option value="faixa">Por faixa</option>
              <option value="idade">Por idade</option>
            </select>
          </div>

          {/* Faixa inicial */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Faixa inicial:
            </label>
            <select
              className={inputBase}
              value={
                faixaInicial && grauInicial !== null
                  ? `${faixaInicial}-${grauInicial}`
                  : faixaInicial
              }
              onChange={(e) => {
                const [f, g] = e.target.value.split("-");
                setFaixaInicial(f);
                setGrauInicial(g ? Number(g) : null);
              }}
            >
              <option value="">Selecione</option>
              {(age >= 16 ? faixasEGrausMaior16 : faixasEGrausMenor16).map(
                (
                  item: { faixa: string; grau: number | null },
                  index: number
                ) => (
                  <option
                    key={index}
                    value={
                      item.grau !== null
                        ? `${item.faixa}-${item.grau}`
                        : item.faixa
                    }
                  >
                    {item.faixa} {item.grau !== null ? `${item.grau}°` : ""}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Faixa final */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Faixa final:
            </label>
            <select
              className={inputBase}
              value={
                faixaFinal && grauFinal !== null
                  ? `${faixaFinal}-${grauFinal}`
                  : faixaFinal
              }
              onChange={(e) => {
                const [f, g] = e.target.value.split("-");
                setFaixaFinal(f);
                setGrauFinal(g ? Number(g) : null);
              }}
            >
              <option value="">Selecione</option>
              {(age >= 16 ? faixasEGrausMaior16 : faixasEGrausMenor16).map(
                (item, index) => (
                  <option
                    key={index}
                    value={
                      item.grau !== null
                        ? `${item.faixa}-${item.grau}`
                        : item.faixa
                    }
                  >
                    {item.faixa} {item.grau !== null ? `${item.grau}°` : ""}
                  </option>
                )
              )}
            </select>
          </div>

          {/* Quantidade de frequências */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Quantidade de frequências:
            </label>
            <input type="number" placeholder="0" className={inputBase} />
          </div>
        </div>

        {/* Botão alinhado à direita */}
        <div className="flex justify-end">
          <button className="bg-[#1D1E1E] text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
            Adicionar configuração
          </button>
        </div>
      </div>

      {/* Seção: Configurações existentes */}
      <div>
        <h3 className="font-semibold text-xl mb-4">Configurações existentes</h3>

        <div className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
          <table className="min-w-full text-sm border-collapse text-left">
            <thead>
              <tr className="border-b">
                <th className="py-3 px-4 font-semibold">Tipo</th>
                <th className="py-3 px-4 font-semibold">Nome / intervalo</th>
                <th className="py-3 px-4 font-semibold">Frequências</th>
                <th className="py-3 px-4 font-semibold">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-3 px-4 text-gray-400 italic" colSpan={4}>
                  Nenhuma configuração cadastrada
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
