import Header from "../components/Header";
import { SquarePen } from "lucide-react";
import { Avatar } from "../components/Avatar";
import { InfoField } from "../components/InfoField";
import { ProgressBar } from "../components/ProgressBar";
import type { Aluno } from "../types/Aluno";
import { pegaDadosAluno } from "../utils/getDadosAluno";
import { useEffect, useState } from "react";

export default function VisualizarAluno() {

  //Declara variáveis de estado
  const id= '';
  const [erro, setErro]= useState('');
  const [aluno, setAluno] = useState<Aluno>();

  //Pega informações do aluno
  useEffect(() => {
    async function fetchAluno() {
      const result = await pegaDadosAluno(id);
      if (typeof result=== 'string') {
        setErro(result)
      } else{
        setAluno(result)
      }
    }
    fetchAluno
  }, [id]);

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#000000] flex flex-col">
      <Header />

      <main className="flex-1 p-4 md:p-8 flex flex-col space-y-4">
        {/* Cabeçalho */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#1E1E1E] leading-tight">
            {/* Nome do aluno */}
          </h1>
          <button className="bg-transparent hover:opacity-80 transition">
            <SquarePen className="w-8 h-8 text-[#1E1E1E]" />
          </button>
        </div>

        {/* Card principal */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <Avatar />

            {/* Faixa e progresso */}
            <div className="flex-1 space-y-4 w-full">
              <div>
                <p className="font-semibold text-sm md:text-base">
                  Faixa / grau:
                </p>
                <p className="bg-[#F5F5F5] rounded-xl p-6 mt-1"></p>
              </div>

              <div>
                <p className="font-semibold text-sm md:text-base">
                  Progresso / Frequência:
                </p>
                <div className="mt-2">
                  <ProgressBar />
                </div>
                <p className="text-sm text-right mt-1 text-[#1E1E1E]"></p>
              </div>
            </div>
          </div>

          {/* Informações detalhadas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoField label="Data de Nascimento:" />
            <InfoField label="Telefone:" />
            <InfoField label="CPF:" />
            <InfoField label="Matrícula (opcional):" />
            <div className="md:col-span-2">
              <p className="font-semibold text-sm md:text-base">
                Responsável / Contato emergencial:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                <p className="bg-[#F5F5F5] rounded-xl p-6"></p>
                <p className="bg-[#F5F5F5] rounded-xl p-6"></p>
              </div>
            </div>
            {/* implementar como combobox */}
            <InfoField label="Turmas que participa:" />
            <InfoField label="Sexo:" />
            <InfoField label="E-mail:" />
          </div>

          <InfoField label="Observações do aluno:" multiline />
        </div>
      </main>
    </div>
  );
}
