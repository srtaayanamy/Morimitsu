import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { pegaDadosTurma } from "../utils/getDadosTurma";
import { listarProfessores } from "../hooks/ListaProfessores";
import type { Turma } from "../types/Turma";
import type { Professor } from "../types/Professor";
import { ErrorMessage } from "../components/ErrorMessage";

export default function VincularProfessoresTurma() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [turma, setTurma] = useState<Turma | null>(null);
  const [professoresTotais, setProfessoresTotais] = useState<Professor[]>([]);
  const [erro, setErro] = useState<string | boolean>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      if (!id) return;

      const turmaDados = await pegaDadosTurma(id);
      if (typeof turmaDados === "string") {
        setErro(turmaDados);
      } else {
        setTurma(turmaDados);
      }

      const lista = await listarProfessores();
      if (typeof lista !== "string") {
        setProfessoresTotais(lista || []);
      }

      setLoading(false);
    }

    fetch();
  }, [id]);

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#1E1E1E] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 space-y-5">
        <PageTitle
          title={
            <span>
              Vincular professores - turma <strong>{turma?.nome || "..."}</strong>:
            </span>
          }
        >
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => navigate(-1)}
              className="bg-[#333434] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-medium hover:opacity-90"
            >
              Cancelar
            </button>

            <button
              disabled
              className="bg-[#7F1A17] text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-medium hover:opacity-90"
            >
              Vincular professores
            </button>
          </div>
        </PageTitle>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          {erro && <ErrorMessage message={erro} />}

          {loading && (
            <p className="text-center text-gray-500">Carregando...</p>
          )}

          {!loading && professoresTotais.length > 0 && (
            <div className="overflow-x-auto block">
              <table className="w-full text-left border-separate border-spacing-y-2">
                <thead>
                  <tr>
                    <th className="py-3 px-6 font-semibold">Nome</th>
                    <th className="py-3 px-6 font-semibold text-center">
                      Selecionar
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {professoresTotais.map((prof) => (
                    <tr
                      key={prof.id}
                      className="bg-white shadow-sm rounded-xl hover:bg-gray-50"
                    >
                      <td className="py-3 px-6 font-medium">{prof.nome}</td>
                      <td className="py-3 px-6 text-center">
                        <input
                          type="checkbox"
                          disabled
                          className="w-5 h-5 accent-[#1E1E1E]"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && professoresTotais.length === 0 && (
            <p className="text-center text-gray-500 py-8">
              Nenhum professor cadastrado no sistema.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
