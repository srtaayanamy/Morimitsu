import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { listarAlunos } from "../hooks/ListaAlunos";
import type { Aluno } from "../types/Aluno";
import Header from "../components/Header";
import BeltTag from "../components/BeltTag";
import { Avatar } from "../components/Avatar";
import { calcularIdade } from "../utils/CalcularIdade";

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

        <div className="bg-white rounded-2xl p-1 shadow-sm">
          {resultados.length === 0 ? (
            <p className="text-center py-10 text-gray-600 text-lg">
              Nenhum aluno encontrado.
            </p>
          ) : (
            <div className="bg-white rounded-2xl p-4">
              {/* DESKTOP – Tabela */}
              <div className="hidden md:block overflow-x-auto">
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

              {/* MOBILE */}
              <div className="md:hidden space-y-3 mt-2">
                {resultados.map((aluno) => (
                  <Link
                    key={aluno.id}
                    to={`/visualizar-aluno/${aluno.id}`}
                    className="bg-[#F1F1F1] shadow-sm rounded-lg p-3 flex items-center gap-3"
                  >
                    {/* Avatar vermelho */}
                    <div className="w-14 h-14 rounded-lg bg-[#7F1A17] flex items-center justify-center overflow-hidden">
                      <Avatar sexo={aluno.sexo} idade={calcularIdade(aluno.dataNascimento)} size={40} noWrapper />
                    </div>

                    {/* Nome e apelido */}
                    <div className="flex-1">
                      <p className="font-semibold text-[#1E1E1E] text-[0.95rem] leading-tight">
                        {aluno.nome}
                      </p>
                      <span className="text-xs text-gray-600">
                        {aluno.apelido || "—"}
                      </span>
                    </div>

                    {/* Faixa */}
                    <div className="flex flex-col items-center justify-center px-1">
                      <div className="bg-white p-2 rounded-xl w-20 shadow-sm flex flex-col items-center justify-center">
                        <BeltTag faixa={aluno.faixa} grau={aluno.grau} />
                        <p className="text-[0.6rem] font-semibold">
                          Grau: {aluno.grau}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
