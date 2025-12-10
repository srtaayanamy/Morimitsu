import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { listarAlunos } from "../../hooks/ListaAlunos";
import type { Frequencie } from "../../types/Frequencie";
import type { Aluno, StudentParams } from "../../types/Aluno";

export default function CorrigirFrequenciaDoDia() {
  const { state } = useLocation();
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const freq : Frequencie= state; // Recebe um item da lista retornada por getFrequencies()

  useEffect(()=>{
    const fetchAlunosTurma = async () =>{
        const filter: StudentParams = {class: freq.class.id}
        const result = await listarAlunos(filter)

        if(typeof result === 'string'){
            alert(result)
        } else{
            const idsAlunosPresentes = new Set(freq.students.map(item => item.id));

            const FiltredStudent = result.map(item => ({
            ...item,
            present: idsAlunosPresentes.has(item.id) ? true : false
            }));

            setAlunos(FiltredStudent);
        }
    }
    fetchAlunosTurma();
  }, [])

  if (!freq) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold">Dados não encontrados</h2>
      </div>
    );
  }

  return (
    <div className="p-4 text-gray-700 w-full">
      <h2 className="text-xl font-semibold mb-4">
        Presentes – Turma “{freq.class?.nome}” em{" "}
        {new Date(freq.Date).toLocaleDateString("pt-BR")}:
      </h2>

      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm text-gray-700">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-center">Nome</th>
              <th className="py-2 text-center">Apelido</th>
            </tr>
          </thead>

          <tbody>
            {alunos.length > 0 ? (
              alunos.map((aluno: any, i: number) => (
                <tr key={i} className="border-b">
                  <td className="py-3 text-center underline cursor-pointer">
                    {aluno?.nome}
                  </td>
                  <td className="py-3 text-center">{aluno?.apelido}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="py-4 text-center text-gray-500 italic"
                >
                  Nenhum aluno presente registrado nesse dia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
