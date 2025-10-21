import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { listarTurmas } from "../hooks/ListaTurmas";
import { type Turma } from "../types/Turma";

export default function Turmas() {

  //Variáveis de estado
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //UseEffet para assim que a tela iniciar a função de listarTurmas seja executada retornando a lista de turmas
  useEffect(() => {
    const fetchTurmas = async () => {
      setLoading(true);
      const result = await listarTurmas();

      if (result === false) {
        setError("Erro ao carregar turmas.");
      } else {
        setTurmas(result);
      }

      setLoading(false);
    };

    fetchTurmas();
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000] flex flex-col">
      {/* HEADER */}
      <Header />

      <main className="flex-1 p-4 md:p-8 space-y-5">
        {/* Título e botão */}
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1E1E1E]">
            Turmas
          </h1>

          <Link to="/registrar-turma">
            <button
              type="button"
              className="bg-[#1E1E1E] text-white px-4 py-2 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition"
            >
              Criar turma
            </button>
          </Link>
        </div>

        {/* Conteúdo */}
        {loading && <p>Carregando turmas...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="space-y-3">
            {turmas.length === 0 ? (
              <p>Nenhuma turma encontrada.</p>
            ) : (
              turmas.map((turma) => (
                <div
                  key={turma.id || turma.nome}
                  className="bg-white p-4 rounded-xl shadow-sm flex justify-between items-center"
                >
                  {/* Ícone e nome */}
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="font-medium text-lg">{turma.nome}</p>
                      <p className="text-sm text-gray-500">
                        Faixa etária: {turma.idadeMin} - {turma.idadeMax} anos
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/editar-turma/${turma.id}`}
                    className="text-sm text-[#911418] hover:underline"
                  >
                    Editar
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
