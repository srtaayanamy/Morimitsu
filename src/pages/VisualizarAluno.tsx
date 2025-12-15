import Header from "../components/Header";
import { SquarePen, Trash2 } from "lucide-react";
import { Avatar } from "../components/Avatar";
import { InfoField } from "../components/InfoField";
import { ProgressBar } from "../components/ProgressBar";
import type { Student, StudentForm, StudentPersonal } from "../types/Student";
import { getStudent } from "../HTTP/Student/getStudent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { editStudent } from "../HTTP/Student/editStudent";
import { editUser } from "../HTTP/User/editUser";
import { deleteAluno } from "../HTTP/Student/deleteStudent";
import ConfirmActionModal from "../components/ConfirmActionModal";
import SuccessAlert from "../components/SuccessAlert";
import { useNavigate } from "react-router-dom";
import { getFrequencieRequired } from "../HTTP/Frequencie/getFrequencieRequered";
import {
  faixasEGrausMaior16,
  faixasEGrausMenor16,
  Ranking,
} from "../types/Rank";
import { deleteUser } from "../HTTP/User/deleteUser";
import { AgeCalculator } from "../utils/AgeCalculator";
import { parseDateBRToISO } from "../utils/formatTime";
import { ErrorMessage } from "../components/ErrorMessage";

function maskTelefone(value: string) {
  value = value.replace(/\D/g, "");
  value = value.substring(0, 11);
  if (value.length <= 10) {
    return value
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }

  return value
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

function maskCPF(value: string) {
  value = value.replace(/\D/g, "");
  value = value.substring(0, 11);
  return value
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{2})$/, "$1-$2");
}

function maskDate(value: string) {
  value = value.replace(/\D/g, ""); // remove tudo que não for número
  value = value.substring(0, 8); // só permite 8 dígitos (DDMMAAAA)

  // coloca DD/MM/AAAA
  value = value.replace(/(\d{2})(\d)/, "$1/$2");
  value = value.replace(/(\d{2})(\d)/, "$1/$2");

  return value;
}

