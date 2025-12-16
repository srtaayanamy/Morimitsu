import Header from "../components/Header";
import { Pen, SquarePen, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import { getClass } from "../HTTP/Class/getClass";
import { editClass } from "../HTTP/Class/editClass";
import { deleteClass } from "../HTTP/Class/deleteClass";

import type { Class } from "../types/Class";

import BeltTag from "../components/BeltTag";
import { Avatar } from "../components/Avatar";
import ConfirmDeleteClassModal from "../components/ConfirmDeleteClassModal";
import ImageOverlay from "../components/ImageOverlay";
import { AgeCalculator } from "../utils/AgeCalculator";
import { ErrorMessage } from "../components/ErrorMessage";
import { removeCoachInClass } from "../HTTP/Class/removeCoachInClass";
import SuccessAlert from "../components/SuccessAlert";
import ConfirmActionModal from "../components/ConfirmActionModal";

import cap1 from "../assets/presets/capaturma1.png";
import cap2 from "../assets/presets/capaturma2.png";
import cap3 from "../assets/presets/capaturma3.png";
import cap4 from "../assets/presets/capaturma4.png";
import cap5 from "../assets/presets/capaturma5.png";
import cap6 from "../assets/presets/capaturma6.png";
import cap7 from "../assets/presets/capaturma7.png";
import cap8 from "../assets/presets/capaturma8.png";

const capasTurma = [cap1, cap2, cap3, cap4, cap5, cap6, cap7, cap8];

export default function VisualizarTurma() {
  const { id } = useParams();
  const [erro, setErro] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [turma, setTurma] = useState<Class>();
  const [ClassEdited, setClassEdited] = useState<Partial<Class>>({});
  const [turmaOriginal, setTurmaOriginal] = useState<Class>();
  const [isEditing, setIsEditing] = useState(false);
  const role = Cookies.get("role");

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const [isRemoveCoachOpen, setIsRemoveCoachOpen] = useState(false);
  const [coachToRemove, setCoachToRemove] = useState<{
    id: string;
    name?: string;
  } | null>(null);

  useEffect(() => {
    async function fetchTurma() {
      if (!id) return;
      const result = await getClass(id);

      if (typeof result === "string") {
        setErro(result);
      } else {
        setTurma(result);
        setTurmaOriginal(result);

        if (result.URLImage) {
          const match = result.URLImage.match(/capaturma(\d+)\.png/);
          if (match) setSelectedImage(Number(match[1]) - 1);
        }
      }
    }

    fetchTurma();
  }, [id]);

  const handleChange = <K extends keyof Class>(field: K, value: Class[K]) => {
    if (!turma) return;

    // Atualiza a UI
    setTurma((prev) => (prev ? { ...prev, [field]: value } : prev));

    // Salva somente o que foi editado
    setClassEdited((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setTurma(turmaOriginal);
    setClassEdited({});
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!id || !turma) return;

    if (Object.keys(ClassEdited).length === 0) {
      return;
    }

    let coachIds: undefined | string[] = undefined;

    if (ClassEdited.coachs) {
      coachIds = ClassEdited.coachs.map((item) => item.id);
    }

    const dadosAtualizados = {
      name: ClassEdited.name,
      minAge:
        ClassEdited.MinAge !== undefined
          ? Number(ClassEdited.MinAge)
          : undefined,
      maxAge:
        ClassEdited.MaxAge !== undefined
          ? Number(ClassEdited.MaxAge)
          : undefined,
      startTime: ClassEdited.startTime,
      endTime: ClassEdited.endTime,
      iconURL: ClassEdited.URLImage,
      coachIds: coachIds,
    };

    const result = await editClass(id, dadosAtualizados);

    if (result === true) {
      setSuccessMessage("Turma atualizada com sucesso!");
      setErro("");
      setTurmaOriginal(turma);
      setIsEditing(false);
    } else {
      setErro(result || "Erro ao atualizar turma.");
    }
  };

  async function handleConfirmDelete() {
    if (!id) return;

    const result = await deleteClass(id);
    if (result === true) {
      navigate("/turmas");
    } else {
      setErro(result);
    }

    setIsDeleteOpen(false);
  }

  if (!turma) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Carregando turma...
      </div>
    );
  }

  async function handleConfirmRemoveCoach() {
    if (!id || !turma || !coachToRemove) return;

    const result = await removeCoachInClass(id, [coachToRemove.id] as any);

    if (result === true) {
      const updatedCoachs = turma.coachs?.filter(
        (coach: any) => coach.id !== coachToRemove.id
      );

      setTurma((prev) => (prev ? { ...prev, coachs: updatedCoachs } : prev));

      setClassEdited((prev) => ({
        ...prev,
        coachs: updatedCoachs,
      }));
      setSuccessMessage("Professor removido da turma com sucesso!");
      setErro("");
    } else {
      setErro(result);
    }

    setIsRemoveCoachOpen(false);
    setCoachToRemove(null);
  }

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#1E1E1E]">
      <Header />

      <main className="p-6 md:p-8 space-y-6">
        <ErrorMessage message={erro} />
        <SuccessAlert message={successMessage} />

        {/* Cabeçalho */}
        <div className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center">
          {!isEditing ? (
            <h1 className="text-3xl font-semibold">{turma.name}</h1>
          ) : (
            <input
              type="text"
              className="border border-gray-200 p-2 rounded-md w-full md:w-1/2"
              value={ClassEdited.name ?? turma.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          )}

          {!isEditing ? (
            <button
              onClick={() => {
                setIsEditing(true);
                setSuccessMessage("");
                setErro("");
              }}
              className="hover:opacity-80 cursor-pointer"
            >
              <SquarePen className="w-8 h-8" />
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="bg-[#333434] text-white 
                  px-3 py-1.5 text-xs 
                  md:px-4 md:py-2 md:text-base
                  rounded-xl font-medium hover:opacity-90 cursor-pointer"
              >
                Cancelar
              </button>

              <button
                onClick={handleSave}
                className="bg-[#7F1A17] text-white 
                  px-3 py-1.5 text-xs 
                  md:px-4 md:py-2 md:text-base
                  rounded-xl font-medium hover:opacity-90 cursor-pointer"
              >
                Salvar alterações
              </button>
            </div>
          )}
        </div>

        {/* Card da turma */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm flex flex-col items-center gap-4 md:gap-6">
          <div className="relative">
            {turma.URLImage ? (
              <img
                src={turma.URLImage}
                className="w-28 h-28 md:w-36 md:h-36 rounded-full object-cover"
              />
            ) : (
              <div className="w-28 h-28 md:w-36 md:h-36 bg-gray-200 rounded-full flex items-center justify-center">
                Sem imagem
              </div>
            )}

            {isEditing && (
              <button
                onClick={() => setIsOverlayOpen(true)}
                className="absolute bottom-1 right-1 bg-black/60 hover:bg-black/80 text-white p-1.5 md:p-2 rounded-full flex items-center justify-center shadow-md cursor-pointer"
              >
                <Pen size={14} className="md:w-4 md:h-4" />
              </button>
            )}
          </div>

          {/* PROFESSORES VINCULADOS */}
          <div className="w-[200px]">
            <p className="font-semibold text-sm md:text-base mb-1 text-center">
              Professores da turma:
            </p>

            <div className="relative bg-[#F5F5F5] rounded-xl">
              <details className="group rounded-xl">
                <summary className="flex justify-between items-center cursor-pointer px-5 py-3 select-none font-mono text-[#1E1E1E] list-none">
                  <span>
                    {turma.coachs && turma.coachs.length > 0
                      ? `${turma.coachs.length} professor${
                          turma.coachs.length > 1 ? "es" : ""
                        }`
                      : "Nenhum professor vinculado"}
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

                {turma.coachs && turma.coachs.length > 0 && (
                  <ul className="px-8 pb-4 space-y-2 text-[#1E1E1E]">
                    {turma.coachs.map((prof, index) => (
                      <li
                        key={index}
                        className="bg-[#F5F5F5] font-mono rounded-lg px-3 py-2 shadow-[#F1F1F1]
             flex items-center justify-between"
                      >
                        <span>
                          {typeof prof === "string"
                            ? prof
                            : prof.student.personal.name}
                        </span>

                        {isEditing && (
                          <button
                            className="text-black-600 hover:text-black-800 cursor-pointer"
                            title="Remover professor da turma"
                            onClick={() => {
                              setCoachToRemove({
                                id: prof.id,
                                name:
                                  typeof prof === "string"
                                    ? prof
                                    : prof.student.personal.name,
                              });
                              setIsRemoveCoachOpen(true);
                            }}
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </details>
            </div>
          </div>

          <div className="w-full flex flex-col md:flex-row text-center gap-4 md:gap-6">
            <div className="flex-1">
              <p className="text-xs md:text-sm font-medium">Total de alunos:</p>
              <p className="bg-[#F5F5F5] mt-1 p-2 md:p-3 rounded-xl mx-auto w-32 md:w-40 text-sm md:text-base">
                {turma.numStudents}
              </p>
            </div>

            <div className="flex-1">
              <p className="text-xs md:text-sm font-medium">Faixa etária:</p>

              {!isEditing ? (
                <p className="bg-[#F5F5F5] mt-1 p-2 md:p-3 rounded-xl mx-auto w-32 md:w-40 text-sm md:text-base">
                  {turma.MinAge} a {turma.MaxAge} anos
                </p>
              ) : (
                <div className="flex justify-center gap-2 mt-1">
                  <input
                    type="number"
                    className="bg-[#EFEFEF] p-2 md:p-3 rounded-xl w-16 md:w-20 text-center text-sm md:text-base"
                    value={ClassEdited.MaxAge ?? turma.MinAge}
                    onChange={(e) =>
                      handleChange(
                        "MinAge",
                        typeof e.target.value === "string"
                          ? Number(e.target.value)
                          : e.target.value
                      )
                    }
                  />
                  <input
                    type="number"
                    className="bg-[#EFEFEF] p-2 md:p-3 rounded-xl w-16 md:w-20 text-center text-sm md:text-base"
                    value={ClassEdited.MaxAge ?? turma.MaxAge}
                    onChange={(e) =>
                      handleChange(
                        "MaxAge",
                        typeof e.target.value === "string"
                          ? Number(e.target.value)
                          : e.target.value
                      )
                    }
                  />
                </div>
              )}
            </div>

            <div className="flex-1">
              <p className="text-xs md:text-sm font-medium">Horário da aula:</p>

              {!isEditing ? (
                <p className="bg-[#F5F5F5] mt-1 p-2 md:p-3 rounded-xl mx-auto w-32 md:w-40 text-sm md:text-base">
                  {turma.startTime} → {turma.endTime}
                </p>
              ) : (
                <div className="flex justify-center gap-2 mt-1">
                  <input
                    type="time"
                    className="bg-[#EFEFEF] p-2 md:p-3 rounded-xl w-20 md:w-24 text-center text-sm md:text-base"
                    value={ClassEdited.startTime ?? turma.startTime}
                    onChange={(e) => handleChange("startTime", e.target.value)}
                  />

                  <input
                    type="time"
                    className="bg-[#EFEFEF] p-2 md:p-3 rounded-xl w-20 md:w-24 text-center text-sm md:text-base"
                    value={ClassEdited.endTime ?? turma.endTime}
                    onChange={(e) => handleChange("endTime", e.target.value)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lista de alunos */}
        <div className="bg-white p-8 rounded-2xl shadow-sm space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-3">
            <h2 className="text-2xl font-semibold">Alunos matriculados</h2>

            {!isEditing ? (
              <div className="flex gap-3">
                <Link to={`/turma/${id}/inserir-alunos`}>
                  <button className="bg-[#1E1E1E] text-white rounded-xl cursor-pointer px-4 py-2 md:px-4 md:py-2 text-sm md:text-base">
                    Inserir alunos
                  </button>
                </Link>

                <Link to={`/frequencia-turma/${turma.id}`}>
                  <button className="bg-[#1E1E1E] text-white rounded-xl cursor-pointer px-4 py-2 md:px-4 md:py-2 text-sm md:text-base">
                    Fazer frequência
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex gap-2">
                {role === "ADMIN" && (
                  <Link to={`/turmas/${turma.id}/vincular-professores`}>
                    <button
                      className="bg-[#1E1E1E] text-white rounded-md cursor-pointer
                      px-3 py-2 text-xs
                      md:px-4 md:py-2 md:text-base"
                    >
                      Vincular professor
                    </button>
                  </Link>
                )}

                <Link to={`/turma/${id}/inserir-alunos`}>
                  <button
                    className="bg-[#1E1E1E] text-white rounded-md cursor-pointer
                      px-3 py-2 text-xs
                      md:px-4 md:py-2 md:text-base"
                  >
                    Inserir alunos
                  </button>
                </Link>

                <Link to={`/turma/${id}/remover-alunos`}>
                  <button
                    className="bg-[#1E1E1E] text-white rounded-md cursor-pointer
                      px-3 py-2 text-xs
                      md:px-4 md:py-2 md:text-base"
                  >
                    Remover aluno
                  </button>
                </Link>

                {role === "ADMIN" && (
                  <button
                    onClick={() => setIsDeleteOpen(true)}
                    className="bg-[#1E1E1E] text-white rounded-md cursor-pointer
                      px-3 py-2 text-xs
                      md:px-4 md:py-2 md:text-base"
                  >
                    Excluir turma
                  </button>
                )}
              </div>
            )}
          </div>

          {/* DESKTOP — Tabela */}
          <div className="overflow-x-auto hidden md:block">
            <table className="min-w-full border-separate border-spacing-y-2">
              <thead>
                <tr className="text-left text-sm text-gray-600">
                  <th className="p-3 font-semibold">Nome</th>
                  <th className="p-3 font-semibold">Apelido</th>
                  <th className="p-3 font-semibold text-center">Faixa</th>
                </tr>
              </thead>

              <tbody>
                {turma.students?.map((a) => (
                  <tr
                    key={a.id}
                    onClick={() => navigate(`/visualizar-aluno/${a.id}`)}
                    className="bg-[#F5F5F5] rounded-xl hover:bg-gray-100 cursor-pointer"
                  >
                    <td className="p-3 rounded-l-xl">{a.personal.name}</td>
                    <td className="p-3">{a.personal.nickName}</td>
                    <td className="py-3 px-6 text-center">
                      <BeltTag faixa={a.form?.rank} grau={a.form?.rating} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}
          <div className="md:hidden space-y-2 mt-4">
            {turma.students?.map((a) => (
              <Link
                key={a.id}
                to={`/visualizar-aluno/${a.id}`}
                className="bg-[#F1F1F1] shadow-sm rounded-lg p-3 flex items-center gap-3"
              >
                <div className="w-14 h-14 rounded-lg bg-[#7F1A17] flex items-center justify-center overflow-hidden">
                  <Avatar
                    sexo={a.personal.gender}
                    idade={AgeCalculator(
                      a.personal.birthDate ? a.personal.birthDate : ""
                    )}
                    size={40}
                    noWrapper
                  />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-[#1E1E1E] text-[0.95rem] leading-tight">
                    {a.personal.name}
                  </p>
                  <span className="text-xs text-gray-600">
                    {a.personal.nickName || "—"}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center px-1">
                  <div className="bg-white p-2 rounded-xl w-20 shadow-sm flex flex-col items-center justify-center">
                    <BeltTag faixa={a.form?.rank} grau={a.form?.rating} />
                    <p className="text-[0.6rem] font-semibold">
                      Grau: {a.form?.rank}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <ConfirmDeleteClassModal
          isOpen={isDeleteOpen}
          turmaNome={turma.name}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleConfirmDelete}
        />

        {isOverlayOpen && (
          <ImageOverlay
            images={capasTurma}
            selectedImage={selectedImage}
            setSelectedImage={(index) => {
              setSelectedImage(index);
              handleChange("URLImage", capasTurma[index]);
            }}
            onClose={() => setIsOverlayOpen(false)}
          />
        )}
        <ConfirmActionModal
          isOpen={isRemoveCoachOpen}
          title="Deseja remover o professor"
          highlightedText={coachToRemove?.name}
          confirmText="Sim, remover"
          cancelText="Cancelar"
          onClose={() => {
            setIsRemoveCoachOpen(false);
            setCoachToRemove(null);
          }}
          onConfirm={handleConfirmRemoveCoach}
        />
      </main>
    </div>
  );
}
