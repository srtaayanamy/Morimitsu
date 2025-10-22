import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import TurmaItem from "../components/TurmaItem";
import { listarTurmas } from "../hooks/ListaTurmas";
import { type Turma } from "../types/Turma";

export default function Turmas() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <Header />

      <main className="flex-1 p-4 md:p-8 space-y-5">
        {/* Cabeçalho */}
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1E1E1E]">
            Turmas
          </h1>

          <Link to="/registrar-turma">
            <button
              type="button"
              className="bg-[#1E1E1E] text-white px-4 py-2 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition"
            >
              Criar Turma
            </button>
          </Link>
        </div>

        {/* Lista */}
        {loading && <p>Carregando turmas...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="flex flex-col gap-4">
            {turmas.length === 0 ? (
              <p>Nenhuma turma encontrada.</p>
            ) : (
              turmas.map((turma) => (
                <TurmaItem
                  key={turma.id || turma.nome}
                  id={turma.id}
                  nome={turma.nome}
                  idadeMin={turma.idadeMin}
                  idadeMax={turma.idadeMax}
                  // icone={turma.imagem}
                />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
