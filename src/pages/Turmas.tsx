import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Turmas() {
  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000] flex flex-col">
      {/* HEADER - Menu */}
      <Header />

      <main className="flex-1 p-4 md:p-8 space-y-5">
        {/* Cabeçalho da página */}
        <div className="bg-white rounded-2xl p-4 flex items-center justify-between shadow-sm">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#1E1E1E]">
            Turmas:
          </h1>

          <Link to="/registrar-aluno">
            <button
              type="button"
              className="bg-[#1E1E1E] md:bg-[#1E1E1E] text-white px-4 py-2 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition"
            >
              Criar turma
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
