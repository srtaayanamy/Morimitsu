import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { listarAlunos } from "../../hooks/ListaAlunos";
import type { Frequencie, StudentFrequencie } from "../../types/Frequencie";
import type { StudentParams } from "../../types/Aluno";
import { fazerFrequencia } from "../../utils/RealizarFrequencia";
import { deleteFrequencie } from "../../utils/deletefrequencie";

export default function CorrigirFrequenciaDoDia() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState<any[]>([]);
  const [alunosOriginal, setAlunosOriginal] = useState<any[]>([]);

  const freq: Frequencie = state;

  useEffect(() => {
    if (!freq?.class?.id) return;

    async function fetchAlunosTurma() {
      if(!freq){
        throw new Error()
      }
         
      const filter: StudentParams = { classid: freq.class.id };

      const result = await listarAlunos(filter);

      if (typeof result === "string") {
        alert(result);
        return;
      }

      const idsPresentes = new Set(freq.students.map((s: any) => s.student.id));

      const lista: StudentFrequencie[] = result.map((aluno: any) => {
        const student = freq.students.find(x => x.student?.id === aluno.id);

        return{
          idFrequencie: student?.idFrequencie,
          student:{
            ...aluno,
            present: idsPresentes.has(aluno.id),
          }
        }
        
      });

      setAlunos(lista);
      setAlunosOriginal(lista.map(a => ({ ...a })));

    }

    fetchAlunosTurma();
  }, [freq]);

  function togglePresenca(id: number) {
  setAlunos((prev) =>
    prev.map((a) =>
      a.student.id === id
        ? { ...a, student: { ...a.student, present: !a.student.present } } : a
    )
  );
}

  if (!freq) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold">Dados não encontrados</h2>
      </div>
    );
  }

  async function gerarAlteracoesDePresenca() {
    const marcadosComoPresentes = alunos.filter((aluno) => {
      const antes = alunosOriginal.find(a => a.student.id === aluno.student.id)?.student.present;
      const agora = aluno.student.present;
      return antes === false && agora === true;
    });

    const marcadosComoAusentes = alunos.filter((aluno) => {
      const antes = alunosOriginal.find(a => a.student.id === aluno.student.id)?.student.present;
      const agora = aluno.student.present;
      return antes === true && agora === false;
    });

    const idStudentsPresentMarcados = marcadosComoPresentes.map(student => student.student.id);

    const idsFrequencies = marcadosComoAusentes.map(student => student.idFrequencie)

    await fazerFrequencia(freq?.class.id, idStudentsPresentMarcados, freq?.Date);

    for(const id in idsFrequencies){
      await deleteFrequencie(id);
    }

    console.log(idStudentsPresentMarcados, idsFrequencies);
    console.log(marcadosComoPresentes, marcadosComoAusentes);

    navigate(-1)
    return;
  }

  return (
    <div className="p-4 text-gray-700 w-full">
      <h2 className="text-2xl font-semibold mb-6">
        Corrigir frequência – Turma “{freq.class?.nome}” em{" "}
        {new Date(freq.Date).toLocaleDateString("pt-BR")}:
      </h2>

      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm text-gray-700">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-center">Nome</th>
              <th className="py-2 text-center">Apelido</th>
              <th className="py-2 text-center">Presença</th>
            </tr>
          </thead>

          <tbody>
            {alunos.length > 0 ? (
              alunos.map((aluno: any) => (
                <tr key={aluno.student.id} className="border-b">
                  <td className="py-4 text-center underline cursor-pointer">
                    {aluno.student.nome}
                  </td>

                  <td className="py-4 text-center">
                    {aluno.student.apelido || "—"}
                  </td>

                  <td className="py-4 text-center">
                    <input
                      type="checkbox"
                      checked={aluno.student.present}
                      onChange={() => togglePresenca(aluno.student.id)}
                      className="w-6 h-6 accent-black cursor-pointer"
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="py-4 text-center text-gray-500 italic"
                >
                  Nenhum aluno encontrado nesta turma.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg"
          onClick={() => navigate(-1)}
        >
          Cancelar
        </button>

        <button
          className="bg-[#7F1A17] hover:bg-red-950 text-white px-6 py-2 rounded-lg cursor-pointer"
          onClick={() => gerarAlteracoesDePresenca()}
        >
          Salvar alterações
        </button>
      </div>
    </div>
  );
}
