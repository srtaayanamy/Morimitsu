import { Link } from "react-router-dom";
import type { Professor } from "../types/Professor";
import martialArts from "../assets/presets/martial-arts.png";

interface ProfessorCardProps {
  professor: Professor;
}

export default function ProfessorCard({ professor }: ProfessorCardProps) {
  return (
    <Link
      to={`/visualizar-aluno/${professor.studentId}`}
      className="w-full flex items-center gap-4 bg-[#F1F1F1] rounded-xl shadow-md p-4 hover:bg-gray-50 transition cursor-pointer"
    >
      {/* Avatar */}
      <div className="w-20 h-20 rounded-xl bg-[#7F1A17] flex items-center justify-center">
        <img
          src={martialArts}
          alt="avatar"
          className="w-18 h-18"
        />
      </div>

      {/* Dados do professor */}
      <div className="flex flex-col flex-1 text-left">
        <span className="text-lg font-semibold text-[#1E1E1E]">
          {professor.nome}
        </span>
      </div>
    </Link>
  );
}
