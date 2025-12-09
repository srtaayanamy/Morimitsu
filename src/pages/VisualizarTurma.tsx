import Header from "../components/Header";
import { Pen, SquarePen } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import { pegaDadosTurma } from "../utils/getDadosTurma";
import { editaTurma } from "../utils/editarTurma";
import { deleteTurma } from "../utils/deletarTurma";

import type { Turma } from "../types/Turma";

import BeltTag from "../components/BeltTag";
import { Avatar } from "../components/Avatar";
import ConfirmDeleteClassModal from "../components/ConfirmDeleteClassModal";

import ImageOverlay from "../components/ImageOverlay";
import { calcularIdade } from "../utils/CalcularIdade";
import { ErrorMessage } from "../components/ErrorMessage";

export default function VisualizarTurma() {
  const { id } = useParams();
  const [erro, setErro] = useState("");
  const [turma, setTurma] = useState<Turma>();
  const [turmaOriginal, setTurmaOriginal] = useState<Turma>();
  const [isEditing, setIsEditing] = useState(false);
  const role = localStorage.getItem("role");

  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTurma() {
      if (!id) return;
      const result = await pegaDadosTurma(id);

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

  const handleChange = (field: keyof Turma, value: any) => {
    if (!turma) return;
    setTurma({ ...turma, [field]: value });
  };

  const handleCancel = () => {
    setTurma(turmaOriginal);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (!id || !turma) return;
    const edit: Partial<Record<keyof Turma, Turma[keyof Turma]>> = {};

    for (const key in turma) {
      const campoKey = key as keyof Turma;

      if (!turmaOriginal) return;

      if (turma[campoKey] !== turmaOriginal[campoKey]) {
        edit[campoKey] = turma[campoKey];
      }
    }

    if (Object.keys(edit).length === 0) return;

    const dadosAtualizados = {
      name: edit.nome,
      minAge: edit.idadeMin !== undefined ? Number(edit.idadeMin) : undefined,
      maxAge: edit.idadeMax !== undefined ? Number(edit.idadeMax) : undefined,
      startTime: edit.horarioInicio,
      endTime: edit.horarioFim,
      iconURL: edit.URLImage,
    };

    const result = await editaTurma(id, dadosAtualizados);

    if (result === true) {
      alert("Turma atualizada com sucesso!");
      setTurmaOriginal(turma);
      setIsEditing(false);
    } else {
      setErro(result || "Erro ao atualizar turma.");
    }
  };

  async function handleConfirmDelete() {
    if (!id) return;

    const result = await deleteTurma(id);
    if (result === true) navigate("/turmas");
    else alert(result);

    setIsDeleteOpen(false);
  }

  if (!turma) {
    return (
      <div className="min-h-screen flex justify-center items-center text-gray-600">
        Carregando turma...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F1F1F1] font-outfit text-[#1E1E1E]">
      <Header />

      <main className="p-6 md:p-8 space-y-6">
        <ErrorMessage message={erro} />

        {/* Cabeçalho */}
        <div className="bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center">
          {!isEditing ? (
            <h1 className="text-3xl font-semibold">{turma.nome}</h1>
          ) : (
            <input
              type="text"
              className="border border-gray-200 p-2 rounded-md w-full md:w-1/2"
              value={turma.nome}
              onChange={(e) => handleChange("nome", e.target.value)}
            />
          )}

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
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

          <div className="text-center w-full">
            <p className="text-xs md:text-sm font-medium">
              Professor responsável:
            </p>

            <p className="bg-[#F5F5F5] w-44 md:w-56 mx-auto mt-2 p-2 md:p-3 rounded-xl text-sm md:text-base">
              {turma.professores?.[0]?.nome || "-"}
            </p>
          </div>

          <div className="w-full flex flex-col md:flex-row text-center gap-4 md:gap-6">
            <div className="flex-1">
              <p className="text-xs md:text-sm font-medium">Total de alunos:</p>
              <p className="bg-[#F5F5F5] mt-1 p-2 md:p-3 rounded-xl mx-auto w-32 md:w-40 text-sm md:text-base">
                {turma.numAlunos}
              </p>
            </div>

            <div className="flex-1">
              <p className="text-xs md:text-sm font-medium">Faixa etária:</p>

              {!isEditing ? (
                <p className="bg-[#F5F5F5] mt-1 p-2 md:p-3 rounded-xl mx-auto w-32 md:w-40 text-sm md:text-base">
                  {turma.idadeMin} a {turma.idadeMax} anos
                </p>
              ) : (
                <div className="flex justify-center gap-2 mt-1">
                  <input
                    type="number"
                    className="bg-[#EFEFEF] p-2 md:p-3 rounded-xl w-16 md:w-20 text-center text-sm md:text-base"
                    value={turma.idadeMin}
                    onChange={(e) => handleChange("idadeMin", e.target.value)}
                  />
                  <input
                    type="number"
                    className="bg-[#EFEFEF] p-2 md:p-3 rounded-xl w-16 md:w-20 text-center text-sm md:text-base"
                    value={turma.idadeMax}
                    onChange={(e) => handleChange("idadeMax", e.target.value)}
                  />
                </div>
              )}
            </div>

            <div className="flex-1">
              <p className="text-xs md:text-sm font-medium">Horário da aula:</p>

              {!isEditing ? (
                <p className="bg-[#F5F5F5] mt-1 p-2 md:p-3 rounded-xl mx-auto w-32 md:w-40 text-sm md:text-base">
                  {turma.horarioInicio} → {turma.horarioFim}
                </p>
              ) : (
                <div className="flex justify-center gap-2 mt-1">
                  <input
                    type="time"
                    className="bg-[#EFEFEF] p-2 md:p-3 rounded-xl w-20 md:w-24 text-center text-sm md:text-base"
                    value={turma.horarioInicio}
                    onChange={(e) =>
                      handleChange("horarioInicio", e.target.value)
                    }
                  />

                  <input
                    type="time"
                    className="bg-[#EFEFEF] p-2 md:p-3 rounded-xl w-20 md:w-24 text-center text-sm md:text-base"
                    value={turma.horarioFim}
                    onChange={(e) => handleChange("horarioFim", e.target.value)}
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
                  <button
                    className="bg-[#1E1E1E] text-white rounded-md cursor-pointer
                      px-3 py-2 text-xs
                      md:px-4 md:py-2 md:text-base"
                  >
                    Vincular professor
                  </button>
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
                {turma.alunos?.map((a) => (
                  <tr key={a.id} className="bg-[#F5F5F5] rounded-xl">
                    <Link
                      to={`/visualizar-aluno/${a.id}`}
                      className="hover:underline"
                    >
                      <td className="p-3 rounded-l-xl">{a.nome}</td>
                    </Link>
                    <td className="p-3">{a.apelido}</td>
                    <td className="py-3 px-6 text-center">
                      <BeltTag faixa={a.faixa} grau={a.grau} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE */}
          <div className="md:hidden space-y-2 mt-4">
            {turma.alunos?.map((a) => (
              <Link
                key={a.id}
                to={`/visualizar-aluno/${a.id}`}
                className="bg-[#F1F1F1] shadow-sm rounded-lg p-3 flex items-center gap-3"
              >
                <div className="w-14 h-14 rounded-lg bg-[#7F1A17] flex items-center justify-center overflow-hidden">
                  <Avatar
                    sexo={a.sexo}
                    idade={calcularIdade(a.dataNascimento)}
                    size={40}
                    noWrapper
                  />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-[#1E1E1E] text-[0.95rem] leading-tight">
                    {a.nome}
                  </p>
                  <span className="text-xs text-gray-600">
                    {a.apelido || "—"}
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center px-1">
                  <div className="bg-white p-2 rounded-xl w-20 shadow-sm flex flex-col items-center justify-center">
                    <BeltTag faixa={a.faixa} grau={a.grau} />
                    <p className="text-[0.6rem] font-semibold">
                      Grau: {a.grau}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <ConfirmDeleteClassModal
          isOpen={isDeleteOpen}
          turmaNome={turma.nome}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleConfirmDelete}
        />

        {isOverlayOpen && (
          <ImageOverlay
            selectedImage={selectedImage}
            setSelectedImage={(index) => {
              setSelectedImage(index);
              handleChange(
                "URLImage",
                `/src/assets/presets/capaturma${index + 1}.png`
              );
            }}
            onClose={() => setIsOverlayOpen(false)}
          />
        )}
      </main>
    </div>
  );
}
