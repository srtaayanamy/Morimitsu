import { Link } from "react-router-dom";
import Header from "../components/Header";
import PageTitle from "../components/PageTitle";

export default function Professores() {
  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 space-y-5">
        {/* Cabeçalho da página */}
        <PageTitle title="Professores:">
          <Link to="/promover-aluno">
            <button
              type="button"
              className="bg-[#1E1E1E] text-white px-4 py-2 rounded-xl text-sm sm:text-base font-medium hover:opacity-90 transition"
            >
              Promover aluno a professor
            </button>
          </Link>
        </PageTitle>
      </main>
    </div>
  );
}
