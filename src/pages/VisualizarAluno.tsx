import Header from "../components/Header";
import { SquarePen } from "lucide-react";
import { Avatar } from "../components/Avatar";
import { InfoField } from "../components/InfoField";
import { ProgressBar } from "../components/ProgressBar";
import type { Aluno } from "../types/Aluno";
import { pegaDadosAluno } from "../utils/getDadosAluno";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editarAluno } from "../utils/editarAluno";

export default function VisualizarAluno() {
  const { id } = useParams<{ id: string }>();
  const [erro, setErro] = useState("");
  const [aluno, setAluno] = useState<Aluno>();
  const [alunoOriginal, setAlunoOriginal] = useState<Aluno>();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    async function fetchAluno() {
      if (!id) return;
      const result = await pegaDadosAluno(id);
      if (typeof result === "string") {
        setErro(result);
      } else {
        setAluno(result);
        setAlunoOriginal(result); // guarda original
      }
    }
    fetchAluno();
  }, [id]);

  const handleChange = (field: keyof Aluno, value: string) => {
    if (!aluno) return;
    setAluno({ ...aluno, [field]: value });
  };

  const handleSave = async () => {
    if (!id || !aluno) return;

    // separa os blocos que sua API espera
    const dadosPersonal = {
      nome: aluno.nome,
      apelido: aluno.apelido,
      sexo: aluno.sexo,
      dataNascimento: aluno.dataNascimento,
      telefone: aluno.telefone,
      CPF: aluno.CPF,
      email: aluno.email,
      observacao: aluno.observacao,
    };

    const dadosForm = {
      faixa: aluno.faixa,
      grau: aluno.grau,
      matricula: aluno.matricula,
      Responsavel: aluno.Responsavel,
      telefoneResponsavel: aluno.telefoneResponsavel,
    };

    const result = await editarAluno(id, dadosPersonal, dadosForm);

    if (result === true) {
      alert("Alterações salvas com sucesso!");
      setAlunoOriginal(aluno); // atualiza o original
      setIsEditing(false);
    } else {
      alert(result || "Erro ao atualizar aluno.");
    }
  };

  const handleCancel = () => {
    setAluno(alunoOriginal); // restaura original
    setIsEditing(false);
  };

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

          {!isEditing ? (
            // Modo de visualização: botão de editar
            <button
              onClick={() => setIsEditing(true)}
              className="bg-transparent hover:opacity-80 transition cursor-pointer"
            >
              <SquarePen className="w-8 h-8 text-[#1E1E1E]" />
            </button>
          ) : (
            // Modo de edição: botões Cancelar e Salvar
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-[#333434] text-white font-medium rounded-md hover:opacity-90 transition cursor-pointer"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#7F1A17] text-white font-medium rounded-md hover:opacity-90 transition cursor-pointer"
              >
                Salvar alterações
              </button>
            </div>
          )}
        </div>

        {/* Card principal */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <Avatar sexo={aluno.sexo} />

            <div className="flex-1 space-y-4 w-full">
              <InfoField
                label="Faixa / grau:"
                value={`${aluno.faixa || ""} / ${aluno.grau || ""}`}
                editable={isEditing}
                onChange={(val) => handleChange("faixa", val)}
              />

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
              value={aluno.dataNascimento || ""}
              editable={isEditing}
              onChange={(val) => handleChange("dataNascimento", val)}
            />

            <InfoField
              label="Telefone:"
              value={aluno.telefone || ""}
              editable={isEditing}
              onChange={(val) => handleChange("telefone", val)}
            />

            <InfoField
              label="CPF:"
              value={aluno.CPF || ""}
              editable={isEditing}
              onChange={(val) => handleChange("CPF", val)}
            />

            <InfoField
              label="Matrícula (opcional):"
              value={aluno.matricula || ""}
              editable={isEditing}
              onChange={(val) => handleChange("matricula", val)}
            />

            <div className="md:col-span-2">
              <p className="font-semibold text-sm md:text-base">
                Responsável / Contato emergencial:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                <InfoField
                  label=""
                  value={aluno.Responsavel || ""}
                  editable={isEditing}
                  onChange={(val) => handleChange("Responsavel", val)}
                />
                <InfoField
                  label=""
                  value={aluno.telefoneResponsavel || ""}
                  editable={isEditing}
                  onChange={(val) => handleChange("telefoneResponsavel", val)}
                />
              </div>
            </div>

            {/* Turmas que participa */}
            <div className="md:col-span-3">
              <p className="font-semibold text-sm md:text-base mb-1">
                Turmas que participa:
              </p>

              <div className="relative bg-[#EFEFEF] rounded-xl">
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

                  {aluno.turmas && aluno.turmas.length > 0 && (
                    <ul className="px-8 pb-4 space-y-2 text-[#1E1E1E]">
                      {aluno.turmas.map((turma, index) => (
                        <li
                          key={index}
                          className="bg-[#EFEFEF] font-medium rounded-lg px-2 py-2 shadow-[#F1F1F1]"
                        >
                          {turma.nome}
                        </li>
                      ))}
                    </ul>
                  )}
                </details>
              </div>
            </div>

            {/* Campo final */}
            <InfoField
              label="E-mail:"
              value={aluno.email || ""}
              editable={isEditing}
              onChange={(val) => handleChange("email", val)}
            />
          </div>

          <InfoField
            label="Observações do aluno:"
            value={aluno.observacao || ""}
            editable={isEditing}
            multiline
            onChange={(val) => handleChange("observacao", val)}
          />
        </div>
      </main>
    </div>
  );
}
