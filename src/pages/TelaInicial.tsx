import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import Header from "../components/Header";
import SectionCard from "../components/SectionCard";
import { useEffect, useState } from "react";
import { listarTurmas } from "../hooks/ListaTurmas";
import type { Turma } from "../types/Turma";

export default function TelaInicial() {

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
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000]">
      {/* HEADER - Menu */}
      <Header />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="p-4 sm:p-6 md:p-8 space-y-3 mx-auto">
        {/* SEÇÃO TURMAS */}
        <SectionCard title="Turmas">
          <div className="flex flex-wrap gap-4 sm:gap-5">
            {/* CARD CRIAR TURMA */}
            <Link to="/registrar-turma">
              <button className="bg-[#1D1E1E] text-white font-semibold rounded-xl px-5 sm:px-6 py-6 sm:py-8 flex flex-col items-center justify-center w-36 sm:w-44 hover:opacity-90 transition">
                <Plus className="w-6 h-6 sm:w-7 sm:h-7 mb-2" />
                Criar turma
              </button>
            </Link>
          </div>
        </SectionCard>

        {/* SEÇÃO PRÓXIMOS GRADUANDOS */}
        <SectionCard title="Próximos graduandos">
          {/* Conteúdos da seção na próxima entrega */}
        </SectionCard>

        {/* SEÇÃO ANIVERSARIANTES DO MÊS */}
        <SectionCard title="Aniversariantes do mês">
          {/* Conteúdos da seção na próxima entrega */}
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
