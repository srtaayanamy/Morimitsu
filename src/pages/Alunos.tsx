import Header from "../components/Header";
import PageTitle from "../components/Pagetitle";

export default function Alunos() {
  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000]">
      {/* HEADER - Menu */}
      <Header />
      <main className="p-5 md:p-8 space-y-5">
        <PageTitle title="Alunos matriculados:">
          <div className="flex gap-3">
            <button
              type="button"
              className="bg-[#7F1A17] text-white px-6 py-2 rounded-xl font-medium hover:opacity-90 transition"
            >
              Cadastrar aluno
            </button>
          </div>
        </PageTitle>
      </main>
    </div>
  );
}
