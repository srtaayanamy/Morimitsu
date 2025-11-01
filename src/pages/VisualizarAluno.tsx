import Header from "../components/Header";
import { SquarePen } from "lucide-react";
import { Avatar } from "../components/Avatar";
import { InfoField } from "../components/InfoField";
import { ProgressBar } from "../components/ProgressBar";
import type { Aluno } from "../types/Aluno";
import { pegaDadosAluno } from "../utils/getDadosAluno";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // para pegar o id da URL

export default function VisualizarAluno() {
  const { id } = useParams<{ id: string }>(); // pega o ID da URL
  const [erro, setErro] = useState("");
  const [aluno, setAluno] = useState<Aluno>();

  useEffect(() => {
    async function fetchAluno() {
      if (!id) return; // evita buscar se não tiver ID
      const result = await pegaDadosAluno(id);
      console.log("Resposta da API:", result);
      if (typeof result === "string") {
        setErro(result);
      } else {
        setAluno(result);
      }
    }
    fetchAluno(); // executa a função
  }, [id]);

  if (erro) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 font-semibold">
        {erro}
      </div>
    );
  }

  if (!aluno) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Carregando dados do aluno...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 flex flex-col space-y-4">
        {/* Cabeçalho */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1E1E1E] leading-tight">
            {aluno.nome} {aluno.apelido ? `(${aluno.apelido})` : ""}
          </h1>
          <button className="bg-transparent hover:opacity-80 transition">
            <SquarePen className="w-8 h-8 text-[#1E1E1E]" />
          </button>
        </div>

        {/* Card principal */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <Avatar sexo={aluno.sexo} dataNascimento={aluno.dataNascimento} />

            {/* Faixa e progresso */}
            <div className="flex-1 space-y-4 w-full">
              <div>
                <p className="font-semibold text-sm md:text-base">
                  Faixa / grau:
                </p>
                <p className="bg-[#F5F5F5] rounded-xl p-6 mt-1">
                  {aluno.faixa} / {aluno.grau}
                </p>
              </div>

              <div>
                <p className="font-semibold text-sm md:text-base">
                  Progresso / Frequência:
                </p>
                <div className="mt-2">
                  <ProgressBar percent={aluno.frequencia} />
                </div>
                <p className="text-sm text-right mt-1 text-[#1E1E1E]">
                  {aluno.frequencia}%
                </p>
              </div>
            </div>
          </div>

          {/* Informações detalhadas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoField
              label="Data de Nascimento:"
              value={aluno.dataNascimento}
            />

            <InfoField label="Telefone:" value={aluno.telefone} />
            <InfoField label="CPF:" value={aluno.CPF} />
            <InfoField label="Matrícula (opcional):" value={aluno.matricula} />
            <div className="md:col-span-2">
              <p className="font-semibold text-sm md:text-base">
                Responsável / Contato emergencial:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                <p className="bg-[#EFEFEF] rounded-xl p-6">
                  {aluno.Responsavel}
                </p>
                <p className="bg-[#EFEFEF] rounded-xl p-6">
                  {aluno.telefoneResponsavel}
                </p>
              </div>
            </div>
            {/* Turmas que participa */}
            <div className="md:col-span-3">
              <p className="font-semibold text-sm md:text-base mb-1">
                Turmas que participa:
              </p>

              <div className="relative bg-[#F5F5F5] rounded-xl">
                <details className="group rounded-xl">
                  <summary className="flex justify-between items-center cursor-pointer px-6 py-4 select-none font-medium text-[#1E1E1E] list-none">
                    <span>
                      {aluno.turmas && aluno.turmas.length > 0
                        ? `${aluno.turmas.length} turma${
                            aluno.turmas.length > 1 ? "s" : ""
                          }`
                        : "Nenhuma turma cadastrada"}
                    </span>
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-open:rotate-180"
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
                  </summary>

                  {/* {aluno.turmas && aluno.turmas.length > 0 && (
                    <ul className="px-8 pb-4 space-y-2 text-[#1E1E1E]">
                      {aluno.turmas.map((turma, index) => (
                        <li
                          key={index}
                          className="bg-white rounded-lg px-4 py-2 shadow-sm border border-gray-200"
                        >
                          {turma}
                        </li>
                      ))}
                    </ul>
                  )} */}
                </details>
              </div>
            </div>

            {/* Sexo será adicionado depois */}
            <InfoField label="E-mail:" value={aluno.email} />
          </div>

          <InfoField
            label="Observações do aluno:"
            value={aluno.observacao}
            multiline
          />
        </div>
      </main>
    </div>
  );
}
