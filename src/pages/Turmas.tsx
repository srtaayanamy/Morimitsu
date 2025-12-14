import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import TurmaItem from "../components/TurmaItem";
import { ClassList } from "../hooks/ClassList";
import { type Class } from "../types/Class";
import PageTitle from "../components/PageTitle";
import Cookies from "js-cookie";

export default function Turmas() {
  const [turmas, setTurmas] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const role = Cookies.get("role");

  useEffect(() => {
    const fetchTurmas = async () => {
      setLoading(true);
      const result = await ClassList();

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
        <PageTitle title="Turmas">
          {role === 'ADMIN' &&
            <Link to="/registrar-turma">
              <button
                type="button"
                className="bg-[#1E1E1E] text-white px-4 py-2 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition"
              >
                Criar Turma
              </button>
            </Link>
          }
          
        </PageTitle>

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
                  key={turma.id || turma.name}
                  id={turma.id}
                  nome={turma.name}
                  idadeMin={turma.MinAge}
                  idadeMax={turma.MaxAge}
                  imagem={turma.URLImage}
                />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}
