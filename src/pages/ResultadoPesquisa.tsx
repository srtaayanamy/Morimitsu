import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { listarAlunos } from "../hooks/ListaAlunos";
import type { Aluno } from "../types/Aluno";
import Header from "../components/Header";
import BeltTag from "../components/BeltTag";

export default function ResultadoPesquisa() {
  const [searchParams] = useSearchParams();
  const nomeBuscado = searchParams.get("nome") || "";

  const [resultados, setResultados] = useState<Aluno[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      const todos = await listarAlunos();
      if (typeof todos === "string") return;

      const filtrados = todos.filter((a) =>
        a.nome.toLowerCase().includes(nomeBuscado.toLowerCase())
      );

      setResultados(filtrados);
      setCarregando(false);
    }

    carregar();
  }, [nomeBuscado]);

  if (carregando) {
    return (
      <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#7F1A17] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 space-y-5">
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1E1E1E]">
            Resultados para “{nomeBuscado}”:
          </h1>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          {resultados.length === 0 ? (
            <p className="text-center py-10 text-gray-600 text-lg">
              Nenhum aluno encontrado.
            </p>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-4 overflow-x-auto">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr>
                    <th className="py-3 px-6 font-semibold text-[#1E1E1E]">
                      Nome
                    </th>
                    <th className="py-3 px-6 font-semibold text-[#1E1E1E]">
                      Apelido
                    </th>
                    <th className="py-3 px-6 font-semibold text-[#1E1E1E] text-center">
                      Faixa atual
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {resultados.map((aluno) => (
                    <tr
                      key={aluno.id}
                      className="bg-[#FFFFFF] shadow-sm rounded-xl hover:bg-gray-50 transition"
                    >
                      <td className="py-3 px-6">
                        <Link
                          to={`/visualizar-aluno/${aluno.id}`}
                          className="text-[#000000] hover:underline font-medium"
                        >
                          {aluno.nome}
                        </Link>
                      </td>

                      <td className="py-3 px-6">{aluno.apelido || "—"}</td>

                      <td className="py-3 px-6 text-center">
                        <BeltTag faixa={aluno.faixa} grau={aluno.grau} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
