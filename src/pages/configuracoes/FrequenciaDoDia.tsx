import { useLocation, useNavigate } from "react-router-dom";

export default function FrequenciaDoDia() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const freq = state;

  if (!freq) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold">Dados não encontrados</h2>
      </div>
    );
  }

  function irParaEditar() {
    navigate("/configuracoes/corr-freq-do-dia", { state: freq });
  }

  return (
    <div className="p-4 text-gray-700 w-full">
      {/* Cabeçalho com botão */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">
          Presentes – Turma “{freq.class?.nome}” em{" "}
          {new Date(freq.Date).toLocaleDateString("pt-BR")}:
        </h2>

        <button
          onClick={irParaEditar}
          className="bg-[#7F1A17] hover:bg-red-950 text-white px-4 py-2 rounded-lg transition"
        >
          Editar
        </button>
      </div>

      <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm text-gray-700">
          <thead>
            <tr className="border-b">
              <th className="py-2 text-center">Nome</th>
              <th className="py-2 text-center">Apelido</th>
            </tr>
          </thead>

          <tbody>
            {freq.students.length > 0 ? (
              freq.students.map((aluno: any, i: number) => (
                <tr key={i} className="border-b">
                  <td className="py-3 text-center underline cursor-pointer">
                    {aluno?.student.nome}
                  </td>
                  <td className="py-3 text-center">{aluno?.student.apelido}</td>
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
