import { useNavigate } from "react-router-dom";

interface TurmaCardProps {
  id: string;
  nome: string;
}

export default function TurmaCard({ id, nome }: TurmaCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/turma/${id}`)}
      className="w-36 sm:w-44 h-30 sm:h-30 bg-[#7F1A17] rounded-xl flex items-center justify-center
                 text-white font-semibold cursor-pointer hover:opacity-90 transition text-center px-2"
    >
      <span className="text-sm sm:text-base">{nome}</span>
    </div>
  );
}
