import { Link } from "react-router-dom";
import type { Professor } from "../types/User";
import martialArts from "../assets/presets/martial-arts.png";
import { Trash2 } from "lucide-react";
import { deleteUser } from "../utils/deleteUser";

interface ProfessorCardProps {
  professor: Professor;
  editMode?: boolean;
}

export default function ProfessorCard({ professor, editMode }: ProfessorCardProps) {
  
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Deseja realmente excluir o professor ${professor.nome}?`
    );
    if (!confirmDelete) return;

    const result = await deleteUser(professor.id);

    if (result === true) {
      alert("Usuário deletado com sucesso!");
      window.location.reload();
    } else {
      alert(result);
    }
  };

  return (
    <div className="w-full flex items-center gap-4 bg-[#F1F1F1] rounded-xl shadow-md p-4">

      {/* Avatar */}
      <Link
        to={`/visualizar-aluno/${professor.studentId}`}
        className="w-20 h-20 rounded-xl bg-[#7F1A17] flex items-center justify-center shrink-0"
      >
        <img src={martialArts} alt="avatar" className="w-18 h-18" />
      </Link>

      {/* Nome + botão */}
      <div className="flex flex-1 items-center justify-between">

        <Link
          to={`/visualizar-aluno/${professor.studentId}`}
          className="flex flex-col text-left"
        >
          <span className="text-lg font-semibold text-[#1E1E1E]">
            {professor.nome}
          </span>
        </Link>

        {/* BOTÃO DELETAR (APARECE SÓ NO EDIT MODE) */}
        {editMode && (
          <button
            onClick={handleDelete}
            className="p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}

        {/* BOTÃO MOBILE NORMAL */}
        {!editMode && (
          <Link
            to={`/visualizar-aluno/${professor.studentId}`}
            className="block md:hidden bg-[#1E1E1E] text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md"
          >
            Acessar dados
          </Link>
        )}
      </div>
    </div>
  );
}
