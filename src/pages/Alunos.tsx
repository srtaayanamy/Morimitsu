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
          <div className="space-y-3">
            {alunos.length === 0 ? (
              <p>Nenhum aluno encontrado.</p>
            ) : (
              alunos.map((aluno) => (
                <div
                  key={aluno.email}
                  className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-lg">{aluno.nome}</p>
                    <p className="text-sm text-gray-500">
                      Faixa: {aluno.faixa}  {aluno.grau}  Apelido: {aluno.apelido}
                    </p>
                  </div>
                  <Link
                    to={`/editar-turma/${aluno.id}`}
                    className="text-sm text-[#911418] hover:underline"
                  >
                    Acessar
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
    
  );
}
