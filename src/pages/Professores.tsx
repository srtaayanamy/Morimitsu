import { Link } from "react-router-dom";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";
import { useEffect, useState } from "react";
import type { Coach } from "../types/User";
import { CoachList } from "../hooks/CoachsList";
import ProfessorCard from "../components/ProfessorCard";
import { SquarePen } from "lucide-react";

export default function Professores() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [Professores, setProfessores] = useState<Coach[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfessores = async () => {
      setLoading(true);
      const result = await CoachList();

      if (result === false) {
        setError("Erro ao carregar professores.");
      } else if (typeof result === "string") {
        setError(result);
      } else {
        setProfessores(result || []);
      }

      setLoading(false);
    };

    fetchProfessores();
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000] flex flex-col">
      <Header />

      <main className="flex-1 p-3 md:p-8 space-y-3 md:space-y-5">
        {/* Cabeçalho da página */}
        <PageTitle title="Professores:">
          {/* DESKTOP */}
          <div className="hidden md:flex flex-row items-center p-2 gap-3">
            {!editMode ? (
              <SquarePen
                className="w-9 h-9 text-[#1E1E1E] cursor-pointer"
                onClick={() => setEditMode(true)}
              />
            ) : (
              <button
                onClick={() => setEditMode(false)}
                className="px-4 py-2 rounded-xl bg-[#7F1A17] text-white text-sm font-medium hover:opacity-90 transition cursor-pointer"
              >
                Cancelar
              </button>
            )}

            <Link to="/alunos-aptos">
              <button
                type="button"
                className="bg-[#1E1E1E] text-white px-4 py-2 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition cursor-pointer"
              >
                Promover aluno a professor
              </button>
            </Link>
          </div>
        </PageTitle>

        {/* MOBILE */}
        <div className="flex md:hidden flex-row items-center justify-end gap-2 mt-1">
          {!editMode ? (
            <SquarePen
              className="w-6 h-6 text-[#1E1E1E] cursor-pointer"
              onClick={() => setEditMode(true)}
            />
          ) : (
            <button
              onClick={() => setEditMode(false)}
              className="px-3 py-1.5 rounded-lg bg-[#7F1A17] text-white text-xs font-medium hover:opacity-90 transition"
            >
              Cancelar
            </button>
          )}

          <Link to="/alunos-aptos">
            <button
              type="button"
              className="bg-[#1E1E1E] text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:opacity-90 transition"
            >
              Promover aluno a professor
            </button>
          </Link>
        </div>

        {/* Conteúdo */}
        {loading && <p>Carregando professores...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="bg-white rounded-2xl p-3 shadow-sm">
            {Professores.length === 0 ? (
              <p>Nenhum professor encontrado.</p>
            ) : (
              <div className="flex flex-col gap-4 cursor-pointer">
                {Professores.map((professor) => (
                  <ProfessorCard
                    key={professor.id}
                    professor={professor}
                    editMode={editMode}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
