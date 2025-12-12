import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { pegaDadosTurma } from "../utils/getDadosTurma";
import { listarProfessores } from "../hooks/ListaProfessores";
import type { Turma } from "../types/Turma";
import type { Professor } from "../types/User";
import { ErrorMessage } from "../components/ErrorMessage";
import { vincularProfessor } from "../utils/vincularProfessor";
import { Loader2 } from "lucide-react";

export default function VincularProfessoresTurma() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [turma, setTurma] = useState<Turma | null>(null);
  const [selecionados, setSelecionados] = useState<Record<string, boolean>>({});
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
        if(turmaDados.professores){
          const professoresTurmaAtual = turmaDados.professores;
          const lista = await listarProfessores();
          if (typeof lista !== "string" && lista !== false) {
            const professores = lista.filter((teacher) => !professoresTurmaAtual.some(p => p.id === teacher.id))
            setProfessoresTotais(professores);
          }
        }
      }

      
      
      setLoading(false);
    }

    fetch();
  }, []);

  const toggleSelecionado = (idAluno: string) => {
    setSelecionados((prev) => ({
      ...prev,
      [idAluno]: !prev[idAluno],
    }));
  };

  const inserirProfessores = async () => {
    if (!id) return;

    const idsSelecionados = Object.keys(selecionados).filter(
      (idProfessor) => selecionados[idProfessor]
    );

    if (idsSelecionados.length === 0) {
      return;
    }
    setLoading(true);

    let sucessos = 0;
    let erros = 0;
    const errosDetalhados: string[] = [];

    for (const idProfessor of idsSelecionados) {
      const resultado = await vincularProfessor( id, idProfessor);

      if (resultado === true) {
        sucessos++;
      } else {
        erros++;
        if (typeof resultado === "string") {
          errosDetalhados.push(resultado);
        }
      }
    }

    setLoading(false);
    navigate(-1);
  }

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#1E1E1E] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 space-y-5">
        <PageTitle
          title={
            <span>
              Vincular professores - <strong>{turma?.nome || "..."}</strong>:
            </span>
          }
        >
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => navigate(-1)}
              className="bg-[#333434] text-white px-4 py-2 rounded-xl cursor-pointer text-xs sm:text-sm font-medium hover:opacity-90"
            >
              Cancelar
            </button>

            <button
              onClick={() => inserirProfessores()}
              className="bg-[#7F1A17] text-white px-4 py-2 rounded-xl text-xs sm:text-sm cursor-pointer font-medium hover:opacity-90"
            >
              Vincular professores
            </button>
          </div>
        </PageTitle>

        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
          {erro && <ErrorMessage message={erro} />}

          {loading && (
            <Loader2 className="w-8 h-8 text-gray-600 items-center animate-spin" />
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
                          checked={!!selecionados[prof.id]}
                          onChange={() => toggleSelecionado(prof.id)}
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
