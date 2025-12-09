import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { pegaDadosTurma } from "../utils/getDadosTurma";
import { fazerFrequencia } from "../utils/RealizarFrequencia";
import ConfirmFrequenciaModal from "../components/ConfirmFrequenciaModal";

export default function FrequenciaTurma() {
  const { id } = useParams();
  const [turma, setTurma] = useState<any>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [presentes, setPresentes] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTurma() {
      if (!id) return;

      const result = await pegaDadosTurma(id);

      if (typeof result === "string") {
        console.log(result);
        return;
      }

      setTurma(result);

      // LISTA DE ALUNOS — IGUAL À TELA DE VISUALIZAR
      const alunos =
        result.alunos?.map((a: any) => ({
          id: a.id,
          nome: a.nome,
          apelido: a.apelido,
          faixa: a.faixa,
          grau: a.grau,
        })) || [];

      setStudents(alunos);

      const initial: Record<string, boolean> = {};
      alunos.forEach((a) => (initial[a.id] = false));
      setPresentes(initial);
    }

    fetchTurma();
  }, [id]);

  function togglePresente(idAluno: string) {
    setPresentes((prev) => ({ ...prev, [idAluno]: !prev[idAluno] }));
  }

  async function finalizarChamada() {
    if (!id) return;

    setLoading(true);

    const presentesIds = Object.keys(presentes).filter((id) => presentes[id]);
    const hoje = new Date().toISOString();

    const result = await fazerFrequencia(id, presentesIds, hoje);

    setLoading(false);

    if (result === true) {
      navigate(`/visualizar-turma/${id}`);
    } else {
      alert(result);
    }
  }

  if (!turma) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Carregando...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#1E1E1E] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 flex flex-col space-y-6">
        <PageTitle
          title={
            <span>
              Frequência - <strong>{turma.nome}</strong>
            </span>
          }
        >
          <button
            onClick={() => setModalOpen(true)}
            disabled={loading}
            className="bg-[#1E1E1E] text-white px-4 py-2 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition cursor-pointer"
          >
            {loading ? "Salvando..." : "Finalizar chamada"}
          </button>
        </PageTitle>

        {/* CARD PRINCIPAL */}
        <div className="bg-white p-8 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-10">
          {/* FOTO DA TURMA */}
          <div>
            {turma.URLImage ? (
              <img
                src={turma.URLImage}
                className="w-36 h-36 rounded-full object-cover"
              />
            ) : (
              <div className="w-36 h-36 bg-gray-200 rounded-full flex items-center justify-center">
                Foto
              </div>
            )}
          </div>

          {/* INFORMAÇÕES */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-3 w-full">
              <p className="text-sm font-medium">Professor responsável:</p>
              <p className="bg-[#F5F5F5] p-3 mt-1 rounded-xl text-center">
                {turma.professores?.[0]?.nome || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Total de alunos:</p>
              <p className="bg-[#F5F5F5] p-3 mt-1 rounded-xl">
                {turma.numAlunos}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Faixa etária:</p>
              <p className="bg-[#F5F5F5] p-3 mt-1 rounded-xl">
                {turma.idadeMin} a {turma.idadeMax} anos
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Horário da aula:</p>
              <p className="bg-[#F5F5F5] p-3 mt-1 rounded-xl">
                {turma.horarioInicio}h → {turma.horarioFim}h
              </p>
            </div>
          </div>
        </div>

        {/* LISTA DE ALUNOS */}
        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-semibold">Alunos matriculados:</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-left text-sm text-gray-600">
                  <th className="px-4 py-2 font-semibold">Nome</th>
                  <th className="px-4 py-2 font-semibold">Apelido</th>
                  <th className="px-4 py-2 font-semibold text-center">
                    Presente
                  </th>
                </tr>
              </thead>

              <tbody>
                {students.map((aluno) => (
                  <tr key={aluno.id} className="bg-[#F5F5F5] rounded-xl">
                    <td className="px-4 py-3 rounded-l-xl">{aluno.nome}</td>

                    <td className="px-4 py-3">{aluno.apelido || "—"}</td>

                    <td className="px-4 py-3 rounded-r-xl text-center">
                      <input
                        type="checkbox"
                        checked={!!presentes[aluno.id]}
                        onChange={() => togglePresente(aluno.id)}
                        className="w-5 h-5 accent-[#1E1E1E]"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
      <ConfirmFrequenciaModal
        isOpen={modalOpen}
        turmaNome={turma?.nome || ""}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false);
          finalizarChamada();
        }}
      />
    </div>
  );
}
