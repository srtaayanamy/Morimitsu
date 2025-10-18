import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import Header from "../components/Header";

export default function RegistrarAluno() {
  // Classes reutilizáveis
  const inputBase =
    "w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-3 focus:ring-2 focus:ring-[#8B0000] outline-none";
  const labelBase = "block text-sm font-semibold mb-2";

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 flex flex-col space-y-3">
        {/* Cabeçalho */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm">
          <h1 className="text-xl md:text-2xl font-semibold text-[#1E1E1E]">
            Cadastro de aluno
          </h1>
        </div>

        {/* Formulário principal */}
        <div className="bg-white rounded-2xl p-5 md:p-8 space-y-6 shadow-sm flex-1">
          {/* Linha 1 - Nome e apelido */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className={labelBase}>Nome completo:</label>
              <input type="text" className={inputBase} />
            </div>

            <div>
              <label className={labelBase}>Apelido / Nome social:</label>
              <input type="text" className={inputBase} />
            </div>
          </div>

          {/* Linha 2 - Data, telefone e sexo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className={labelBase}>Data de Nascimento:</label>
              <input type="date" className={inputBase} />
            </div>

            <div>
              <label className={labelBase}>Telefone:</label>
              <input type="tel" className={inputBase} />
            </div>

            <div>
              <label className={labelBase}>Sexo:</label>
              <div
                className={`${inputBase} flex items-center justify-between md:justify-start gap-6`}
              >
                {["Masculino", "Feminino"].map((sexo) => (
                  <label key={sexo} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sexo"
                      className="accent-[#8B0000]"
                    />
                    {sexo}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Linha 3 - CPF, faixa e frequência */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div>
              <label className={labelBase}>CPF:</label>
              <input type="text" className={inputBase} />
            </div>

            <div>
              <label className={labelBase}>Faixa / grau:</label>
              <select className={inputBase}>
                <option value="">Selecione</option>
              </select>
            </div>

            <div>
              <label className={labelBase}>Frequência inicial:</label>
              <input type="text" className={inputBase} />
            </div>
          </div>

          {/* Linha 4 - Responsável e matrícula */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-2">
              <label className={labelBase}>
                Responsável / Contato emergencial:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Responsável (ex: Carla - Mãe)"
                  className={inputBase}
                />
                <input
                  type="text"
                  placeholder="Telefone (ex: (88) 9 9999-9999)"
                  className={inputBase}
                />
              </div>
            </div>

            <div>
              <label className={labelBase}>Matrícula (opcional):</label>
              <input type="text" className={inputBase} />
            </div>
          </div>

          {/* Linha 5 - E-mail e turma */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div>
              <label className={labelBase}>E-mail:</label>
              <input type="email" className={inputBase} />
            </div>

            <div>
              <label className={labelBase}>Vincular a turma:</label>
              <div className="relative flex items-center">
                <select className={`${inputBase} pr-16 appearance-none`}>
                  <option value="">Selecione</option>
                </select>

                {/* Ícone de expandir */}
                <svg
                  className="absolute right-12 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-500 pointer-events-none"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>

                {/* Ícone de adicionar */}
                <Plus className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-black cursor-pointer" />
              </div>
            </div>
          </div>

          {/* Observações */}
          <div>
            <label className={labelBase}>Observações do aluno:</label>
            <textarea rows={3} className={`${inputBase} resize-none`} />
          </div>
        </div>
        {/* Botões finais */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            type="button"
            className="bg-[#1E1E1E] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
          >
            Cancelar
          </button>
          <Link to="/alunos">
            <button
              type="button"
              className="bg-[#7F1A17] text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              Concluir cadastro
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
