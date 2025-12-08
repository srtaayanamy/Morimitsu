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
import Calendario from "../components/Calendario";
import { SquarePen } from "lucide-react";

export default function TelaInicial() {
  //Variáveis de estado
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorTurmas, setErrorTurmas] = useState<string | null>(null);
  const [errorAniversariantes, setErrorAniversariantes] = useState<
    string | null
  >(null);
  const [aniversariantes, SetAniversariantes] = useState<Aluno[]>([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchTurmas = async () => {
      setLoading(true);
      const result = await listarTurmas();

      if (result === false) {
        setErrorTurmas("Erro ao carregar turmas.");
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
        setErrorAniversariantes("Erro ao carregar aniversariantes.");
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
          <div className="relative">
            {/* Botão esquerdo */}
            <button
              onClick={() => {
                const el = document.getElementById("carrossel-turmas");
                if (el) el.scrollBy({ left: -250, behavior: "smooth" });
              }}
              className="absolute hidden sm:block left-0 top-1/2 -translate-y-1/2 z-10 bg-black/25 text-white px-3 py-2 rounded-full hover:bg-black/60"
            >
              ◀
            </button>

            {/* Carrossel */}
            <div
              id="carrossel-turmas"
              className="flex flex-nowrap gap-4 sm:gap-5 overflow-x-scroll pb-3 sm:pb-4 px-1 sm:px-2 scroll-smooth scrollbar-hide"
            >
              {role === "ADMIN" && (
                <Link to="/registrar-turma" className="flex-shrink-0">
                  <button className="w-36 sm:w-44 h-30 sm:h-35 bg-[#1D1E1E] rounded-xl flex flex-col items-center justify-center text-white font-semibold hover:opacity-90 transition cursor-pointer">
                    <Plus className="w-8 h-8 sm:w-10 sm:h-10 mb-2" />
                    Criar turma
                  </button>
                </Link>
              )}

              {loading && (
                <div className="flex items-center justify-center w-full h-40">
                  <Loader2 className="w-8 h-8 text-gray-600 animate-spin" />
                </div>
              )}
              {errorTurmas && <p className="text-red-500">{errorTurmas}</p>}

              {!loading &&
                !errorTurmas &&
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

            {/* Botão direito */}
            <button
              onClick={() => {
                const el = document.getElementById("carrossel-turmas");
                if (el) el.scrollBy({ left: 250, behavior: "smooth" });
              }}
              className="absolute hidden sm:block right-0 top-1/2 -translate-y-1/2 z-10 bg-black/25 text-white px-3 py-2 rounded-full hover:bg-black/60"
            >
              ▶
            </button>
          </div>
        </SectionCard>

        {/* SEÇÃO PRÓXIMOS GRADUANDOS */}
        <SectionCard title="Próximos graduandos">
          {/* Conteúdos da seção na próxima entrega */}
        </SectionCard>

        {/* SEÇÃO ANIVERSARIANTES DO MÊS */}
        <SectionCard title="Aniversariantes do mês">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide sm:flex-wrap sm:overflow-visible ">
            {loading && (
              <div className="flex items-center justify-center w-full h-40">
                <Loader2 className="w-8 h-8 text-gray-600 animate-spin" />
              </div>
            )}

            {errorAniversariantes && (
              <p className="text-red-500">{errorAniversariantes}</p>
            )}

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
                    aluno.sexo === "male" || aluno.sexo === "female"
                      ? aluno.sexo
                      : "male"
                  }
                />
              ))}
          </div>
        </SectionCard>

        {/* SEÇÃO CALENDÁRIO */}
        <SectionCard>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg sm:text-xl text-[#1E1E1E] font-semibold mb-3">
              Calendário
            </h2>
            <div className="flex flex-row gap-2 sm:gap-3 items-center">
              <SquarePen className="w-7 h-7 sm:w-9 sm:h-9 text-[#1E1E1E]" />

              <button className="bg-black text-white rounded-md px-3 py-1.5 text-sm sm:text-md sm:px-4 sm:py-2 hover:bg-gray-800 transition flex items-center gap-2">
                Criar novo evento
              </button>
            </div>
          </div>
          {/* conteúdo do calendário */}
          <Calendario />
        </SectionCard>
      </main>
    </div>
  );
}
