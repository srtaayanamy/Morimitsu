import { Link } from "react-router-dom";
import type { Professor } from "../types/User";
import martialArts from "../assets/presets/martial-arts.png";
import { Trash2 } from "lucide-react";
import { deleteUser } from "../utils/deleteUser";
import { useState } from "react";
import ConfirmActionModal from "../components/ConfirmActionModal";

interface ProfessorCardProps {
  professor: Professor;
  editMode?: boolean;
}

export default function ProfessorCard({
  professor,
  editMode,
}: ProfessorCardProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = async () => {
    const result = await deleteUser(professor.id);

    if (result === true) {
      alert("Usuário deletado com sucesso!");
      window.location.reload();
    } else {
      alert(result);
    }
  };

  return (
    <>
      <Link to={`/visualizar-aluno/${professor.studentId}`}>
        <div className="w-full flex items-center gap-4 bg-[#F1F1F1] rounded-xl shadow-md p-4">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-xl bg-[#7F1A17] flex items-center justify-center shrink-0">
            <img src={martialArts} alt="avatar" className="w-18 h-18" />
          </div>

          {/* Nome + botão */}
          <div className="flex flex-1 items-center justify-between">
            <div className="flex flex-col text-left">
              <span className="text-sm md:text-lg font-semibold text-[#1E1E1E]">
                {professor.nome}
              </span>
            </div>

            {/* BOTÃO DELETAR */}
            {editMode && (
              <button
                onClick={(e) => {
                  e.preventDefault(); // impede navegação do Link
                  setConfirmOpen(true);
                }}
                className="p-2 text-black rounded-xl cursor-pointer w-12 h-12 transition"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}

            {/* BOTÃO MOBILE */}
            {!editMode && (
              <Link
                to={`/visualizar-aluno/${professor.studentId}`}
                className="block md:hidden bg-[#1E1E1E] text-white px-4 py-2 rounded-xl text-center text-sm font-medium shadow-md"
              >
                Acessar dados
              </Link>
            )}
          </div>
        </div>
      </Link>

      {/* MODAL DE CONFIRMAÇÃO */}
      <ConfirmActionModal
        isOpen={confirmOpen}
        title="Deseja realmente retirar os privilégios de professor de"
        highlightedText={professor.nome}
        confirmText="Sim, confirmo."
        cancelText="Não"
        onClose={() => setConfirmOpen(false)}
        onConfirm={() => {
          setConfirmOpen(false);
          handleDelete();
        }}
      />
    </>
  );
}
