import Header from "../components/Header";
import PageTitle from "../components/PageTitle";

export default function FrequenciaTurma() {
  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#1E1E1E] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 flex flex-col space-y-4">
        {/* Cabeçalho */}
        <PageTitle title="Frequência:"></PageTitle>

        {/* Card principal */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm flex flex-col items-center space-y-6"></div>
      </main>
    </div>
  );
}
