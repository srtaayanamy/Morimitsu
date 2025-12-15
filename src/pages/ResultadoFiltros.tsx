import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { StudentList } from "../hooks/StudentList";
import type { Student } from "../types/Student";
import Header from "../components/Header";
import BeltTag from "../components/BeltTag";
import { Avatar } from "../components/Avatar";
import { AgeCalculator } from "../utils/AgeCalculator";

export default function ResultadoFiltros() {
  const [searchParams] = useSearchParams();

  const turma = searchParams.get("turma");
  const mes = searchParams.get("mes"); // 0–11
  const faixa = searchParams.get("faixa");

  const [resultados, setResultados] = useState<Student[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregar() {
      const alunos = await StudentList();
      if (typeof alunos === "string") return;

      let filtrados = alunos;

      // NAO FUNCIONA AINDA
      if (turma) {
        
      }

      // filtro por mês de aniversário
      if (mes !== null) {
        filtrados = filtrados.filter((a) => {
          const data = new Date(a.personal.birthDate ? a.personal.birthDate: '');
          return data.getMonth() === Number(mes);
        });
      }

      // filtro por faixa
      if (faixa) {
        filtrados = filtrados.filter((a) => a.form?.rank === faixa);
      }

      setResultados(filtrados);
      setCarregando(false);
    }

    carregar();
  }, [turma, mes, faixa]);

  if (carregando) {
    return (
      <div className="min-h-screen bg-[#F1F1F1] font-outfit flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-[#7F1A17] rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 space-y-5">
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1E1E1E]">
            Resultados dos filtros aplicados
          </h1>
        </div>

        <div className="bg-white rounded-2xl p-1 shadow-sm">
          {resultados.length === 0 ? (
            <p className="text-center py-10 text-gray-600 text-lg">
              Nenhum aluno encontrado com os filtros selecionados.
            </p>
          ) : (
            <div className="bg-white rounded-2xl p-4">
              {/* DESKTOP */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-2">
                  <thead>
                    <tr>
                      <th className="py-3 px-6 font-semibold">Nome</th>
                      <th className="py-3 px-6 font-semibold">Apelido</th>
                      <th className="py-3 px-6 font-semibold text-center">
                        Faixa
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {resultados.map((aluno) => (
                      <tr
                        key={aluno.id}
                        className="bg-white shadow-sm rounded-xl hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-6">
                          <Link
                            to={`/visualizar-aluno/${aluno.id}`}
                            className="font-medium hover:underline"
                          >
                            {aluno.personal.name}
                          </Link>
                        </td>

                        <td className="py-3 px-6">
                          {aluno.personal.nickName || "—"}
                        </td>

                        <td className="py-3 px-6 text-center">
                          <BeltTag faixa={aluno.form?.rank} grau={aluno.form?.rating} />
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
                    <div className="w-14 h-14 rounded-lg bg-[#7F1A17] flex items-center justify-center">
                      <Avatar
                        sexo={aluno.personal.gender}
                        idade={AgeCalculator(aluno.personal.birthDate ? aluno.personal.birthDate : '')}
                        size={40}
                        noWrapper
                      />
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-sm">
                        {aluno.personal.name}
                      </p>
                      <span className="text-xs text-gray-600">
                        {aluno.personal.nickName || "—"}
                      </span>
                    </div>

                    <div className="bg-white p-2 rounded-xl w-20 shadow-sm flex flex-col items-center">
                      <BeltTag faixa={aluno.form?.rank} grau={aluno.form?.rating} />
                      <p className="text-[0.6rem] font-semibold">
                        Grau: {aluno.form?.rating}
                      </p>
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
