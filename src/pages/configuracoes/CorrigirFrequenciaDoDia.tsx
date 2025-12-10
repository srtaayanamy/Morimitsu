import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { listarAlunos } from "../../hooks/ListaAlunos";
import type { Frequencie } from "../../types/Frequencie";
import type { StudentParams } from "../../types/Aluno";

export default function CorrigirFrequenciaDoDia() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState<any[]>([]);

  const freq: Frequencie | null = state;

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

      const idsPresentes = new Set(freq.students.map((s: any) => s.id));

      const lista = result.map((aluno: any) => ({
        ...aluno,
        present: idsPresentes.has(aluno.id),
      }));

      setAlunos(lista);
    }

    fetchAlunosTurma();
  }, [freq]);

  function togglePresenca(id: number) {
    setAlunos((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, present: !a.present } : a
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
                <tr key={aluno.id} className="border-b">
                  <td className="py-4 text-center underline cursor-pointer">
                    {aluno.nome}
                  </td>

                  <td className="py-4 text-center">
                    {aluno.apelido || "—"}
                  </td>

                  <td className="py-4 text-center">
                    <input
                      type="checkbox"
                      checked={aluno.present}
                      onChange={() => togglePresenca(aluno.id)}
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
          onClick={() => console.log("Salvar", alunos)}
        >
          Salvar alterações
        </button>
      </div>
    </div>
  );
}