export default function VisualizarAluno() {
  const { id } = useParams<{ id: string }>();
  const [erro, setErro] = useState("");
  const [errorMenssage, setErrorMenssage] =  useState("");
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [aluno, setAluno] = useState<Student>();
  const [alunoEditado, setAlunoEditado] = useState<{
    personal?: Partial<StudentPersonal>;
    form?: Partial<StudentForm>;
  }>({});
  const [alunoOriginal, setAlunoOriginal] = useState<Student>();
  const [isEditing, setIsEditing] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const [freqNecessaria, setFreqNecessaria] = useState<number>(0);
  const [percentualProgresso, setPercentualProgresso] = useState<number>(0);
  const aptoAGraduar = percentualProgresso >= 100;

  useEffect(() => {
    async function fetchAluno() {
      if (!id) return;
      const result = await getStudent(id);
      if (typeof result === "string") {
        setErro(result);
      } else {
        setAluno(result);
        setAlunoOriginal(result);
      }
    }
    fetchAluno();
  }, [id]);


  useEffect(() => {
    if (!mensagemSucesso) return;

    const timer = setTimeout(() => {
      setMensagemSucesso("");
    }, 2000); // tempo em ms (3 segundos)

    return () => clearTimeout(timer);
  }, [mensagemSucesso]);

  useEffect(() => {
    async function fetchFrequencia() {
      if (!aluno?.form?.rank) return;

      const response = await getFrequencieRequired(aluno.form.rank);

      if (typeof response === "string") {
        console.log("Erro ao carregar frequência necessária:", response);
        return;
      }

      const needed = response.needed_frequency ?? 0;
      setFreqNecessaria(needed);
      
      if(!aluno.form.frequencie) return;

      const percent =
        needed > 0 ? (aluno.form.frequencie / needed) * 100 : 0;

      setPercentualProgresso(percent);
    }

    fetchFrequencia();
  }, [aluno?.form?.rank]);

  function handleChange(section: "personal" | "form", field: keyof StudentPersonal | keyof StudentForm, value: any) {

    setAlunoEditado((prev) => ({...prev, 
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  }

  const handleSave = async () => {
    if (!id || !aluno || !alunoOriginal) return;

    if (!alunoEditado.personal && !alunoEditado.form) {
      return;
    }
    let age = undefined;
    if (alunoEditado.personal?.birthDate) {
      console.log(alunoEditado);
      const date = parseDateBRToISO(alunoEditado.personal.birthDate);
      age = date ? AgeCalculator(date) : 0;
    }

    const faixa = alunoEditado.form?.rank;

    if ((age && age < 16 && faixasEGrausMaior16.some((f) => f.faixa === faixa)) || (age && age >= 16 && faixasEGrausMenor16.some((f) => f.faixa === faixa))) {
      setErrorMenssage("Idade incompatível com a faixa.");
      return;
    }

    if (aluno.form?.userID && alunoEditado.personal?.name) {
      await editUser(alunoEditado.personal.name, aluno.form.userID);
    }

    const result = await editStudent(id, alunoEditado.personal, alunoEditado.form);

    if (result === true) {
      setErrorMenssage("");
      setMensagemSucesso("Alterações salvas com sucesso!");
      setAlunoOriginal(aluno);
      setIsEditing(false);
    } else {
      setErrorMenssage(result || "Erro ao atualizar aluno.");
    }
  };

  const handleCancel = () => {
    setAluno(alunoOriginal);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (!id) return;

    if(aluno?.form?.userID !== undefined){
      const response = await deleteUser(aluno?.form?.userID);
      if(typeof response === 'string'){
        setErro(response);
        return;
      }
    }

    const result = await deleteAluno(id);

    if (result === true) {
      setErrorMenssage('');
      setMensagemSucesso("Aluno apagado com sucesso!");
      setTimeout(() => {
        navigate("/alunos");
      }, 2000);
    } else {
      setErrorMenssage(result);
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
        <div className="bg-white rounded-2xl p-5 md:p-6 shadow-sm flex justify-between items-center">
          {!isEditing ? (
            <h1 className="text-2xl md:text-3xl font-semibold text-[#1E1E1E] leading-tight">
              {aluno.personal.name} {aluno.personal.nickName ? `(${aluno.personal.nickName})` : ""}
            </h1>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-3 w-full">
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg w-full md:w-1/2"
                value={aluno.personal.name}
                onChange={(e) => handleChange("personal", "name", e.target.value)}
              />
              <input
                type="text"
                className="border border-gray-300 p-2 rounded-lg w-full md:w-1/3"
                placeholder="Apelido"
                value={aluno.personal.nickName || ""}
                onChange={(e) => handleChange("personal","nickName", e.target.value)}
              />
            </div>
          )}

          {!isEditing ? (
            <div className="flex items-center gap-3">
              {/* BOTÃO PARA GRADUAR */}
              {aptoAGraduar && (
                <button
                  onClick={() => alert("Abrir modal ou página de graduação")}
                  className="bg-black text-white text-xs md:text-sm px-3 py-2 md:px-4 md:py-2 rounded-lg font-medium hover:opacity-80 transition  whitespace-nowrap"
                >
                  Graduar aluno
                </button>
              )}

              {/* BOTÃO DE EDITAR */}
              <button
                onClick={() => setIsEditing(true)}
                className="bg-transparent hover:opacity-80 transition cursor-pointer"
              >
                <SquarePen className="w-8 h-8 text-[#1E1E1E]" />
              </button>
            </div>
          ) : (
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

        {/*Mensagem de erro*/}
        {errorMenssage && <ErrorMessage message={errorMenssage} />}

        {/* Mensagem de sucesso */}
        {mensagemSucesso && <SuccessAlert message={mensagemSucesso} />}

        {/* CONTEÚDO */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <Avatar sexo={aluno.personal.gender} idade={aluno.personal.age} />
            <div className="flex-1 space-y-4 w-full">
              <div>
                <p className="font-semibold text-sm md:text-base mb-1">
                  Faixa / Grau:
                </p>

                {!isEditing ? (
                  <InfoField
                    label=""
                    value={`${aluno.form?.rank || ""} / ${aluno.form?.rating || ""}`}
                    editable={false}
                  />
                ) : (
                  <div className="flex w-full gap-3 justify-center">
                    <select
                      className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-3"
                      value={alunoEditado.form?.rank ?? aluno.form?.rank}
                      onChange={(e) => handleChange("form","rank", e.target.value)}
                    >
                      {((aluno.personal.age ?? 0) >= 16
                        ? faixasEGrausMaior16
                        : faixasEGrausMenor16
                      ).map((item, index) => (
                        <option key={index} value={item.faixa}>
                          {item.faixa}
                        </option>
                      ))}
                    </select>

                    <select
                      className="w-full bg-[#F5F5F5] border border-[#D9D9D9] rounded-xl p-3"
                      value={((alunoEditado.form?.rating ?? 0) > 0 ? alunoEditado.form?.rating : "Nenhum") ?? ((aluno.form?.rating ?? 0) > 0 ? aluno.form?.rating : "Nenhum")}
                      onChange={(e) => handleChange('form',"rating", Number(e.target.value))}
                    >
                      {Ranking[aluno.form?.rank ? aluno.form?.rank: ''].map((g) => (
                        <option key={g} value={g > 0 ? g : "Nenhum"}>
                          {g > 0 ? g : "Nenhum"}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                {!isEditing ? (
                  <>
                    <div className="mt-2">
                      <ProgressBar percent={percentualProgresso} />
                    </div>

                    <p className="text-sm text-right mt-1 text-[#1E1E1E]">
                      {aluno.form?.frequencie} treinos
                    </p>

                    <p className="text-sm text-right mt-1">
                      {aluno.form?.frequencie} / {freqNecessaria} treinos (
                      {Math.round(percentualProgresso)}%)
                    </p>
                  </>
                ) : (
                  <div className="flex items-center gap-3 mt-2">
                    <input
                      type="number"
                      min={0}
                      max={100}
                      className="w-24 border border-gray-300 rounded-lg p-2 text-center"
                      value={(alunoEditado.form?.frequencie) ?? (aluno.form?.frequencie ?? 0)}
                      onChange={(e) =>
                        handleChange('form',"frequencie", e.target.value)
                      }
                    />
                    <span className="font-medium"></span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoField
              label="Data de Nascimento:"
              value={(alunoEditado.personal?.birthDate) ??(aluno.personal.birthDate || "")}
              editable={isEditing}
              onChange={(val) => handleChange('personal',"birthDate", maskDate(val))}
            />

            <InfoField
              label="Telefone:"
              value={(alunoEditado.personal?.contact) ?? (aluno.personal.contact || "")}
              editable={isEditing}
              onChange={(val) => handleChange("personal","contact", maskTelefone(val))}
            />

            <InfoField
              label="CPF:"
              value={(alunoEditado.personal?.CPF) ?? (aluno.personal.CPF || "")}
              editable={isEditing}
              onChange={(val) => handleChange("personal","CPF", maskCPF(val))}
            />

            <InfoField
              label="Matrícula (opcional):"
              value={(alunoEditado.form?.enrollment) ?? (aluno.form?.enrollment || "")}
              editable={isEditing}
              onChange={(val) => handleChange("form","enrollment", val)}
            />

            <div className="md:col-span-2">
              <p className="font-semibold text-sm md:text-base">
                Responsável / Contato emergencial:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
                <InfoField
                  label=""
                  value={(alunoEditado.personal?.parent) ?? (aluno.personal.parent || "")}
                  editable={isEditing}
                  onChange={(val) => handleChange('personal',"parent", val)}
                />
                <InfoField
                  label=""
                  value={(alunoEditado.personal?.parentContact) ?? (aluno.personal.parentContact || "")}
                  editable={isEditing}
                  onChange={(val) => handleChange('personal',"parentContact", maskTelefone(val))}
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
                      {aluno.form?.classes && aluno.form?.classes.length > 0
                        ? `${aluno.form?.classes.length} turma${
                            aluno.form?.classes.length > 1 ? "s" : ""
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

                  {aluno.form?.classes && aluno.form?.classes.length > 0 && (
                    <ul className="px-8 pb-4 space-y-2 text-[#1E1E1E]">
                      {aluno.form?.classes.map((turma, index) => (
                        <li
                          key={index}
                          className="bg-[#EFEFEF] font-medium rounded-lg px-2 py-2 shadow-[#F1F1F1]"
                        >
                          {typeof turma === "string" ? turma : turma.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </details>
              </div>
            </div>

            <InfoField
              label="E-mail:"
              value={(alunoEditado.personal?.email) ?? (aluno.personal.email || "")}
              editable={isEditing}
              onChange={(val) => handleChange('personal',"email", val)}
            />
          </div>

          <InfoField
            label="Observações do aluno:"
            value={(alunoEditado.form?.comments) ?? (aluno.form?.comments || "")}
            editable={isEditing}
            multiline
            onChange={(val) => handleChange('form',"comments", val)}
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
        highlightedText={aluno?.personal.name}
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
