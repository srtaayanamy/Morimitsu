import { Link } from "react-router-dom";
import { Plus, Loader2 } from "lucide-react";
import Header from "../components/Header";
import SectionCard from "../components/SectionCard";
import { useEffect, useState } from "react";
import { listarTurmas } from "../hooks/ListaTurmas";
import type { Turma } from "../types/Turma";
import TurmaCard from "../components/TurmaCard";
import BirthdayCard from "../components/BirthdayCard";
import { filtrarAniversariantes } from "../hooks/ListaAlunos";
import type { Aluno } from "../types/Aluno";

export default function TelaInicial() {
  //Variáveis de estado
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aniversariantes, SetAniversariantes] = useState<Aluno[]>([]);

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

  //Pega os aniversariantes do mês assim que a tela se inicia
  useEffect(() => {
    const fetchAniversariantes = async () => {
      setLoading(true);
      const result = await filtrarAniversariantes();

      if (result === undefined) {
        setError("Erro ao carregar aniversariantes.");
      } else {
        SetAniversariantes(result);
      }

      setLoading(false);
    };

    fetchAniversariantes();
  }, []);

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000]">
      {/* HEADER - Menu */}
      <Header />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="p-4 sm:p-6 md:p-8 space-y-3 mx-auto">
        {/* SEÇÃO TURMAS */}
        <SectionCard title="Turmas">
          <div className="flex flex-nowrap gap-4 sm:gap-5 overflow-x-auto pb-3 sm:pb-4 px-1 sm:px-2 scrollbar-hide">
            {/* CARD CRIAR TURMA */}
            <Link to="/registrar-turma" className="flex-shrink-0">
              <button className="w-36 sm:w-44 h-30 sm:h-35 bg-[#1D1E1E] rounded-xl flex flex-col items-center justify-center text-white font-semibold hover:opacity-90 transition cursor-pointer">
                <Plus className="w-8 h-8 sm:w-10 sm:h-10 mb-2" />
                Criar turma
              </button>
            </Link>

            {/* CARDS DAS TURMAS DA API */}
            {loading && (
              <div className="flex items-center justify-center w-full h-40">
                <Loader2 className="w-8 h-8 text-gray-600 animate-spin" />
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {!loading &&
              !error &&
              turmas.map((turma) => (
                <div key={turma.id} className="flex-shrink-0">
                  <TurmaCard
                    id={turma.id}
                    nome={turma.nome}
                    imagem={turma.URLImage}
                  />
                </div>
              ))}
          </div>
        </SectionCard>

        {/* SEÇÃO PRÓXIMOS GRADUANDOS */}
        <SectionCard title="Próximos graduandos">
          {/* Conteúdos da seção na próxima entrega */}
        </SectionCard>

        {/* SEÇÃO ANIVERSARIANTES DO MÊS */}
        <SectionCard title="Aniversariantes do mês">
          <div className="flex gap-2 flex-wrap">
            {loading && (
              <div className="flex items-center justify-center w-full h-40">
                <Loader2 className="w-8 h-8 text-gray-600 animate-spin" />
              </div>
            )}

            {error && <p className="text-red-500">{error}</p>}

            {!loading && aniversariantes.length === 0 && (
              <p className="text-gray-600 text-sm">
                Nenhum aniversariante no restante do mês 🎂
              </p>
            )}

            {!loading &&
              aniversariantes.map((aluno) => (
                <BirthdayCard
                  key={aluno.id}
                  nome={aluno.nome}
                  data={new Date(aluno.dataNascimento).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "2-digit",
                    }
                  )}
                  sexo={
                    aluno.sexo === "M" || aluno.sexo === "F" ? aluno.sexo : "M"
                  } // <-- força tipo válido
                />
              ))}
          </div>
        </SectionCard>

        {/* SEÇÃO CALENDÁRIO */}
        <SectionCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl font-semibold text-[#1E1E1E]">
              Calendário
            </h2>
            <button className="bg-black text-white rounded-md px-4 py-2 text-sm hover:bg-gray-800 transition flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Criar novo evento
            </button>
          </div>
          {/* conteúdo do calendário */}
        </SectionCard>
      </main>
    </div>
  );
}
