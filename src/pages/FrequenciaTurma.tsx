import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { getClass } from "../HTTP/Class/getClass";
import { registerFrequencie } from "../HTTP/Frequencie/registerFrequencie";
import ConfirmFrequenciaModal from "../components/ConfirmFrequenciaModal";
import { Avatar } from "../components/Avatar";
import { AgeCalculator } from "../utils/AgeCalculator";

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

      const result = await getClass(id);

      if (typeof result === "string") {
        console.log(result);
        return;
      }

      setTurma(result);

      const alunos =
        result.students?.map((a: any) => ({
          id: a.id,
          personal:{
            name: a.personal.name,
            nickName: a.personal.nickName
          },
          form:{
            rank: a.form.rank,
            rating: a.form.rating
          }
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

    const result = await registerFrequencie(id, presentesIds, hoje);

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
              Frequência - <strong>{turma.name}</strong>
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
        <div className="bg-white p-4 md:p-8 rounded-2xl shadow-sm flex flex-col items-center gap-6">
          {/* IMAGEM */}
          <div className="flex justify-center">
            {turma.URLImage ? (
              <img
                src={turma.URLImage}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover"
              />
            ) : (
              <div className="w-28 h-28 md:w-36 md:h-36 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                Foto
              </div>
            )}
          </div>
          
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="sm:col-span-3 w-full">
              <p className="text-sm font-medium">Professor responsável:</p>
              <p className="bg-[#F5F5F5] p-3 mt-1 rounded-xl text-center">
                {turma.coachs?.[0]?.student.personal.name || "-"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Total de alunos:</p>
              <p className="bg-[#F5F5F5] p-3 mt-1 rounded-xl">
                {turma.numStudents}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Faixa etária:</p>
              <p className="bg-[#F5F5F5] p-3 mt-1 rounded-xl">
                {turma.MinAge} a {turma.MaxAge} anos
              </p>
            </div>

            <div>
              <p className="text-sm font-medium">Horário da aula:</p>
              <p className="bg-[#F5F5F5] p-3 mt-1 rounded-xl">
                {turma.startTime}h → {turma.endTime}h
              </p>
            </div>
          </div>
        </div>

        {/* LISTA DE ALUNOS — CORRIGIDA */}
        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-4">
          <h2 className="text-2xl font-semibold">Alunos matriculados:</h2>

          {/* MOBILE — CARDS IGUAIS À TELA DE ALUNOS */}
          <div className="md:hidden space-y-3">
            <div className="flex justify-end pr-2">
              <span className="text-sm text-gray-600 font-medium">
                Está presente
              </span>
            </div>
            {students.map((aluno) => (
              <div
                key={aluno.id}
                className="bg-[#F5F5F5] shadow-sm rounded-xl p-4 flex items-center gap-4"
              >
                <div className="w-20 h-20 rounded-xl bg-[#7F1A17] flex items-center justify-center overflow-hidden">
                  <Avatar
                    sexo={aluno.personal.gender}
                    idade={AgeCalculator(aluno.personal.birthDate)}
                    size={48}
                    noWrapper={true}
                  />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-[#1E1E1E] leading-tight">
                    {aluno.personal.name}
                  </p>
                  <span className="text-sm text-gray-600">
                    {aluno.personal.nickName || "—"}
                  </span>
                </div>

                <div className="flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={!!presentes[aluno.id]}
                    onChange={() => togglePresente(aluno.id)}
                    className="w-6 h-6 accent-[#1E1E1E]"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP — TABELA ORIGINAL */}
          <div className="overflow-x-auto hidden md:block">
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
                    <td className="px-4 py-3 rounded-l-xl">{aluno.personal.name}</td>

                    <td className="px-4 py-3">{aluno.personal.nickName || "—"}</td>

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
        turmaNome={turma?.name || ""}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false);
          finalizarChamada();
        }}
      />
    </div>
  );
}
