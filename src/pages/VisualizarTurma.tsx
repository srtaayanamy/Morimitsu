import Header from "../components/Header";
import { SquarePen } from "lucide-react";

export default function VisualizarTurma() {
  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#1E1E1E] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 flex flex-col space-y-4">
        {/* Cabeçalho */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-semibold leading-tight">
            {/* Nome da turma */}
          </h1>
          <button className="bg-transparent hover:opacity-80 transition">
            <SquarePen className="w-8 h-8 text-[#1E1E1E]" />
          </button>
        </div>

        {/* Card principal */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm flex flex-col items-center space-y-6">
          {/* Avatar / imagem da turma */}
          <div className="w-36 h-36 rounded-full bg-[#F5F5F5] flex items-center justify-center">
            {/* imagem da turma futuramente */}
          </div>

          {/* Professor responsável */}
          <div className="text-center">
            <p className="text-sm font-medium">Professor responsável:</p>
            <p className="bg-[#F5F5F5] rounded-xl p-3 mt-1 w-56"></p>
          </div>

          {/* Informações da turma */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6 text-center">
            <div className="flex-1">
              <p className="text-sm font-medium">Total de alunos:</p>
              <p className="bg-[#F5F5F5] rounded-xl p-3 mt-1 mx-auto w-40"></p>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Faixa etária:</p>
              <p className="bg-[#F5F5F5] rounded-xl p-3 mt-1 mx-auto w-40"></p>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Horário da aula:</p>
              <p className="bg-[#F5F5F5] rounded-xl p-3 mt-1 mx-auto w-40"></p>
            </div>
          </div>
        </div>

        {/* Lista de alunos */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h2 className="text-xl md:text-2xl font-semibold">
              Alunos matriculados:
            </h2>

            <div className="flex gap-3 mt-3 md:mt-0">
              <button className="bg-[#1D1E1E] text-white px-4 py-2 rounded-xl hover:opacity-90 transition">
                Fazer frequência
              </button>
              <button className="bg-[#1D1E1E] text-white px-4 py-2 rounded-xl hover:opacity-90 transition">
                Inserir alunos
              </button>
            </div>
          </div>

          {/* Tabela de alunos */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-sm md:text-base text-[#1E1E1E]/80">
                  <th className="p-3 font-semibold">Nome</th>
                  <th className="p-3 font-semibold">Apelido</th>
                  <th className="p-3 font-semibold">Faixa atual</th>
                </tr>
              </thead>
              <tbody>
                {/* Linhas vazias para receber dados no futuro */}
                {[...Array(4)].map((_, i) => (
                  <tr key={i} className="bg-[#F5F5F5] rounded-xl">
                    <td className="p-3 rounded-l-xl"></td>
                    <td className="p-3"></td>
                    <td className="p-3 rounded-r-xl"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
