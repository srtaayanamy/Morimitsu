import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import { listarAlunos } from "../hooks/ListaAlunos";
import type { Aluno } from "../types/Aluno";

export default function Alunos() {
  //Variáveis de estado
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //UseEffet para assim que a tela iniciar a função de listarTurmas seja executada retornando a lista de turmas
  useEffect(() => {
    const fetchTurmas = async () => {
      setLoading(true);
      const result = await listarAlunos();

      if (result === false) {
        setError("Erro ao carregar turmas.");
      } else {
        setAlunos(result || []);
      }

      setLoading(false);
    };

    fetchTurmas();
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000] flex flex-col">
      {/* HEADER - Menu */}
      <Header />

      <main className="flex-1 p-4 md:p-8 space-y-5">
        {/* Cabeçalho da página */}
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1E1E1E]">
            Alunos matriculados:
          </h1>

          <Link to="/registrar-aluno">
            <button
              type="button"
              className="bg-[#1E1E1E] md:bg-[#7F1A17] text-white px-4 py-2 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition"
            >
              Cadastrar aluno
            </button>
          </Link>
        </div>

        {/* Conteúdo */}
        {loading && <p>Carregando alunos...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            {alunos.length === 0 ? (
              <p>Nenhum aluno encontrado.</p>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-4 overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-y-2">
                  <thead>
                    <tr>
                      <th className="py-3 px-6 font-semibold text-[#1E1E1E]">
                        Nome
                      </th>
                      <th className="py-3 px-6 font-semibold text-[#1E1E1E]">
                        Apelido
                      </th>
                      <th className="py-3 px-6 font-semibold text-[#1E1E1E]">
                        Faixa atual
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {alunos.map((aluno) => (
                      <tr
                        key={aluno.id}
                        className="bg-[#FFFFFF] shadow-sm rounded-xl hover:bg-gray-50 transition"
                      >
                        <td className="py-3 px-6 rounded-l-xl">
                          <Link
                            to={`/visualizar-aluno/${aluno.id}`}
                            className="text-[#000000] hover:underline font-medium"
                          >
                            {aluno.nome}
                          </Link>
                        </td>
                        <td className="py-3 px-6">{aluno.apelido}</td>
                        <td className="py-3 px-6 rounded-r-xl">
                          {aluno.faixa} {aluno.grau}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
