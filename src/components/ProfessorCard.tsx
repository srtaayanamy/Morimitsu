import { Link } from "react-router-dom";
import type { Professor } from "../types/User";
import martialArts from "../assets/presets/martial-arts.png";

interface ProfessorCardProps {
  professor: Professor;
}

export default function ProfessorCard({ professor }: ProfessorCardProps) {
  return (
    <Link to={`/visualizar-aluno/${professor.studentId}`}>
    <div className="w-full flex items-center gap-4 bg-[#F1F1F1] rounded-xl shadow-md p-4">
      {/* Avatar */}
      <Link
        to={`/visualizar-aluno/${professor.studentId}`}
        className="w-20 h-20 rounded-xl bg-[#7F1A17] flex items-center justify-center shrink-0"
      >
        <img
          src={martialArts}
          alt="avatar"
          className="w-18 h-18"
        />
      </Link>

      {/* Nome + botão mobile */}
      <div className="flex flex-1 items-center justify-between">
        <Link
          to={`/visualizar-aluno/${professor.studentId}`}
          className="flex flex-col text-left"
        >
          <span className="text-lg font-semibold text-[#1E1E1E]">
            {professor.nome}
          </span>
        </Link>

        {/* BOTÃO MOBILE */}
        <Link
          to={`/visualizar-aluno/${professor.studentId}`}
          className="block md:hidden bg-[#1E1E1E] text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md"
        >
          Acessar dados
        </Link>
      </div>
    </div>
    </Link>
  );
}
