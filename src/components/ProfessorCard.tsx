import { Link } from "react-router-dom";
import type { Professor } from "../types/Professor";

interface ProfessorCardProps {
  professor: Professor;
}

export default function ProfessorCard({ professor }: ProfessorCardProps) {
  return (
    <Link
      to={`/visualizar-aluno/${professor.studentId}`}
      className="w-full flex items-center gap-4 bg-white rounded-xl shadow-md p-4 hover:bg-gray-50 transition cursor-pointer"
    >
      {/* Avatar */}
      <div className="w-16 h-16 rounded-xl bg-[#E44D4D] flex items-center justify-center">
        <img
          src="/icons/avatar-default.svg"
          alt="avatar"
          className="w-10 h-10"
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
