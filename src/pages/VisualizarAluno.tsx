import Header from "../components/Header";
import { SquarePen, Trash2 } from "lucide-react";
import { Avatar } from "../components/Avatar";
import { InfoField } from "../components/InfoField";
import { ProgressBar } from "../components/ProgressBar";
import type { Aluno } from "../types/Aluno";
import { pegaDadosAluno } from "../utils/getDadosAluno";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editarAluno } from "../utils/editarAluno";
import { editaUser } from "../utils/editarUser";
import { deleteAluno } from "../utils/deletarAluno";
import ConfirmActionModal from "../components/ConfirmActionModal";
import SuccessAlert from "../components/SuccessAlert";
import { useNavigate } from "react-router-dom";
import { faixasEGrausMaior16, faixasEGrausMenor16, Ranking } from "../types/Rank";

export default function VisualizarAluno() {
  const { id } = useParams<{ id: string }>();
  const [erro, setErro] = useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [aluno, setAluno] = useState<Aluno>();
  const [alunoOriginal, setAlunoOriginal] = useState<Aluno>();
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAluno() {
      if (!id) return;
      const result = await pegaDadosAluno(id);
      if (typeof result === "string") {
        setErro(result);
      } else {
        setAluno(result);
        setAlunoOriginal(result);
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

    const edit: Partial<Record<keyof Aluno, Aluno[keyof Aluno]>> = {};

    for (const key in aluno) {
      const campoKey = key as keyof Aluno;
      if (!alunoOriginal) return;

      if (aluno[campoKey] !== alunoOriginal[campoKey]) {
        edit[campoKey] = aluno[campoKey];
      }
    }

    if (Object.keys(edit).length === 0) return;

    if (aluno.userID !== undefined && typeof edit.nome === "string") {
      editaUser(edit.nome);
    }
    console.log(edit);

    const dadosPersonal = {
      name: edit.nome,
      nickname: edit.apelido,
      gender: edit.sexo,
      birthDate: edit.dataNascimento,
      contact: edit.telefone,
      CPF: edit.CPF,
      email: edit.email,
      parentName: edit.Responsavel,
      parentsContact: edit.telefoneResponsavel,
    };

    const dadosForm = {
      rank: edit.faixa,
      rating: edit.grau,
      comments: edit.observacao,
      presence: edit.frequencia,
    };

    const result = await editarAluno(id, dadosPersonal, dadosForm);

    if (result === true) {
      alert("Alterações salvas com sucesso!");
      setAlunoOriginal(aluno);
      setIsEditing(false);
    } else {
      alert(result || "Erro ao atualizar aluno.");
    }
  };

  const handleCancel = () => {
    setAluno(alunoOriginal);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!id) return;

    const result = await deleteAluno(id);

    if (result === true) {
      setMensagemSucesso("Aluno apagado com sucesso!");
      setTimeout(() => {
        navigate("/alunos");
      }, 2000);
    } else {
      alert(result);
    }
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
        {/* TOPO — agora sem botões no mobile; inputs de nome/apelido ficam aqui */}
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm flex justify-between items-center">
          {!isEditing ? (
            <h1 className="text-2xl md:text-3xl font-semibold text-[#1E1E1E] leading-tight">
              {aluno.nome} {aluno.apelido ? `(${aluno.apelido})` : ""}
            </h1>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-3 w-full">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg w-full md:w-1/2"
                value={aluno.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
              />
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg w-full md:w-1/3"
                placeholder="Apelido"
                value={aluno.apelido || ""}
                onChange={(e) => handleChange("apelido", e.target.value)}
              />
            </div>
          )}

          {/* Botão de editar/ícone — aparece sempre quando NÃO está editando */}
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-transparent hover:opacity-80 transition cursor-pointer"
            >
              <SquarePen className="w-8 h-8 text-[#1E1E1E]" />
            </button>
          ) : (
            /* Botões no TOPO apenas para desktop (md+). No mobile eles ficam ao final da página. */
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => setDeleteModalOpen(true)}
                className="p-2 bg-red-900 rounded-md hover:opacity-90 transition cursor-pointer"
                title="Apagar aluno"
              >
                <Trash2 className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={handleCancel}
                className="px-2 py-2 bg-[#333434] w-[100px] text-white font-medium rounded-md hover:opacity-90 transition cursor-pointer"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                className="px-2 py-2 bg-[#7F1A17] text-white w-[160px] font-medium rounded-md hover:opacity-90 transition cursor-pointer"
              >
                Salvar alterações
              </button>
            </div>
          )}
        </div>

        {/* Mensagem de sucesso */}
        {mensagemSucesso && <SuccessAlert message={mensagemSucesso} />}

        {/* CONTEÚDO */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <Avatar sexo={aluno.sexo} idade={aluno.idade} />
            <div className="flex-1 space-y-4 w-full">
              <div>
                <p className="font-semibold text-sm md:text-base mb-1">
                  Faixa / Grau:
                </p>

                {!isEditing ? (
                  <InfoField
                    label=""
                    value={`${aluno.faixa || ""} / ${aluno.grau || ""}`}
                    editable={false}
                  />
                ) : (
                  <div className="flex w-full gap-3 justify-center">
                    {/* SELECT DE FAIXA */}
                    <select
                      className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-3"
                      value={aluno.faixa}
                      onChange={(e) => handleChange("faixa", e.target.value)}
                    >
                      {((aluno.idade ?? 0) >= 16
                        ? faixasEGrausMaior16
                        : faixasEGrausMenor16
                      ).map((item, index) => (
                        <option key={index} value={item.faixa}>
                          {item.faixa}
                        </option>
                      ))}
                    </select>

                    {/* SELECT DE GRAU */}
                    <select
                      className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-3"
                      value={(aluno.grau ?? 0) > 0 ? aluno.grau : "Nenhum"}
                      onChange={(e) =>
                        handleChange("grau", e.target.value
)
                      }
                    >
                      {Ranking[aluno.faixa].map((g) => (
                        <option key={g} value={g > 0 ? g : "Nenhum"}>
                          {g > 0 ? g : "Nenhum"}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
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
                          {typeof turma === "string" ? turma : turma.nome}
                        </li>
                      ))}
                    </ul>
                  )}
                </details>
              </div>
            </div>

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

        {/* BOTÕES no FINAL — aparecem apenas em MOBILE (md:hidden) */}
        {isEditing && (
          <div className="md:hidden bg-transparent px-2">
            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => setDeleteModalOpen(true)}
                className="px-2 py-2 bg-red-900 w-10 h-10 items-center justify-center rounded-md hover:opacity-90 transition"
              >
                <Trash2 className="w-5 h-5 text-white" />
              </button>

              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-[#333434] text-white w-[140px] font-medium rounded-md hover:opacity-90 transition"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#7F1A17] text-white w-[180px] font-medium rounded-md hover:opacity-90 transition"
              >
                Salvar alterações
              </button>
            </div>
          </div>
        )}
      </main>
      <ConfirmActionModal
        isOpen={deleteModalOpen}
        title="Tem certeza que deseja apagar o aluno"
        highlightedText={aluno?.nome}
        confirmText="Sim, apagar."
        cancelText="Cancelar"
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={() => {
          setDeleteModalOpen(false);
          handleDelete();
        }}
      />
    </div>
  );
}
